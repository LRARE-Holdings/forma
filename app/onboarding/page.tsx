import type { Metadata } from "next";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

export const metadata: Metadata = {
  title: "Get started with Forma",
  description: "Set up your studio site in 5 minutes.",
};

export default function OnboardingPage() {
  return <OnboardingShell />;
}
