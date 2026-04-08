"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import StudioDetailsForm from "./StudioDetailsForm";
import ClassBuilder from "./ClassBuilder";
import TeamBuilder from "./TeamBuilder";
import ThemePicker from "./ThemePicker";
import SubmissionSummary from "./SubmissionSummary";

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

const stepLabels = [
  "Studio basics",
  "Class setup",
  "Your team",
  "Choose a mood",
  "Review & submit",
];

export default function OnboardingShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read pre-selected tier from query param (e.g. /onboarding?tier=pro)
  const preselectedTier = searchParams.get("tier");
  const refQueryParam = searchParams.get("ref");

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
      ["launch", "studio", "pro", "partner"].includes(preselectedTier)
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

  const updateData = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  /**
   * Save wizard progress incrementally to onboarding_submissions.
   * Creates a new row on first save, then updates it on subsequent saves.
   */
  const saveProgress = useCallback(
    async (currentData: OnboardingData, currentStep: number) => {
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
        }
      } catch (err) {
        console.error("Failed to save progress:", err);
        // Non-fatal — don't block the wizard
      }
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

  const handleSubmitQuote = async () => {
    // Validate owner details on step 5
    if (!data.ownerName.trim()) {
      setErrors({ checkout: "ownerName" });
      return;
    }
    if (
      !data.ownerEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.ownerEmail)
    ) {
      setErrors({ checkout: "ownerEmail" });
      return;
    }

    setSubmitting(true);
    setErrors({});

    // Save final progress
    await saveProgress(data, 5);

    try {
      const res = await fetch("/api/onboarding/request-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          ownerName: data.ownerName,
          ownerEmail: data.ownerEmail,
          ownerPhone: data.ownerPhone,
          planTier: data.planTier,
          notes: data.notes,
          referralCode: data.referralCode || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit");
      }

      router.push("/onboarding/success");
    } catch (err) {
      console.error("Submit error:", err);
      setErrors({
        checkout:
          err instanceof Error ? err.message : "Failed to submit your request",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const goToStep = (s: number) => {
    setStep(s);
  };

  return (
    <div className="min-h-screen bg-parchment">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-parchment/92 backdrop-blur-xl border-b border-espresso/6">
        <div className="max-w-[720px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-[1.15rem] font-black tracking-[-0.04em] text-transparent"
            style={{ WebkitTextStroke: "1.1px #5C3D2E" }}
          >
            forma
          </Link>
          <p className="font-mono text-[0.7rem] tracking-[0.08em] text-fog">
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>
        {/* Progress bar */}
        <div className="h-[3px] bg-sand">
          <div
            className="h-full bg-terracotta transition-all duration-500 ease-out"
            style={{
              width: `${(step / TOTAL_STEPS) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[720px] mx-auto px-6 pt-28 pb-12">
        {/* Step title */}
        <div className="mb-8">
          <p className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-terracotta mb-2">
            Step {step}
          </p>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-normal text-espresso">
            {stepLabels[step - 1]}
          </h1>
        </div>

        {/* Step content */}
        {step === 1 && (
          <StudioDetailsForm
            data={data}
            onChange={updateData}
            errors={errors}
          />
        )}
        {step === 2 && (
          <ClassBuilder data={data} onChange={updateData} errors={errors} />
        )}
        {step === 3 && (
          <TeamBuilder data={data} onChange={updateData} errors={errors} />
        )}
        {step === 4 && (
          <ThemePicker data={data} onChange={updateData} errors={errors} />
        )}
        {step === 5 && (
          <SubmissionSummary
            data={data}
            onChange={updateData}
            onSubmitQuote={handleSubmitQuote}
            onGoToStep={goToStep}
            loading={submitting}
            error={errors.checkout}
          />
        )}

        {/* Navigation buttons (not shown on step 5 — it has its own) */}
        {step < 5 && (
          <div className="flex gap-3 mt-10">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 bg-transparent text-espresso border-[1.5px] border-sand rounded-[10px] text-[0.88rem] font-medium hover:border-clay transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-terracotta text-parchment rounded-[10px] text-[0.88rem] font-semibold hover:bg-burnt hover:scale-[1.02] transition-all ml-auto"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
