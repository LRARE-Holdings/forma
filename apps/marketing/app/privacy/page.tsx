import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy — Forma",
  description: "How Forma handles your data.",
};

export default function PrivacyPage() {
  return (
    <>
    <SiteHeader />
    <main className="bg-paper text-ink">
      <div className="mx-auto max-w-[720px] px-(--gutter) py-16 md:py-24">

        <h1 className="mb-8 type-h1">
          Privacy Policy
        </h1>

        <div className="space-y-6 type-body text-ink-soft">
          <p>Last updated: March 2026</p>

          <h2 className="mt-10 type-h3 text-ink">Who we are</h2>
          <p>
            Forma (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website useforma.co.uk and provides studio website building, booking, and payment services for fitness studios across the UK.
          </p>

          <h2 className="mt-10 type-h3 text-ink">What data we collect</h2>
          <p>When you sign up or use our services, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name and email address</li>
            <li>Studio name, location, and type</li>
            <li>Class and pricing information you provide</li>
            <li>Phone number (if provided)</li>
            <li>Usage data and analytics (cookie-free, via privacy-friendly tools)</li>
          </ul>

          <h2 className="mt-10 type-h3 text-ink">How we use your data</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Build and manage your studio website</li>
            <li>Set up your subscription and process payments</li>
            <li>Send transactional emails (confirmations, updates)</li>
            <li>Improve our services</li>
          </ul>

          <h2 className="mt-10 type-h3 text-ink">Third-party services</h2>
          <p>
            We use Supabase for data storage, Resend for email delivery, and Vercel for hosting. Each provider has their own privacy policy and processes data in accordance with GDPR.
          </p>

          <h2 className="mt-10 type-h3 text-ink">Data retention</h2>
          <p>
            We retain your data for as long as your account is active or as needed to provide our services. You can request deletion of your data at any time by emailing us.
          </p>

          <h2 className="mt-10 type-h3 text-ink">Your rights</h2>
          <p>
            Under GDPR, you have the right to access, correct, delete, or export your personal data. To exercise these rights, contact us at hello@useforma.co.uk.
          </p>

          <h2 className="mt-10 type-h3 text-ink">Cookies</h2>
          <p>
            We use privacy-friendly, cookie-free analytics. We do not use tracking cookies or third-party advertising trackers.
          </p>

          <h2 className="mt-10 type-h3 text-ink">Contact</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a href="mailto:hello@useforma.co.uk" className="font-semibold text-ink underline underline-offset-4 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink">
              hello@useforma.co.uk
            </a>
          </p>
        </div>

        <div className="border-t border-sand mt-12 pt-6">
          <Link href="/" className="type-small text-ink-soft underline underline-offset-4 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink">
            ← Back to Forma
          </Link>
        </div>
      </div>
    </main>
    <SiteFooter />
    </>
  );
}
