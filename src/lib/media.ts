import type { StaticImageData } from "next/image";
import veritasAudit from "@/assets/work/veritas-audit.png";
import veritasJudges from "@/assets/work/veritas-judges.png";
import predictionMarkets from "@/assets/work/prediction-markets.png";
import quantVersions from "@/assets/work/quant-versions.png";
import quantMomentum from "@/assets/work/quant-momentum.png";
import athiraLogo from "@/assets/work/athira-logo.png";
import trnLogo from "@/assets/work/trn-logo.png";
import trivvyLogo from "@/assets/work/trivvy-logo.png";
import veritasHackathon from "@/assets/photos/veritas-hackathon.jpg";
import vexWorlds from "@/assets/photos/vex-worlds-2025.jpg";
import vexMatch from "@/assets/photos/vex-match.jpg";
import battalionParade from "@/assets/photos/battalion-parade.jpg";
import swordCeremony from "@/assets/photos/sword-ceremony.jpg";
import jpaInspection from "@/assets/photos/jpa-inspection.jpg";
import portrait from "@/assets/photos/portrait.jpg";
import trail from "@/assets/photos/trail.jpg";
import coffee from "@/assets/photos/coffee.jpg";
import volleyball from "@/assets/photos/volleyball.jpg";
import risingStar from "@/assets/photos/rising-star.jpg";
import modelCongress from "@/assets/photos/model-congress.jpg";
import interact from "@/assets/photos/interact.jpg";

// `logo` images are shown whole on their brand background instead of cropped
// like screenshots and photos.
export type Media = { src: StaticImageData; alt: string; caption: string; logo?: { bg: string } };

// Per project, in page order. The first one is also the homepage thumbnail.
export const media: Record<string, Media[]> = {
  veritas: [
    {
      src: veritasAudit,
      alt: "Veritas results view: 72 claims audited, 12 flagged, 5 confirmed drifts, with a contradicted claim traced back to the transcript.",
      caption: "A real run on a COVID-19 admission. The note said the patient \"explicitly denies chest pain\"; the transcript says \"This is not that. No pain,\" a comparison to her prior heart attack, not a denial.",
    },
    {
      src: veritasJudges,
      alt: "Three judge cards, patient safety, documentation integrity, and false-positive skeptic, each confirming a missed low-glucose reading.",
      caption: "The three judges, each framed differently, all confirming the same omission: a glucose of 67 mg/dL the note's plan never mentions.",
    },
    {
      src: veritasHackathon,
      alt: "Two students standing on either side of an Abridge banner at the hackathon venue.",
      caption: "Rajeev and me at the Abridge AI Healthcare Hackathon.",
    },
  ],
  "prediction-market": [
    {
      src: predictionMarkets,
      alt: "Markets page listing nine State Primary election races with live crowd odds for each candidate.",
      caption: "The State Primary markets: one market per race, crowd odds updating live.",
    },
  ],
  "quant-strategies": [
    {
      src: quantVersions,
      alt: "Line chart from 2021 to 2026: earnings strategy v2 ends at +137.9%, SPY at +119%, v1 at +14.3%.",
      caption: "Same signal, two portfolio designs. v1 (dashed) sat in cash; v2 put idle capital in SPY and sized live trades properly.",
    },
    {
      src: quantMomentum,
      alt: "Momentum strategy versus SPY, 2021 to 2026, with the best run-up shaded green and the worst drawdown of -10.7% shaded red.",
      caption: "Momentum trails SPY on raw return but its worst drawdown was -10.7% against SPY's -24.5%.",
    },
  ],
  "vex-robotics": [
    {
      src: vexWorlds,
      alt: "Team 92008A holding its Science division sign in front of a VEX Robotics World Championship backdrop, with the robot on the floor.",
      caption: "Team 92008A in the Science division at the 2025 VEX Robotics World Championship in Dallas, with our High Stakes robot.",
    },
    {
      src: vexMatch,
      alt: "Overhead view of a VEX field mid-match, with referees and drive teams around it.",
      caption: "Mid-match on Field 1.",
    },
  ],
  "battalion-commander": [
    {
      src: battalionParade,
      alt: "Cadets in full dress uniform in formation on the Academy's field, with the battalion staff in front.",
      caption: "Leading a parade with the battalion staff.",
    },
    {
      src: swordCeremony,
      alt: "Five cadet officers in camouflage uniforms with white and maroon sashes on the Academy's field.",
      caption: "Sword ceremony, September 2026.",
    },
    {
      src: jpaInspection,
      alt: "Three cadets in dress uniform at a table with laptops, briefing an evaluator.",
      caption: "Briefing an evaluator during our JROTC Program Accreditation inspection.",
    },
  ],
  athira: [{ src: athiraLogo, alt: "Athira logo: a gradient letter A", caption: "", logo: { bg: "#0d1227" } }],
  "trn-global": [
    { src: trnLogo, alt: "TRN Global logo", caption: "", logo: { bg: "#ffffff" } },
    { src: trivvyLogo, alt: "Trivvy logo: a small robot beside the word TRIVVY", caption: "Trivvy, TRN Global's AI travel app.", logo: { bg: "#ffffff" } },
  ],
};

// Personal photos for the About page and the homepage.
export const photos = {
  portrait: { src: portrait, alt: "Arav in full dress uniform, carrying a folded American flag at a ceremony.", caption: "" },
  trail: { src: trail, alt: "Arav and his brother with trekking poles on a snowfield above a mountain valley.", caption: "Backpacking with my brother, Ansh." },
  coffee: { src: coffee, alt: "Hands setting a white ceramic dripper on a glass beaker of fresh pour-over coffee.", caption: "Photo: Gaia&Co on Unsplash." },
  volleyball: { src: volleyball, alt: "A varsity volleyball match in the Academy's gym.", caption: "Varsity volleyball at home." },
  risingStar: { src: risingStar, alt: "Arav in a white dress uniform at a Carlsbad Chamber of Commerce podium.", caption: "Accepting the Rising Star Award from the Carlsbad Chamber of Commerce." },
  modelCongress: { src: modelCongress, alt: "A mock courtroom session at Harvard Model Congress.", caption: "Harvard Model Congress, District Court." },
  interact: { src: interact, alt: "Interact Club members in school polos on a street in Carlsbad Village.", caption: "Interact Club volunteering in Carlsbad Village." },
} satisfies Record<string, Media>;
