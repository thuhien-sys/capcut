export type Stat = {
  label: string;
  prefix?: string;
  value: number;
  decimals?: number;
  suffix?: string;
  change?: string;
  direction?: "up" | "down";
  note?: string;
};

export type VocabItem = {
  word: string;
  pos?: string;
  ipa: string;
  meaning: string;
};

export type Episode = {
  channel: string;
  source: string;
  date: string;
  category: string;
  location: string;
  headline: string;
  tickers: string[];
  stats: Stat[];
  /** English script. Wrap words in **double asterisks** to highlight them. */
  english: string;
  vietnamese: string;
  vocab: VocabItem[];
  /** Optional file in /public used as background footage for the news screen. */
  backgroundVideo?: string;
  durationInSeconds: number;
};
