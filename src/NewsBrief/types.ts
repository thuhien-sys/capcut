import type { IconName } from "./Icons";

export type Stat = {
  label: string;
  prefix?: string;
  value: number;
  decimals?: number;
  suffix?: string;
  change?: string;
  direction?: "up" | "down";
  note?: string;
  /** Seconds into the scene when the card appears, e.g. when the narrator reads it. */
  at?: number;
};

export type VocabItem = {
  word: string;
  pos?: string;
  ipa?: string;
  meaning: string;
};

/** What the news screen (top video area) shows under the lower third. */
export type ScreenVisual =
  | { type: "stats"; stats: Stat[] }
  | { type: "points"; label: string; points: string[]; /** Shown instead of the numbers. */ icons?: IconName[] }
  | { type: "title"; kicker: string; title: string; subtitle?: string; direction?: "up" | "down" }
  | { type: "chips"; kicker: string; title: string; chips: { name: string; note?: string }[] };

/** Illustration at the top right of the news screen: an animated icon, or a photo in /public. */
export type SceneArt = { icon: IconName; satellites?: IconName[] } | { image: string };

type SceneBase = {
  seconds: number;
  category: string;
  location: string;
  headline: string;
  visual: ScreenVisual;
  /** "breaking" plays the BREAKING NEWS opener; "wipe" is a short transition. */
  opener?: "breaking" | "wipe";
  /** Text on the "breaking" opener band; defaults to BREAKING NEWS. */
  openerText?: string;
  art?: SceneArt;
};

/** Text with **double asterisks** marks highlighted words. */
export type NewsScene = SceneBase & {
  type: "news";
  /** Optional bold heading lines shown above each paragraph. */
  englishTitle?: string;
  vietnameseTitle?: string;
  english: string;
  vietnamese: string;
  vocab: VocabItem[];
};

export type VerbListScene = SceneBase & {
  type: "verbList";
  intro: string;
  title: string;
  /** `at`: seconds into the scene when the item appears. */
  items: { word: string; ipa: string; usage: string; example: string; at?: number }[];
};

export type PatternScene = SceneBase & {
  type: "patterns";
  title: string;
  items: { pattern: string; meaning?: string; example: string; at?: number }[];
};

export type CardScene = SceneBase & {
  type: "card";
  /** `soft`: Vietnamese-style secondary text (regular weight, muted). */
  lines: { text: string; size?: "lg" | "md" | "sm"; accent?: boolean; soft?: boolean; at?: number }[];
};

export type Scene = NewsScene | VerbListScene | PatternScene | CardScene;

export type Episode = {
  channel: string;
  source: string;
  date: string;
  tickers: string[];
  /** Optional file in /public used as background footage for the news screen. */
  backgroundVideo?: string;
  /** Optional narration file in /public, played from the first frame. */
  audio?: string;
  scenes: Scene[];
};
