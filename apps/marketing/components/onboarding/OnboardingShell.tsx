"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StudioDetailsForm from "./StudioDetailsForm";
import ClassBuilder from "./ClassBuilder";
import TeamBuilder from "./TeamBuilder";
import ThemePicker from "./ThemePicker";
import SubmissionSummary from "./SubmissionSummary";
import { isTierId } from "@/lib/pricing";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { brand } from "@/config/brand";

export interface ClassItem {
  name: string;
  price: string;
  capacity: string;
}

export interface PackItem {
  name: string;
  price: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface OnboardingData {
  studioName: string;
  location: string;
  studioType: string;
  domain: string;
  classes: ClassItem[];
  packs: PackItem[];
  team: TeamMember[];
  themeMood: string;
  brandColour: string;
  brandNotes: string;
  planTier: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  notes: string;
  referralCode: string;
}

const TOTAL_STEPS = 5;
const DRAFT_KEY = "onboarding-draft";

const stepLabels = [
  "Studio basics",
  "Class setup",
  "Your team",
  "Choose a mood",
  "Review & pay",
];

export default function OnboardingShell() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read pre-selected tier from query param (e.g. /onboarding?tier=studio)
  const preselectedTier = searchParams.get("tier");
  const refQueryParam = searchParams.get("ref");
  // Set when the owner backs out of Stripe Checkout.
  const cancelled = searchParams.get("cancelled") === "1";

  const [data, setData] = useState<OnboardingData>({
    studioName: "",
    location: "",
    studioType: "",
    domain: "",
    classes: [{ name: "", price: "", capacity: "" }],
    packs: [],
    team: [],
    themeMood: "",
    brandColour: "",
    brandNotes: "",
    planTier: preselectedTier || "studio",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    notes: "",
    referralCode: "",
  });

  // Set preselected tier on mount if provided
  useEffect(() => {
    if (
      preselectedTier &&
      isTierId(preselectedTier)
    ) {
      setData((prev) => ({ ...prev, planTier: preselectedTier }));
    }
  }, [preselectedTier]);

  // Capture referral code from ?ref=<code> or forma_ref cookie. Query param wins.
  useEffect(() => {
    if (typeof document === "undefined") return;
    let code = refQueryParam || "";
    if (!code) {
      const match = document.cookie.match(/(?:^|;\s*)forma_ref=([^;]+)/);
      if (match) code = decodeURIComponent(match[1]);
    }
    if (code) {
      setData((prev) =>
        prev.referralCode ? prev : { ...prev, referralCode: code }
      );
    }
  }, [refQueryParam]);

  // Keep the draft for this tab so leaving for Stripe and coming back (or a
  // refresh) doesn't lose what the owner typed. Storage can be unavailable
  // (private mode, blocked), in which case the wizard just starts fresh.
  const restoredRef = useRef(false);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as { data: OnboardingData; step: number; submissionId: string | null };
        setData((prev) => ({ ...prev, ...draft.data, ...(isTierId(preselectedTier) ? { planTier: preselectedTier } : {}) }));
        setSubmissionId(draft.submissionId);
        setStep(cancelled ? TOTAL_STEPS : draft.step);
      }
    } catch {
      // ignore
    }
    restoredRef.current = true;
    // Restore once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!restoredRef.current) return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ data, step, submissionId }));
    } catch {
      // ignore
    }
  }, [data, step, submissionId]);

  const updateData = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  /**
   * Save wizard progress incrementally to onboarding_submissions.
   * Creates a new row on first save, then updates it on subsequent saves.
   */
  const saveProgress = useCallback(
    async (currentData: OnboardingData, currentStep: number): Promise<string | null> => {
      const classesFormatted = currentData.classes
        .filter((c) => c.name.trim())
        .map((c) => ({
          name: c.name,
          price_pence: Math.round(parseFloat(c.price || "0") * 100),
          capacity: parseInt(c.capacity || "0", 10),
        }));

      const packsFormatted = currentData.packs
        .filter((p) => p.name.trim())
        .map((p) => ({
          name: p.name,
          price_pence: Math.round(parseFloat(p.price || "0") * 100),
        }));

      const payload = {
        submissionId: submissionId,
        studioName: currentData.studioName || null,
        location: currentData.location || null,
        studioType: currentData.studioType || null,
        domain: currentData.domain || null,
        classes: classesFormatted.length > 0 ? classesFormatted : null,
        packs: packsFormatted.length > 0 ? packsFormatted : null,
        team:
          currentData.team.length > 0
            ? currentData.team.filter((m) => m.name.trim())
            : null,
        themeMood: currentData.themeMood || null,
        brandColour: currentData.brandColour || null,
        brandNotes: currentData.brandNotes || null,
        planTier: currentData.planTier || "studio",
        ownerName: currentData.ownerName || null,
        ownerEmail: currentData.ownerEmail || null,
        ownerPhone: currentData.ownerPhone || null,
        notes: currentData.notes || null,
        referralCode: currentData.referralCode || null,
        currentStep: currentStep,
        status: "in_progress",
      };

      try {
        const res = await fetch("/api/onboarding/save-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const result = await res.json();
          if (result.submissionId && !submissionId) {
            setSubmissionId(result.submissionId);
          }
          return result.submissionId ?? submissionId;
        }
      } catch (err) {
        console.error("Failed to save progress:", err);
        // Non-fatal — don't block the wizard
      }
      return submissionId;
    },
    [submissionId]
  );

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!data.studioName.trim())
        newErrors.studioName = "Studio name is required";
      if (!data.location.trim()) newErrors.location = "Location is required";
      if (!data.studioType) newErrors.studioType = "Studio type is required";
    }

    if (step === 2) {
      const hasClass = data.classes.some((c) => c.name.trim());
      if (!hasClass) newErrors.classes = "Add at least one class";
    }

    // Step 3 (Team) has no required fields — it's optional

    if (step === 4) {
      if (!data.themeMood) newErrors.themeMood = "Please choose a mood";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setErrors({});

    // Debounced save progress
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveProgress(data, step + 1);
    }, 300);

    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const handleBack = () => {
    setErrors({});
    if (step > 1) setStep(step - 1);
  };

  const handleCheckout = async () => {
    // Validate owner details on step 5
    if (!data.ownerName.trim()) {
      setErrors({ checkout: "ownerName" });
      return;
    }
    if (!data.ownerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.ownerEmail)) {
      setErrors({ checkout: "ownerEmail" });
      return;
    }

    setSubmitting(true);
    setErrors({});

    // Save final progress, and use the id it returns rather than state that
    // may not have updated yet.
    const id = await saveProgress(data, 5);

    try {
      const res = await fetch("/api/checkout/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: id,
          ownerName: data.ownerName,
          ownerEmail: data.ownerEmail,
          ownerPhone: data.ownerPhone,
          planTier: data.planTier,
          notes: data.notes,
          referralCode: data.referralCode || null,
        }),
      });

      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.url) {
        throw new Error(result.error || "We couldn't start checkout. Please try again.");
      }

      window.location.assign(result.url);
    } catch (err) {
      console.error("Checkout error:", err);
      setErrors({
        checkout: err instanceof Error ? err.message : "We couldn't start checkout. Please try again.",
      });
      setSubmitting(false);
    }
  };

  const goToStep = (s: number) => {
    setStep(s);
  };

  return (
    <div className="min-h-dvh bg-ink text-text">
      {/* Top bar */}
      <div className="sticky top-0 z-50 border-b border-border bg-ink">
        <div className="mx-auto flex h-16 max-w-[760px] items-center justify-between px-(--gutter) md:h-20">
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="rounded-sm outline-offset-4 focus-visible:outline-2 focus-visible:outline-volt"
          >
            <Logo height={24} decorative />
          </Link>
          <p className="type-small tabular-nums text-text-muted">
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>
        <div
          className="h-1 bg-border"
          role="progressbar"
          aria-label="Setup progress"
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-valuenow={step}
        >
          <div
            className="h-full bg-volt transition-[width] duration-(--dur) ease-brand"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-[760px] px-(--gutter) pt-12 pb-16 md:pt-16">
        <div className="mb-10 flex flex-col gap-3">
          <p className="type-label text-volt">Step {step}</p>
          <h1 className="type-h1">{stepLabels[step - 1]}</h1>
        </div>

        {step === 1 && <StudioDetailsForm data={data} onChange={updateData} errors={errors} />}
        {step === 2 && <ClassBuilder data={data} onChange={updateData} errors={errors} />}
        {step === 3 && <TeamBuilder data={data} onChange={updateData} errors={errors} />}
        {step === 4 && <ThemePicker data={data} onChange={updateData} errors={errors} />}
        {step === 5 && (
          <SubmissionSummary
            data={data}
            onChange={updateData}
            onCheckout={handleCheckout}
            cancelled={cancelled}
            onGoToStep={goToStep}
            loading={submitting}
            error={errors.checkout}
          />
        )}

        {/* Navigation buttons (not shown on step 5 — it has its own) */}
        {step < 5 && (
          <div className="mt-12 flex gap-3 border-t border-border pt-8">
            {step > 1 && (
              <Button variant="secondary" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button onClick={handleNext} className="ml-auto">
              Continue
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
