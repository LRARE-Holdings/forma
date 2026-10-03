/**
 * Fails (exit 1) if any approved text/background pair in styles/tokens.json
 * is below WCAG AA (4.5:1 body text), if a forbidden pair is accidentally
 * listed as approved, or if tokens.css and tokens.json disagree on a colour.
 *
 *   pnpm --filter @forma/marketing check:contrast
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AA_BODY, contrast } from "../lib/contrast.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "styles/tokens.json"), "utf8")) as {
  color: Record<string, { value: string }>;
  contrastPairs: { fg: string; bg: string; use: string }[];
  forbiddenPairs: { fg: string; bg: string }[];
};
const css = readFileSync(join(root, "styles/tokens.css"), "utf8");

const failures: string[] = [];
const hex = (name: string) => {
  const token = tokens.color[name];
  if (!token) throw new Error(`Unknown colour token "${name}"`);
  return token.value;
};

for (const [name, { value }] of Object.entries(tokens.color)) {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) failures.push(`--${name} missing from tokens.css`);
  else if (match[1].toLowerCase() !== value.toLowerCase())
    failures.push(`--${name} is ${match[1]} in tokens.css but ${value} in tokens.json`);
}

for (const { fg, bg, use } of tokens.contrastPairs) {
  const ratio = contrast(hex(fg), hex(bg));
  const ok = ratio >= AA_BODY;
  console.log(`${ok ? "pass" : "FAIL"}  ${ratio.toFixed(2).padStart(5)}:1  ${fg} on ${bg}  (${use})`);
  if (!ok) failures.push(`${fg} on ${bg} is ${ratio.toFixed(2)}:1, needs ${AA_BODY}:1`);
}

for (const { fg, bg } of tokens.forbiddenPairs) {
  if (tokens.contrastPairs.some((p) => p.fg === fg && p.bg === bg))
    failures.push(`${fg} on ${bg} is forbidden but listed as an approved pair`);
}

if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log("\nAll approved pairs meet WCAG AA.");
