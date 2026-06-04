// Self-contained maintenance page served by middleware.ts with an HTTP 503.
// Kept as a standalone HTML string (no React/Navbar/Footer) so it never links
// back into the gated site and renders identically on the edge runtime.
// Satoshi only, brand tokens inlined to match app/globals.css.
export const maintenanceHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Forma — back shortly</title>
    <meta
      name="description"
      content="Forma is briefly offline for maintenance. We'll be back shortly."
    />
    <link rel="preconnect" href="https://api.fontshare.com" crossorigin="anonymous" />
    <link
      href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --parchment: #fffcf9;
        --terracotta: #c2714f;
        --espresso: #2c1810;
        --bark: #5c3d2e;
        --driftwood: #8b7265;
        --sans: "Satoshi", -apple-system, BlinkMacSystemFont, sans-serif;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { height: 100%; }
      body {
        font-family: var(--sans);
        background-color: var(--parchment);
        color: var(--espresso);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        line-height: 1.6;
      }
      .wrap {
        max-width: 540px;
        text-align: center;
        animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      .wordmark {
        font-weight: 900;
        font-size: 1.05rem;
        letter-spacing: -0.02em;
        color: var(--espresso);
      }
      .label {
        font-weight: 500;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.22em;
        color: var(--terracotta);
        margin-top: 2.5rem;
      }
      h1 {
        font-weight: 900;
        font-size: clamp(2.25rem, 7vw, 3.5rem);
        line-height: 1.05;
        letter-spacing: -0.03em;
        margin: 1rem 0 0;
      }
      h1 span { color: var(--terracotta); }
      p {
        font-weight: 400;
        font-size: 1.05rem;
        color: var(--bark);
        max-width: 30rem;
        margin: 1.75rem auto 0;
      }
      .rule {
        width: 40px;
        height: 1px;
        background: var(--terracotta);
        margin: 2.5rem auto;
        opacity: 0.5;
      }
      .contact {
        font-weight: 500;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--driftwood);
      }
      .contact a {
        color: var(--espresso);
        text-decoration: none;
        border-bottom: 1px solid rgba(44, 24, 16, 0.25);
        padding-bottom: 1px;
        transition: border-color 0.2s ease;
      }
      .contact a:hover { border-color: var(--terracotta); }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  </head>
  <body>
    <main class="wrap">
      <div class="wordmark">forma</div>
      <div class="label">Back shortly</div>
      <h1>We&rsquo;re making <span>a few changes.</span></h1>
      <p>
        Forma is briefly offline while we tidy things up. We&rsquo;ll be back
        soon &mdash; thanks for your patience.
      </p>
      <div class="rule"></div>
      <div class="contact">
        Need us? <a href="mailto:hello@useforma.co.uk">hello@useforma.co.uk</a>
      </div>
    </main>
  </body>
</html>`;
