# CLAUDE.md — Forma Marketing Website

You are building the marketing website for **Forma**, a platform that provides independent fitness studios with beautiful websites, integrated booking, payments, and class management. This site lives at **useforma.co.uk** and is separate from the studio public sites and the admin dashboard.

This is a marketing and onboarding site — not the product itself. Its job is to explain what Forma is, convert studio owners into signups, and collect the information needed to build their studio site.

---

## Tech Stack

- **Framework:** Next.js 16.2.0 (App Router, TypeScript, Tailwind CSS v4)
- **Hosting:** Vercel — deployed at useforma.co.uk
- **Database:** Supabase — shared database (same project as studio sites and admin). Onboarding submissions are stored in a `leads` or `onboarding_submissions` table.
- **Payments:** Stripe — for Forma subscription billing (separate from studio payment processing). Studios pay their Forma subscription from this site.
- **Email:** Resend — welcome emails, onboarding status updates
- **Analytics:** Vercel Analytics or Plausible (privacy-friendly, no cookie banner needed)

---

## Brand System

### Name & Logo
- **Name:** Forma
- **Logo:** Wordmark only. "forma" in Satoshi Black (900 weight), rendered as outline stroke with no fill. Stroke colour: Bark (#5C3D2E) on light backgrounds, Bisque (#E8CEB8) on dark backgrounds.
- **Tagline:** Book. Pay. Breathe.

### Colours

| Name | Hex | Role |
|------|-----|------|
| Parchment | #FFFCF9 | Page background |
| Linen | #F5EDE4 | Cards, raised surfaces, alt sections |
| Sand | #E8DDD1 | Borders, dividers |
| Clay | #D4C4B0 | Muted fills, disabled states |
| Terracotta | #C2714F | Primary CTA, accent, links |
| Burnt Clay | #A85A3A | CTA hover/pressed |
| Blush | #F5D5C3 | Tags, badges, soft highlights |
| Espresso | #2C1810 | Headings, primary text |
| Bark | #5C3D2E | Body text, logo outline |
| Driftwood | #8B7265 | Secondary text, captions |
| Fog | #B09E93 | Tertiary text, placeholders |
| Charcoal | #1A1210 | Dark section background (features) |
| Cocoa | #2A1F1A | Dark cards, raised dark surfaces |
| Bisque | #E8CEB8 | Primary text on dark |
| Sandstone | #9C8474 | Secondary text on dark |
| Sage | #2E7D5B | Success, availability badges |
| Amber | #D97706 | Warning, low availability |

### Typography
- **Headings:** Instrument Serif (Google Fonts) — warm, editorial, premium
- **Body/UI:** Satoshi (Fontshare) — weights 400, 500, 700, 900
- **Data/labels:** IBM Plex Mono (Google Fonts) — eyebrow labels, pricing figures

### Tailwind v4 Setup
All colours defined as `@theme` tokens in `globals.css`:
```css
@theme {
  --color-parchment: #FFFCF9;
  --color-linen: #F5EDE4;
  --color-sand: #E8DDD1;
  --color-clay: #D4C4B0;
  --color-terracotta: #C2714F;
  --color-burnt: #A85A3A;
  --color-blush: #F5D5C3;
  --color-espresso: #2C1810;
  --color-bark: #5C3D2E;
  --color-driftwood: #8B7265;
  --color-fog: #B09E93;
  --color-charcoal: #1A1210;
  --color-cocoa: #2A1F1A;
  --color-bisque: #E8CEB8;
  --color-sandstone: #9C8474;
  --color-sage: #2E7D5B;
  --color-amber: #D97706;
  --font-serif: "Instrument Serif", Georgia, serif;
  --font-sans: "Satoshi", -apple-system, sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}
```

### Aesthetic Direction
Warm, earthy, premium but approachable. Editorial confidence with generous whitespace. Not a SaaS template — it should feel like it was designed by a human who cares about studios. Subtle grain overlay optional. Scroll-triggered reveal animations on every section.

---

## Site Structure

### Pages

```
/                     Landing page (hero, problem, features, testimonial, how it works, pricing, CTA)
/onboarding           5-step signup wizard
/onboarding/success   Post-signup confirmation with timeline
/blog                 SEO content hub (future — Phase 2)
/blog/[slug]          Individual blog posts (future)
/privacy              Privacy policy
/terms                Terms of service
```

---

## Page: / (Landing Page)

The landing page is already built (see existing Next.js project). It consists of these sections in order:

### Navbar (fixed, scroll-aware)
- Outline wordmark "forma" left-aligned
- Links: Features, Pricing, How it works (hidden on mobile)
- CTA button: "Get early access" (terracotta, rounded)
- On scroll: frosted glass background, subtle border, shadow

### Hero
- Eyebrow: "Websites for studios that move" (mono, uppercase, terracotta dash prefix)
- Headline: "Your studio, online." (Instrument Serif, em on "online" in terracotta)
- Subhead: one paragraph explaining the value prop
- Two CTAs: "Get early access →" (terracotta) + "See how it works" (outline)
- Right column (desktop only): 3 floating UI preview cards (rotated, with hover effects)
  - Card 1: Today's classes — Hot Pilates · 9:00, spots bar animation
  - Card 2: Revenue this week — £1,240, ↑ 18%
  - Card 3: New members — 7 this month

### Trust Strip
- "Powered by" label + Next.js, Stripe, Supabase, Vercel, Resend logos (text only, low opacity)

### Problem Section
- 2-column: heading left ("Studios deserve better than this"), description right
- 3 pain point cards in a 1px-gap grid:
  1. Enterprise pricing, micro-studio budget (Mindbody £110+/mo)
  2. Two tools duct-taped together (Squarespace + booking widget)
  3. Booking tools with no web presence

### Features Section (dark background — Charcoal #1A1210)
- Eyebrow + heading + description in Bisque/Sandstone
- 4 feature cards (2x2 grid) + 1 wide card spanning full width
- Feature cards: icon (terracotta circle), title (Bisque), description (Sandstone)
  1. Stunning studio website
  2. Integrated class booking
  3. Stripe-powered payments
  4. Automated emails
  5. (Wide) Your schedule, always live — includes a mini schedule preview UI with class names, times, and spots badges (Sage for available, Amber for low)

### Testimonial
- Large italic serif quote from Lucy (Burn Mat Studio, Sheffield)
- Avatar circle (Blush background, "L" initial), name + studio below

### How It Works (Linen background)
- 4 steps with numbered circles, dashed connector line (desktop)
- Each: number (serif, terracotta), title (bold), description
  1. Sign up
  2. We build it
  3. You manage it
  4. Your studio grows

### Pricing
- Centered heading: "Honest prices for real studios"
- 4-tier grid (responsive: 1-col mobile, 2-col tablet, 4-col desktop):

| Tier | Name | Price | Popular |
|------|------|-------|---------|
| Foundation | Launch | £39/mo | No |
| Growth | Studio | £59/mo | Yes — terracotta border, "Most popular" badge |
| Scale | Pro | £89/mo | No |
| White-label | Partner | £129/mo | No |

- Each card: tier label (mono), name (bold), price (serif, large), description, feature list with ✓ marks, CTA button
- Note below: "Only Stripe's standard processing fees apply. We never take a cut of your revenue."

### Final CTA
- "Book. Pay. Breathe." (serif, large, "Breathe" in terracotta italic)
- Subtitle + two CTA buttons
- Subtle radial glow underneath

### Footer
- Outline wordmark, nav links (Features, Pricing, Privacy, Terms, Contact), copyright "© 2026 Forma. Built in Sheffield."

---

## Page: /onboarding (5-Step Wizard)

Interactive multi-step form. Progress bar at top. Step indicator. Smooth transitions between steps.

### Top Bar
- Outline wordmark "forma" left
- "Step X of 5" right (mono, fog)
- Progress bar below (terracotta fill on sand track)

### Step 1: Your studio
Fields:
- Studio name (text) — placeholder: "e.g. Burn Mat Studio"
- Location (text) — placeholder: "e.g. Sheffield"
- Studio type (select) — options: Pilates, Yoga, Pilates & Yoga, HIIT & Functional, Boxing, Barre, Dance, Spin / Cycling, Multi-discipline
- Your name (text)
- Email (email)
- Custom domain (text, optional) — hint: "Already have a domain? We'll connect it. If not, we'll set up a free subdomain."

### Step 2: Your classes
- Dynamic class builder: add/remove class cards
- Each card: class name (text), price (text, £ prefix, mono), capacity (number, mono)
- "Add another class" button (dashed border)
- Class packs section: add/remove pack cards with name and price

### Step 3: Choose a mood
- 6 theme mood options in a 3x2 grid (2x3 on mobile):

| Mood | Preview | Description |
|------|---------|-------------|
| Stillness | Pale sage gradient | Serene, Japanese-minimal — Cormorant Garamond + DM Sans |
| Grit | Dark gradient, yellow text | Raw, industrial — Bebas Neue + Manrope |
| Meadow | Warm cream gradient | Organic, handmade — Fraunces + Satoshi |
| Clay | Terracotta/espresso gradient | Editorial warmth — Instrument Serif + Satoshi |
| Studio | Cool grey gradient | Clean, modern — Satoshi + Satoshi |
| Velvet | Deep purple gradient | Luxe, moody — Satoshi + Satoshi |

- Each option: colour preview block with sample text, name label below, selected state with terracotta border
- Optional: brand colour hex input
- Optional: free-text textarea for brand description/vibe

### Step 4: Connect payments
- Stripe Connect explanation card:
  - Title: "Connect with Stripe"
  - Description: 5 minutes, need bank details + ID
  - 3 feature badges: "Payments go directly to you", "No Forma commission", "Standard 1.4% + 20p fees"
  - "Connect with Stripe →" button (Stripe purple #635BFF)
  - Skip option: "Skip for now" (secondary button) — can connect later from dashboard
- Back button

### Step 5: Review & launch
- Summary cards showing all entered data:
  - Studio card: name, location, type, domain
  - Classes card: list of classes with prices and capacity
  - Theme card: selected mood name
  - Payments card: connection status (green "Connected" or amber "Skipped")
  - Plan card: selected tier, price, "First charge in 14 days (free trial)" note
- "Launch my studio site" primary CTA (full width)
- Back button

### /onboarding/success
- Success animation: green check circle
- Headline: "You're in."
- Timeline:
  1. Now: We start designing your site
  2. Within 48 hours: Preview link to review
  3. Within 5 days: Site live, bookings active
  4. Ongoing: You manage, we handle tech
- "Go to your dashboard" CTA

---

## Database Tables (in shared Supabase)

### onboarding_submissions
```
id              uuid PK
studio_name     text NOT NULL
location        text
studio_type     text
owner_name      text NOT NULL
owner_email     text NOT NULL
domain          text
classes         jsonb              -- array of { name, price_pence, capacity }
packs           jsonb              -- array of { name, price_pence }
theme_mood      text               -- stillness|grit|meadow|clay|studio|velvet
brand_colour    text               -- optional hex
brand_notes     text               -- optional free text
stripe_connected boolean DEFAULT false
plan_tier       text DEFAULT 'studio'
status          text DEFAULT 'pending'  -- pending|designing|review|live|cancelled
created_at      timestamptz DEFAULT now()
```

### email_signups (for early access / waitlist before onboarding is live)
```
id              uuid PK
email           text UNIQUE NOT NULL
source          text               -- e.g. 'landing_hero', 'landing_footer', 'pricing'
created_at      timestamptz DEFAULT now()
```

---

## API Routes

### POST /api/waitlist
For "Get early access" buttons before the full onboarding is live.
- Receives: { email, source }
- Validates email format
- Inserts into email_signups (upsert on email)
- Sends welcome/confirmation email via Resend
- Returns: { success: true }

### POST /api/onboarding/submit
Receives the complete onboarding form data from step 5.
- Validates required fields
- Inserts into onboarding_submissions
- If Stripe was connected, stores the connected account reference
- Sends confirmation email to the studio owner
- Sends notification to you (the Forma admin) via email or Slack webhook
- Returns: { success: true, submission_id }

### POST /api/checkout/subscription (future — Phase 2)
Creates a Stripe Checkout Session for the Forma subscription.
- Uses the Forma platform Stripe account (not a connected account)
- Products: Launch £39/mo, Studio £59/mo, Pro £89/mo, Partner £129/mo
- Includes 14-day free trial
- Returns checkout URL

---

## Email Templates (Resend)

From: hello@useforma.co.uk

### Waitlist confirmation
- Subject: "You're on the list"
- Body: brief confirmation, what to expect, link to the site

### Onboarding confirmation
- Subject: "We're building your studio site"
- Body: summary of what they submitted, timeline (48hr preview, 5-day launch), what happens next

### Admin notification (to you)
- Subject: "New studio signup: [studio name]"
- Body: all submitted data, theme mood, plan tier, Stripe status, link to Supabase record

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=<supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-key>
STRIPE_SECRET_KEY=<forma-platform-stripe-secret>
STRIPE_WEBHOOK_SECRET=<webhook-secret>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<forma-platform-publishable-key>
RESEND_API_KEY=<resend-key>
NEXT_PUBLIC_SITE_URL=https://useforma.co.uk
ADMIN_EMAIL=<your-email-for-notifications>
```

---

## SEO Strategy

### Meta tags (per page)
- `/` — title: "Forma — Your studio, online", desc: "Beautiful websites with booking, payments, and class management built in. Purpose-built for Pilates, yoga, and fitness studios."
- `/onboarding` — title: "Get started with Forma", desc: "Set up your studio site in 5 minutes."
- `/privacy` — title: "Privacy Policy — Forma"
- `/terms` — title: "Terms of Service — Forma"

### Open Graph
- Title, description, type: "website"
- OG image: design a branded share card (1200x630) with "forma" wordmark + tagline

### Structured Data
- Organization schema for Forma
- SoftwareApplication schema for the product

### Target Keywords (for future blog content)
- "pilates studio website UK"
- "yoga booking system"
- "fitness studio website builder"
- "boutique fitness booking software"
- "pilates class booking online"
- "studio management software UK"

---

## Components (reusable)

Already built in the existing project:
- `Navbar` — fixed, scroll-aware, outline wordmark
- `Reveal` — IntersectionObserver scroll animation wrapper
- `Hero` — full-viewport with floating cards
- `TrustStrip` — tech stack bar
- `Problem` — pain points grid
- `Features` — dark section with schedule preview
- `Testimonial` — centered quote
- `HowItWorks` — 4-step flow
- `Pricing` — 4-tier grid
- `FinalCTA` — closing section with glow
- `Footer` — links + copyright

To build:
- `OnboardingShell` — progress bar, step indicator, step navigation
- `StudioDetailsForm` — step 1 fields
- `ClassBuilder` — step 2 dynamic class/pack cards
- `ThemePicker` — step 3 mood grid with selection state
- `StripeConnectCard` — step 4 explanation + connect/skip
- `SubmissionSummary` — step 5 review cards
- `SuccessScreen` — post-signup timeline + CTA
- `WaitlistModal` — email capture popup (for early access buttons)

---

## Build Order

1. Landing page is already built — verify it works, polish any rough edges
2. Add POST /api/waitlist route + wire "Get early access" buttons to it
3. Build WaitlistModal component (email input + submit)
4. Build Resend email template for waitlist confirmation
5. Create onboarding_submissions and email_signups tables in Supabase
6. Build /onboarding page shell (progress bar, step navigation, transitions)
7. Build Step 1: StudioDetailsForm
8. Build Step 2: ClassBuilder (dynamic add/remove)
9. Build Step 3: ThemePicker (6 moods with selection)
10. Build Step 4: StripeConnectCard (explanation + connect/skip)
11. Build Step 5: SubmissionSummary (review all data)
12. Build POST /api/onboarding/submit route
13. Build /onboarding/success page
14. Build admin notification email (Resend)
15. Build /privacy and /terms pages
16. SEO: meta tags, OG image, structured data
17. Testing: full onboarding flow end-to-end, email delivery, mobile
18. Deploy to Vercel, configure useforma.co.uk DNS

---

## Important Notes

- **This is a separate Vercel project** from burn-public and forma-admin. Its own repo, its own domain, its own deployment.
- **Same Supabase project** as the other apps. The onboarding_submissions and email_signups tables live alongside the studio data.
- **Stripe here is for Forma billing**, not studio payments. The subscription checkout uses the Forma platform Stripe account directly. Studio Connect onboarding generates a link but the actual account creation is handled by Stripe's hosted flow.
- **The onboarding wizard is the product's front door.** It must feel polished, fast, and zero-friction. No unnecessary fields. Smart defaults. The whole thing should take a studio owner under 10 minutes.
- **"Get early access" buttons** should work immediately via the waitlist API, even before the full onboarding flow is live. This lets you start collecting leads from day one.
- **The landing page already exists** as a working Next.js project. This brief covers extending it with the onboarding flow, API routes, and supporting pages.
- **Mobile-first.** Many studio owners will first discover Forma on their phones (from an Instagram link, a WhatsApp recommendation, etc.). Every page must work perfectly on mobile.
- **No cookie banner needed** if using Vercel Analytics or Plausible (both cookie-free). If you add any third-party tracking later, add a consent banner.
