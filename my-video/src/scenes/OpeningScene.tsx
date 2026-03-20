import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_HEADING, FONT_BODY } from "../fonts";

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const logoOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineProgress = spring({
    frame,
    fps,
    delay: 0.6 * fps,
    config: { damping: 200 },
  });
  const taglineY = interpolate(taglineProgress, [0, 1], [30, 0]);

  const lineWidth = interpolate(
    frame,
    [0.4 * fps, 1.2 * fps],
    [0, 120],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-parchment flex flex-col items-center justify-center">
      <div
        style={{
          fontFamily: FONT_BODY,
          fontSize: 72,
          fontWeight: 700,
          color: "#2C1810",
          letterSpacing: "-0.02em",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        forma
      </div>

      <div
        style={{
          width: lineWidth,
          height: 2,
          backgroundColor: "#C2714F",
          marginTop: 16,
          marginBottom: 16,
        }}
      />

      <div
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 28,
          fontStyle: "italic",
          color: "#C2714F",
          opacity: taglineProgress,
          transform: `translateY(${taglineY}px)`,
        }}
      >
        Book. Pay. Breathe.
      </div>
    </AbsoluteFill>
  );
};
