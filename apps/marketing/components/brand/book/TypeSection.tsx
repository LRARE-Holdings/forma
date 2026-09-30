import tokens from "@/styles/tokens.json";
import { BookSection, Sub } from "./Book";

const SAMPLE: Record<string, string> = {
  "display-xl": "Your money.",
  "display-l": "Zero commission.",
  h1: "Run your studio, not your software",
  h2: "Every booking, paid up front",
  h3: "Waitlists that fill themselves",
  "body-l": "Booking, payments, website and emails for independent studios, at one flat price.",
  body: "Members book and pay on your site. The money goes straight to your Stripe account, and we never take a cut.",
  small: "Cancel anytime. Export your members whenever you like.",
  label: "Next class · 18:30 Reformer",
};

const fmt = (v: number | number[]) => (Array.isArray(v) ? `${v[0]}–${v[1]}` : `${v}`);

export function TypeSection() {
  return (
    <BookSection
      id="type"
      title="Typography"
      intro={
        <p>
          Two families. Bricolage Grotesque does the shouting: headlines, prices, the wordmark. Manrope does the
          talking: body copy, labels and the product UI. Nothing else is loaded.
        </p>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-6 rounded-lg bg-surface p-6">
          <p className="type-label text-text-muted">Display · Bricolage Grotesque 700, 800</p>
          <p className="font-display text-[120px] font-extrabold leading-[0.9] tracking-[-0.04em]">Aa</p>
          <p className="font-display text-[28px] font-bold leading-tight break-all">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz £0123456789
          </p>
          <div className="flex flex-wrap gap-6 font-display text-[32px] leading-none">
            <span className="font-bold">Bold 700</span>
            <span className="font-extrabold">ExtraBold 800</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-6 rounded-lg bg-surface p-6">
          <p className="type-label text-text-muted">Body and UI · Manrope 400–700</p>
          <p className="font-sans text-[120px] font-semibold leading-[0.9] tracking-[-0.03em]">Aa</p>
          <p className="font-sans text-[22px] leading-snug break-all">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz £0123456789
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[20px]">
            <span className="font-normal">Regular 400</span>
            <span className="font-medium">Medium 500</span>
            <span className="font-semibold">SemiBold 600</span>
            <span className="font-bold">Bold 700</span>
          </div>
        </div>
      </div>

      <Sub
        title="Scale"
        note="Rendered with the same type-* utilities the site uses. Display sizes scale fluidly between the mobile and desktop values."
      >
        <ul className="flex flex-col">
          {Object.entries(tokens.type).map(([key, t]) => (
            <li
              key={key}
              className="grid gap-3 border-b border-border py-6 last:border-b-0 md:grid-cols-[200px_1fr] md:gap-8"
            >
              <div className="flex flex-col gap-1 type-small text-text-muted">
                <code className="font-bold text-text">type-{key}</code>
                <span className="tabular-nums">
                  {fmt(t.size)}px / {fmt(t.lineHeight)}
                </span>
                <span>
                  {t.family === "display" ? "Bricolage" : "Manrope"} {t.weight} · {t.tracking}
                </span>
              </div>
              <p className={`type-${key} min-w-0 break-words`}>{SAMPLE[key]}</p>
            </li>
          ))}
        </ul>
      </Sub>

      <Sub title="Pairing">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg bg-surface p-6">
            <p className="type-label text-volt">Pricing</p>
            <p className="type-h2">One price. No percentage.</p>
            <p className="type-body text-text-secondary">
              Pick a plan by the size of your studio. The price stays the same every month, and you keep every pound
              your members pay.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-lg bg-paper p-6 text-ink">
            <p className="type-label text-ink-soft">Long-form, light surface</p>
            <p className="type-h2">Moving from Mindbody</p>
            <p className="type-body text-ink-soft">
              What moving across involves, step by step: [MIGRATION DETAILS]
            </p>
          </div>
        </div>
      </Sub>
    </BookSection>
  );
}

export function SpaceSection() {
  return (
    <BookSection
      id="space"
      title="Spacing, radius, grid"
      intro={<p>A 4px base. Borders instead of shadows. Corners taken from one scale, shared by the logo mark.</p>}
    >
      <Sub title="Spacing scale">
        <ul className="flex flex-col gap-2">
          {tokens.space.map((s) => (
            <li key={s} className="grid grid-cols-[48px_1fr] items-center gap-4">
              <span className="type-small tabular-nums text-text-muted">{s}</span>
              <span className="block h-4 rounded-[2px] bg-volt" style={{ width: s }} />
            </li>
          ))}
        </ul>
      </Sub>

      <Sub title="Radius">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Object.entries(tokens.radius).map(([k, v]) => (
            <div key={k} className="flex flex-col gap-3">
              <div
                className="grid h-24 place-items-center border-2 border-volt bg-surface type-small text-text-secondary"
                style={{ borderRadius: v }}
              >
                {k === "sm" ? "Inputs, chips" : k === "md" ? "Buttons" : k === "lg" ? "Cards" : "Status chips"}
              </div>
              <p className="type-small">
                <code className="font-bold">--r-{k}</code> <span className="tabular-nums text-text-muted">{v}px</span>
              </p>
            </div>
          ))}
        </div>
      </Sub>

      <Sub
        title="Grid"
        note={`Content up to ${tokens.layout.contentMax}px wide, ${tokens.layout.columns} columns, ${tokens.layout.gutterDesktop}px side gutters on desktop and ${tokens.layout.gutterMobile}px on mobile.`}
      >
        <div className="grid grid-cols-6 gap-2 rounded-lg border border-border p-4 md:grid-cols-12 md:gap-4">
          {Array.from({ length: tokens.layout.columns }, (_, i) => (
            <div
              key={i}
              className={`h-24 rounded-sm bg-coral/20 ${i >= 6 ? "hidden md:block" : ""}`}
              aria-hidden
            />
          ))}
        </div>
      </Sub>

      <Sub title="Motion" note={`${tokens.motion.fast}–${tokens.motion.base}, ${tokens.motion.ease}. Everything is instant when the visitor has asked for reduced motion.`}>
        <p className="type-small text-text-secondary">
          Hover the buttons in Components to see it. Nothing on the site animates on its own.
        </p>
      </Sub>
    </BookSection>
  );
}
