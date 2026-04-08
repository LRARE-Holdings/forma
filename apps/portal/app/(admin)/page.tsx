import Link from "next/link";
import { createServerClient } from "@forma/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createServerClient();

  const [submissionsRes, referrersRes, payableRes] = await Promise.all([
    supabase
      .from("onboarding_submissions")
      .select("crm_stage, created_at"),
    supabase.from("referrers").select("id"),
    supabase
      .from("referral_rewards")
      .select("amount_pence, status")
      .eq("status", "payable"),
  ]);

  const submissions = submissionsRes.data || [];
  const stages = ["new", "contacted", "qualified", "quoted", "won", "lost"] as const;
  const stageCounts = Object.fromEntries(
    stages.map((s) => [s, submissions.filter((r) => r.crm_stage === s).length])
  );

  const last7 = submissions.filter((r) => {
    const created = new Date(r.created_at);
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return created > cutoff;
  }).length;

  const payableTotal = (payableRes.data || []).reduce(
    (sum, r) => sum + (r.amount_pence || 0),
    0
  );

  return (
    <div className="max-w-[1100px]">
      <div className="mb-8">
        <h1
          className="text-[2rem] text-espresso mb-1"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Dashboard
        </h1>
        <p className="text-[0.88rem] text-driftwood">
          The state of the world right now.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <Stat
          label="New enquiries"
          value={stageCounts.new}
          sub={`${last7} in last 7 days`}
        />
        <Stat label="Active pipeline" value={
          stageCounts.new + stageCounts.contacted + stageCounts.qualified + stageCounts.quoted
        } sub="not won/lost" />
        <Stat
          label="Payable referrals"
          value={`£${(payableTotal / 100).toFixed(0)}`}
          sub={`${payableRes.data?.length || 0} awaiting payout`}
          accent
        />
      </div>

      <div className="bg-white border border-sand rounded-[14px] p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[0.92rem] font-bold text-espresso">Pipeline by stage</h2>
          <Link
            href="/pipeline"
            className="text-[0.78rem] text-terracotta hover:text-burnt"
          >
            View pipeline →
          </Link>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {stages.map((s) => (
            <Link
              key={s}
              href={`/pipeline?stage=${s}`}
              className="bg-linen border border-sand rounded-[10px] p-3 hover:border-clay transition-colors"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-fog mb-1">
                {s}
              </p>
              <p className="text-[1.4rem] font-bold text-espresso">
                {stageCounts[s]}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/referrals"
          className="bg-white border border-sand rounded-[14px] p-6 hover:border-clay transition-colors"
        >
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-fog mb-1">
            Referrers
          </p>
          <p className="text-[1.6rem] font-bold text-espresso">
            {referrersRes.data?.length || 0}
          </p>
          <p className="text-[0.78rem] text-driftwood mt-1">
            People in the referral programme
          </p>
        </Link>
        <Link
          href="/activity"
          className="bg-white border border-sand rounded-[14px] p-6 hover:border-clay transition-colors"
        >
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-fog mb-1">
            Activity
          </p>
          <p className="text-[0.94rem] text-espresso mt-1">View recent events →</p>
          <p className="text-[0.78rem] text-driftwood mt-1">
            Enquiries, stage changes, referrals
          </p>
        </Link>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number | string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`border rounded-[14px] p-5 ${
        accent ? "bg-terracotta/[0.05] border-terracotta/30" : "bg-white border-sand"
      }`}
    >
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-fog mb-1.5">
        {label}
      </p>
      <p className="text-[1.8rem] font-bold text-espresso leading-none">{value}</p>
      {sub && <p className="text-[0.74rem] text-driftwood mt-1.5">{sub}</p>}
    </div>
  );
}
