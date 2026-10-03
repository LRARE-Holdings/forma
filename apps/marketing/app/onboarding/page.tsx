import type { Metadata } from "next";
import { Suspense } from "react";
import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: `Start your studio · ${brand.name}`,
  description: "Set up your studio and choose your plan in a few minutes.",
};

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingShell />
    </Suspense>
  );
}
