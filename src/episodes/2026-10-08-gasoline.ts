import { Episode } from "../NewsBrief/types";

export const gasolinePrices20261008: Episode = {
  channel: "THE ECONOMIC ENGLISH BRIEF",
  source: "VnExpress",
  date: "October 8, 2026",
  // Narration lives outside git (public/audio is ignored); scene lengths below follow it.
  audio: "audio/2026-10-08-gasoline.m4a",
  tickers: [
    "RON95: VND28,250 per liter ▲3.94%",
    "E5 RON92: VND27,700 per liter ▲4.29%",
    "Diesel: VND29,120 per liter ▼1.99%",
    "Global RON 95: $154 a barrel ▲4.6%",
    "Global diesel: $163.30 a barrel ▼2.2%",
    "Fuel oil: $720.20 a metric ton ▲3.8%",
  ],
  scenes: [
    {
      type: "card",
      seconds: 14.6,
      opener: "breaking",
      category: "TOP STORY",
      location: "VIETNAM",
      headline: "Gasoline prices continue to climb",
      visual: { type: "title", kicker: "TOP STORY", title: "GASOLINE PRICES", direction: "up", subtitle: "Vietnam · Thursday" },
      lines: [
        { text: "Hello everyone, and welcome to", size: "md", at: 1 },
        { text: "THE ECONOMIC ENGLISH BRIEF", size: "lg", accent: true, at: 3 },
        { text: "Understand the news. Learn the language.", size: "sm", at: 5.7 },
        { text: "Our top story today is gasoline **prices**.", size: "md", at: 8.8 },
        { text: "Let's get started.", size: "sm", at: 12.6 },
      ],
    },
    {
      type: "news",
      seconds: 49,
      category: "ENERGY",
      location: "VIETNAM",
      headline: "Vietnam gasoline prices continue to climb",
      visual: {
        type: "stats",
        stats: [
          {
            label: "RON95",
            prefix: "VND",
            value: 28250,
            suffix: "/ liter",
            change: "3.94%",
            direction: "up",
            note: "from a week ago",
          },
          {
            label: "E5 RON92",
            prefix: "VND",
            value: 27700,
            suffix: "/ liter",
            change: "4.29%",
            direction: "up",
            at: 28,
          },
          {
            label: "DIESEL",
            prefix: "VND",
            value: 29120,
            suffix: "/ liter",
            change: "1.99%",
            direction: "down",
            at: 39.4,
          },
        ],
      },
      english:
        "Vietnam **gasoline** prices continued to **climb** Thursday **amid** an increase in global **fuel** costs. The popular fuel RON95 **added 3.94%** from a week ago to VND28,250 (US$1.09) per liter. E5 RON92 **went up 4.29%** to VND27,700. Diesel **fell 1.99%** to VND29,120.",
      vietnamese:
        "Giá xăng Việt Nam tiếp tục tăng vào thứ Năm trong bối cảnh chi phí nhiên liệu toàn cầu gia tăng. Xăng RON95, loại xăng được sử dụng phổ biến, tăng 3,94% so với một tuần trước, lên 28.250 đồng/lít (1,09 USD/lít). Xăng E5 RON92 tăng 4,29% lên 27.700 đồng/lít, trong khi dầu diesel giảm 1,99% xuống 29.120 đồng/lít.",
      vocab: [
        { word: "Gasoline", pos: "n", ipa: "/ˈɡæs.əl.iːn/", meaning: "xăng" },
        { word: "Climb", pos: "v", ipa: "/klaɪm/", meaning: "tăng" },
        { word: "Amid", pos: "pre", ipa: "/əˈmɪd/", meaning: "trong bối cảnh" },
        { word: "Fuel", pos: "n", ipa: "/ˈfjuː.əl/", meaning: "nhiên liệu" },
      ],
    },
    {
      type: "news",
      seconds: 29.2,
      category: "ENERGY",
      location: "VIETNAM",
      headline: "Global fuel market remains under pressure",
      visual: {
        type: "points",
        label: "WHAT'S MOVING THE MARKET",
        points: ["Stalled U.S.–Iran negotiations", "The E.U. releases diesel reserves"],
      },
      english:
        "**The Ministry of Industry and Trade** and **the Ministry of Finance** said the global fuel market has continued to be affected in recent days by developments including **stalled negotiations** between the U.S. and Iran and the E.U.'s release of **diesel reserves**.",
      vietnamese:
        "Bộ Công Thương và Bộ Tài chính cho biết thị trường nhiên liệu toàn cầu trong những ngày gần đây tiếp tục chịu tác động bởi nhiều diễn biến, trong đó có các cuộc đàm phán giữa Mỹ và Iran bị đình trệ và việc Liên minh châu Âu (EU) giải phóng nguồn dự trữ dầu diesel.",
      vocab: [
        { word: "The Ministry of Industry and Trade", meaning: "Bộ Công Thương" },
        { word: "The Ministry of Finance", meaning: "Bộ Tài chính" },
        { word: "Stalled negotiations", pos: "np", ipa: "/stɔːld nɪˌɡəʊʃiˈeɪʃənz/", meaning: "các cuộc đàm phán bị đình trệ" },
        { word: "Diesel reserves", pos: "np", ipa: "/ˈdiːzəl rɪˈzɜːvz/", meaning: "nguồn dự trữ dầu diesel" },
      ],
    },
    {
      type: "news",
      seconds: 29.6,
      category: "GLOBAL MARKETS",
      location: "GLOBAL",
      headline: "Global fuel prices: mixed moves",
      visual: {
        type: "stats",
        stats: [
          { label: "RON 95 GASOLINE", prefix: "$", value: 154, suffix: "/ barrel", change: "4.6%", direction: "up" },
          { label: "DIESEL", prefix: "$", value: 163.3, decimals: 2, suffix: "/ barrel", change: "2.2%", direction: "down", at: 10 },
          { label: "FUEL OIL", prefix: "$", value: 720.2, decimals: 2, suffix: "/ ton", change: "3.8%", direction: "up", at: 19.2 },
        ],
      },
      english:
        "RON 95 gasoline **rose 4.6%** to $154 a barrel, while diesel **fell 2.2%** to $163.30 a barrel. Fuel oil **increased 3.8%** to $720.20 a metric ton.",
      vietnamese:
        "Giá xăng RON95 tăng 4,6% lên 154 USD/thùng, trong khi giá dầu diesel giảm 2,2% xuống 163,30 USD/thùng. Giá dầu nhiên liệu tăng 3,8% lên 720,20 USD/tấn.",
      vocab: [
        { word: "Rise", pos: "v", ipa: "/raɪz/", meaning: "tăng" },
        { word: "Increase", pos: "v", ipa: "/ɪnˈkriːs/", meaning: "tăng" },
      ],
    },
    {
      type: "news",
      seconds: 27.8,
      category: "POLICY",
      location: "VIETNAM",
      headline: "Firms may soon set their own fuel prices",
      visual: {
        type: "points",
        label: "DRAFT DECREE ON FUEL TRADING",
        points: ["Businesses set their own selling prices", "Replaces maximum prices announced every 7 days"],
      },
      english:
        "The Ministry of Industry and Trade is finalizing a **draft decree** on fuel trading that would allow businesses to **calculate** and set their own **selling prices**, replacing the current system under which the government announces **maximum prices** every seven days.",
      vietnamese:
        "Bộ Công Thương đang hoàn thiện dự thảo nghị định về kinh doanh xăng dầu, theo đó cho phép các doanh nghiệp tự tính toán và quyết định giá bán, thay thế cơ chế hiện hành trong đó Chính phủ công bố giá bán tối đa bảy ngày một lần.",
      vocab: [{ word: "Calculate", pos: "v", ipa: "/ˈkælkjəleɪt/", meaning: "tính toán" }],
    },
    {
      type: "verbList",
      seconds: 40.9,
      category: "NEWS ENGLISH",
      location: "LEARN",
      headline: "Verbs for price increases",
      visual: { type: "title", kicker: "NEWS ENGLISH", title: "PRICE INCREASE", direction: "up", subtitle: "Common verbs" },
      intro: "Let's take a look at some common verbs for describing **price increases** in economic news.",
      title: "PRICE INCREASE — NEWS ENGLISH",
      items: [
        { word: "rise", ipa: "/raɪz/", usage: "neutral", example: "Prices **rose** 3%.", at: 11.2 },
        { word: "increase", ipa: "/ɪnˈkriːs/", usage: "formal", example: "Prices **increased** 3%.", at: 11.8 },
        { word: "climb", ipa: "/klaɪm/", usage: "gradual / noticeable", example: "Prices **climbed** 4%.", at: 12.5 },
        { word: "jump", ipa: "/dʒʌmp/", usage: "sharp increase", example: "Prices **jumped** 8%.", at: 13.1 },
        { word: "surge", ipa: "/sɜːdʒ/", usage: "sharp increase", example: "Prices **surged** 8%.", at: 13.7 },
        { word: "edge up", ipa: "/edʒ ʌp/", usage: "slight increase", example: "Prices **edged up** 0.2%.", at: 14.4 },
        { word: "gain", ipa: "/ɡeɪn/", usage: "common in financial news", example: "The index **gained** 1.5%.", at: 15.2 },
      ],
    },
    {
      type: "patterns",
      seconds: 91.4,
      category: "NEWS ENGLISH",
      location: "LEARN",
      headline: "How to report price changes",
      visual: { type: "title", kicker: "NEWS ENGLISH", title: "STRUCTURES", subtitle: "Reporting price changes" },
      title: "USEFUL STRUCTURES",
      items: [
        { pattern: "rose / climbed / jumped + % + to + price", example: "Ex: Oil prices **rose 2% to** 10 USD.", at: 5.5 },
        {
          pattern: "amid + N",
          meaning: "in the context of (trong bối cảnh)",
          example: "Ex: Gold prices rose **amid** rising global demand.",
          at: 25.3,
        },
        {
          pattern: "due to + N",
          meaning: "because of (bởi vì)",
          example: "Ex: Fuel prices rose **due to** higher oil costs.",
          at: 38.7,
        },
        {
          pattern: "driven by + N",
          meaning: "caused or supported by (được thúc đẩy bởi)",
          example: "Ex: Gold prices climbed, **driven by** strong demand.",
          at: 59,
        },
        { pattern: "following + N", meaning: "after (sau khi)", example: "Ex: **following** the announcement", at: 79.5 },
      ],
    },
    {
      type: "card",
      seconds: 14,
      category: "THE ECONOMIC ENGLISH BRIEF",
      location: "SEE YOU",
      headline: "Thanks for watching",
      visual: {
        type: "title",
        kicker: "THE ECONOMIC ENGLISH BRIEF",
        title: "THANK YOU",
        subtitle: "See you in the next update",
      },
      lines: [
        { text: "That's all for today's **Economic English Brief**.", size: "md", at: 0.5 },
        { text: "Understand the news. Learn the language.", size: "md", accent: true, at: 4 },
        { text: "Thanks for watching, and see you in the next update.", size: "sm", at: 7.1 },
      ],
    },
  ],
};
