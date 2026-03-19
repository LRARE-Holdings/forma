# CLAUDE.md — forma-landing

## What this project is

The marketing and onboarding website for **Forma**, a platform that builds websites, booking systems, and payment processing for independent fitness and wellness studios. Domain: **useforma.co.uk**

This is not studio-specific. This is where prospective studio owners discover Forma, see pricing, and sign up. It is completely independent from the studio-facing apps (`burn-public` and `forma-admin`).

## Tech stack

- **Framework:** Next.js 15, App Router, TypeScript
- **Database:** Supabase (writes to `onboarding_submissions`, `email_signups`, and provisions `studios`, `profiles`, `studio_memberships` via webhook)
- **Payments:** Stripe Billing (subscription checkout for Forma tiers, Customer Portal for plan management)
- **Hosting:** Vercel
- **Email:** Resend (welcome emails, onboarding follow-ups, subscription confirmations)

## What this app handles

- **Marketing pages:** Homepage, features, pricing, about/story, FAQ, contact
- **Pricing display:** Four tiers with CTAs linking into the onboarding wizard
- **Onboarding wizard:** 5-step flow ending with tier selection and Stripe Checkout for subscription payment
- **Stripe subscription billing:** Checkout Sessions in subscription mode, webhook handles provisioning, Customer Portal for plan management
- **Email signup:** Newsletter / waitlist capture
- **Legal pages:** Privacy policy, terms of service

## What this app does NOT handle

- Studio websites, booking, payments → that's `burn-public` (per-studio)
- Studio admin dashboards, class management → that's `forma-admin`

## Forma business context

### Positioning

Forma targets the ~8,000 independent fitness and wellness studios in the UK that are underserved by existing tools. Studios like Burn Mat Studio fall between generic website builders (too rigid), enterprise platforms like Mindbody/Glofox (overpriced, clunky), and custom freelance builds (can't scale).

Forma's approach: productised builds that look custom. Every studio gets a unique visual identity — no cookie-cutter sites. Hybrid model starting with manual builds, evolving toward a multi-tenant platform.

**Tagline:** "Book. Pay. Breathe."

### Pricing tiers

| Tier | Price | Notes |
|---|---|---|
| Launch | £39/mo | — |
| Studio | £59/mo | Most popular |
| Pro | £89/mo | — |
| Partner | £129/mo | White-label |

- No setup fees, no contracts, no revenue commission
- Stripe Connect Standard accounts for per-studio payments (studios own their Stripe account)
- Blended ARPU target: ~£67/mo

### Market

- UK TAM: ~8,000 independent studios
- ARR potential: ~£5.7M
- Target customers: Pilates, yoga, HIIT, barre, dance fitness, PT studios — small teams (1-5 instructors), class-based businesses

## Forma brand

### Palette

| Token | Colour | Hex |
|---|---|---|
| Parchment | Off-white background | `#FFFCF9` |
| Terracotta | Primary accent | `#C2714F` |
| Espresso | Dark text / headings | `#2C1810` |
| Bark | Secondary dark | `#5C3D2E` |

Warm, earthy, premium but approachable. Not tech-bro SaaS energy. Think artisan coffee shop, not dashboard factory.

### Typography

- **Headings:** Instrument Serif
- **Body & Logo:** Satoshi
- **Data / Code / Labels:** IBM Plex Mono

### Logo

Outline-only wordmark in **Satoshi Black**. Simple, clean, no icon. The word "forma" is the logo.

## Database

This site reads and writes to the shared Supabase instance. Most tables are append-only from the public site, but the Stripe webhook also provisions studios on successful payment.

**Written by the onboarding wizard:**
- `onboarding_submissions` — data from the wizard (studio name, owner details, class types, preferences, theme mood selection, selected tier)
- `email_signups` — newsletter/waitlist captures

**Written by the Stripe webhook on successful subscription:**
- `studios` — new row with name, slug, domain, `email_from`, `email_domain`, `branding` JSON (seeded from onboarding preferences), `stripe_customer_id`, `stripe_subscription_id`, `plan_tier`
- `profiles` — new row for the studio owner (or linked to existing if they already have an auth account)
- `studio_memberships` — new row linking the owner to their studio with role = admin

The webhook also creates a Supabase Auth account for the owner (if they don't already have one) and sends them a welcome email with login instructions.

## Onboarding wizard (5 steps)

1. **Studio basics** — name, location, type of studio
2. **Class setup** — class types they offer, rough pricing
3. **Team** — how many instructors, their roles
4. **Theme mood picker** — visual identity preferences (feeds into the `studios.branding` JSON column when provisioned)
5. **Plan & pay** — select tier (Launch / Studio / Pro / Partner), review summary of everything entered, owner name + email + phone, then "Start my studio" CTA → redirects to Stripe Checkout in subscription mode

The wizard saves progress to `onboarding_submissions` as the owner advances through steps (so partial completions are captured even if they don't finish). On step 5, the submission is finalised and the Stripe Checkout Session is created with all onboarding data passed as metadata.

**After Stripe Checkout:** On successful payment, the Stripe webhook auto-provisions the studio. The owner receives a welcome email with login credentials and next steps. They land on a confirmation/success page that explains what happens next (their site is being set up, they'll get access to their admin dashboard, etc.).

## Stripe Billing

### Products (4 subscriptions, monthly recurring)

| Product | Price | Stripe metadata |
|---|---|---|
| Forma Launch | £39/mo | plan_tier: launch |
| Forma Studio | £59/mo | plan_tier: studio |
| Forma Pro | £89/mo | plan_tier: pro |
| Forma Partner | £129/mo | plan_tier: partner |

All subscriptions are monthly with no commitment — cancel anytime.

### API routes

**POST `/api/checkout/subscribe`** — Creates a Stripe Checkout Session in subscription mode. Receives: onboarding_submission_id, plan_tier. Looks up the submission data. Creates the Checkout Session with metadata: { onboarding_submission_id, plan_tier, owner_email, studio_name }. Returns the checkout URL.

**POST `/api/webhooks/stripe`** — Handles Stripe webhook events. Verify signature. Key events:

- **checkout.session.completed** (mode = subscription) → Auto-provision the studio:
  1. Read metadata to get onboarding_submission_id
  2. Fetch the full submission from `onboarding_submissions`
  3. Create `studios` row (name, slug, domain placeholder, email config, branding from theme mood, stripe_customer_id, stripe_subscription_id, plan_tier)
  4. Create Supabase Auth account for the owner (or find existing)
  5. Create `profiles` row (if new)
  6. Create `studio_memberships` row (owner as admin at new studio)
  7. Update `onboarding_submissions` status to 'provisioned'
  8. Send welcome email via Resend from hello@useforma.co.uk

- **customer.subscription.updated** → Update `studios.plan_tier` if they upgrade/downgrade
- **customer.subscription.deleted** → Mark studio as inactive (soft delete — don't destroy data)
- **invoice.payment_failed** → Flag studio, send dunning email

**Idempotency:** Always check if a studio already exists for this stripe_customer_id before provisioning.

### Stripe Customer Portal

Enabled for plan management. Studio owners can upgrade, downgrade, update payment method, or cancel via a link in their admin dashboard (forma-admin provides the link, but the portal itself is Stripe-hosted). Portal access URL generated via `/api/billing/portal` route.

## Key architectural decisions

1. **Fully decoupled from studio runtime** — this site handles discovery, onboarding, and billing. It provisions studios but doesn't serve them. No shared runtime state with burn-public or forma-admin beyond the Supabase connection.
2. **No auth for browsing** — marketing pages and the wizard are fully public. The owner only creates an account as part of provisioning (handled by the webhook, not a signup form).
3. **Onboarding-to-payment is one flow** — the wizard captures everything, tier selection is the final step, Stripe Checkout is the payment gate. No separate "sign up then pay later" path.
4. **Webhook-driven provisioning** — the studio is created automatically on successful subscription payment. No manual step. The webhook is the source of truth for "this studio exists and is paid for."
5. **Theme mood picker is aspirational** — it captures preferences that seed the `studios.branding` JSON. It doesn't auto-generate a full theme yet. Over time, this will feed into automated theming.
6. **SEO matters** — this is a marketing site. Every page should be SSR/SSG with proper meta tags, Open Graph, structured data. Performance and Core Web Vitals are priorities.
7. **Pricing page CTAs funnel into the wizard** — they don't go straight to Stripe. The wizard needs to collect studio details before payment.

## Email strategy

Single Resend account shared across all Forma apps. This site sends from a Forma-branded address (e.g. hello@useforma.co.uk) for onboarding follow-ups and newsletter emails. Studio-specific sending domains are configured per tenant in the `studios` table — but that's not relevant here since this site has no studio context.

Auth emails across the platform (password resets, magic links) are sent by Supabase via a project-wide SMTP sender configured as auth@useforma.co.uk.

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://useforma.co.uk
```

## Conventions

- App Router file structure: `app/(marketing)/`, `app/onboarding/`, `app/api/`
- Static generation (SSG) for marketing pages where possible
- Server Components by default — minimal client-side JS
- Tailwind CSS with the Forma brand tokens as CSS custom properties
- Components in `components/` with subdirectories: `components/marketing/`, `components/onboarding/`, `components/ui/`
- API routes in `app/api/` for Stripe checkout, webhooks, and billing portal
- `lib/` for shared utilities: `lib/supabase.ts`, `lib/stripe.ts`, `lib/resend.ts`, `lib/provisioning.ts` (studio creation logic used by the webhook)
- Respect the brand: Instrument Serif for headings, Satoshi for body, warm earthy palette throughout

## When working on this project

- This is a marketing site — design quality and copywriting matter as much as code quality
- Every page should feel premium and warm, not generic SaaS template
- The onboarding wizard should feel effortless — progressive disclosure, no walls of form fields
- The wizard must save progress to `onboarding_submissions` as the owner advances, so partial completions are never lost
- Don't add studio-specific runtime logic here. If you're querying a studio's classes or bookings, you're in the wrong repo.
- The provisioning webhook is critical infrastructure — it must be idempotent, handle edge cases (existing auth accounts, duplicate submissions), and log failures clearly
- SEO is a priority: semantic HTML, proper heading hierarchy, meta descriptions on every page, sitemap, robots.txt
- Performance is a priority: optimise images, minimise JS bundle, leverage static generation
- The pricing page should clearly communicate "no setup fees, no contracts, no commission" — this is a key differentiator
- Pricing page CTAs should link to the onboarding wizard with the selected tier pre-filled, not directly to Stripe
- Brand consistency: use the token system. Don't hardcode hex values — use the CSS custom properties so the brand can evolve without find-and-replace
- The success page after Stripe Checkout needs to set clear expectations — the owner just paid, they need to know what happens next and when they'll get access