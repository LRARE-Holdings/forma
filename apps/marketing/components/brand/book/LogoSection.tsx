import { Download } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { LOCKUP_HORIZONTAL, MARK_PATH, WORDMARK, brand } from "@/config/brand";
import { BookSection, Sub, Tile, Verdict } from "./Book";

const FILES = [
  ["mark.svg", "Mark, single colour (currentColor)"],
  ["wordmark.svg", "Wordmark, single colour"],
  ["lockup-horizontal.svg", "Horizontal lockup, single colour"],
  ["lockup-stacked.svg", "Stacked lockup, single colour"],
  ["lockup-horizontal-on-ink.svg", "Horizontal on ink, with clear space"],
  ["lockup-horizontal-on-lime.svg", "Horizontal on volt, with clear space"],
  ["lockup-horizontal-on-white.svg", "Horizontal on white, with clear space"],
  ["favicon.svg", "Favicon, switches for dark browser chrome"],
  ["favicon.ico", "Favicon fallback, 16/32/48"],
  ["apple-touch-icon.png", "Apple touch icon, 180"],
  ["icon-192.png", "App icon, 192"],
  ["icon-512.png", "App icon, 512"],
  ["og-default.png", "Social share image, 1200×630"],
  ["email-lockup-white.png", "Email header lockup, 2×"],
];

/** The lockup with the misuse applied. Built from the real artwork. */
function Misuse({ kind }: { kind: string }) {
  const h = 32;
  const w = (h * LOCKUP_HORIZONTAL.width) / LOCKUP_HORIZONTAL.height;
  switch (kind) {
    case "stretched":
      return <Logo height={h} className="origin-center scale-x-150 scale-y-75" decorative />;
    case "recoloured":
      return <Logo height={h} className="hue-rotate-180" decorative />;
    case "outlined":
      return (
        <svg viewBox={`0 0 ${LOCKUP_HORIZONTAL.width} ${LOCKUP_HORIZONTAL.height}`} height={h} width={w} aria-hidden>
          <g fill="none" stroke="currentColor" strokeWidth={3} className="text-volt">
            <path
              fillRule="evenodd"
              transform={`translate(${LOCKUP_HORIZONTAL.markX} ${LOCKUP_HORIZONTAL.markY}) scale(${LOCKUP_HORIZONTAL.markSize / 24})`}
              d={MARK_PATH}
              strokeWidth={0.8}
            />
            <path transform={`translate(${LOCKUP_HORIZONTAL.wordmarkX} ${LOCKUP_HORIZONTAL.wordmarkY})`} d={WORDMARK.d} />
          </g>
        </svg>
      );
    case "busy":
      return (
        <div className="grid h-full w-full place-items-center rounded-md bg-[repeating-linear-gradient(135deg,var(--coral)_0_10px,var(--volt)_10px_20px,var(--surface)_20px_30px)] p-4">
          <Logo height={h} decorative />
        </div>
      );
    case "shadow":
      return <Logo height={h} className="drop-shadow-[0_6px_6px_var(--volt)]" decorative />;
    case "rotated":
      return <Logo height={h} className="-rotate-12" decorative />;
    case "retyped":
      return (
        <span className="inline-flex items-center gap-2">
          <Logo variant="mark" height={h} decorative />
          <span className="font-[Georgia,serif] text-[32px] italic">{brand.wordmark}</span>
        </span>
      );
    default:
      return null;
  }
}

const MISUSES = [
  ["stretched", "Stretched or squashed"],
  ["recoloured", "Recoloured outside the palette"],
  ["outlined", "Outlined"],
  ["busy", "On busy imagery or patterns"],
  ["shadow", "With a drop shadow or glow"],
  ["rotated", "Rotated"],
  ["retyped", "Wordmark retyped in another font"],
] as const;

export default function LogoSection() {
  // Clear-space diagram: padding equals the mark's rendered height.
  const lockupH = 48;
  const markPx = (LOCKUP_HORIZONTAL.markSize / LOCKUP_HORIZONTAL.height) * lockupH;
  const minLockupH = (96 * LOCKUP_HORIZONTAL.height) / LOCKUP_HORIZONTAL.width;

  return (
    <BookSection
      id="logo"
      title="Logo"
      intro={
        <p>
          The mark is a class pass with one hole punched through it: booked, counted, yours. It has no letters in it,
          so it stays if the name changes. The wordmark is Bricolage Grotesque ExtraBold, outlined and spaced by hand.
          It is always artwork, never live text.
        </p>
      }
    >
      <Sub title="Lockups">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Tile surface="ink" label="Horizontal · lime tone on ink (default)">
            <Logo height={40} />
          </Tile>
          <Tile surface="volt" label="Horizontal · ink tone on volt">
            <Logo height={40} tone="ink" />
          </Tile>
          <Tile surface="paper" label="Horizontal · ink tone on white">
            <Logo height={40} tone="ink" />
          </Tile>
          <Tile surface="ink" label="Horizontal · white tone on ink">
            <Logo height={40} tone="white" />
          </Tile>
          <Tile surface="ink" label="Stacked · lime tone">
            <Logo variant="stacked" height={96} />
          </Tile>
          <Tile surface="ink" label="Mark and wordmark, separately">
            <span className="flex items-center gap-8">
              <Logo variant="mark" height={48} />
              <Logo variant="wordmark" height={36} />
            </span>
          </Tile>
        </div>
        <p className="max-w-[65ch] text-text-secondary">
          Volt is never used for the logo on white or paper. On light surfaces the whole lockup is ink.
        </p>
      </Sub>

      <div className="grid gap-10 lg:grid-cols-2">
        <Sub title="Clear space" note="Keep a gap the height of the mark on every side. Nothing else goes in it.">
          <Tile surface="surface" label="x = height of the mark">
            <div
              className="relative border border-dashed border-text-muted"
              style={{ padding: markPx }}
            >
              <Logo height={lockupH} decorative />
              {[
                "left-0 top-1/2 -translate-y-1/2",
                "right-0 top-1/2 -translate-y-1/2",
                "top-0 left-1/2 -translate-x-1/2",
                "bottom-0 left-1/2 -translate-x-1/2",
              ].map((pos) => (
                <span
                  key={pos}
                  className={`absolute grid place-items-center bg-coral/25 type-label text-text ${pos}`}
                  style={{ width: markPx, height: markPx }}
                >
                  x
                </span>
              ))}
            </div>
          </Tile>
        </Sub>
        <Sub title="Minimum size" note="Below these sizes the punch closes up or the wordmark loses its spacing.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Tile surface="surface" label="Mark · 16px">
              <Logo variant="mark" height={16} />
            </Tile>
            <Tile surface="surface" label="Horizontal lockup · 96px wide">
              <Logo height={minLockupH} />
            </Tile>
          </div>
        </Sub>
      </div>

      <Sub title="Misuse" note="Each of these breaks the logo. They are drawn from the real artwork so the problem is obvious.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MISUSES.map(([kind, label]) => (
            <figure key={kind} className="m-0 flex flex-col gap-4 rounded-lg bg-surface p-5">
              <div className="flex min-h-24 items-center justify-center overflow-hidden">
                <Misuse kind={kind} />
              </div>
              <figcaption>
                <Verdict ok={false}>{label}</Verdict>
              </figcaption>
            </figure>
          ))}
        </div>
      </Sub>

      <Sub
        title="Files"
        note={
          <>
            Every file is generated from <code>config/brand.ts</code> by <code>pnpm build:logo</code>.
          </>
        }
      >
        <ul className="grid gap-2 sm:grid-cols-2">
          {FILES.map(([file, desc]) => (
            <li key={file}>
              <a
                href={`/brand/logo/${file}`}
                download
                className="flex items-center gap-3 rounded-md border border-border p-3 transition-colors duration-(--dur) ease-brand outline-offset-2 hover:border-text-muted focus-visible:outline-2 focus-visible:outline-volt"
              >
                <Download aria-hidden className="size-5 shrink-0 text-volt" strokeWidth={1.75} />
                <span className="min-w-0">
                  <span className="block truncate font-bold">{file}</span>
                  <span className="block type-small text-text-muted">{desc}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Sub>
    </BookSection>
  );
}
