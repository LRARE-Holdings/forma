import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forma — Your studio, made online",
  description:
    "We design and build custom websites, booking, and payments for independent Pilates, yoga, and fitness studios. Built once, yours to keep.",
  openGraph: {
    title: "Forma — Your studio, made online",
    description:
      "Custom websites and booking suites for independent UK studios. Built once, yours to keep.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Satoshi from Fontshare */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
