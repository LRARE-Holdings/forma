import type { Metadata } from "next";
import SuccessScreen from "@/components/onboarding/SuccessScreen";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: `Thanks · ${brand.name}`,
  description: "We've received your enquiry.",
};

export default function SuccessPage() {
  return <SuccessScreen />;
}
