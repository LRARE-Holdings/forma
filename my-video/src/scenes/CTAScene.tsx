import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_HEADING, FONT_BODY, FONT_MONO } from "../fonts";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const headlineProgress = spring({
    frame,
    fps,
    delay: 0.3 * fps,
    config: { damping: 200 },
  });

  const urlProgress = spring({
    frame,
    fps,
    delay: 0.8 * fps,
    config: { damping: 200 },
  });

  const buttonPulse = interpolate(
    frame,
    [1.2 * fps, 1.5 * fps, 1.8 * fps, 2.1 * fps],
    [1, 1.04, 1, 1.02],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-parchment flex flex-col items-center justify-center">
      {/* Background warm gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 120%, rgba(194,113,79,0.12) 0%, transparent 60%)",
        }}
      />

      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 48,
          fontWeight: 700,
          color: "#2C1810",
          letterSpacing: "-0.02em",
          opacity: logoProgress,
          transform: `scale(${logoProgress})`,
          marginBottom: 24,
        }}
      >
        forma
      </div>

      <div
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 40,
          color: "#2C1810",
          textAlign: "center",
          lineHeight: 1.3,
          opacity: headlineProgress,
          transform: `translateY(${interpolate(headlineProgress, [0, 1], [20, 0])}px)`,
          marginBottom: 32,
        }}
      >
        Your studio deserves better.
        <br />
        <span style={{ color: "#C2714F" }}>Start today.</span>
      </div>

      <div
        style={{
          padding: "14px 40px",
          backgroundColor: "#C2714F",
          borderRadius: 100,
          transform: `scale(${buttonPulse})`,
          opacity: urlProgress,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontFamily: FONT_BODY,
            fontSize: 20,
            fontWeight: 700,
            color: "#FFFCF9",
          }}
        >
          Get Started Free
        </span>
      </div>

      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 18,
          color: "#5C3D2E",
          opacity: urlProgress,
        }}
      >
        useforma.co.uk
      </div>
    </AbsoluteFill>
  );
};
