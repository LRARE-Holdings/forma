import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createServerClient } from "@forma/db";
import { getStripe } from "@/lib/stripe";
import { getResend } from "@/lib/resend";
import { getTier, isTierId } from "@/lib/pricing";
import { brand } from "@/config/brand";
import { PaymentReceivedEmail, adminHtml, renderEmail } from "@/emails/transactional";

/**
 * POST /api/webhooks/stripe
 *
 * Records subscription state on onboarding_submissions and sends emails.
 *
 * Deliberately does NOT provision studios, auth users, profiles or
 * memberships: those tables are shared with the live Burn Mat operation and
 * there is no multi-tenant dashboard for a new owner to log in to yet. Paid
 * submissions are set up by hand from the admin notification.
 *
 * Idempotent: every write is conditional, and emails only go out when a write
 * actually changed a row. Database failures return 500 so Stripe retries.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secret || !signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, secret);
  } catch (err) {
    console.error("[stripe webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await onCheckoutCompleted(event.data.object);
        break;
      case "customer.subscription.updated":
        await onSubscriptionUpdated(event.data.object);
        break;
      case "customer.subscription.deleted":
        await setStatusBySubscription(event.data.object.id, "cancelled", "Subscription cancelled");
        break;
      case "invoice.payment_failed": {
        const sub = event.data.object.parent?.subscription_details?.subscription;
        const subId = typeof sub === "string" ? sub : sub?.id;
        if (subId) await setStatusBySubscription(subId, "payment_failed", "Payment failed");
        break;
      }
    }
  } catch (err) {
    console.error(`[stripe webhook] failed handling ${event.type} ${event.id}`, err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function onCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription") return;
  const submissionId = session.metadata?.onboarding_submission_id ?? session.client_reference_id;
  if (!submissionId) {
    console.error("[stripe webhook] checkout session without submission id", session.id);
    return;
  }

  const supabase = createServerClient();
  const { data: rows, error } = await supabase
    .from("onboarding_submissions")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      stripe_checkout_session_id: session.id,
      stripe_customer_id: typeof session.customer === "string" ? session.customer : session.customer?.id,
      stripe_subscription_id: typeof session.subscription === "string" ? session.subscription : session.subscription?.id,
    })
    .eq("id", submissionId)
    .neq("status", "paid")
    .select("*");
  if (error) throw error;

  const submission = rows?.[0];
  if (!submission) return; // Already recorded: a retried event.

  const planName = getTier(submission.plan_tier)?.name ?? submission.plan_tier;
  const resend = getResend();
  const from = `${brand.name} <${brand.email}>`;

  if (submission.owner_email) {
    await resend.emails
      .send({
        from,
        to: submission.owner_email,
        subject: `Payment received. We're setting up ${submission.studio_name}.`,
        html: await renderEmail(
          <PaymentReceivedEmail
            ownerName={submission.owner_name ?? ""}
            studioName={submission.studio_name}
            planName={planName}
          />,
        ),
      })
      .catch((err: unknown) => console.error("[stripe webhook] owner email failed", err));
  }

  await notifyAdmin(`New paid signup: ${submission.studio_name} (${planName})`, [
    ["Studio", submission.studio_name],
    ["Plan", `${planName}, billed ${submission.billing_interval === "year" ? "annually" : "monthly"}`],
    ["Owner", submission.owner_name],
    ["Email", submission.owner_email],
    ["Phone", submission.owner_phone],
    ["Location", submission.location],
    ["Type", submission.studio_type],
    ["Domain", submission.domain],
    ["Classes", submission.classes],
    ["Packs", submission.packs],
    ["Team", submission.team],
    ["Theme mood", submission.theme_mood],
    ["Brand colour", submission.brand_colour],
    ["Brand notes", submission.brand_notes],
    ["Notes", submission.notes],
    ["Referral code", submission.referral_code],
    ["Stripe customer", submission.stripe_customer_id],
    ["Stripe subscription", submission.stripe_subscription_id],
    ["Submission ID", submission.id],
    ["Next step", "Set up this studio by hand. Automatic provisioning is not enabled."],
  ]);
}

async function onSubscriptionUpdated(sub: Stripe.Subscription) {
  const lookupKey = sub.items.data[0]?.price.lookup_key ?? "";
  const tier = lookupKey.match(/^forma_(\w+?)_(monthly|annual)$/)?.[1];
  const update: Record<string, string> = {};
  if (isTierId(tier)) update.plan_tier = tier;
  if (sub.status === "active" || sub.status === "trialing") update.status = "paid";
  if (!Object.keys(update).length) return;

  const { error } = await createServerClient()
    .from("onboarding_submissions")
    .update(update)
    .eq("stripe_subscription_id", sub.id)
    .neq("status", "cancelled");
  if (error) throw error;
}

async function setStatusBySubscription(subscriptionId: string, status: "cancelled" | "payment_failed", label: string) {
  const { data: rows, error } = await createServerClient()
    .from("onboarding_submissions")
    .update({ status })
    .eq("stripe_subscription_id", subscriptionId)
    .neq("status", status)
    .select("id, studio_name, owner_email, plan_tier");
  if (error) throw error;
  const s = rows?.[0];
  if (!s) return;
  await notifyAdmin(`${label}: ${s.studio_name}`, [
    ["Studio", s.studio_name],
    ["Owner email", s.owner_email],
    ["Plan", s.plan_tier],
    ["Stripe subscription", subscriptionId],
    ["Submission ID", s.id],
  ]);
}

async function notifyAdmin(subject: string, rows: [string, unknown][]) {
  const to = process.env.ADMIN_EMAIL;
  if (!to) return;
  await getResend()
    .emails.send({ from: `${brand.name} <${brand.email}>`, to, subject, html: adminHtml(subject, rows) })
    .catch((err: unknown) => console.error("[stripe webhook] admin email failed", err));
}
