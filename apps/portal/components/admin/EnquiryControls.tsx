"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const STAGES = ["new", "contacted", "qualified", "quoted", "won", "lost"] as const;
const PRIORITIES = ["low", "normal", "high"] as const;

interface Props {
  id: string;
  stage: string;
  priority: string | null;
  lostReason: string | null;
  followUp: string | null;
}

export default function EnquiryControls({
  id,
  stage,
  priority,
  lostReason,
  followUp,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [localStage, setLocalStage] = useState(stage);
  const [localPriority, setLocalPriority] = useState(priority || "normal");
  const [localLostReason, setLocalLostReason] = useState(lostReason || "");
  const [localFollowUp, setLocalFollowUp] = useState(
    followUp ? followUp.slice(0, 10) : ""
  );

  function update(patch: Record<string, unknown>) {
    startTransition(async () => {
      const res = await fetch(`/api/enquiries/${id}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (res.ok) router.refresh();
    });
  }

  return (
    <div className="bg-white border border-sand rounded-[12px] p-5 space-y-4">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fog">
        Manage
      </p>

      <div>
        <label className="text-[0.74rem] font-semibold text-espresso mb-1.5 block">
          Stage
        </label>
        <select
          value={localStage}
          onChange={(e) => {
            setLocalStage(e.target.value);
            update({ crm_stage: e.target.value });
          }}
          disabled={pending}
          className="w-full px-3 py-2 bg-white border border-sand rounded-[8px] text-[0.84rem] capitalize focus:border-terracotta focus:outline-none"
        >
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-[0.74rem] font-semibold text-espresso mb-1.5 block">
          Priority
        </label>
        <select
          value={localPriority}
          onChange={(e) => {
            setLocalPriority(e.target.value);
            update({ crm_priority: e.target.value });
          }}
          disabled={pending}
          className="w-full px-3 py-2 bg-white border border-sand rounded-[8px] text-[0.84rem] capitalize focus:border-terracotta focus:outline-none"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-[0.74rem] font-semibold text-espresso mb-1.5 block">
          Follow-up date
        </label>
        <input
          type="date"
          value={localFollowUp}
          onChange={(e) => setLocalFollowUp(e.target.value)}
          onBlur={() =>
            update({ next_follow_up_at: localFollowUp || null })
          }
          disabled={pending}
          className="w-full px-3 py-2 bg-white border border-sand rounded-[8px] text-[0.84rem] focus:border-terracotta focus:outline-none"
        />
      </div>

      {localStage === "lost" && (
        <div>
          <label className="text-[0.74rem] font-semibold text-espresso mb-1.5 block">
            Lost reason
          </label>
          <input
            type="text"
            value={localLostReason}
            onChange={(e) => setLocalLostReason(e.target.value)}
            onBlur={() => update({ crm_lost_reason: localLostReason || null })}
            disabled={pending}
            placeholder="Why was this lost?"
            className="w-full px-3 py-2 bg-white border border-sand rounded-[8px] text-[0.84rem] focus:border-terracotta focus:outline-none"
          />
        </div>
      )}

      {pending && (
        <p className="text-[0.7rem] text-fog font-mono">Saving…</p>
      )}
    </div>
  );
}
