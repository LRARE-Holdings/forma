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
    supabase.from("referrers").select("*").order("created_at", { ascending: false }),
    supabase
      .from("referral_rewards")
      .select("*, referrer:referrers(code, full_name, email), submission:onboarding_submissions(studio_name, owner_email)")
      .order("attributed_at", { ascending: false }),
  ]);

  const referrers = referrersRes.data || [];
  const rewards = rewardsRes.data || [];
  const filteredRewards = rewards.filter(
    (r) => statusFilter === "all" || r.status === statusFilter
  );

  const payableTotal = rewards
    .filter((r) => r.status === "payable")
    .reduce((sum, r) => sum + (r.amount_pence || 0), 0);

  const statusCounts = Object.fromEntries(
    STATUSES.map((s) => [s, rewards.filter((r) => r.status === s).length])
  );

  return (
    <div className="max-w-[1200px]">
      <div className="mb-6">
        <h1
          className="text-[2rem] text-espresso mb-1"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Referrals
        </h1>
        <p className="text-[0.88rem] text-driftwood">
          {referrers.length} referrers · £{(payableTotal / 100).toFixed(0)} payable
        </p>
      </div>

      <div className="flex gap-1 mb-5 border-b border-sand">
        <TabLink active={tab === "rewards"} href="/referrals" label="Rewards" />
        <TabLink active={tab === "referrers"} href="/referrals?tab=referrers" label="Referrers" />
      </div>

      {tab === "rewards" ? (
        <>
          <div className="flex gap-2 mb-4">
            {(["all", ...STATUSES] as const).map((s) => (
              <Link
                key={s}
                href={`/referrals?status=${s}`}
                className={`px-3 py-1.5 rounded-full text-[0.74rem] capitalize border transition-colors ${
                  statusFilter === s
                    ? "bg-terracotta text-parchment border-terracotta"
                    : "bg-white border-sand text-driftwood hover:border-clay"
                }`}
              >
                {s} {s !== "all" && (
                  <span className="font-mono text-[0.66rem] opacity-70">
                    ({statusCounts[s]})
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="bg-white border border-sand rounded-[14px] overflow-hidden">
            <table className="w-full text-[0.84rem]">
              <thead>
                <tr className="bg-linen border-b border-sand text-left">
                  <Th>Referrer</Th>
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
                    <td colSpan={7} className="px-5 py-12 text-center text-fog">
                      No rewards in this status.
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
                      className="border-b border-sand last:border-0 hover:bg-linen/50"
                    >
                      <td className="px-5 py-3 text-espresso">
                        {referrer.full_name || "—"}
                      </td>
                      <td className="px-5 py-3 font-mono text-[0.74rem] text-terracotta">
                        {referrer.code || "—"}
                      </td>
                      <td className="px-5 py-3 text-driftwood">
                        {submission.studio_name || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="px-5 py-3 font-mono text-driftwood">
                        £{(r.amount_pence / 100).toFixed(0)}
                      </td>
                      <td className="px-5 py-3 text-driftwood">
                        {formatDate(r.attributed_at)}
                      </td>
                      <td className="px-5 py-3">
                        {r.status === "payable" && <MarkPaidButton id={r.id} />}
                        {r.status === "paid" && r.payout_reference && (
                          <span className="text-[0.7rem] font-mono text-fog">
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
        <div className="bg-white border border-sand rounded-[14px] overflow-hidden">
          <table className="w-full text-[0.84rem]">
            <thead>
              <tr className="bg-linen border-b border-sand text-left">
                <Th>Name</Th>
                <Th>Code</Th>
                <Th>Email</Th>
                <Th>Payout</Th>
                <Th>Status</Th>
                <Th>Joined</Th>
              </tr>
            </thead>
            <tbody>
              {referrers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-fog">
                    No referrers yet.
                  </td>
                </tr>
              )}
              {referrers.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-sand last:border-0 hover:bg-linen/50"
                >
                  <td className="px-5 py-3 text-espresso">{r.full_name}</td>
                  <td className="px-5 py-3 font-mono text-[0.74rem] text-terracotta">
                    {r.code}
                  </td>
                  <td className="px-5 py-3 font-mono text-[0.74rem] text-driftwood">
                    {r.email}
                  </td>
                  <td className="px-5 py-3 text-driftwood capitalize">
                    {r.payout_method || "—"}
                  </td>
                  <td className="px-5 py-3 text-driftwood capitalize">{r.status}</td>
                  <td className="px-5 py-3 text-driftwood">
                    {formatDate(r.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
}: {
  active: boolean;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2.5 text-[0.86rem] border-b-2 -mb-px transition-colors ${
        active
          ? "border-terracotta text-espresso font-semibold"
          : "border-transparent text-driftwood hover:text-espresso"
      }`}
    >
      {label}
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
      className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[0.62rem] uppercase tracking-[0.06em] ${map[status] || "bg-sand text-bark"}`}
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
