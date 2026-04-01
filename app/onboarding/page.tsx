import type { Metadata } from "next";
import { Suspense } from "react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

export const metadata: Metadata = {
  title: "Get a quote — Forma",
  description: "Tell us about your studio and we'll send you a personalised quote.",
};

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingShell />
    </Suspense>
  );
}
