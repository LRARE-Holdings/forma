import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service — Forma",
  description: "Terms and conditions for using Forma.",
};

export default function TermsPage() {
  return (
    <>
    <SiteHeader />
    <main className="bg-paper text-ink">
      <div className="mx-auto max-w-[720px] px-(--gutter) py-16 md:py-24">

        <h1 className="mb-8 type-h1">
          Terms of Service
        </h1>

        <div className="space-y-6 type-body text-ink-soft">
          <p>Last updated: March 2026</p>

          <h2 className="mt-10 type-h3 text-ink">1. Agreement</h2>
          <p>
            By using Forma (&quot;the Service&quot;), you agree to these terms. If you don&apos;t agree, please don&apos;t use the Service.
          </p>

          <h2 className="mt-10 type-h3 text-ink">2. The Service</h2>
          <p>
            Forma provides website building, class booking, payment processing, and management tools for fitness and wellness studios. We build and host your studio website based on information you provide during onboarding.
          </p>

          <h2 className="mt-10 type-h3 text-ink">3. Plans and billing</h2>
          <p>
            Forma is offered on flat monthly subscription plans, with current pricing shown on our pricing page. Subscriptions are billed monthly in advance via our payment provider, include the member allowance for your chosen plan, and renew automatically until cancelled. You can cancel at any time from your account; cancellation takes effect at the end of the current billing period and you can export your data on the way out. There is no minimum term and no commission taken on your bookings.
          </p>

          <h2 className="mt-10 type-h3 text-ink">4. Your content</h2>
          <p>
            You retain ownership of all content you provide (studio information, class details, branding). By using the Service, you grant us a licence to use this content to build and operate your studio website.
          </p>

          <h2 className="mt-10 type-h3 text-ink">5. Acceptable use</h2>
          <p>
            You agree not to use the Service for any unlawful purpose, to distribute harmful content, or to interfere with the operation of the Service.
          </p>

          <h2 className="mt-10 type-h3 text-ink">6. Availability</h2>
          <p>
            We aim for high availability but cannot guarantee uninterrupted service. We are not liable for temporary downtime due to maintenance, updates, or circumstances beyond our control.
          </p>

          <h2 className="mt-10 type-h3 text-ink">7. Cancellation</h2>
          <p>
            You may cancel your service at any time in accordance with the terms agreed in your engagement. Upon cancellation, your site will be taken offline at the end of the agreed period. You can request an export of your data at any time.
          </p>

          <h2 className="mt-10 type-h3 text-ink">8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Forma shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
          </p>

          <h2 className="mt-10 type-h3 text-ink">9. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. We&apos;ll notify you of significant changes via email. Continued use of the Service after changes constitutes acceptance.
          </p>

          <h2 className="mt-10 type-h3 text-ink">10. Contact</h2>
          <p>
            Questions about these terms? Email us at{" "}
            <a href="mailto:hello@useforma.co.uk" className="font-semibold text-ink underline underline-offset-4 outline-offset-2 focus-visible:outline-2 focus-visible:outline-ink">
              hello@useforma.co.uk
            </a>
          </p>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6">
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
