import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_HEADING, FONT_BODY } from "../fonts";

const PROBLEMS = [
  "Generic website builders?",
  "Overpriced enterprise platforms?",
  "Clunky booking systems?",
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill className="bg-espresso flex flex-col items-center justify-center px-24">
      <div
        style={{
          fontFamily: FONT_HEADING,
          fontSize: 44,
          color: "#FFFCF9",
          opacity: headingProgress,
          transform: `translateY(${interpolate(headingProgress, [0, 1], [20, 0])}px)`,
          textAlign: "center",
          marginBottom: 48,
        }}
      >
        Tired of...
      </div>

      <div className="flex flex-col gap-5">
        {PROBLEMS.map((problem, i) => {
          const delay = 0.5 * fps + i * 0.4 * fps;
          const prog = spring({
            frame,
            fps,
            delay,
            config: { damping: 200 },
          });
          const strikeProgress = interpolate(
            frame,
            [delay + 0.8 * fps, delay + 1.3 * fps],
            [0, 100],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                fontFamily: FONT_BODY,
                fontSize: 32,
                color: "#C2714F",
                opacity: prog,
                transform: `translateX(${interpolate(prog, [0, 1], [-40, 0])}px)`,
                position: "relative",
              }}
            >
              {problem}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  width: `${strikeProgress}%`,
                  height: 2,
                  backgroundColor: "#C2714F",
                  opacity: 0.6,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
