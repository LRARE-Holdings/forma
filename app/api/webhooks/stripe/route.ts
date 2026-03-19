import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase";
import {
  provisionStudio,
  sendAdminProvisioningNotification,
} from "@/lib/provisioning";
import { getResend } from "@/lib/resend";
import Stripe from "stripe";

/**
 * POST /api/webhooks/stripe
 *
 * Handles Stripe webhook events for subscription lifecycle.
 * Key events:
 * - customer.subscription.updated → subscription created (with trial) or plan change
 * - customer.subscription.deleted → cancellation
 * - invoice.payment_failed → dunning email
 *
 * Note: With trial subscriptions + SetupIntent, the subscription is created
 * immediately (status: trialing). There is no checkout.session.completed event
 * because we use the Subscriptions API directly, not Checkout Sessions.
 * Provisioning triggers on the first subscription.updated event.
 */
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  const supabase = createServerClient();

  try {
    switch (event.type) {
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;
        const metadata = subscription.metadata || {};
        const submissionId = metadata.onboarding_submission_id;
        const planTier = metadata.plan_tier || "studio";

        // Check if this is a new subscription that needs provisioning
        // (status is trialing or active, and no studio exists yet)
        if (
          (subscription.status === "trialing" ||
            subscription.status === "active") &&
          submissionId
        ) {
          const { data: existingStudio } = await supabase
            .from("studios")
            .select("id")
            .eq("stripe_customer_id", customerId)
            .maybeSingle();

          if (!existingStudio) {
            // New subscription — provision the studio
            console.log(
              `Provisioning studio for subscription ${subscription.id}`
            );

            try {
              await provisionStudio({
                onboardingSubmissionId: submissionId,
                stripeCustomerId: customerId,
                stripeSubscriptionId: subscription.id,
                planTier,
              });

              // Send admin notification
              const { data: submission } = await supabase
                .from("onboarding_submissions")
                .select("*")
                .eq("id", submissionId)
                .single();

              if (submission) {
                await sendAdminProvisioningNotification(submission);
              }
            } catch (provisionError) {
              console.error("Provisioning failed:", provisionError);
              // Don't return error — acknowledge the webhook to prevent retries
              // that would cause duplicate processing. Log for manual intervention.
            }
          } else {
            // Existing studio — might be a plan change (upgrade/downgrade)
            const newPlanTier = planTier;
            await supabase
              .from("studios")
              .update({ plan_tier: newPlanTier, updated_at: new Date().toISOString() })
              .eq("stripe_customer_id", customerId);

            console.log(
              `Updated plan_tier to ${newPlanTier} for customer ${customerId}`
            );
          }
        }

        // Also update the onboarding_submissions status
        if (submissionId) {
          const status =
            subscription.status === "active" || subscription.status === "trialing"
              ? "live"
              : "pending";
          await supabase
            .from("onboarding_submissions")
            .update({ status })
            .eq("id", submissionId);
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        // Soft-deactivate the studio (don't destroy data)
        await supabase
          .from("studios")
          .update({ active: false, updated_at: new Date().toISOString() })
          .eq("stripe_customer_id", customerId);

        // Update the onboarding submission status
        const metadata = subscription.metadata || {};
        if (metadata.onboarding_submission_id) {
          await supabase
            .from("onboarding_submissions")
            .update({ status: "cancelled" })
            .eq("id", metadata.onboarding_submission_id);
        }

        console.log(`Studio deactivated for customer ${customerId}`);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId =
          typeof invoice.customer === "string"
            ? invoice.customer
            : invoice.customer?.id;

        if (!customerId) break;

        // Look up the studio to get the owner's email
        const { data: studio } = await supabase
          .from("studios")
          .select("id, name, onboarding_submission_id")
          .eq("stripe_customer_id", customerId)
          .maybeSingle();

        if (studio?.onboarding_submission_id) {
          const { data: submission } = await supabase
            .from("onboarding_submissions")
            .select("owner_email, owner_name, studio_name")
            .eq("id", studio.onboarding_submission_id)
            .single();

          if (submission?.owner_email) {
            // Send dunning email
            try {
              await getResend().emails.send({
                from: "Forma <hello@useforma.co.uk>",
                to: submission.owner_email,
                subject: "Action required: Payment failed",
                html: `
                  <!DOCTYPE html>
                  <html>
                  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
                  <body style="margin:0;padding:0;background-color:#FFFCF9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
                    <div style="max-width:520px;margin:0 auto;padding:48px 24px;">
                      <p style="font-size:18px;font-weight:900;letter-spacing:-0.04em;color:transparent;-webkit-text-stroke:1.2px #5C3D2E;margin-bottom:32px;">forma</p>
                      <h1 style="font-size:24px;color:#2C1810;margin-bottom:12px;font-weight:400;font-family:Georgia,serif;">Payment failed</h1>
                      <p style="font-size:15px;color:#8B7265;line-height:1.65;margin-bottom:20px;">
                        Hi ${submission.owner_name || "there"}, we couldn't process your latest payment for <strong style="color:#2C1810;">${submission.studio_name}</strong>.
                      </p>
                      <p style="font-size:15px;color:#8B7265;line-height:1.65;margin-bottom:24px;">
                        Please update your payment method to keep your studio active. If we can't process payment after a few attempts, your site will be paused.
                      </p>
                      <p style="font-size:15px;color:#8B7265;line-height:1.65;">
                        Need help? Just reply to this email.
                      </p>
                      <div style="border-top:1px solid #E8DDD1;padding-top:24px;margin-top:32px;">
                        <p style="font-size:12px;color:#B09E93;">Forma — Your studio, online.<br>Built in Newcastle.</p>
                      </div>
                    </div>
                  </body>
                  </html>
                `,
              });
            } catch (emailError) {
              console.error("Failed to send dunning email:", emailError);
            }
          }
        }

        console.log(`Payment failed for customer ${customerId}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }
  } catch (err) {
    console.error(`Error processing webhook event ${event.type}:`, err);
    // Still return 200 to acknowledge receipt and prevent retries
  }

  return NextResponse.json({ received: true });
}
