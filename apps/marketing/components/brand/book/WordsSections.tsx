import { brand } from "@/config/brand";
import { BigIdea } from "@/components/marketing/HomeHero";
import { BookSection, Sub, Verdict } from "./Book";

export function IntroSection() {
  return (
    <BookSection
      id="intro"
      title="Who we are"
      intro={
        <p>
          Studio management for independent Pilates, yoga and fitness studios: website, booking, Stripe payments,
          automated emails, timetable, waitlists and reporting. Built for owner-run studios, not gyms or chains.
        </p>
      }
    >
      <div className="rounded-lg bg-surface p-6 md:p-10">
        <p className="mb-6 type-label text-text-muted">The big idea</p>
        <BigIdea as="p" size="l" />
        <p className="mt-6 max-w-[60ch] type-body-l text-text-secondary">
          The owner keeps everything. We charge a flat monthly fee, never a percentage of what your members pay.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Personality", "The confident challenger, on the studio owner's side against the big platforms that take a cut."],
          ["Up against", "Mindbody, TeamUp, and Squarespace with a booking widget bolted on."],
          ["The difference", "One flat monthly price. No setup fees, no contracts, no commission."],
        ].map(([t, d]) => (
          <div key={t} className="flex flex-col gap-2 rounded-lg border border-border p-5">
            <h3 className="type-label text-volt">{t}</h3>
            <p className="text-text-secondary">{d}</p>
          </div>
        ))}
      </div>
    </BookSection>
  );
}

const PAIRS = [
  ["Zero commission.", "Transparent pricing."],
  ["Your members pay you. We never take a cut.", "Unlock seamless revenue for your business."],
  ["Add your timetable, then share one booking link.", "A revolutionary, game-changing scheduling experience."],
  ["Your studio", "The user's organisation"],
  ["Mindbody: [SOURCED FACT]. Us: no commission, no contract.", "Unlike those other clunky legacy platforms…"],
];

const BANNED = ["revolutionary", "game-changing", "seamless", "unlock", "empower", "supercharge", "next-level", "cutting-edge", "best-in-class", "synergy"];

export function VoiceSection() {
  return (
    <BookSection
      id="voice"
      title="Voice and copy"
      intro={<p>Owner to owner. Short, direct and specific. Say exactly what we do and what it costs.</p>}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Sub title="Rules">
          <ul className="flex list-disc flex-col gap-2 pl-5 text-text-secondary marker:text-volt">
            <li>Punchy headlines, plain body copy.</li>
            <li>“You” and “your studio”, never “users” or “customers”.</li>
            <li>Specific beats vague: “zero commission” beats “transparent pricing”.</li>
            <li>Name competitors in comparisons, factually and without sneering.</li>
            <li>No invented statistics, testimonials or results. Use [PLACEHOLDER] until we have the real thing.</li>
            <li>No emoji in the product or in marketing.</li>
          </ul>
        </Sub>
        <Sub title="British English">
          <p className="text-text-secondary">
            Colour, organise, enrol, programme, cancelled, £. Dates as 30 September 2026. Times as 18:30.
          </p>
          <div className="flex flex-col gap-2">
            <p className="type-label text-text-muted">Words we don&apos;t use</p>
            <ul className="flex flex-wrap gap-2">
              {BANNED.map((w) => (
                <li key={w} className="rounded-pill border border-border-strong px-3 py-1 type-small text-text-secondary line-through decoration-coral">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Sub>
      </div>

      <Sub title="Do and don't">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <tbody>
              {PAIRS.map(([good, bad]) => (
                <tr key={good} className="border-b border-border last:border-b-0">
                  <td className="w-1/2 px-5 py-4 align-top">
                    <Verdict ok>{good}</Verdict>
                  </td>
                  <td className="w-1/2 px-5 py-4 align-top">
                    <Verdict ok={false}>{bad}</Verdict>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sub>

      <Sub title="Reference lines">
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="rounded-lg bg-surface p-5">
            <p className="type-label text-text-muted">Hero</p>
            <p className="mt-2 type-h2">{brand.bigIdea}</p>
          </li>
          <li className="rounded-lg bg-surface p-5">
            <p className="type-label text-text-muted">Sub</p>
            <p className="mt-2 text-text-secondary">{brand.description}</p>
          </li>
        </ul>
      </Sub>
    </BookSection>
  );
}

export function RenameSection() {
  return (
    <BookSection
      id="rename"
      title="Rename note"
      intro={<p>Internal. The name is likely to change. The identity is built so that a rename touches as little as possible.</p>}
    >
      <ol className="flex max-w-[70ch] list-decimal flex-col gap-3 pl-5 text-text-secondary marker:font-bold marker:text-text">
        <li>
          Change <code className="text-text">name</code>, <code className="text-text">wordmark</code>,{" "}
          <code className="text-text">domain</code>, <code className="text-text">url</code> and{" "}
          <code className="text-text">email</code> in <code className="text-text">config/brand.ts</code>.
        </li>
        <li>
          Re-tune <code className="text-text">wordmarkKerning</code> for the new letter pairs, then run{" "}
          <code className="text-text">pnpm build:logo</code>. It regenerates the wordmark, every lockup, the favicons, the
          OG image and the email header.
        </li>
        <li>The mark has no letters in it and doesn&apos;t change.</li>
        <li>
          Outside the logo, search for the old name in page copy, metadata and legal pages. Those are written in prose
          and need a human edit.
        </li>
        <li>Update the sending domain in Resend and the Supabase auth sender (auth@) with the new domain.</li>
      </ol>
    </BookSection>
  );
}
