import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_HEADING, FONT_BODY, FONT_MONO } from "../fonts";

const TIERS = [
  { name: "Launch", price: "39" },
  { name: "Studio", price: "59", popular: true },
  { name: "Pro", price: "89" },
  { name: "Partner", price: "129" },
];

export const PricingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill className="bg-espresso flex flex-col items-center justify-center">
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 42,
          color: "#FFFCF9",
          marginBottom: 16,
          opacity: headerProgress,
        }}
      >
        Simple, honest pricing
      </div>
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 18,
          color: "#C2714F",
          marginBottom: 48,
          opacity: headerProgress,
        }}
      >
        No setup fees. No contracts. No commission.
      </div>

      <div className="flex gap-6">
        {TIERS.map((tier, i) => {
          const delay = 0.4 * fps + i * 0.2 * fps;
          const prog = spring({
            frame,
            fps,
            delay,
            config: { damping: 15, stiffness: 150 },
          });

          const isPopular = tier.popular;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "28px 24px",
                borderRadius: 16,
                backgroundColor: isPopular ? "#C2714F" : "rgba(255,252,249,0.08)",
                border: isPopular ? "none" : "1px solid rgba(255,252,249,0.15)",
                width: 180,
                opacity: prog,
                transform: `translateY(${interpolate(prog, [0, 1], [40, 0])}px) scale(${isPopular ? 1.05 : 1})`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 16,
                  fontWeight: 700,
                  color: isPopular ? "#FFFCF9" : "#C2714F",
                  marginBottom: 12,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {tier.name}
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 14,
                    color: isPopular ? "rgba(255,252,249,0.7)" : "rgba(255,252,249,0.5)",
                  }}
                >
                  £
                </span>
                <span
                  style={{
                    fontFamily: FONT_BODY,
                    fontSize: 40,
                    fontWeight: 700,
                    color: "#FFFCF9",
                  }}
                >
                  {tier.price}
                </span>
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 14,
                    color: isPopular ? "rgba(255,252,249,0.7)" : "rgba(255,252,249,0.5)",
                  }}
                >
                  /mo
                </span>
              </div>
              {isPopular && (
                <div
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 11,
                    color: "#FFFCF9",
                    marginTop: 12,
                    backgroundColor: "rgba(255,252,249,0.2)",
                    padding: "4px 12px",
                    borderRadius: 100,
                  }}
                >
                  Most popular
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
