import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import tokens from "@/styles/tokens.json";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.name,
    description: brand.description,
    start_url: "/",
    display: "browser",
    background_color: tokens.color.ink.value,
    theme_color: tokens.color.ink.value,
    icons: [
      { src: "/brand/logo/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/logo/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/logo/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
