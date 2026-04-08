"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function MarkPaidButton({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [reference, setReference] = useState("");
  const [pending, startTransition] = useTransition();

  function submit() {
    if (!reference.trim()) return;
    startTransition(async () => {
      const res = await fetch(`/api/referrals/${id}/mark-paid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payoutReference: reference }),
      });
      if (res.ok) {
        setOpen(false);
        router.refresh();
      }
    });
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 bg-terracotta text-parchment rounded-[6px] text-[0.74rem] font-semibold hover:bg-burnt transition-colors"
      >
        Mark paid
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        placeholder="Payout ref"
        autoFocus
        className="px-2 py-1 border border-sand rounded-[6px] text-[0.74rem] focus:border-terracotta focus:outline-none"
      />
      <button
        onClick={submit}
        disabled={pending || !reference.trim()}
        className="px-2 py-1 bg-sage text-parchment rounded-[6px] text-[0.74rem] font-semibold hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "…" : "Save"}
      </button>
      <button
        onClick={() => setOpen(false)}
        className="text-[0.74rem] text-fog hover:text-driftwood"
      >
        Cancel
      </button>
    </div>
  );
}
