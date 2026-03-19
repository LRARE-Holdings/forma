"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import StudioDetailsForm from "./StudioDetailsForm";
import ClassBuilder from "./ClassBuilder";
import TeamBuilder from "./TeamBuilder";
import ThemePicker from "./ThemePicker";
import SubmissionSummary from "./SubmissionSummary";
import CheckoutForm from "./CheckoutForm";

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
}

const TOTAL_STEPS = 5;

const stepLabels = [
  "Studio basics",
  "Class setup",
  "Your team",
  "Choose a mood",
  "Plan & pay",
];

export default function OnboardingShell() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutSecret, setCheckoutSecret] = useState("");
  const [stripeIds, setStripeIds] = useState({
    customerId: "",
    subscriptionId: "",
  });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read pre-selected tier from query param (e.g. /onboarding?tier=pro)
  const preselectedTier = searchParams.get("tier");

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
    if (showCheckout) {
      setShowCheckout(false);
      return;
    }
    if (step > 1) setStep(step - 1);
  };

  const handleLaunch = async () => {
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

    setCheckoutLoading(true);
    setErrors({});

    // Save final progress before creating subscription
    await saveProgress(data, 5);

    try {
      const res = await fetch("/api/checkout/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.ownerEmail,
          planTier: data.planTier,
          ownerName: data.ownerName,
          submissionId: submissionId,
          studioName: data.studioName,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to start checkout");
      }

      const {
        clientSecret,
        subscriptionId: subId,
        customerId,
      } = await res.json();
      setCheckoutSecret(clientSecret);
      setStripeIds({ customerId, subscriptionId: subId });
      setShowCheckout(true);
    } catch (err) {
      console.error("Checkout error:", err);
      setErrors({
        checkout:
          err instanceof Error ? err.message : "Failed to start checkout",
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCheckoutSuccess = async () => {
    try {
      // Update the submission with Stripe IDs and final status
      if (submissionId) {
        await fetch("/api/onboarding/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submissionId,
            stripeCustomerId: stripeIds.customerId,
            stripeSubscriptionId: stripeIds.subscriptionId,
          }),
        });
      }

      router.push("/onboarding/success");
    } catch (err) {
      console.error("Submit error:", err);
      // Still redirect — the webhook will handle provisioning
      router.push("/onboarding/success");
    }
  };

  const goToStep = (s: number) => {
    setShowCheckout(false);
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
            {showCheckout ? "Payment" : `Step ${step} of ${TOTAL_STEPS}`}
          </p>
        </div>
        {/* Progress bar */}
        <div className="h-[3px] bg-sand">
          <div
            className="h-full bg-terracotta transition-all duration-500 ease-out"
            style={{
              width: showCheckout
                ? "100%"
                : `${(step / TOTAL_STEPS) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[720px] mx-auto px-6 pt-28 pb-12">
        {/* Step title */}
        {!showCheckout && (
          <div className="mb-8">
            <p className="font-mono text-[0.68rem] tracking-[0.12em] uppercase text-terracotta mb-2">
              Step {step}
            </p>
            <h1 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] font-normal text-espresso">
              {stepLabels[step - 1]}
            </h1>
          </div>
        )}

        {/* Step content */}
        {!showCheckout && step === 1 && (
          <StudioDetailsForm
            data={data}
            onChange={updateData}
            errors={errors}
          />
        )}
        {!showCheckout && step === 2 && (
          <ClassBuilder data={data} onChange={updateData} errors={errors} />
        )}
        {!showCheckout && step === 3 && (
          <TeamBuilder data={data} onChange={updateData} errors={errors} />
        )}
        {!showCheckout && step === 4 && (
          <ThemePicker data={data} onChange={updateData} errors={errors} />
        )}
        {!showCheckout && step === 5 && (
          <SubmissionSummary
            data={data}
            onChange={updateData}
            onLaunch={handleLaunch}
            onGoToStep={goToStep}
            loading={checkoutLoading}
            error={errors.checkout}
          />
        )}

        {showCheckout && checkoutSecret && (
          <CheckoutForm
            clientSecret={checkoutSecret}
            planTier={data.planTier}
            onSuccess={handleCheckoutSuccess}
            onBack={handleBack}
          />
        )}

        {/* Navigation buttons (not shown on step 5 or checkout — they have their own) */}
        {!showCheckout && step < 5 && (
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
