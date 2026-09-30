import type { Metadata } from "next";
import { Suspense } from "react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";

export const metadata: Metadata = {
  title: "Start your studio — Forma",
  description: "Set up your studio and choose your plan in a few minutes.",
};

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingShell />
    </Suspense>
  );
}
