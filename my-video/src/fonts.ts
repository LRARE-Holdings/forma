import { loadFont as loadInstrumentSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadIBMPlexMono } from "@remotion/google-fonts/IBMPlexMono";

const instrumentSerif = loadInstrumentSerif("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const dmSans = loadDMSans("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
});

const ibmPlexMono = loadIBMPlexMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const FONT_HEADING = instrumentSerif.fontFamily;
export const FONT_BODY = dmSans.fontFamily;
export const FONT_MONO = ibmPlexMono.fontFamily;
