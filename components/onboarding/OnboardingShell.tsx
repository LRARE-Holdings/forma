"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StudioDetailsForm from "./StudioDetailsForm";
import ClassBuilder from "./ClassBuilder";
import ThemePicker from "./ThemePicker";
import StripeConnectCard from "./StripeConnectCard";
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

export interface OnboardingData {
  studioName: string;
  location: string;
  studioType: string;
  ownerName: string;
  ownerEmail: string;
  domain: string;
  classes: ClassItem[];
  packs: PackItem[];
  themeMood: string;
  brandColour: string;
  brandNotes: string;
  stripeConnected: boolean;
  planTier: string;
}

const TOTAL_STEPS = 5;

const stepLabels = [
  "Your studio",
  "Your classes",
  "Choose a mood",
  "Payments",
  "Review & launch",
];

export default function OnboardingShell() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutSecret, setCheckoutSecret] = useState("");
  const [stripeIds, setStripeIds] = useState({ customerId: "", subscriptionId: "" });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [data, setData] = useState<OnboardingData>({
    studioName: "",
    location: "",
    studioType: "",
    ownerName: "",
    ownerEmail: "",
    domain: "",
    classes: [{ name: "", price: "", capacity: "" }],
    packs: [],
    themeMood: "",
    brandColour: "",
    brandNotes: "",
    stripeConnected: false,
    planTier: "studio",
  });

  const updateData = (partial: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!data.studioName.trim()) newErrors.studioName = "Studio name is required";
      if (!data.location.trim()) newErrors.location = "Location is required";
      if (!data.studioType) newErrors.studioType = "Studio type is required";
      if (!data.ownerName.trim()) newErrors.ownerName = "Your name is required";
      if (!data.ownerEmail.trim()) {
        newErrors.ownerEmail = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.ownerEmail)) {
        newErrors.ownerEmail = "Please enter a valid email";
      }
    }

    if (step === 2) {
      const hasClass = data.classes.some((c) => c.name.trim());
      if (!hasClass) newErrors.classes = "Add at least one class";
    }

    if (step === 3) {
      if (!data.themeMood) newErrors.themeMood = "Please choose a mood";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setErrors({});
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
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.ownerEmail,
          planTier: data.planTier,
          ownerName: data.ownerName,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to start checkout");
      }

      const { clientSecret, subscriptionId, customerId } = await res.json();
      setCheckoutSecret(clientSecret);
      setStripeIds({ customerId, subscriptionId });
      setShowCheckout(true);
    } catch (err) {
      console.error("Checkout error:", err);
      setErrors({ checkout: err instanceof Error ? err.message : "Failed to start checkout" });
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCheckoutSuccess = async () => {
    try {
      const classesFormatted = data.classes
        .filter((c) => c.name.trim())
        .map((c) => ({
          name: c.name,
          price_pence: Math.round(parseFloat(c.price || "0") * 100),
          capacity: parseInt(c.capacity || "0", 10),
        }));

      const packsFormatted = data.packs
        .filter((p) => p.name.trim())
        .map((p) => ({
          name: p.name,
          price_pence: Math.round(parseFloat(p.price || "0") * 100),
        }));

      await fetch("/api/onboarding/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studioName: data.studioName,
          location: data.location,
          studioType: data.studioType,
          ownerName: data.ownerName,
          ownerEmail: data.ownerEmail,
          domain: data.domain || null,
          classes: classesFormatted,
          packs: packsFormatted,
          themeMood: data.themeMood,
          brandColour: data.brandColour || null,
          brandNotes: data.brandNotes || null,
          stripeConnected: data.stripeConnected,
          stripeCustomerId: stripeIds.customerId,
          stripeSubscriptionId: stripeIds.subscriptionId,
          planTier: data.planTier,
        }),
      });

      router.push("/onboarding/success");
    } catch (err) {
      console.error("Submit error:", err);
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
            style={{ width: showCheckout ? "100%" : `${(step / TOTAL_STEPS) * 100}%` }}
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
          <StudioDetailsForm data={data} onChange={updateData} errors={errors} />
        )}
        {!showCheckout && step === 2 && (
          <ClassBuilder data={data} onChange={updateData} errors={errors} />
        )}
        {!showCheckout && step === 3 && (
          <ThemePicker data={data} onChange={updateData} errors={errors} />
        )}
        {!showCheckout && step === 4 && (
          <StripeConnectCard data={data} onChange={updateData} />
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
