"use client";

import { useEffect } from "react";

/** Drops the wizard draft once checkout has succeeded. */
export default function ClearDraft() {
  useEffect(() => {
    try {
      sessionStorage.removeItem("onboarding-draft");
    } catch {
      // Storage unavailable; nothing to clear.
    }
  }, []);
  return null;
}
