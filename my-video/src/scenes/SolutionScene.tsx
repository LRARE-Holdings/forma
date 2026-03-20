import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_HEADING, FONT_BODY } from "../fonts";

export const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const subtitleProgress = spring({
    frame,
    fps,
    delay: 0.5 * fps,
    config: { damping: 200 },
  });

  const glowOpacity = interpolate(
    frame,
    [0, 1 * fps, 2 * fps],
    [0, 0.15, 0.08],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-parchment flex flex-col items-center justify-center">
      {/* Warm glow behind text */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, #C2714F 0%, transparent 70%)",
          opacity: glowOpacity,
        }}
      />

      <div
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 56,
          color: "#2C1810",
          transform: `scale(${headingScale})`,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        Meet <span style={{ color: "#C2714F" }}>Forma</span>
      </div>

      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 26,
          color: "#5C3D2E",
          marginTop: 24,
          opacity: subtitleProgress,
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0])}px)`,
          textAlign: "center",
          maxWidth: 700,
          lineHeight: 1.5,
        }}
      >
        The all-in-one platform built for
        <br />
        independent fitness & wellness studios
      </div>
    </AbsoluteFill>
  );
};
