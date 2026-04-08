const STAGE_COLORS: Record<string, string> = {
  new: "bg-blush text-burnt",
  contacted: "bg-clay/40 text-bark",
  qualified: "bg-bisque text-burnt",
  quoted: "bg-terracotta/15 text-burnt",
  won: "bg-sage/15 text-sage",
  lost: "bg-fog/20 text-driftwood",
};

export default function StageBadge({ stage }: { stage: string }) {
  const cls = STAGE_COLORS[stage] || "bg-sand text-bark";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[0.62rem] uppercase tracking-[0.08em] ${cls}`}
    >
      {stage}
    </span>
  );
}
