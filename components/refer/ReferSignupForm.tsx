"use client";

import { useState } from "react";

const inputClass =
  "w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] text-espresso placeholder:text-fog focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 focus:outline-none transition-colors";
const labelClass =
  "text-[0.82rem] font-semibold text-espresso mb-1.5 block";

type PayoutMethod = "bank" | "paypal";

export default function ReferSignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [payoutMethod, setPayoutMethod] = useState<PayoutMethod>("bank");
  const [bankName, setBankName] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ code: string; link: string } | null>(
    null
  );
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payoutDetails =
      payoutMethod === "bank"
        ? {
            bank_name: bankName,
            sort_code: sortCode,
            account_number: accountNumber,
          }
        : { paypal_email: paypalEmail };

    if (payoutMethod === "bank" && (!bankName || !sortCode || !accountNumber)) {
      setError("Please complete your bank details.");
      return;
    }
    if (payoutMethod === "paypal" && !paypalEmail) {
      setError("Please enter your PayPal email.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/refer/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          company,
          payoutMethod,
          payoutDetails,
          agreed,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong");
      setResult({ code: json.code, link: json.link });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="bg-linen border border-sand rounded-[16px] p-8 text-center">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-terracotta mb-3">
          You&apos;re in
        </p>
        <h2
          className="text-[1.8rem] text-espresso mb-3"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Welcome to the programme.
        </h2>
        <p className="text-[0.92rem] text-driftwood mb-6">
          Share this link with anyone running a studio. We&apos;ll track every
          signup back to you.
        </p>
        <div className="bg-white border border-sand rounded-[12px] p-4 mb-4">
          <p className="font-mono text-[0.78rem] sm:text-[0.88rem] text-terracotta break-all">
            {result.link}
          </p>
        </div>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(result.link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-block px-6 py-3 bg-terracotta text-parchment rounded-[10px] text-[0.88rem] font-semibold hover:bg-burnt transition-colors"
        >
          {copied ? "Copied ✓" : "Copy link"}
        </button>
        <p className="text-[0.72rem] text-fog mt-6">
          We&apos;ve also emailed your link to{" "}
          <span className="text-driftwood">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-sand rounded-[16px] p-6 sm:p-8 space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputClass}
            placeholder="Sam Mitchell"
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            Phone <span className="font-normal text-fog">(optional)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="07700 900000"
          />
        </div>
        <div>
          <label className={labelClass}>
            Company <span className="font-normal text-fog">(optional)</span>
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
            placeholder="If applicable"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>How should we pay you?</label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {(["bank", "paypal"] as const).map((m) => (
            <button
              type="button"
              key={m}
              onClick={() => setPayoutMethod(m)}
              className={`p-3 rounded-[10px] border-[1.5px] text-[0.85rem] font-semibold transition-all ${
                payoutMethod === m
                  ? "border-terracotta bg-terracotta/[0.04] text-espresso"
                  : "border-sand bg-white text-driftwood hover:border-clay"
              }`}
            >
              {m === "bank" ? "UK bank transfer" : "PayPal"}
            </button>
          ))}
        </div>

        {payoutMethod === "bank" ? (
          <div className="space-y-3">
            <input
              type="text"
              required
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Bank name"
              className={inputClass}
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={sortCode}
                onChange={(e) => setSortCode(e.target.value)}
                placeholder="Sort code"
                className={inputClass}
              />
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Account number"
                className={inputClass}
              />
            </div>
          </div>
        ) : (
          <input
            type="email"
            required
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
            placeholder="PayPal email"
            className={inputClass}
          />
        )}
      </div>

      <label className="flex items-start gap-3 text-[0.82rem] text-driftwood cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          required
          className="mt-1 accent-terracotta"
        />
        <span>
          I agree to refer studios I genuinely think will benefit from Forma,
          and I understand payouts are issued after the studio&apos;s first
          successful subscription payment.
        </span>
      </label>

      {error && (
        <p className="text-[0.82rem] text-amber text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting || !agreed}
        className="w-full py-4 bg-terracotta text-parchment rounded-[10px] text-[0.95rem] font-semibold hover:bg-burnt transition-all disabled:opacity-60"
      >
        {submitting ? "Setting you up..." : "Get my referral link →"}
      </button>
    </form>
  );
}
