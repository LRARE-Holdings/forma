import tokens from "@/styles/tokens.json";
import { AA_BODY, AA_LARGE, contrast, hexToRgb } from "@/lib/contrast";
import { BookSection, Sub, Verdict } from "./Book";

type ColourName = keyof typeof tokens.color;
const hex = (name: string) => tokens.color[name as ColourName].value;

// Lighter swatches need ink labels, darker ones white.
const labelOn = (bg: string) => (contrast(bg, hex("ink")) > contrast(bg, hex("text")) ? hex("ink") : hex("text"));

export default function ColourSection() {
  const usage = [
    { share: 80, label: "Ink and dark neutrals", bg: hex("ink"), border: true },
    { share: 15, label: "White and grey type", bg: hex("text-secondary") },
    { share: 5, label: "Volt", bg: hex("volt") },
  ];

  const dos: { ok: boolean; fg: string; bg: string; text: string }[] = [
    { ok: true, fg: "ink", bg: "volt", text: "Ink text on volt" },
    { ok: true, fg: "volt", bg: "ink", text: "Volt highlight on ink" },
    { ok: false, fg: "volt", bg: "paper", text: "Volt text on white" },
    { ok: false, fg: "text", bg: "volt", text: "White text on volt" },
    { ok: false, fg: "coral", bg: "paper", text: "Coral text on white" },
    { ok: true, fg: "coral", bg: "ink", text: "Coral alert on ink" },
  ];

  return (
    <BookSection
      id="colour"
      title="Colour"
      intro={
        <p>
          Dark is the main brand surface. Volt is loud, and it only works because there&apos;s so little of it: one volt
          call to action per screen. Coral is a second accent for alerts and small highlights.
        </p>
      }
    >
      <Sub title="Palette">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Object.entries(tokens.color).map(([name, { value, use }]) => (
            <li key={name} className="flex flex-col overflow-hidden rounded-lg border border-border">
              <div className="flex h-28 items-end p-4" style={{ background: value, color: labelOn(value) }}>
                <span className="font-display text-[20px] font-bold">{name}</span>
              </div>
              <div className="flex flex-1 flex-col gap-1 bg-surface p-4 type-small">
                <code className="text-text">--{name}</code>
                <span className="tabular-nums text-text-secondary">
                  {value} · rgb({hexToRgb(value)})
                </span>
                <span className="text-text-muted">{use}</span>
              </div>
            </li>
          ))}
        </ul>
      </Sub>

      <Sub
        title="Approved text pairs"
        note={`Ratios are calculated live from tokens.json. Body text needs ${AA_BODY}:1; text 24px and over needs ${AA_LARGE}:1. pnpm check:contrast fails the build if any pair drops below AA.`}
      >
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[640px] border-collapse text-left type-small">
            <thead>
              <tr className="border-b border-border text-text-muted">
                <th className="px-4 py-3 type-label">Sample</th>
                <th className="px-4 py-3 type-label">Text on background</th>
                <th className="px-4 py-3 type-label">Use</th>
                <th className="px-4 py-3 type-label">Ratio</th>
                <th className="px-4 py-3 type-label">AA</th>
              </tr>
            </thead>
            <tbody>
              {tokens.contrastPairs.map(({ fg, bg, use }) => {
                const ratio = contrast(hex(fg), hex(bg));
                return (
                  <tr key={`${fg}-${bg}`} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3">
                      <span
                        className="inline-block rounded-sm px-3 py-1.5 font-bold"
                        style={{ background: hex(bg), color: hex(fg) }}
                      >
                        Book a class
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text">
                      {fg} on {bg}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{use}</td>
                    <td className="px-4 py-3 tabular-nums text-text">{ratio.toFixed(2)}:1</td>
                    <td className="px-4 py-3 text-text-secondary">{ratio >= AA_BODY ? "Pass" : "Fail"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Sub>

      <Sub title="How much of each" note="On a typical marketing page.">
        <div className="flex h-16 overflow-hidden rounded-lg border border-border-strong" role="img" aria-label="80% ink and dark neutrals, 15% white and grey type, 5% volt">
          {usage.map((u) => (
            <div key={u.label} className="h-full" style={{ width: `${u.share}%`, background: u.bg }} />
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-2 type-small text-text-secondary">
          {usage.map((u) => (
            <li key={u.label}>
              <span className="font-bold tabular-nums text-text">{u.share}%</span> {u.label}
            </li>
          ))}
        </ul>
      </Sub>

      <Sub title="Do and don't">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dos.map((d) => (
            <figure key={d.text} className="m-0 flex flex-col gap-4 rounded-lg bg-surface p-5">
              <div
                className="grid h-24 place-items-center rounded-md font-display text-[24px] font-bold"
                style={{ background: hex(d.bg), color: hex(d.fg) }}
              >
                Your money.
              </div>
              <figcaption>
                <Verdict ok={d.ok}>
                  {d.text} · {contrast(hex(d.fg), hex(d.bg)).toFixed(2)}:1
                </Verdict>
              </figcaption>
            </figure>
          ))}
        </div>
      </Sub>
    </BookSection>
  );
}
