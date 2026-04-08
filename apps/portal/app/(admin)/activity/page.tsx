import { createServerClient } from "@forma/db";

export const dynamic = "force-dynamic";

interface Event {
  kind: string;
  subject_id: string;
  title: string | null;
  body: string | null;
  occurred_at: string;
}

const KIND_META: Record<string, { label: string; color: string }> = {
  enquiry_created: { label: "New enquiry", color: "bg-terracotta" },
  note_note: { label: "Note", color: "bg-driftwood" },
  note_call: { label: "Call logged", color: "bg-bark" },
  note_email_sent: { label: "Email sent", color: "bg-sage" },
  note_stage_change: { label: "Stage changed", color: "bg-amber" },
  note_system: { label: "System", color: "bg-fog" },
  referrer_joined: { label: "Referrer joined", color: "bg-terracotta" },
  referral_payable: { label: "Referral payable", color: "bg-amber" },
  referral_paid: { label: "Referral paid", color: "bg-sage" },
};

export default async function ActivityPage() {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("crm_activity")
    .select("*")
    .order("occurred_at", { ascending: false })
    .limit(200);

  const events: Event[] = (data as Event[]) || [];

  return (
    <div className="max-w-[820px]">
      <div className="mb-6">
        <h1
          className="text-[2rem] text-espresso mb-1"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Activity
        </h1>
        <p className="text-[0.88rem] text-driftwood">
          Last {events.length} events across the pipeline
        </p>
      </div>

      <div className="bg-white border border-sand rounded-[14px] p-6">
        {events.length === 0 && (
          <p className="text-[0.84rem] text-fog text-center py-12">
            Nothing has happened yet.
          </p>
        )}
        <div className="space-y-4">
          {events.map((e, i) => {
            const meta = KIND_META[e.kind] || {
              label: e.kind,
              color: "bg-fog",
            };
            return (
              <div key={`${e.kind}-${e.subject_id}-${i}`} className="flex gap-3">
                <div
                  className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${meta.color}`}
                />
                <div className="flex-1 border-b border-sand pb-4 last:border-0">
                  <div className="flex items-baseline justify-between gap-3 mb-0.5">
                    <p className="text-[0.84rem] text-espresso">
                      <span className="font-semibold">{meta.label}</span>
                      {e.title && <span className="text-driftwood"> · {e.title}</span>}
                    </p>
                    <p className="font-mono text-[0.7rem] text-fog whitespace-nowrap">
                      {new Date(e.occurred_at).toLocaleString("en-GB")}
                    </p>
                  </div>
                  {e.body && (
                    <p className="text-[0.8rem] text-driftwood whitespace-pre-wrap mt-1">
                      {e.body}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
