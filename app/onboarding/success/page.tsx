import type { Metadata } from "next";
import SuccessScreen from "@/components/onboarding/SuccessScreen";

export const metadata: Metadata = {
  title: "Thanks — Forma",
  description: "We've received your enquiry.",
};

export default function SuccessPage() {
  return <SuccessScreen />;
}
