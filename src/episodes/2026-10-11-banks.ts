import { IconName } from "../NewsBrief/Icons";
import { Episode } from "../NewsBrief/types";

const FOUR_GROUPS = [
  "State-owned commercial banks",
  "Private joint-stock commercial banks",
  "Joint-venture banks",
  "Wholly foreign-owned banks",
];
const GROUP_ICONS: IconName[] = ["landmark", "users", "handshake", "globe"];

export const commercialBanks20261011: Episode = {
  channel: "THE ECONOMIC ENGLISH BRIEF",
  source: "Explainer",
  date: "October 11, 2026",
  // Narration lives outside git (public/audio is ignored); scene lengths below follow it.
  audio: "audio/2026-10-11-banks.m4a",
  tickers: [
    "Law on Credit Institutions No. 32/2024/QH15",
    ...FOUR_GROUPS.map((group, i) => `Group ${i + 1}: ${group}`),
  ],
  scenes: [
    {
      type: "card",
      seconds: 14.2,
      opener: "breaking",
      openerText: "TOP STORY",
      category: "TOP STORY",
      location: "VIETNAM",
      headline: "Vietnam's commercial banking system",
      visual: { type: "title", kicker: "TOP STORY", title: "COMMERCIAL BANKS", subtitle: "Vietnam's banking system" },
      art: { icon: "landmark", satellites: ["coins", "banknote", "building"] },
      lines: [
        { text: "Hello everyone, and welcome to", size: "md", at: 0.2 },
        { text: "THE ECONOMIC ENGLISH BRIEF", size: "lg", accent: true, at: 2 },
        { text: "Understand the news. Learn the language.", size: "sm", at: 4.6 },
        { text: "Our top story today is **Vietnam's commercial banking system**.", size: "md", at: 7.7 },
        { text: "Let's get started.", size: "sm", at: 12.4 },
      ],
    },
    {
      type: "card",
      seconds: 7.4,
      category: "BANKING",
      location: "VIETNAM",
      headline: "How are commercial banks classified?",
      visual: {
        type: "title",
        kicker: "EXPLAINER",
        title: "BANK GROUPS",
        subtitle: "How are Vietnam's commercial banks classified?",
      },
      art: { icon: "question", satellites: ["landmark", "users", "globe"] },
      lines: [
        { text: "Have you ever wondered how **commercial banks** in Vietnam are **classified**?", size: "md", at: 0.3 },
        {
          text: "Bạn có biết hệ thống ngân hàng thương mại tại Việt Nam được phân loại như thế nào?",
          size: "sm",
          soft: true,
          at: 2.5,
        },
      ],
    },
    {
      type: "news",
      seconds: 23.4,
      category: "BANKING",
      location: "VIETNAM",
      headline: "What is a commercial bank?",
      visual: { type: "title", kicker: "DEFINITION", title: "COMMERCIAL BANK", subtitle: "Law No. 32/2024/QH15" },
      art: { icon: "scale", satellites: ["fileText", "gavel", "coins"] },
      english:
        "Under Vietnam's **Law on Credit Institutions** No. 32/2024/QH15, a **commercial bank** is a type of bank that may conduct **banking operations** and other business activities **in accordance with the law** for **profit purposes**.",
      vietnamese:
        "Theo Luật Các tổ chức tín dụng số 32/2024/QH15, ngân hàng thương mại là loại hình ngân hàng hoạt động nhằm mục tiêu lợi nhuận, thực hiện các hoạt động ngân hàng và hoạt động kinh doanh khác theo quy định pháp luật.",
      vocab: [
        { word: "commercial bank", ipa: "/kəˌmɜːʃəl ˈbæŋk/", meaning: "ngân hàng thương mại" },
        { word: "Law on Credit Institutions", ipa: "/lɔː ɒn ˈkredɪt ˌɪnstɪˈtjuːʃənz/", meaning: "Luật Các Tổ chức Tín dụng" },
        { word: "In accordance with the law", ipa: "/ɪn əˈkɔːdəns wɪð ðə lɔː/", meaning: "theo quy định pháp luật" },
      ],
    },
    {
      type: "news",
      seconds: 15.6,
      category: "BANKING",
      location: "VIETNAM",
      headline: "Four main groups of commercial banks",
      visual: { type: "points", label: "BY OWNERSHIP & CAPITAL", points: FOUR_GROUPS, icons: GROUP_ICONS },
      english:
        "Based on **ownership structure** and **sources of investment capital**, Vietnam's commercial banking system **can be classified** into **four main groups** for practical purposes.",
      vietnamese:
        "Xét theo cơ cấu sở hữu và nguồn vốn đầu tư, có thể chia hệ thống ngân hàng thương mại thành bốn nhóm chính.",
      vocab: [{ word: "be classified", ipa: "/bi ˈklæsɪfaɪd/", meaning: "được phân loại" }],
    },
    {
      type: "news",
      seconds: 24.7,
      category: "BANKING",
      location: "GROUP 1",
      headline: "State-owned commercial banks",
      visual: {
        type: "chips",
        kicker: "GROUP 1 / 4",
        title: "STATE-OWNED BANKS",
        chips: [
          { name: "Vietcombank", note: "State controlling stake" },
          { name: "VietinBank", note: "State controlling stake" },
          { name: "BIDV", note: "State controlling stake" },
          { name: "Agribank", note: "100% State-owned" },
        ],
      },
      art: { icon: "landmark", satellites: ["shieldCheck", "coins"] },
      englishTitle: "First, state-owned commercial banks.",
      english:
        "Notable examples include Vietcombank, VietinBank, BIDV, and Agribank. Agribank is **wholly owned** by the State, while the other three are **joint-stock commercial banks** in which the State holds a **controlling stake**.",
      vietnameseTitle: "Thứ nhất, nhóm ngân hàng có vốn Nhà nước chi phối.",
      vietnamese:
        "Tiêu biểu là Vietcombank, VietinBank, BIDV và Agribank. Trong đó, Agribank do Nhà nước sở hữu 100% vốn điều lệ; ba ngân hàng còn lại hoạt động theo mô hình cổ phần với Nhà nước nắm giữ cổ phần chi phối.",
      vocab: [{ word: "controlling stake", ipa: "/kənˈtrəʊlɪŋ steɪk/", meaning: "cổ phần chi phối" }],
    },
    {
      type: "news",
      seconds: 18.4,
      category: "BANKING",
      location: "GROUP 2",
      headline: "Private joint-stock commercial banks",
      visual: {
        type: "chips",
        kicker: "GROUP 2 / 4",
        title: "PRIVATE JOINT-STOCK",
        chips: [{ name: "MB" }, { name: "Techcombank" }, { name: "ACB" }, { name: "Sacombank" }, { name: "TPBank" }],
      },
      art: { icon: "users", satellites: ["chartPie", "building", "banknote"] },
      englishTitle: "Second, privately owned joint-stock commercial banks.",
      english:
        "These banks are **predominantly privately owned**. Representative examples include MB, Techcombank, ACB, Sacombank, and TPBank.",
      vietnameseTitle: "Thứ hai, nhóm ngân hàng thương mại cổ phần tư nhân.",
      vietnamese:
        "Đây là nhóm ngân hàng có cơ cấu sở hữu chủ yếu thuộc khu vực tư nhân, với các đại diện tiêu biểu như MB, Techcombank, ACB, Sacombank và TPBank.",
      vocab: [
        { word: "joint-stock commercial bank", ipa: "/ˌdʒɔɪnt ˈstɒk kəˌmɜːʃəl bæŋk/", meaning: "ngân hàng TMCP" },
      ],
    },
    {
      type: "news",
      seconds: 27.9,
      category: "BANKING",
      location: "GROUP 3",
      headline: "Joint-venture banks",
      visual: {
        type: "chips",
        kicker: "GROUP 3 / 4",
        title: "JOINT-VENTURE BANKS",
        chips: [
          { name: "IVB", note: "Indovina Bank" },
          { name: "VRB", note: "Vietnam-Russia Joint Venture Bank" },
        ],
      },
      art: { icon: "handshake", satellites: ["handCoins", "globe", "building"] },
      englishTitle: "Third, joint-venture banks.",
      english:
        "These banks are established in Vietnam through **capital contributions** from Vietnamese and **foreign parties**. Two notable examples are Indovina Bank, commonly known as IVB, and the Vietnam-Russia Joint Venture Bank, or VRB.",
      vietnameseTitle: "Thứ ba, nhóm ngân hàng liên doanh.",
      vietnamese:
        "Nhóm này gồm các ngân hàng được thành lập tại Việt Nam trên cơ sở góp vốn giữa bên Việt Nam và bên nước ngoài. Hai ví dụ tiêu biểu là Ngân hàng TNHH Indovina, gọi tắt là IVB, và Ngân hàng Liên doanh Việt – Nga, gọi tắt là VRB.",
      vocab: [{ word: "capital contributions", ipa: "/ˈkæpɪtəl ˌkɒntrɪˈbjuːʃənz/", meaning: "việc góp vốn" }],
    },
    {
      type: "news",
      seconds: 25.4,
      category: "BANKING",
      location: "GROUP 4",
      headline: "Wholly foreign-owned banks",
      visual: {
        type: "chips",
        kicker: "GROUP 4 / 4",
        title: "100% FOREIGN-OWNED",
        chips: [
          { name: "HSBC Vietnam" },
          { name: "Shinhan Bank Vietnam" },
          { name: "UOB Vietnam" },
          { name: "Woori Bank Vietnam" },
        ],
      },
      art: { icon: "earth", satellites: ["building", "briefcase", "shieldCheck"] },
      englishTitle: "Fourth, wholly foreign-owned banks.",
      english:
        "These banks are established in Vietnam as Vietnamese **legal entities** and are **wholly owned** by **foreign credit institutions**. Familiar names include HSBC Vietnam, Shinhan Bank Vietnam, UOB Vietnam, and Woori Bank Vietnam.",
      vietnameseTitle: "Thứ tư, nhóm ngân hàng 100% vốn nước ngoài.",
      vietnamese:
        "Đây là các ngân hàng được thành lập tại Việt Nam, có tư cách pháp nhân Việt Nam và thuộc sở hữu 100% của tổ chức tín dụng nước ngoài. Một số tên tuổi quen thuộc là HSBC Việt Nam, Shinhan Bank Việt Nam, UOB Việt Nam và Woori Bank Việt Nam.",
      vocab: [
        { word: "legal entity", ipa: "/ˈliːɡəl ˈentəti/", meaning: "pháp nhân" },
        { word: "foreign credit institutions", ipa: "/ˈfɒrɪn ˈkredɪt ˌɪnstɪˈtjuːʃənz/", meaning: "tổ chức tín dụng nước ngoài" },
      ],
    },
    {
      type: "news",
      seconds: 10.5,
      category: "BANKING",
      location: "VIETNAM",
      headline: "Who owns Vietnam's banks?",
      visual: { type: "points", label: "RECAP: 4 GROUPS", points: FOUR_GROUPS, icons: GROUP_ICONS },
      english:
        "Understanding these groups gives us a clearer picture of the **ownership structure** of Vietnam's **banking sector**.",
      vietnamese:
        "Hiểu rõ các nhóm này giúp chúng ta có cái nhìn rõ ràng hơn về cơ cấu sở hữu của ngành ngân hàng Việt Nam.",
      vocab: [{ word: "banking sector", ipa: "/ˈbæŋkɪŋ ˌsektə/", meaning: "ngành ngân hàng" }],
    },
    {
      type: "card",
      seconds: 12.5,
      category: "THE ECONOMIC ENGLISH BRIEF",
      location: "SEE YOU",
      headline: "Thanks for watching",
      visual: {
        type: "title",
        kicker: "THE ECONOMIC ENGLISH BRIEF",
        title: "THANK YOU",
        subtitle: "See you in the next update",
      },
      art: { icon: "graduationCap", satellites: ["bookOpen", "newspaper", "sparkles"] },
      lines: [
        { text: "That's all for today's **Economic English Brief**.", size: "md", at: 0.4 },
        { text: "Understand the news. Learn the language.", size: "md", accent: true, at: 4.4 },
        { text: "Thanks for watching, and see you in the next update.", size: "sm", at: 7.3 },
      ],
    },
  ],
};
