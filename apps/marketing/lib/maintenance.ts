// Self-contained maintenance page served by middleware.ts with an HTTP 503.
// Kept as a standalone HTML string (no React, no site header) so it never
// links back into the gated site and renders identically on the edge runtime.
// Colours come from styles/tokens.json and the logo from the generated
// geometry, so the page follows the brand without its own copies.
import { brand, LOCKUP_HORIZONTAL, MARK_PATH, WORDMARK } from "@/config/brand";
import tokens from "@/styles/tokens.json";

const c = (name: keyof typeof tokens.color) => tokens.color[name].value;
const L = LOCKUP_HORIZONTAL;

const logo = `<svg viewBox="0 0 ${L.width} ${L.height}" height="28" width="${Math.round((28 * L.width) / L.height)}" role="img" aria-label="${brand.name}">
  <path fill="${c("volt")}" fill-rule="evenodd" transform="translate(${L.markX} ${L.markY}) scale(${L.markSize / 24})" d="${MARK_PATH}"/>
  <path fill="${c("text")}" transform="translate(${L.wordmarkX} ${L.wordmarkY})" d="${WORDMARK.d}"/>
</svg>`;

export const maintenanceHtml = `<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="${c("ink")}" />
    <title>${brand.name} · Back shortly</title>
    <meta name="description" content="${brand.name} is briefly offline while we make some changes. We'll be back shortly." />
    <link rel="icon" href="/brand/logo/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Manrope:wght@400;600&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { color-scheme: dark; }
      body {
        font-family: Manrope, Helvetica, Arial, sans-serif;
        background: ${c("ink")};
        color: ${c("text")};
        -webkit-font-smoothing: antialiased;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 48px;
        padding: 28px 16px 40px;
        line-height: 1.55;
      }
      @media (min-width: 768px) { body { padding: 28px 64px 48px; } }
      main { display: flex; flex-direction: column; gap: 32px; max-width: 1100px; }
      h1 {
        font-family: "Bricolage Grotesque", Helvetica, Arial, sans-serif;
        font-weight: 800;
        font-size: clamp(56px, 3.5rem + 5.6vw, 118px);
        line-height: 0.92;
        letter-spacing: -0.035em;
      }
      h1 span { display: block; color: ${c("volt")}; }
      p { font-size: clamp(18px, 1rem + 0.4vw, 21px); color: ${c("text-secondary")}; max-width: 560px; }
      footer { font-size: 15px; font-weight: 600; color: ${c("text-muted")}; border-top: 1px solid ${c("border")}; padding-top: 24px; }
      footer a { color: ${c("text")}; text-underline-offset: 4px; }
      footer a:hover { color: ${c("volt")}; }
      footer a:focus-visible { outline: 2px solid ${c("volt")}; outline-offset: 2px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <header>${logo}</header>
    <main>
      <h1>We&rsquo;re making some changes. <span>Back shortly.</span></h1>
      <p>${brand.name} is briefly offline while we get the new site ready. Thanks for your patience.</p>
    </main>
    <footer>Need us? <a href="mailto:${brand.email}">${brand.email}</a></footer>
  </body>
</html>`;
