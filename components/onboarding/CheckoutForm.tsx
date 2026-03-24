"use client";

import { useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const tierInfo: Record<string, { name: string; price: string }> = {
  launch: { name: "Launch", price: "69" },
  studio: { name: "Studio", price: "89" },
  pro: { name: "Pro", price: "119" },
  partner: { name: "Partner", price: "159" },
};

function CheckoutFormInner({
  planTier,
  onSuccess,
  onBack,
}: {
  planTier: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tier = tierInfo[planTier] || tierInfo.studio;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");

    const { error: confirmError } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/onboarding/success`,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message ?? "Payment setup failed. Please try again.");
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="font-serif text-[1.8rem] text-espresso mb-2">
          Almost there
        </h2>
        <p className="text-[0.88rem] text-driftwood">
          Add your payment details to start your free trial.
        </p>
      </div>

      {/* Order summary */}
      <div className="bg-linen border border-sand rounded-[14px] p-5 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[0.85rem] font-bold text-espresso">
              Forma {tier.name}
            </p>
            <p className="text-[0.78rem] text-driftwood">Monthly subscription</p>
          </div>
          <div className="text-right">
            <p className="font-serif text-[1.5rem] text-espresso">
              £{tier.price}<span className="font-sans text-[0.75rem] text-driftwood">/mo</span>
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-sand">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sage/10 text-sage text-[0.72rem] font-medium rounded-full">
            14-day free trial
          </span>
        </div>
      </div>

      {/* Stripe form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-sand rounded-[14px] p-5 mb-4">
          <PaymentElement
            options={{
              layout: "tabs",
            }}
          />
        </div>

        {error && (
          <p className="text-[0.82rem] text-amber mb-4 text-center">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3.5 bg-transparent text-espresso border-[1.5px] border-sand rounded-[10px] text-[0.88rem] font-medium hover:border-clay transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="flex-1 py-3.5 bg-terracotta text-parchment rounded-[10px] text-[0.9rem] font-semibold hover:bg-burnt hover:scale-[1.01] transition-all disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? "Processing..." : "Start free trial"}
          </button>
        </div>

        <p className="text-[0.72rem] text-fog text-center mt-4">
          Your card won&apos;t be charged for 14 days. Cancel anytime.
        </p>
      </form>
    </div>
  );
}

export default function CheckoutForm({
  clientSecret,
  planTier,
  onSuccess,
  onBack,
}: {
  clientSecret: string;
  planTier: string;
  onSuccess: () => void;
  onBack: () => void;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#C2714F",
            colorBackground: "#FFFCF9",
            colorText: "#2C1810",
            colorDanger: "#D97706",
            borderRadius: "10px",
            fontFamily: "Satoshi, -apple-system, sans-serif",
            spacingUnit: "4px",
          },
          rules: {
            ".Input": {
              border: "1px solid #E8DDD1",
              boxShadow: "none",
            },
            ".Input:focus": {
              border: "1px solid #C2714F",
              boxShadow: "0 0 0 1px rgba(194, 113, 79, 0.2)",
            },
            ".Label": {
              fontSize: "0.82rem",
              fontWeight: "600",
              color: "#2C1810",
            },
          },
        },
      }}
    >
      <CheckoutFormInner
        planTier={planTier}
        onSuccess={onSuccess}
        onBack={onBack}
      />
    </Elements>
  );
}
