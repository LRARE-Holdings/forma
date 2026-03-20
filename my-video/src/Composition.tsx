import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { OpeningScene } from "./scenes/OpeningScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { PricingScene } from "./scenes/PricingScene";
import { CTAScene } from "./scenes/CTAScene";

const FPS = 30;

// Scene durations in frames
const OPENING = 3.5 * FPS;    // 3.5s
const PROBLEM = 5 * FPS;      // 5s
const SOLUTION = 3.5 * FPS;   // 3.5s
const FEATURES = 4 * FPS;     // 4s
const PRICING = 4 * FPS;      // 4s
const CTA = 4 * FPS;          // 4s

const TRANSITION = 15;         // 0.5s overlap

export const TOTAL_DURATION =
  OPENING + PROBLEM + SOLUTION + FEATURES + PRICING + CTA - 5 * TRANSITION;

export const FormaPromo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={OPENING}>
        <OpeningScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={PROBLEM}>
        <ProblemScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={SOLUTION}>
        <SolutionScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={FEATURES}>
        <FeaturesScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={slide({ direction: "from-bottom" })}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={PRICING}>
        <PricingScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION })}
      />

      <TransitionSeries.Sequence durationInFrames={CTA}>
        <CTAScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
