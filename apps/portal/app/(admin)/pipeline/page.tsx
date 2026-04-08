import Link from "next/link";
import { createServerClient } from "@forma/db";
import StageBadge from "@/components/admin/StageBadge";

export const dynamic = "force-dynamic";

const STAGES = ["new", "contacted", "qualified", "quoted", "won", "lost"] as const;

interface Submission {
  id: string;
  studio_name: string;
  owner_name: string | null;
  owner_email: string | null;
  crm_stage: string;
  plan_tier: string | null;
  source: string | null;
  created_at: string;
  last_contacted_at: string | null;
  next_follow_up_at: string | null;
}

export default async function PipelinePage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string; source?: string }>;
}) {
  const params = await searchParams;
  const supabase = createServerClient();

  const { data: all } = await supabase
    .from("onboarding_submissions")
    .select(
      "id, studio_name, owner_name, owner_email, crm_stage, plan_tier, source, created_at, last_contacted_at, next_follow_up_at"
    )
    .order("created_at", { ascending: false });

  const submissions: Submission[] = all || [];
  const counts = Object.fromEntries(
    STAGES.map((s) => [s, submissions.filter((r) => r.crm_stage === s).length])
  );

  const filtered = submissions.filter((r) => {
    if (params.stage && r.crm_stage !== params.stage) return false;
    if (params.source && r.source !== params.source) return false;
    return true;
  });

  return (
    <div className="max-w-[1200px]">
      <div className="mb-6">
        <h1
          className="text-[2rem] text-espresso mb-1"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Pipeline
        </h1>
        <p className="text-[0.88rem] text-driftwood">
          {submissions.length} total enquiries
        </p>
      </div>

      <div className="flex gap-1 mb-5 border-b border-sand">
        <TabLink active={!params.stage} href="/pipeline" label="All" count={submissions.length} />
        {STAGES.map((s) => (
          <TabLink
            key={s}
            active={params.stage === s}
            href={`/pipeline?stage=${s}`}
            label={s}
            count={counts[s]}
          />
        ))}
      </div>

      <div className="bg-white border border-sand rounded-[14px] overflow-hidden">
        <table className="w-full text-[0.84rem]">
          <thead>
            <tr className="bg-linen border-b border-sand text-left">
              <Th>Studio</Th>
              <Th>Owner</Th>
              <Th>Stage</Th>
              <Th>Plan</Th>
              <Th>Source</Th>
              <Th>Created</Th>
              <Th>Follow-up</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-fog">
                  No enquiries match this filter.
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="border-b border-sand last:border-0 hover:bg-linen/50 transition-colors"
              >
                <td className="px-5 py-3">
                  <Link
                    href={`/enquiries/${r.id}`}
                    className="font-semibold text-espresso hover:text-terracotta"
                  >
                    {r.studio_name}
                  </Link>
                </td>
                <td className="px-5 py-3 text-driftwood">
                  {r.owner_name || "—"}
                  {r.owner_email && (
                    <p className="text-[0.74rem] text-fog">{r.owner_email}</p>
                  )}
                </td>
                <td className="px-5 py-3">
                  <StageBadge stage={r.crm_stage} />
                </td>
                <td className="px-5 py-3 text-driftwood capitalize">
                  {r.plan_tier || "—"}
                </td>
                <td className="px-5 py-3 text-driftwood capitalize">
                  {r.source || "organic"}
                </td>
                <td className="px-5 py-3 text-driftwood">
                  {formatDate(r.created_at)}
                </td>
                <td className="px-5 py-3 text-driftwood">
                  {r.next_follow_up_at ? formatDate(r.next_follow_up_at) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-fog font-normal">
      {children}
    </th>
  );
}

function TabLink({
  active,
  href,
  label,
  count,
}: {
  active: boolean;
  href: string;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2.5 text-[0.82rem] capitalize border-b-2 -mb-px transition-colors ${
        active
          ? "border-terracotta text-espresso font-semibold"
          : "border-transparent text-driftwood hover:text-espresso"
      }`}
    >
      {label} <span className="text-fog font-mono text-[0.7rem]">({count})</span>
    </Link>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}
