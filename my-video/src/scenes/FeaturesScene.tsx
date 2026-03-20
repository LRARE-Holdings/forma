import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_HEADING, FONT_BODY, FONT_MONO } from "../fonts";

const FEATURES = [
  { icon: "globe", label: "Beautiful Website", desc: "Unique to your brand" },
  { icon: "calendar", label: "Smart Booking", desc: "Classes & workshops" },
  { icon: "credit-card", label: "Seamless Payments", desc: "No commission" },
];

const icons: Record<string, string> = {
  globe: "\u{1F310}",
  calendar: "\u{1F4C5}",
  "credit-card": "\u{1F4B3}",
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill className="bg-parchment flex flex-col items-center justify-center px-16">
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 44,
          color: "#2C1810",
          marginBottom: 56,
          opacity: headerProgress,
        }}
      >
        Everything you need
      </div>

      <div className="flex gap-12">
        {FEATURES.map((feature, i) => {
          const delay = 0.3 * fps + i * 0.35 * fps;
          const cardProgress = spring({
            frame,
            fps,
            delay,
            config: { damping: 15, stiffness: 120 },
          });
          const cardY = interpolate(cardProgress, [0, 1], [60, 0]);

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: cardProgress,
                transform: `translateY(${cardY}px)`,
                width: 260,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  backgroundColor: "#2C1810",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  transform: `scale(${cardProgress})`,
                }}
              >
                <span style={{ fontSize: 32 }}>{icons[feature.icon]}</span>
              </div>
              <div
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#2C1810",
                  marginBottom: 8,
                }}
              >
                {feature.label}
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 15,
                  color: "#5C3D2E",
                  textAlign: "center",
                }}
              >
                {feature.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
