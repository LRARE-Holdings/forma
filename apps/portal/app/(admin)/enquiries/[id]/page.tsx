import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerClient } from "@forma/db";
import StageBadge from "@/components/admin/StageBadge";
import EnquiryControls from "@/components/admin/EnquiryControls";
import NotesTimeline from "@/components/admin/NotesTimeline";

export const dynamic = "force-dynamic";

interface ClassRow {
  name: string;
  price_pence: number;
  capacity: number;
}

interface TeamMember {
  name: string;
  role: string;
}

export default async function EnquiryDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerClient();

  const [submissionRes, notesRes] = await Promise.all([
    supabase.from("onboarding_submissions").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("crm_notes")
      .select("*")
      .eq("submission_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (!submissionRes.data) notFound();
  const s = submissionRes.data;
  const notes = notesRes.data || [];

  const classes: ClassRow[] = Array.isArray(s.classes) ? s.classes : [];
  const team: TeamMember[] = Array.isArray(s.team) ? s.team : [];

  return (
    <div className="max-w-[1100px]">
      <Link
        href="/pipeline"
        className="text-[0.78rem] text-driftwood hover:text-espresso"
      >
        ← Back to pipeline
      </Link>

      <div className="mt-4 mb-6 flex items-start justify-between gap-6">
        <div>
          <h1
            className="text-[2.2rem] text-espresso mb-2 leading-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {s.studio_name}
          </h1>
          <div className="flex items-center gap-3 text-[0.84rem] text-driftwood">
            <StageBadge stage={s.crm_stage} />
            <span>·</span>
            <span>{s.location || "Location not given"}</span>
            <span>·</span>
            <span className="capitalize">{s.studio_type || "—"}</span>
          </div>
        </div>
        <Link
          href={`/enquiries/${id}/compose`}
          className="px-4 py-2.5 bg-terracotta text-parchment rounded-[10px] text-[0.82rem] font-semibold hover:bg-burnt transition-colors"
        >
          Compose email
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: submission data */}
        <div className="col-span-2 space-y-4">
          <Card title="Owner">
            <Field label="Name" value={s.owner_name} />
            <Field label="Email" value={s.owner_email} mono />
            <Field label="Phone" value={s.owner_phone} mono />
            <Field label="Notes" value={s.notes} />
          </Card>

          <Card title="Classes">
            {classes.length === 0 ? (
              <p className="text-fog text-[0.82rem]">None listed</p>
            ) : (
              <div className="space-y-1.5">
                {classes.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-[0.84rem]"
                  >
                    <span className="text-espresso">{c.name}</span>
                    <span className="font-mono text-[0.74rem] text-driftwood">
                      £{(c.price_pence / 100).toFixed(2)} · {c.capacity} spots
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Team">
            {team.length === 0 ? (
              <p className="text-fog text-[0.82rem]">No team members listed</p>
            ) : (
              <div className="space-y-1">
                {team.map((m, i) => (
                  <p key={i} className="text-[0.84rem] text-espresso">
                    {m.name}{" "}
                    <span className="text-fog">· {m.role}</span>
                  </p>
                ))}
              </div>
            )}
          </Card>

          <Card title="Brand & theme">
            <Field label="Mood" value={s.theme_mood} />
            <Field label="Colour" value={s.brand_colour} mono />
            <Field label="Notes" value={s.brand_notes} />
            <Field label="Domain" value={s.domain} mono />
            <Field label="Plan" value={s.plan_tier} />
            <Field label="Source" value={s.source || "organic"} />
            {s.referral_code && <Field label="Referral code" value={s.referral_code} mono />}
          </Card>
        </div>

        {/* Right: CRM controls + notes */}
        <div className="space-y-4">
          <EnquiryControls
            id={id}
            stage={s.crm_stage}
            priority={s.crm_priority}
            lostReason={s.crm_lost_reason}
            followUp={s.next_follow_up_at}
          />
          <Card title="Notes">
            <NotesTimeline submissionId={id} notes={notes} />
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-sand rounded-[12px] p-5">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fog mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | null;
  mono?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="text-[0.84rem] mb-1.5">
      <span className="text-fog">{label}: </span>
      <span className={mono ? "font-mono text-[0.78rem] text-driftwood" : "text-espresso"}>
        {value}
      </span>
    </div>
  );
}
