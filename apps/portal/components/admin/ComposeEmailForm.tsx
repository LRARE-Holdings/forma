"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { EmailTemplate } from "@/lib/email-templates";

interface Props {
  submissionId: string;
  templates: EmailTemplate[];
  tokens: Record<string, string>;
}

function applyTokens(text: string, tokens: Record<string, string>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => tokens[key] ?? `{{${key}}}`);
}

export default function ComposeEmailForm({
  submissionId,
  templates,
  tokens,
}: Props) {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function loadTemplate(id: string) {
    const t = templates.find((x) => x.id === id);
    if (!t) return;
    setSubject(applyTokens(t.subject, tokens));
    setBody(applyTokens(t.body, tokens));
  }

  function send() {
    if (!subject.trim() || !body.trim()) {
      setError("Subject and body are required.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const res = await fetch(`/api/enquiries/${submissionId}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });
      if (res.ok) {
        router.push(`/enquiries/${submissionId}`);
        router.refresh();
      } else {
        const json = await res.json().catch(() => ({}));
        setError(json.error || "Send failed");
      }
    });
  }

  return (
    <div className="bg-white border border-sand rounded-[14px] p-6 space-y-4">
      <div>
        <label className="text-[0.74rem] font-semibold text-espresso mb-1.5 block">
          Use template
        </label>
        <select
          onChange={(e) => e.target.value && loadTemplate(e.target.value)}
          defaultValue=""
          className="px-3 py-2 bg-white border border-sand rounded-[8px] text-[0.84rem] focus:border-terracotta focus:outline-none"
        >
          <option value="">Start from blank</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-[0.74rem] font-semibold text-espresso mb-1.5 block">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 bg-white border border-sand rounded-[8px] text-[0.88rem] focus:border-terracotta focus:outline-none"
        />
      </div>

      <div>
        <label className="text-[0.74rem] font-semibold text-espresso mb-1.5 block">
          Message
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={14}
          className="w-full px-3 py-2 bg-white border border-sand rounded-[8px] text-[0.86rem] focus:border-terracotta focus:outline-none resize-y font-sans leading-relaxed"
        />
      </div>

      {error && <p className="text-[0.82rem] text-amber">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={send}
          disabled={pending || !subject.trim() || !body.trim()}
          className="px-5 py-2.5 bg-terracotta text-parchment rounded-[8px] text-[0.86rem] font-semibold hover:bg-burnt disabled:opacity-50 transition-colors"
        >
          {pending ? "Sending…" : "Send email"}
        </button>
      </div>
    </div>
  );
}
