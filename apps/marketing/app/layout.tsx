import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { brand } from "@/config/brand";
import tokens from "@/styles/tokens.json";
import "./globals.css";

// The only two brand typefaces, loaded as variable fonts (one file each;
// the brand uses Bricolage 700–800 with optical sizing, Manrope 400–700).
// Exposed as CSS variables consumed by styles/tokens.css.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: `${brand.name} · ${brand.bigIdea}`,
  description: brand.description,
  openGraph: {
    title: `${brand.name} · ${brand.bigIdea}`,
    description: brand.description,
    type: "website",
    siteName: brand.name,
    locale: "en_GB",
    images: [{ url: "/brand/logo/og-default.png", width: 1200, height: 630, alt: brand.bigIdea }],
  },
  twitter: { card: "summary_large_image", images: ["/brand/logo/og-default.png"] },
  icons: {
    icon: [
      { url: "/brand/logo/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/logo/favicon.ico", sizes: "16x16 32x32 48x48" },
    ],
    apple: "/brand/logo/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = { themeColor: tokens.color.ink.value };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${bricolage.variable} ${manrope.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
