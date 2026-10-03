import { render } from "@react-email/render";
import { brand } from "../config/brand";
import { BrandLayout, EmailButton, EmailHeading, EmailText } from "./components/BrandLayout";

/** Sent to the owner when Stripe confirms their subscription. */
export function PaymentReceivedEmail({
  ownerName,
  studioName,
  planName,
}: {
  ownerName: string;
  studioName: string;
  planName: string;
}) {
  const first = ownerName.trim().split(/\s+/)[0] || "there";
  return (
    <BrandLayout preview={`Payment received. We're setting up ${studioName}.`}>
      <EmailHeading>You&apos;re in.</EmailHeading>
      <EmailText>Hi {first},</EmailText>
      <EmailText>
        Your {planName} plan is active and we&apos;re setting up {studioName} now. We&apos;ll email you again when it&apos;s
        ready to log in to.
      </EmailText>
      <EmailText>
        There are no setup fees, no contract and no commission on your bookings. You can cancel anytime.
      </EmailText>
      <EmailText>Questions in the meantime? Just reply to this email.</EmailText>
    </BrandLayout>
  );
}

/** Sent to someone who joins the email list. */
export function WaitlistEmail() {
  return (
    <BrandLayout preview="You're on the list">
      <EmailHeading>You&apos;re on the list.</EmailHeading>
      <EmailText>
        Thanks for signing up. {brand.name} gives independent studios booking, payments, a website and emails at one flat
        monthly price, with zero commission.
      </EmailText>
      <EmailText>We&apos;ll be in touch with news. If you&apos;re ready to start now, you can pick a plan today.</EmailText>
      <EmailButton href={`${brand.url}/pricing`}>See plans</EmailButton>
    </BrandLayout>
  );
}

export const renderEmail = (element: React.ReactElement) => render(element);

/** Plain-text-ish HTML for internal notifications. Escapes everything. */
export function adminHtml(title: string, rows: [string, unknown][]) {
  const esc = (v: unknown) =>
    String(v ?? "—")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  return `<h2>${esc(title)}</h2>${rows
    .map(([k, v]) => `<p><strong>${esc(k)}:</strong> ${esc(typeof v === "object" && v ? JSON.stringify(v) : v)}</p>`)
    .join("")}`;
}
