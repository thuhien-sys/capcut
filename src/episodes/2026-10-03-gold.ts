import { Episode } from "../NewsBrief/types";

export const goldPrices20261003: Episode = {
  channel: "THE ECONOMIC ENGLISH BRIEF",
  source: "VnExpress",
  date: "October 3, 2026",
  tickers: [
    "SJC gold bar: VND143.5 million per tael",
    "Down 0.42% on Saturday morning",
    "Down 0.62% over the week",
    "Around 5,522 U.S. dollars per tael",
  ],
  scenes: [
    {
      type: "news",
      seconds: 30,
      opener: "breaking",
      category: "MARKETS",
      location: "VIETNAM",
      headline: "Vietnam gold prices slip for the week",
      visual: {
        type: "stats",
        stats: [
          {
            label: "SJC GOLD BAR",
            prefix: "VND",
            value: 143.5,
            decimals: 1,
            suffix: "M / tael",
            change: "0.42%",
            direction: "down",
            note: "Saturday morning",
          },
          {
            label: "WEEKLY CHANGE",
            prefix: "▼",
            value: 0.62,
            decimals: 2,
            suffix: "%",
            direction: "down",
            note: "over the week",
          },
          { label: "IN U.S. DOLLARS", prefix: "≈ $", value: 5522, suffix: " / tael", note: "VND143.5 million" },
        ],
      },
      english:
        "Vietnam **gold prices** **slipped** on Saturday morning, as gold prices **were down** for the week. According to VnExpress, **Saigon Gold Jewelry Company's** gold bar price **declined by 0.42%** to VND143.5 million per **tael**, or around 5,522 U.S. dollars. The price had also **fallen by 0.62%** over the week.",
      vietnamese:
        "Giá vàng tại Việt Nam giảm nhẹ vào sáng thứ Bảy, ghi nhận mức giảm trong cả tuần. Theo VnExpress, giá vàng miếng SJC giảm 0,42% xuống còn 143,5 triệu đồng/lượng, tương đương khoảng 5.522 USD/lượng. Tính chung cả tuần, giá vàng giảm 0,62%.",
      vocab: [
        { word: "gold prices", pos: "n", ipa: "/ɡəʊld ˈpraɪsɪz/", meaning: "giá vàng" },
        { word: "Tael", ipa: "/teɪl/", meaning: "lượng" },
        { word: "Slip", pos: "v", ipa: "/slɪp/", meaning: "giảm nhẹ" },
        { word: "Decline", pos: "v", ipa: "/dɪˈklaɪn/", meaning: "giảm" },
        { word: "Fall", pos: "v", ipa: "/fɔːl/", meaning: "giảm" },
      ],
    },
  ],
};
