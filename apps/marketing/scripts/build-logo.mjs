/**
 * Builds every logo asset from config/brand.ts.
 *
 *   pnpm --filter @forma/marketing build:logo
 *
 * On a rename: change `wordmark` (and `name`) in config/brand.ts, run this,
 * check public/brand/logo/, commit. The wordmark is outlined from Bricolage
 * Grotesque ExtraBold so no logo ships as live text. The mark has no
 * letterforms and is unaffected.
 *
 * Writes:
 *   public/brand/logo/*.svg, *.png, favicon.ico
 *   config/brand-logo.generated.ts (geometry for components/brand/Logo.tsx)
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import sharp from "sharp";
import { brand, wordmarkKerning } from "../config/brand.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public/brand/logo");
mkdirSync(out, { recursive: true });

const tokens = JSON.parse(readFileSync(join(root, "styles/tokens.json"), "utf8")).color;
const INK = tokens.ink.value;
const VOLT = tokens.volt.value;
const WHITE = tokens.text.value;

const loadFont = (file) => {
  const buf = readFileSync(join(root, "assets/fonts", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
// opsz 30 matches the size the wordmark was approved at in the mockup nav;
// opsz 96 is the display cut used for large headlines (OG image).
const wordmarkFont = loadFont("BricolageGrotesque-opsz30-800.ttf");
const displayFont = loadFont("BricolageGrotesque-opsz96-800.ttf");

const r = (n) => Math.round(n * 100) / 100;

/** Outline `text` at `size` with em-based tracking. Baseline at y = 0. */
function outline(font, text, size, tracking, kerning = {}) {
  const scale = size / font.unitsPerEm;
  const glyphs = font.stringToGlyphs(text);
  const path = new opentype.Path();
  let x = 0;
  glyphs.forEach((g, i) => {
    path.extend(g.getPath(x, 0, size));
    const next = glyphs[i + 1];
    if (!next) return;
    x += g.advanceWidth * scale;
    x += font.getKerningValue(g, next) * scale;
    x += tracking * size;
    x += (kerning[text[i] + text[i + 1]] ?? 0) * size;
  });
  const box = path.getBoundingBox();
  return { d: path.toPathData(2), x1: box.x1, y1: box.y1, x2: box.x2, y2: box.y2 };
}

/** Shift absolute path data by (dx, dy). opentype emits only M/L/Q/C/Z. */
function translate(d, dx, dy) {
  return d.replace(/([MLQCZ])([^MLQCZ]*)/g, (_, cmd, args) => {
    const nums = (args.match(/-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi) ?? []).map(Number);
    const moved = nums.map((n, i) => r(i % 2 === 0 ? n + dx : n + dy));
    return cmd + moved.join(" ");
  });
}

// ── Mark (Concept A, "Punch"): a class pass with one hole punched ──────────
// 24-unit grid; corner radius 7 matches the UI radius language.
const MARK_D =
  "M7 0H17A7 7 0 0 1 24 7V17A7 7 0 0 1 17 24H7A7 7 0 0 1 0 17V7A7 7 0 0 1 7 0Z" +
  "M16.5 4.25A3.25 3.25 0 1 0 16.5 10.75A3.25 3.25 0 1 0 16.5 4.25Z";
const markPath = (x, y, size, fill = "currentColor") => {
  const s = size / 24;
  return `<path fill="${fill}" fill-rule="evenodd" transform="translate(${r(x)} ${r(y)}) scale(${r(s * 1000) / 1000})" d="${MARK_D}"/>`;
};

// ── Wordmark ────────────────────────────────────────────────────────────────
// Set at 100 units, tracking −0.03em, then trimmed to its ink bounds.
const WM_SIZE = 100;
const wm = outline(wordmarkFont, brand.wordmark, WM_SIZE, -0.03, wordmarkKerning);
const wmW = r(wm.x2 - wm.x1);
const wmH = r(wm.y2 - wm.y1);
const wmD = translate(wm.d, -wm.x1, -wm.y1);
const baseline = r(-wm.y1); // distance from wordmark top to baseline

// Lockup proportions from the approved mockup: 26px mark beside 30px type,
// 10px gap, mark centred on the line box.
const markSize = r(WM_SIZE * (26 / 30));
const gap = r(WM_SIZE * (10 / 30));
const asc = (wordmarkFont.tables.hhea.ascender / wordmarkFont.unitsPerEm) * WM_SIZE;
const desc = (wordmarkFont.tables.hhea.descender / wordmarkFont.unitsPerEm) * WM_SIZE;
const lineCentre = -(asc + desc) / 2; // relative to baseline (y up is negative)

// Horizontal lockup geometry (origin top-left).
const hTop = Math.min(lineCentre - markSize / 2, wm.y1);
const hBottom = Math.max(lineCentre + markSize / 2, wm.y2);
const H = {
  width: r(markSize + gap + wmW),
  height: r(hBottom - hTop),
  markX: 0,
  markY: r(lineCentre - markSize / 2 - hTop),
  wmX: r(markSize + gap),
  wmY: r(wm.y1 - hTop),
};

// Stacked lockup: mark centred above the wordmark.
const sMark = r(wmH * 1.3);
const sGap = r(sMark * 0.3);
const S = {
  width: r(Math.max(wmW, sMark)),
  height: r(sMark + sGap + wmH),
  markX: r((Math.max(wmW, sMark) - sMark) / 2),
  markY: 0,
  wmX: r((Math.max(wmW, sMark) - wmW) / 2),
  wmY: r(sMark + sGap),
};

const svg = (w, h, body, extra = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(w)} ${r(h)}" width="${r(w)}" height="${r(h)}"${extra}>` +
  `<title>${brand.name}</title>${body}</svg>\n`;

const wordmarkBody = (x, y, fill = "currentColor") =>
  `<path fill="${fill}" transform="translate(${r(x)} ${r(y)})" d="${wmD}"/>`;

const horizontalBody = (markFill, wmFill, ox = 0, oy = 0) =>
  markPath(ox + H.markX, oy + H.markY, markSize, markFill) + wordmarkBody(ox + H.wmX, oy + H.wmY, wmFill);

const files = {};
files["mark.svg"] = svg(24, 24, `<path fill="currentColor" fill-rule="evenodd" d="${MARK_D}"/>`);
files["wordmark.svg"] = svg(wmW, wmH, wordmarkBody(0, 0));
files["lockup-horizontal.svg"] = svg(H.width, H.height, horizontalBody("currentColor", "currentColor"));
files["lockup-stacked.svg"] = svg(
  S.width,
  S.height,
  markPath(S.markX, S.markY, sMark) + wordmarkBody(S.wmX, S.wmY),
);

// Colour variants carry the clear-space rule: one mark-height on every side.
const pad = markSize;
const onBg = (bg, markFill, wmFill) =>
  svg(
    H.width + pad * 2,
    H.height + pad * 2,
    `<rect width="100%" height="100%" fill="${bg}"/>` + horizontalBody(markFill, wmFill, pad, pad),
  );
files["lockup-horizontal-on-ink.svg"] = onBg(INK, VOLT, WHITE);
files["lockup-horizontal-on-lime.svg"] = onBg(VOLT, INK, INK);
files["lockup-horizontal-on-white.svg"] = onBg(WHITE, INK, INK);

// Favicon: ink on light browser chrome, volt on dark (volt on a light tab
// is almost invisible).
files["favicon.svg"] =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">` +
  `<style>path{fill:${INK}}@media (prefers-color-scheme:dark){path{fill:${VOLT}}}</style>` +
  `<path fill-rule="evenodd" d="${MARK_D}"/></svg>\n`;

for (const [name, content] of Object.entries(files)) writeFileSync(join(out, name), content);

// ── Raster assets ───────────────────────────────────────────────────────────
const png = (svgString, size) => sharp(Buffer.from(svgString)).resize(size, size).png().toBuffer();

// App icons: volt mark on an ink square (platforms add their own rounding;
// mark kept inside the 80% maskable safe zone).
const appIcon = (size) => {
  const m = size * 0.56;
  const o = (size - m) / 2;
  return svg(size, size, `<rect width="${size}" height="${size}" fill="${INK}"/>` + markPath(o, o, m, VOLT));
};
writeFileSync(join(out, "apple-touch-icon.png"), await png(appIcon(180), 180));
writeFileSync(join(out, "icon-192.png"), await png(appIcon(192), 192));
writeFileSync(join(out, "icon-512.png"), await png(appIcon(512), 512));

// Email header lockup: white on transparent PNG at 2× (email clients
// don't render SVG). Displayed at 28px tall.
{
  const h = 56;
  const w = Math.round((H.width / H.height) * h);
  writeFileSync(
    join(out, "email-lockup-white.png"),
    await sharp(Buffer.from(svg(H.width, H.height, horizontalBody(WHITE, WHITE)))).resize(w, h).png().toBuffer(),
  );
}

// favicon.ico for browsers without SVG favicon support: ink mark, since
// light tab strips are the common case there.
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((s) => png(svg(24, 24, `<path fill="${INK}" fill-rule="evenodd" d="${MARK_D}"/>`), s)),
);
{
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(icoSizes.length, 4);
  let offset = 6 + 16 * icoSizes.length;
  const entries = icoSizes.map((s, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(s, 0);
    e.writeUInt8(s, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(icoPngs[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += icoPngs[i].length;
    return e;
  });
  writeFileSync(join(out, "favicon.ico"), Buffer.concat([header, ...entries, ...icoPngs]));
}

// OG image: ink ground, lockup, the big idea with the last line in volt.
{
  const W = 1200;
  const Hh = 630;
  const P = 80;
  const lockScale = 52 / H.height;
  const lines = brand.bigIdea.split(/(?<=\.)\s+/);
  const size = 124;
  const leading = size * 0.92;
  // Tighter than −0.025em makes the 800 display cut collide at this size.
  const heads = lines.map((line) => outline(displayFont, line, size, -0.025));
  const lastBaseline = Hh - P;
  const body = [
    `<rect width="${W}" height="${Hh}" fill="${INK}"/>`,
    `<g transform="translate(${P} ${P}) scale(${r(lockScale * 1000) / 1000})">${horizontalBody(VOLT, WHITE)}</g>`,
    ...heads.map((h, i) => {
      const y = lastBaseline - (lines.length - 1 - i) * leading;
      const fill = i === lines.length - 1 ? VOLT : WHITE;
      return `<path fill="${fill}" d="${translate(h.d, P - h.x1, y)}"/>`;
    }),
  ].join("");
  writeFileSync(
    join(out, "og-default.png"),
    await sharp(Buffer.from(svg(W, Hh, body))).png().toBuffer(),
  );
}

// ── Geometry for the React component ────────────────────────────────────────
writeFileSync(
  join(root, "config/brand-logo.generated.ts"),
  `// Generated by scripts/build-logo.mjs from config/brand.ts. Do not edit.
export const MARK_PATH = ${JSON.stringify(MARK_D)};
export const WORDMARK = { width: ${wmW}, height: ${wmH}, baseline: ${baseline}, d: ${JSON.stringify(wmD)} } as const;
export const LOCKUP_HORIZONTAL = { width: ${H.width}, height: ${H.height}, markSize: ${markSize}, markX: ${H.markX}, markY: ${H.markY}, wordmarkX: ${H.wmX}, wordmarkY: ${H.wmY} } as const;
export const LOCKUP_STACKED = { width: ${S.width}, height: ${S.height}, markSize: ${sMark}, markX: ${S.markX}, markY: ${S.markY}, wordmarkX: ${S.wmX}, wordmarkY: ${S.wmY} } as const;
`,
);

console.log(`Built ${Object.keys(files).length + 6} logo files for "${brand.wordmark}" in public/brand/logo/`);
