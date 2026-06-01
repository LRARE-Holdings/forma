import Link from "next/link";
import { createServerClient } from "@forma/db";
import MarkPaidButton from "@/components/admin/MarkPaidButton";

export const dynamic = "force-dynamic";

const STATUSES = ["pending", "payable", "paid", "void"] as const;

export default async function ReferralsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; status?: string }>;
}) {
  const params = await searchParams;
  const tab = params.tab === "referrers" ? "referrers" : "rewards";
  const statusFilter = params.status || "payable";

  const supabase = createServerClient();

  const [referrersRes, rewardsRes] = await Promise.all([
    supabase
      .from("referrers")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("referral_rewards")
      .select(
        "*, referrer:referrers(code, full_name, email), submission:onboarding_submissions(studio_name, owner_email)"
      )
      .order("attributed_at", { ascending: false }),
  ]);

  const referrers = referrersRes.data || [];
  const rewards = rewardsRes.data || [];
  const filteredRewards =
    statusFilter === "all"
      ? rewards
      : rewards.filter((r) => r.status === statusFilter);

  const payableTotal = rewards
    .filter((r) => r.status === "payable")
    .reduce((sum, r) => sum + (r.amount_pence || 0), 0);
  const paidTotal = rewards
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + (r.amount_pence || 0), 0);

  const statusCounts = Object.fromEntries(
    STATUSES.map((s) => [s, rewards.filter((r) => r.status === s).length])
  );

  return (
    <div className="max-w-[1200px]">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1
            className="text-[2rem] text-espresso mb-1 leading-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Referrals
          </h1>
          <p className="text-[0.84rem] text-driftwood">
            {referrers.length} partners · £{(payableTotal / 100).toFixed(0)}{" "}
            payable · £{(paidTotal / 100).toFixed(0)} paid all-time
          </p>
        </div>
        <Link
          href="https://useforma.co.uk/partners"
          target="_blank"
          className="text-[0.78rem] text-terracotta border border-terracotta/30 px-3 py-1.5 rounded-[6px] hover:bg-terracotta/5 transition-colors"
        >
          Partner sign-up page ↗
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard
          label="Payable now"
          value={`£${(payableTotal / 100).toFixed(0)}`}
          sub={`${statusCounts.payable || 0} rewards`}
          accent
        />
        <StatCard
          label="Paid all-time"
          value={`£${(paidTotal / 100).toFixed(0)}`}
          sub={`${statusCounts.paid || 0} payouts made`}
        />
        <StatCard
          label="Partners"
          value={referrers.length}
          sub="in the programme"
        />
        <StatCard
          label="Pending"
          value={statusCounts.pending || 0}
          sub="awaiting signup"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 border-b border-sand">
        <TabLink
          active={tab === "rewards"}
          href="/referrals"
          label="Rewards"
          count={rewards.length}
        />
        <TabLink
          active={tab === "referrers"}
          href="/referrals?tab=referrers"
          label="Partners"
          count={referrers.length}
        />
      </div>

      {tab === "rewards" ? (
        <>
          {/* Status filter pills */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {(["all", ...STATUSES] as const).map((s) => (
              <Link
                key={s}
                href={`/referrals?status=${s}`}
                className={`px-3 py-1.5 rounded-full text-[0.73rem] capitalize border transition-colors font-mono tracking-[0.03em] ${
                  statusFilter === s
                    ? "bg-espresso text-parchment border-espresso"
                    : "bg-white border-sand text-driftwood hover:border-clay"
                }`}
              >
                {s}
                {s !== "all" && statusCounts[s as keyof typeof statusCounts] !== undefined && (
                  <span className="opacity-50 ml-1">
                    ({statusCounts[s as keyof typeof statusCounts]})
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="bg-white border border-sand rounded-[14px] overflow-hidden">
            <table className="w-full text-[0.84rem]">
              <thead>
                <tr className="bg-linen border-b border-sand text-left">
                  <Th>Partner</Th>
                  <Th>Code</Th>
                  <Th>Referred studio</Th>
                  <Th>Status</Th>
                  <Th>Amount</Th>
                  <Th>Attributed</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                {filteredRewards.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-14 text-center text-fog text-[0.84rem]"
                    >
                      No rewards with status &ldquo;{statusFilter}&rdquo;.
                    </td>
                  </tr>
                )}
                {filteredRewards.map((r) => {
                  const referrer = (r.referrer || {}) as {
                    code?: string;
                    full_name?: string;
                  };
                  const submission = (r.submission || {}) as {
                    studio_name?: string;
                  };
                  return (
                    <tr
                      key={r.id}
                      className="border-b border-sand last:border-0 hover:bg-linen/50 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-espresso font-medium">
                        {referrer.full_name || "—"}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[0.72rem] text-terracotta">
                        {referrer.code || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-driftwood">
                        {submission.studio_name || "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[0.82rem] text-driftwood">
                        £{(r.amount_pence / 100).toFixed(0)}
                      </td>
                      <td className="px-5 py-3.5 text-driftwood text-[0.8rem]">
                        {formatDate(r.attributed_at)}
                      </td>
                      <td className="px-5 py-3.5">
                        {r.status === "payable" && (
                          <MarkPaidButton id={r.id} />
                        )}
                        {r.status === "paid" && r.payout_reference && (
                          <span className="text-[0.68rem] font-mono text-fog">
                            {r.payout_reference}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Partners tab — card grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {referrers.length === 0 && (
            <div className="col-span-full py-14 text-center text-fog text-[0.84rem] bg-white border border-sand rounded-[14px]">
              No partners yet.
            </div>
          )}
          {referrers.map((r) => {
            const partnerRewards = rewards.filter(
              (rw) =>
                typeof rw.referrer === "object" &&
                rw.referrer !== null &&
                "code" in rw.referrer &&
                (rw.referrer as { code: string }).code === r.code
            );
            const earned = partnerRewards
              .filter((rw) => rw.status === "paid")
              .reduce((sum, rw) => sum + (rw.amount_pence || 0), 0);
            const pending = partnerRewards.filter(
              (rw) => rw.status === "payable"
            ).length;

            return (
              <div
                key={r.id}
                className="bg-white border border-sand rounded-[14px] p-5 hover:border-clay transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-espresso text-[0.92rem]">
                      {r.full_name}
                    </p>
                    <p className="text-[0.75rem] text-fog font-mono mt-0.5">
                      {r.email}
                    </p>
                  </div>
                  <span
                    className={`font-mono text-[0.55rem] uppercase tracking-[0.1em] px-2 py-1 rounded-full ${
                      r.status === "active"
                        ? "bg-sage/10 text-sage"
                        : "bg-fog/15 text-fog"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[0.7rem] bg-terracotta/8 text-terracotta px-2.5 py-1 rounded-full">
                    {r.code}
                  </span>
                  <span className="text-[0.72rem] text-driftwood capitalize">
                    {r.payout_method || "—"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-sand">
                  <div>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-fog mb-0.5">
                      Referrals
                    </p>
                    <p className="text-[1.1rem] font-bold text-espresso">
                      {partnerRewards.length}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-fog mb-0.5">
                      Earned
                    </p>
                    <p className="text-[1.1rem] font-bold text-espresso">
                      £{(earned / 100).toFixed(0)}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[0.55rem] uppercase tracking-[0.08em] text-fog mb-0.5">
                      Payable
                    </p>
                    <p
                      className={`text-[1.1rem] font-bold ${
                        pending > 0 ? "text-amber" : "text-espresso"
                      }`}
                    >
                      {pending}
                    </p>
                  </div>
                </div>

                <p className="text-[0.7rem] text-fog mt-3">
                  Joined {formatDate(r.created_at)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatCard({
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
        accent
          ? "bg-terracotta/[0.05] border-terracotta/25"
          : "bg-white border-sand"
      }`}
    >
      <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-fog mb-1.5">
        {label}
      </p>
      <p className="text-[1.7rem] font-bold text-espresso leading-none">
        {value}
      </p>
      {sub && <p className="text-[0.72rem] text-driftwood mt-1.5">{sub}</p>}
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-3 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-fog font-normal">
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
      className={`px-4 py-2.5 text-[0.86rem] border-b-2 -mb-px transition-colors flex items-center gap-2 ${
        active
          ? "border-terracotta text-espresso font-semibold"
          : "border-transparent text-driftwood hover:text-espresso"
      }`}
    >
      {label}
      <span className="font-mono text-[0.65rem] text-fog">{count}</span>
    </Link>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-clay/30 text-bark",
    payable: "bg-amber/15 text-amber",
    paid: "bg-sage/15 text-sage",
    void: "bg-fog/20 text-fog",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[0.6rem] uppercase tracking-[0.06em] ${
        map[status] || "bg-sand text-bark"
      }`}
    >
      {status}
    </span>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
}
