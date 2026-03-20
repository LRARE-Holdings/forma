import type { Metadata } from "next";
import { Suspense } from "react";
import SuccessScreen from "@/components/onboarding/SuccessScreen";

export const metadata: Metadata = {
  title: "You're in — Forma",
  description: "Your studio site is being built.",
};

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessScreen />
    </Suspense>
  );
}
