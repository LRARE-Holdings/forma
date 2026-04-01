import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Forma",
  description: "Terms and conditions for using Forma.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="space-y-6 text-[0.9rem] text-driftwood leading-[1.75]">
          <p>Last updated: March 2026</p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">1. Agreement</h2>
          <p>
            By using Forma (&quot;the Service&quot;), you agree to these terms. If you don&apos;t agree, please don&apos;t use the Service.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">2. The Service</h2>
          <p>
            Forma provides website building, class booking, payment processing, and management tools for fitness and wellness studios. We build and host your studio website based on information you provide during onboarding.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">3. Pricing and engagement</h2>
          <p>
            Forma offers custom pricing tailored to each studio&apos;s needs. After submitting your details through our onboarding form, we&apos;ll discuss your requirements and provide a personalised quote. Billing details and payment terms are agreed upon individually before any work begins.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">4. Your content</h2>
          <p>
            You retain ownership of all content you provide (studio information, class details, branding). By using the Service, you grant us a licence to use this content to build and operate your studio website.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">5. Acceptable use</h2>
          <p>
            You agree not to use the Service for any unlawful purpose, to distribute harmful content, or to interfere with the operation of the Service.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">6. Availability</h2>
          <p>
            We aim for high availability but cannot guarantee uninterrupted service. We are not liable for temporary downtime due to maintenance, updates, or circumstances beyond our control.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">7. Cancellation</h2>
          <p>
            You may cancel your service at any time in accordance with the terms agreed in your engagement. Upon cancellation, your site will be taken offline at the end of the agreed period. You can request an export of your data at any time.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Forma shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">9. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. We&apos;ll notify you of significant changes via email. Continued use of the Service after changes constitutes acceptance.
          </p>

          <h2 className="text-[1.1rem] font-semibold text-espresso mt-8">10. Contact</h2>
          <p>
            Questions about these terms? Email us at{" "}
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
