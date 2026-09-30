"use client";

import { useMemo, useState } from "react";
import {
  PRICING_TIERS,
  COMPETITORS,
  competitorAtMembers,
  type TierId,
} from "@/lib/pricing";

const fmt = (n: number) => `£${Math.round(n).toLocaleString()}`;

// Competitor line colours — muted, deliberately off-brand so Forma's
// terracotta line reads as the hero.
const LINE = { teamup: "#6B7C93", momence: "#8A6B93", bsport: "#937B6B" };

/**
 * Interactive "what you'd pay as you grow" comparator, ported from the pricing
 * artefact and restyled in Forma's brand. Forma is flat; competitors scale
 * with active members, so the gap widens as the studio grows.
 */
export default function PricingComparator() {
  const [members, setMembers] = useState(150);
  const [tierId, setTierId] = useState<TierId>("studio");

  const tier = PRICING_TIERS.find((t) => t.id === tierId) ?? PRICING_TIERS[1];

  const rows = useMemo(() => {
    const competitors = COMPETITORS.map((c) => ({
      name: c.name,
      note: c.note,
      monthly: competitorAtMembers(c.entry, members),
      flat: false,
    }));
    const max = Math.max(tier.priceMonthly, ...competitors.map((c) => c.monthly));
    return {
      max,
      list: [
        {
          name: `Forma ${tier.name}`,
          note: "flat — never moves",
          monthly: tier.priceMonthly,
          flat: true,
        },
        ...competitors,
      ],
    };
  }, [members, tier]);

  const cheapest = Math.min(
    ...COMPETITORS.map((c) => competitorAtMembers(c.entry, members))
  );
  const saving = cheapest - tier.priceMonthly;
  const annual = saving * 12;

  // Divergence line chart across 25..500 members.
  const chart = useMemo(() => {
    const pts: Record<"m" | "forma" | "teamup" | "momence" | "bsport", number>[] =
      [];
    for (let m = 25; m <= 500; m += 25) {
      pts.push({
        m,
        forma: tier.priceMonthly,
        teamup: competitorAtMembers(83, m),
        momence: competitorAtMembers(78, m),
        bsport: competitorAtMembers(95, m),
      });
    }
    return pts;
  }, [tier]);
  const chartMax = Math.max(
    ...chart.flatMap((d) => [d.teamup, d.momence, d.bsport])
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Controls + bars */}
      <div className="bg-parchment border border-espresso/10 rounded-[18px] p-6 md:p-8">
        <div className="flex gap-2 mb-7">
          {PRICING_TIERS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTierId(t.id)}
              className={`flex-1 py-2 rounded-full text-[0.72rem] font-mono uppercase tracking-[0.08em] border transition-colors ${
                tierId === t.id
                  ? "bg-espresso text-parchment border-espresso"
                  : "border-espresso/15 text-driftwood hover:border-espresso/40"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="flex items-baseline justify-between mb-2">
          <span className="text-[0.82rem] text-driftwood">Active members</span>
          <span className="font-serif text-[1.9rem] text-espresso leading-none">
            {members}
          </span>
        </div>
        <input
          type="range"
          min={25}
          max={500}
          step={25}
          value={members}
          onChange={(e) => setMembers(+e.target.value)}
          aria-label="Active members"
          className="forma-range w-full"
        />

        <div className="flex flex-col gap-3.5 mt-7">
          {rows.list.map((r) => (
            <div key={r.name}>
              <div className="flex justify-between text-[0.82rem] mb-1.5 gap-3">
                <span className="text-espresso truncate">
                  {r.name}{" "}
                  <span className="text-fog text-[0.72rem]">· {r.note}</span>
                </span>
                <span
                  className={`font-mono text-[0.82rem] shrink-0 ${
                    r.flat ? "text-terracotta font-medium" : "text-bark"
                  }`}
                >
                  {fmt(r.monthly)}/mo
                </span>
              </div>
              <div className="h-2 bg-sand rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${(r.monthly / rows.max) * 100}%`,
                    background: r.flat
                      ? "var(--color-terracotta)"
                      : "var(--color-clay)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-6 rounded-[12px] px-4 py-3.5 border ${
            saving > 0
              ? "bg-sage/[0.06] border-sage/25"
              : "bg-terracotta/[0.06] border-terracotta/25"
          }`}
        >
          <p className="text-[0.88rem] text-bark leading-[1.5]">
            At {members} members, Forma {tier.name}{" "}
            {saving > 0 ? (
              <>
                saves <strong className="text-sage">{fmt(saving)}/mo</strong> —{" "}
                <strong className="text-sage">{fmt(annual)}/year</strong>
              </>
            ) : (
              <>
                is within{" "}
                <strong className="text-espresso">
                  {fmt(Math.abs(saving))}/mo
                </strong>
              </>
            )}{" "}
            of the cheapest of the three — and it never climbs as you grow.
          </p>
        </div>
      </div>

      {/* Divergence chart */}
      <div className="bg-parchment border border-espresso/10 rounded-[18px] p-6 md:p-8 flex flex-col">
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-5 text-[0.72rem]">
          <Legend color="var(--color-terracotta)" label={`Forma ${tier.name}`} />
          <Legend color={LINE.teamup} label="TeamUp" />
          <Legend color={LINE.momence} label="Momence" />
          <Legend color={LINE.bsport} label="bSport" />
        </div>

        <div className="relative flex-1 min-h-[180px]">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${chart.length - 1} 160`}
            preserveAspectRatio="none"
            className="overflow-visible"
          >
            {[
              { key: "teamup" as const, color: LINE.teamup, w: 1.2 },
              { key: "momence" as const, color: LINE.momence, w: 1.2 },
              { key: "bsport" as const, color: LINE.bsport, w: 1.2 },
              { key: "forma" as const, color: "var(--color-terracotta)", w: 2.6 },
            ].map((line) => (
              <polyline
                key={line.key}
                points={chart
                  .map(
                    (d, i) => `${i},${160 - (d[line.key] / chartMax) * 140}`
                  )
                  .join(" ")}
                fill="none"
                stroke={line.color}
                strokeWidth={line.w}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>

        <div className="flex justify-between mt-3 font-mono text-[0.66rem] text-fog">
          {[25, 150, 300, 500].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <p className="text-[0.8rem] text-driftwood leading-[1.55] mt-4">
          Forma is the flat line. Every competitor slopes upward — the bigger the
          studio gets, the wider the gap, and the harder it is to leave.
        </p>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-driftwood">
      <span
        className="inline-block w-3 h-[3px] rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
