"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface Note {
  id: string;
  kind: string;
  body: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

const KIND_LABEL: Record<string, string> = {
  note: "Note",
  call: "Call",
  email_sent: "Email sent",
  stage_change: "Stage changed",
  system: "System",
};

export default function NotesTimeline({
  submissionId,
  notes,
}: {
  submissionId: string;
  notes: Note[];
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [pending, startTransition] = useTransition();

  function addNote(kind: "note" | "call") {
    if (!body.trim()) return;
    startTransition(async () => {
      const res = await fetch(`/api/enquiries/${submissionId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, body }),
      });
      if (res.ok) {
        setBody("");
        router.refresh();
      }
    });
  }

  return (
    <div>
      <div className="mb-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a note…"
          rows={3}
          className="w-full px-3 py-2 bg-white border border-sand rounded-[8px] text-[0.84rem] focus:border-terracotta focus:outline-none resize-none"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => addNote("note")}
            disabled={pending || !body.trim()}
            className="px-3 py-1.5 bg-terracotta text-parchment rounded-[6px] text-[0.74rem] font-semibold hover:bg-burnt disabled:opacity-50 transition-colors"
          >
            Add note
          </button>
          <button
            onClick={() => addNote("call")}
            disabled={pending || !body.trim()}
            className="px-3 py-1.5 bg-white border border-sand text-driftwood rounded-[6px] text-[0.74rem] font-semibold hover:border-clay disabled:opacity-50 transition-colors"
          >
            Log call
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-[480px] overflow-y-auto">
        {notes.length === 0 && (
          <p className="text-[0.78rem] text-fog">No notes yet.</p>
        )}
        {notes.map((n) => (
          <div
            key={n.id}
            className="border-l-2 border-sand pl-3 pb-2 text-[0.82rem]"
          >
            <div className="flex items-center gap-2 text-[0.7rem] text-fog font-mono mb-1">
              <span className="uppercase tracking-[0.06em]">
                {KIND_LABEL[n.kind] || n.kind}
              </span>
              <span>·</span>
              <span>{new Date(n.created_at).toLocaleString("en-GB")}</span>
            </div>
            <p className="text-espresso whitespace-pre-wrap">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
