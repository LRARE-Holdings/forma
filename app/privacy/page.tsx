import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Forma",
  description: "How Forma handles your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-parchment">
      <div className="max-w-[700px] mx-auto px-6 md:px-12 py-12">
        <Link
          href="/"
          className="inline-block text-[1.15rem] font-black tracking-[-0.04em] text-transparent mb-12"
          style={{ WebkitTextStroke: "1.1px #5C3D2E" }}
        >
          forma
        </Link>

        <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-normal text-espresso mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-[0.9rem] text-driftwood leading-[1.75]">
          <p>Last updated: March 2026</p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">Who we are</h2>
          <p>
            Forma (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website useforma.co.uk and provides studio website building, booking, and payment services for fitness studios across the UK.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">What data we collect</h2>
          <p>When you sign up or use our services, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name and email address</li>
            <li>Studio name, location, and type</li>
            <li>Class and pricing information you provide</li>
            <li>Payment information (processed securely by Stripe)</li>
            <li>Usage data and analytics (cookie-free, via privacy-friendly tools)</li>
          </ul>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">How we use your data</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Build and manage your studio website</li>
            <li>Process payments and subscriptions</li>
            <li>Send transactional emails (confirmations, updates)</li>
            <li>Improve our services</li>
          </ul>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">Third-party services</h2>
          <p>
            We use Stripe for payment processing, Supabase for data storage, Resend for email delivery, and Vercel for hosting. Each provider has their own privacy policy and processes data in accordance with GDPR.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">Data retention</h2>
          <p>
            We retain your data for as long as your account is active or as needed to provide our services. You can request deletion of your data at any time by emailing us.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">Your rights</h2>
          <p>
            Under GDPR, you have the right to access, correct, delete, or export your personal data. To exercise these rights, contact us at hello@useforma.co.uk.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">Cookies</h2>
          <p>
            We use privacy-friendly, cookie-free analytics. We do not use tracking cookies or third-party advertising trackers.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">Contact</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a href="mailto:hello@useforma.co.uk" className="text-terracotta hover:text-burnt transition-colors">
              hello@useforma.co.uk
            </a>
          </p>
        </div>

        <div className="border-t border-sand mt-12 pt-6">
          <Link href="/" className="text-[0.78rem] text-fog hover:text-driftwood transition-colors">
            ← Back to Forma
          </Link>
        </div>
      </div>
    </main>
  );
}
