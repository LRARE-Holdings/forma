import { createServerClient } from "./supabase";
import { getResend } from "./resend";
import { createClient } from "@supabase/supabase-js";

interface ProvisioningData {
  onboardingSubmissionId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  planTier: string;
}

/**
 * Provision a studio after successful Stripe subscription payment.
 *
 * This function is idempotent — it checks for existing studios by
 * stripe_customer_id before creating new records.
 *
 * Steps:
 * 1. Fetch the onboarding submission
 * 2. Check idempotency (studio already exists for this customer?)
 * 3. Generate a unique slug from the studio name
 * 4. Build branding JSON from theme mood
 * 5. Derive domains (domain + admin_domain)
 * 6. Create the studios row
 * 7. Create or find a Supabase Auth account for the owner
 * 8. Create the profiles row (if new)
 * 9. Create the studio_memberships row (owner as admin)
 * 10. Update onboarding_submissions status to 'provisioned'
 * 11. Add Supabase auth redirect URLs for the studio domains
 * 12. Send welcome email
 */
export async function provisionStudio(data: ProvisioningData) {
  const supabase = createServerClient();

  // 1. Fetch the onboarding submission
  const { data: submission, error: fetchError } = await supabase
    .from("onboarding_submissions")
    .select("*")
    .eq("id", data.onboardingSubmissionId)
    .single();

  if (fetchError || !submission) {
    console.error("Failed to fetch onboarding submission:", fetchError);
    throw new Error(`Submission not found: ${data.onboardingSubmissionId}`);
  }

  // 2. Idempotency check — does a studio already exist for this Stripe customer?
  const { data: existingStudio } = await supabase
    .from("studios")
    .select("id")
    .eq("stripe_customer_id", data.stripeCustomerId)
    .maybeSingle();

  if (existingStudio) {
    console.log(`Studio already exists for customer ${data.stripeCustomerId}, skipping provisioning`);
    return { studioId: existingStudio.id, alreadyExists: true };
  }

  // 3. Generate a unique slug from the studio name
  const slug = await generateUniqueSlug(supabase, submission.studio_name);

  // 4. Build branding JSON from theme mood
  const branding = {
    themeMood: submission.theme_mood || "clay",
    brandColour: submission.brand_colour || null,
    brandNotes: submission.brand_notes || null,
  };

  // 5. Derive domains
  const customDomain = submission.domain || null;
  const adminDomain = customDomain ? `admin.${customDomain}` : null;

  // 6. Create the studios row
  const { data: studio, error: studioError } = await supabase
    .from("studios")
    .insert({
      name: submission.studio_name,
      slug,
      domain: customDomain,
      admin_domain: adminDomain,
      email_from: `hello@${slug}.useforma.co.uk`,
      email_domain: customDomain || `${slug}.useforma.co.uk`,
      branding,
      stripe_customer_id: data.stripeCustomerId,
      stripe_subscription_id: data.stripeSubscriptionId,
      plan_tier: data.planTier,
      active: true,
      onboarding_submission_id: data.onboardingSubmissionId,
    })
    .select("id")
    .single();

  if (studioError) {
    console.error("Failed to create studio:", studioError);
    throw new Error(`Failed to create studio: ${studioError.message}`);
  }

  // 7. Create or find Supabase Auth account for the owner
  const ownerEmail = submission.owner_email;
  const ownerName = submission.owner_name;

  if (!ownerEmail) {
    console.warn("No owner email found on submission, skipping auth account creation");
    // Still update the submission status
    await supabase
      .from("onboarding_submissions")
      .update({
        status: "provisioned",
        stripe_customer_id: data.stripeCustomerId,
        stripe_subscription_id: data.stripeSubscriptionId,
      })
      .eq("id", data.onboardingSubmissionId);

    return { studioId: studio.id, alreadyExists: false };
  }

  // Use the admin auth API to create or find the user
  const authClient = createAuthAdminClient();
  let userId: string;

  // Check if user already exists
  const { data: existingUsers } = await authClient.auth.admin.listUsers();
  const existingUser = existingUsers?.users?.find(
    (u) => u.email?.toLowerCase() === ownerEmail.toLowerCase()
  );

  if (existingUser) {
    userId = existingUser.id;
    console.log(`Found existing auth user for ${ownerEmail}: ${userId}`);
  } else {
    // Create new auth user with a random password (they'll use magic link / reset)
    const tempPassword = generateSecurePassword();
    const { data: newUser, error: authError } = await authClient.auth.admin.createUser({
      email: ownerEmail,
      password: tempPassword,
      email_confirm: true,
      user_metadata: {
        full_name: ownerName || "",
      },
    });

    if (authError || !newUser?.user) {
      console.error("Failed to create auth user:", authError);
      throw new Error(`Failed to create auth user: ${authError?.message}`);
    }

    userId = newUser.user.id;
    console.log(`Created new auth user for ${ownerEmail}: ${userId}`);
  }

  // 8. Create profiles row (upsert to handle existing)
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert(
      {
        id: userId,
        full_name: ownerName || null,
        email: ownerEmail,
        phone: submission.owner_phone || null,
      },
      { onConflict: "id" }
    );

  if (profileError) {
    console.error("Failed to create profile:", profileError);
    // Non-fatal — continue provisioning
  }

  // 9. Create studio_memberships row (owner as admin)
  const { error: membershipError } = await supabase
    .from("studio_memberships")
    .upsert(
      {
        studio_id: studio.id,
        profile_id: userId,
        role: "admin",
      },
      { onConflict: "studio_id,profile_id" }
    );

  if (membershipError) {
    console.error("Failed to create studio membership:", membershipError);
    // Non-fatal — continue provisioning
  }

  // 10. Update onboarding_submissions status
  await supabase
    .from("onboarding_submissions")
    .update({
      status: "provisioned",
      stripe_customer_id: data.stripeCustomerId,
      stripe_subscription_id: data.stripeSubscriptionId,
    })
    .eq("id", data.onboardingSubmissionId);

  // 11. Add Supabase auth redirect URLs for the new studio domains
  if (customDomain) {
    await addAuthRedirectUrls(customDomain, adminDomain!);
  }

  // 12. Send welcome email
  await sendWelcomeEmail({
    ownerName: ownerName || "there",
    ownerEmail,
    studioName: submission.studio_name,
  });

  console.log(`Studio provisioned: ${studio.id} (${submission.studio_name})`);
  return { studioId: studio.id, alreadyExists: false };
}

/**
 * Generate a URL-safe slug from a studio name, ensuring uniqueness.
 */
async function generateUniqueSlug(
  supabase: ReturnType<typeof createServerClient>,
  name: string
): Promise<string> {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  let slug = base || "studio";
  let counter = 0;

  while (true) {
    const candidate = counter === 0 ? slug : `${slug}-${counter}`;
    const { data: existing } = await supabase
      .from("studios")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();

    if (!existing) {
      return candidate;
    }
    counter++;
  }
}

/**
 * Create an admin Supabase client for auth operations.
 * Uses service role key which has admin auth privileges.
 */
function createAuthAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Generate a secure random password for the initial auth user.
 * The user will reset this via magic link or password reset.
 */
function generateSecurePassword(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  const length = 32;
  let password = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
}

/**
 * Add studio domains to Supabase Auth redirect URL allowlist.
 * This ensures magic link / OAuth callbacks work on the studio's custom domains.
 */
async function addAuthRedirectUrls(domain: string, adminDomain: string) {
  const supabaseProjectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(
    /https:\/\/([^.]+)\.supabase\.co/
  )?.[1];

  const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

  if (!supabaseProjectRef || !accessToken) {
    console.warn(
      "Missing SUPABASE_ACCESS_TOKEN or project ref — skipping auth redirect URL update. " +
        `Add these manually: https://${domain}/**, https://${adminDomain}/**`
    );
    return;
  }

  try {
    // Fetch current auth config to get existing redirect URLs
    const configRes = await fetch(
      `https://api.supabase.com/v1/projects/${supabaseProjectRef}/config/auth`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!configRes.ok) {
      console.warn("Failed to fetch auth config:", configRes.status);
      return;
    }

    const config = await configRes.json();
    const existingUrls: string[] = config.EXTERNAL_REDIRECT_URLS
      ? config.EXTERNAL_REDIRECT_URLS.split(",")
      : [];

    const newUrls = [
      `https://${domain}/**`,
      `https://${adminDomain}/**`,
    ];

    // Only add URLs that aren't already in the list
    const urlsToAdd = newUrls.filter((url) => !existingUrls.includes(url));
    if (urlsToAdd.length === 0) return;

    const updatedUrls = [...existingUrls, ...urlsToAdd].join(",");

    const updateRes = await fetch(
      `https://api.supabase.com/v1/projects/${supabaseProjectRef}/config/auth`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EXTERNAL_REDIRECT_URLS: updatedUrls,
        }),
      }
    );

    if (!updateRes.ok) {
      console.warn("Failed to update auth redirect URLs:", updateRes.status);
    } else {
      console.log(`Added auth redirect URLs for ${domain} and ${adminDomain}`);
    }
  } catch (err) {
    console.error("Error updating auth redirect URLs:", err);
    // Non-fatal — log for manual follow-up
  }
}

/**
 * Send welcome email to the new studio owner with next steps.
 */
async function sendWelcomeEmail({
  ownerName,
  ownerEmail,
  studioName,
}: {
  ownerName: string;
  ownerEmail: string;
  studioName: string;
}) {
  try {
    await getResend().emails.send({
      from: "Forma <hello@useforma.co.uk>",
      to: ownerEmail,
      subject: `Welcome to Forma, ${ownerName}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="margin:0;padding:0;background-color:#FFFCF9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
          <div style="max-width:520px;margin:0 auto;padding:48px 24px;">
            <p style="font-size:18px;font-weight:900;letter-spacing:-0.04em;color:transparent;-webkit-text-stroke:1.2px #5C3D2E;margin-bottom:32px;">forma</p>
            <h1 style="font-size:28px;color:#2C1810;margin-bottom:12px;font-weight:400;font-family:Georgia,serif;">Welcome to Forma</h1>
            <p style="font-size:15px;color:#8B7265;line-height:1.65;margin-bottom:20px;">
              Hi ${ownerName}, your subscription is confirmed and we're already working on <strong style="color:#2C1810;">${studioName}</strong>'s new home online.
            </p>
            <div style="background-color:#F5EDE4;border-radius:12px;padding:20px;margin-bottom:24px;">
              <p style="font-size:14px;color:#5C3D2E;font-weight:600;margin-bottom:12px;">What happens next:</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#C2714F;font-weight:600;width:100px;vertical-align:top;">Now</td>
                  <td style="padding:6px 0;font-size:13px;color:#8B7265;">We start designing your site</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#C2714F;font-weight:600;vertical-align:top;">48 hours</td>
                  <td style="padding:6px 0;font-size:13px;color:#8B7265;">Preview link sent for your review</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#C2714F;font-weight:600;vertical-align:top;">5 days</td>
                  <td style="padding:6px 0;font-size:13px;color:#8B7265;">Your site goes live with bookings active</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#C2714F;font-weight:600;vertical-align:top;">Ongoing</td>
                  <td style="padding:6px 0;font-size:13px;color:#8B7265;">You manage your studio, we handle the tech</td>
                </tr>
              </table>
            </div>
            <p style="font-size:15px;color:#8B7265;line-height:1.65;margin-bottom:24px;">
              You'll receive a separate email with your login details for the Forma dashboard. In the meantime, if you have any questions, just reply to this email.
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
    console.error("Failed to send welcome email:", emailError);
    // Non-fatal — don't throw, the studio is already provisioned
  }
}

/**
 * Send admin notification when a new studio is provisioned.
 */
export async function sendAdminProvisioningNotification(submission: {
  studio_name: string;
  owner_name: string;
  owner_email: string;
  location: string;
  studio_type: string;
  plan_tier: string;
  theme_mood: string;
  classes: unknown;
  team: unknown;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return;

  try {
    await getResend().emails.send({
      from: "Forma <hello@useforma.co.uk>",
      to: adminEmail,
      subject: `Studio provisioned: ${submission.studio_name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="margin:0;padding:0;background-color:#FFFCF9;font-family:-apple-system,sans-serif;">
          <div style="max-width:520px;margin:0 auto;padding:48px 24px;">
            <h1 style="font-size:22px;color:#2C1810;font-family:Georgia,serif;">Studio Provisioned</h1>
            <p style="font-size:14px;color:#2E7D5B;font-weight:600;margin-bottom:16px;">Payment confirmed and studio auto-provisioned.</p>
            <table style="width:100%;border-collapse:collapse;margin-top:16px;">
              <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;width:120px;">Studio</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${submission.studio_name}</td></tr>
              <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Owner</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${submission.owner_name || "—"} (${submission.owner_email || "—"})</td></tr>
              <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Location</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${submission.location || "—"}</td></tr>
              <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Type</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${submission.studio_type || "—"}</td></tr>
              <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Plan</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${submission.plan_tier || "studio"}</td></tr>
              <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;border-bottom:1px solid #E8DDD1;">Theme</td><td style="padding:8px 0;font-size:13px;color:#2C1810;border-bottom:1px solid #E8DDD1;">${submission.theme_mood || "—"}</td></tr>
              <tr><td style="padding:8px 0;font-size:13px;color:#B09E93;">Team</td><td style="padding:8px 0;font-size:13px;color:#2C1810;">${JSON.stringify(submission.team) || "—"}</td></tr>
            </table>
          </div>
        </body>
        </html>
      `,
    });
  } catch (emailError) {
    console.error("Failed to send admin provisioning notification:", emailError);
  }
}
