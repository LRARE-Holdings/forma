import type { Metadata } from "next";
import SuccessScreen from "@/components/onboarding/SuccessScreen";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: `Thanks · ${brand.name}`,
  description: "Payment received. We're setting up your studio.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return <SuccessScreen />;
}
