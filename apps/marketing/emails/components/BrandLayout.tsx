import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { brand } from "../../config/brand";
import tokens from "../../styles/tokens.json";

// Email clients ignore CSS variables and rarely load webfonts, so colours
// come from tokens.json as literals and Manrope falls back to web-safe faces.
const c = Object.fromEntries(Object.entries(tokens.color).map(([k, v]) => [k, v.value])) as Record<
  keyof typeof tokens.color,
  string
>;
const FONT = "Manrope, Helvetica, Arial, sans-serif";

/**
 * Base layout for every transactional email: ink header band with the white
 * lockup, white body, volt CTA with ink text.
 */
export function BrandLayout({ preview, children }: { preview: string; children: ReactNode }) {
  return (
    <Html lang="en-GB">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={{ margin: 0, backgroundColor: c["paper-2"], fontFamily: FONT, color: c.ink }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "24px 0" }}>
          <Section style={{ backgroundColor: c.ink, padding: "24px 32px", borderRadius: "20px 20px 0 0" }}>
            <Img
              src={`${brand.url}/brand/logo/email-lockup-white.png`}
              alt={brand.name}
              height={28}
              style={{ height: 28, width: "auto", display: "block" }}
            />
          </Section>
          <Section style={{ backgroundColor: c.paper, padding: "32px", borderRadius: "0 0 20px 20px" }}>
            {children}
          </Section>
          <Text style={{ fontSize: 13, lineHeight: "20px", color: c["ink-soft"], textAlign: "center", margin: "24px 0 0" }}>
            {brand.name} · Booking, payments, website and emails for independent studios
            <br />
            <Link href={brand.url} style={{ color: c["ink-soft"] }}>
              {brand.domain}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailHeading({ children }: { children: ReactNode }) {
  return (
    <Text style={{ fontFamily: FONT, fontSize: 28, lineHeight: "32px", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px", color: c.ink }}>
      {children}
    </Text>
  );
}

export function EmailText({ children }: { children: ReactNode }) {
  return <Text style={{ fontFamily: FONT, fontSize: 16, lineHeight: "25px", margin: "0 0 16px", color: c.ink }}>{children}</Text>;
}

export function EmailButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button
      href={href}
      style={{
        backgroundColor: c.volt,
        color: c.ink,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 16,
        padding: "16px 24px",
        borderRadius: 12,
        display: "inline-block",
      }}
    >
      {children}
    </Button>
  );
}

/** Sample email used by the brand book. Placeholder copy only. */
export function SampleWelcomeEmail() {
  return (
    <BrandLayout preview="Your studio is being set up">
      <EmailHeading>Your studio is being set up.</EmailHeading>
      <EmailText>Hi [FIRST NAME],</EmailText>
      <EmailText>
        Thanks for choosing {brand.name}. We&apos;re setting up [STUDIO NAME] now. You&apos;ll get your login in a
        separate email within [SETUP TIME].
      </EmailText>
      <EmailButton href={brand.url}>Open your dashboard</EmailButton>
    </BrandLayout>
  );
}
