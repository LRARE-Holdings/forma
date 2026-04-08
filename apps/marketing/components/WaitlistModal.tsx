"use client";

import { useEffect, useState, useRef } from "react";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  source: string;
}

export default function WaitlistModal({
  open,
  onClose,
  source,
}: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setEmail("");
      setStatus("idle");
      setErrorMessage("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-parchment border border-sand rounded-[18px] p-8 max-w-[420px] w-full mx-4 relative animate-[modalIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-fog hover:text-espresso transition-colors rounded-full hover:bg-sand/40"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-serif text-[1.6rem] text-espresso mb-2">
              You&apos;re on the list
            </h3>
            <p className="text-[0.9rem] text-driftwood leading-[1.6]">
              We&apos;ll be in touch soon with early access details. Keep an eye on your inbox.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-serif text-[1.6rem] text-espresso mb-2">
              Get early access
            </h3>
            <p className="text-[0.9rem] text-driftwood leading-[1.6] mb-6">
              Be among the first studios to launch with Forma. We&apos;ll send you a link when your spot is ready.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="you@yourstudio.com"
                className="w-full px-4 py-3 bg-white border border-sand rounded-[10px] text-[0.92rem] text-espresso placeholder:text-fog focus:border-terracotta focus:ring-1 focus:ring-terracotta/20 focus:outline-none transition-colors"
              />
              {status === "error" && errorMessage && (
                <p className="text-[0.78rem] text-amber mt-1.5">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-3 py-3 bg-terracotta text-parchment rounded-[10px] text-[0.9rem] font-semibold hover:bg-burnt hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "loading" ? "Joining..." : "Join the waitlist"}
              </button>
            </form>

            <p className="text-[0.72rem] text-fog text-center mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
