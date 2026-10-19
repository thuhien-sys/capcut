import { Episode } from "../NewsBrief/types";

export const creditExtension20261018: Episode = {
  channel: "THE ECONOMIC ENGLISH BRIEF",
  source: "Explainer",
  date: "October 18, 2026",
  // Narration lives outside git (public/audio is ignored); scene lengths below follow it.
  audio: "audio/2026-10-18-credit.m4a",
  tickers: [
    "Banking operations: deposit receipt · credit extension · A2A payment services",
    "Credit extension: lending · discounting · finance lease · factoring · bank guarantee · L/C",
    "Bank guarantees: bid bonds · performance · payment · warranty",
  ],
  scenes: [
    {
      type: "card",
      seconds: 13.7,
      opener: "breaking",
      openerText: "TOP STORY",
      category: "TOP STORY",
      location: "BANKING",
      headline: "Credit extension explained",
      visual: { type: "title", kicker: "TOP STORY", title: "CREDIT EXTENSION", subtitle: "Banking English" },
      art: { icon: "handCoins", satellites: ["coins", "landmark", "fileText"] },
      lines: [
        { text: "Hello everyone, and welcome to", size: "md", at: 0.1 },
        { text: "THE ECONOMIC ENGLISH BRIEF", size: "lg", accent: true, at: 2 },
        { text: "Understand the news. Learn the language.", size: "sm", at: 4.9 },
        { text: "Our top story today is **Credit extension**.", size: "md", at: 8 },
        { text: "Let's get started.", size: "sm", at: 12 },
      ],
    },
    {
      type: "news",
      seconds: 18.3,
      category: "BANKING",
      location: "DEFINITION",
      headline: "What are banking operations?",
      visual: {
        type: "chips",
        kicker: "DEFINITION",
        title: "BANKING OPERATIONS",
        chips: [
          { name: "Deposit receipt", note: "Nhận tiền gửi", at: 10 },
          { name: "Credit extension", note: "Cấp tín dụng", at: 11.8 },
          { name: "A2A payment services", note: "Thanh toán qua tài khoản", at: 14.2 },
        ],
      },
      art: { icon: "landmark", satellites: ["banknote", "handCoins"] },
      english:
        '**"Banking operations"** mean trade in and regular provision of one or some of the following services:\na) **Deposit receipt**;\nb) **Credit extension**;\nc) Provision of **A2A payment services**.',
      vietnamese:
        "**Hoạt động ngân hàng** là việc kinh doanh, cung ứng thường xuyên một hoặc một số nghiệp vụ sau đây:\na) Nhận tiền gửi;\nb) Cấp tín dụng;\nc) Cung ứng dịch vụ thanh toán qua tài khoản.",
      vocab: [
        { word: "A2A payment services", pos: "n", ipa: "/ˈpeɪ.mənt ˈsɜː.vɪ.sɪz/", meaning: "dịch vụ thanh toán qua tài khoản" },
      ],
    },
    {
      type: "news",
      seconds: 33,
      category: "BANKING",
      location: "DEFINITION",
      headline: "What is credit extension?",
      visual: {
        type: "chips",
        kicker: "DEFINITION",
        title: "CREDIT EXTENSION",
        chips: [
          { name: "Lending", note: "Cho vay", at: 20.3 },
          { name: "Discounting", note: "Chiết khấu", at: 21.3 },
          { name: "Finance lease", note: "Cho thuê tài chính", at: 22.7 },
          { name: "Factoring", note: "Bao thanh toán", at: 24.3 },
          { name: "Bank guarantee", note: "Bảo lãnh ngân hàng", at: 25.8 },
          { name: "Letter of credit", note: "Thư tín dụng", at: 27.3 },
        ],
      },
      english:
        '**"Credit extension"** means an agreement that allows an organization or individual to use a sum of money or a commitment to allow use of a sum of money on the **repayment principle** by **lending**, **discounting**, **finance lease**, **factoring**, **bank guarantee**, **letter of credit** or another credit extension operation.',
      vietnamese:
        "**Cấp tín dụng** là việc thỏa thuận để tổ chức, cá nhân sử dụng một khoản tiền hoặc cam kết cho phép sử dụng một khoản tiền theo nguyên tắc có hoàn trả bằng nghiệp vụ cho vay, chiết khấu, cho thuê tài chính, bao thanh toán, bảo lãnh ngân hàng, thư tín dụng và các nghiệp vụ cấp tín dụng khác.",
      vocab: [
        { word: "Credit extension", pos: "n", ipa: "/ˈkred.ɪt ɪkˈsten.ʃən/", meaning: "cấp tín dụng" },
        { word: "Repayment principle", pos: "n", ipa: "/rɪˈpeɪ.mənt ˈprɪn.sə.pəl/", meaning: "nguyên tắc có hoàn trả" },
        { word: "Lending", pos: "n", ipa: "/ˈlen.dɪŋ/", meaning: "cho vay" },
        { word: "Discounting", pos: "n", ipa: "/dɪsˈkaʊn.tɪŋ/", meaning: "chiết khấu" },
        { word: "Finance lease", pos: "n", ipa: "/ˈfaɪ.næns liːs/", meaning: "thuê tài chính" },
        { word: "Factoring", pos: "n", ipa: "/ˈfæk.tər.ɪŋ/", meaning: "bao thanh toán" },
        { word: "Bank guarantee", pos: "n", ipa: "/ˈbæŋk ˌɡær.ənˈtiː/", meaning: "bảo lãnh ngân hàng" },
        { word: "Letter of credit (L/C)", pos: "n", ipa: "/ˌlet.ər əv ˈkred.ɪt/", meaning: "thư tín dụng" },
      ],
    },
    {
      type: "news",
      seconds: 36.7,
      category: "BANKING",
      location: "LENDING",
      headline: "What is lending?",
      visual: {
        type: "chips",
        kicker: "PRACTICAL EXAMPLES",
        title: "LENDING",
        chips: [
          { name: "Working capital loans", note: "Corporate customers", at: 26.7 },
          { name: "Home loans", note: "Individual customers", at: 32.4 },
        ],
      },
      art: { icon: "banknote", satellites: ["building", "users", "percent"] },
      english:
        '**"Lending"** means a form of credit extension whereby the **lender** gives or commits to give the **borrower** a sum of money for use for a specific purpose in a certain period on the principle of payment of both **principal and interest** as agreed.\nPractical examples: **Working capital loans** for corporate customers and **home loans** for individual customers.',
      vietnamese:
        "**Cho vay** là hình thức cấp tín dụng thông qua việc bên cho vay giao hoặc cam kết giao cho khách hàng một khoản tiền để sử dụng vào mục đích xác định, trong một thời gian nhất định, theo nguyên tắc có hoàn trả đầy đủ tiền gốc, lãi theo thỏa thuận cho bên cho vay.\n+ Ví dụ thực tế: cho vay bổ sung vốn lưu động cho khách hàng doanh nghiệp, cho vay mua nhà cho khách hàng cá nhân.",
      vocab: [
        { word: "Lender", pos: "n", ipa: "/ˈlen.dər/", meaning: "bên cho vay" },
        { word: "Borrower", pos: "n", ipa: "/ˈbɑːr.oʊ.ər/", meaning: "bên vay" },
        { word: "Principal and interest", pos: "n", ipa: "/ˈprɪn.sə.pəl/ /ˈɪn.trəst/", meaning: "tiền gốc và lãi" },
      ],
    },
    {
      type: "news",
      seconds: 51.9,
      category: "BANKING",
      location: "GUARANTEE",
      headline: "What is a bank guarantee?",
      visual: {
        type: "flow",
        kicker: "HOW IT WORKS",
        title: "BANK GUARANTEE",
        nodes: [
          { label: "Obligor", note: "Bên được bảo lãnh", icon: "user", at: 17 },
          { label: "Bank", note: "Tổ chức tín dụng", icon: "landmark", at: 7 },
          { label: "Obligee", note: "Bên nhận bảo lãnh", icon: "building", at: 23 },
        ],
        arrows: ["repays the bank", "pays if the obligor fails"],
      },
      english:
        '**"Bank guarantee"** means a form of credit extension to a client whereby a credit institution or foreign bank\'s branch undertakes to act on behalf of the **obligor** to fulfill their **financial obligations** to the **obligee** in the event the obligor fails to fulfill or insufficiently fulfills their obligations as agreed; the client shall have the obligation to repay the debt to the credit institution or the foreign bank\'s branch as agreed.',
      vietnamese:
        "**Bảo lãnh ngân hàng** là hình thức cấp tín dụng cho khách hàng thông qua việc tổ chức tín dụng, chi nhánh ngân hàng nước ngoài cam kết với bên nhận bảo lãnh về việc sẽ thực hiện nghĩa vụ tài chính thay cho bên có nghĩa vụ khi bên có nghĩa vụ không thực hiện hoặc thực hiện không đầy đủ nghĩa vụ đã cam kết; khách hàng phải nhận nợ bắt buộc và hoàn trả cho tổ chức tín dụng, chi nhánh ngân hàng nước ngoài theo thỏa thuận.",
      vocab: [
        { word: "Bank guarantee", pos: "n", ipa: "/ˈbæŋk ˌɡær.ənˈtiː/", meaning: "bảo lãnh ngân hàng" },
        { word: "Obligor", pos: "n", ipa: "/ˈɑː.blɪ.ɡɔːr/", meaning: "bên được bảo lãnh" },
        { word: "Obligee", pos: "n", ipa: "/ˌɑː.blɪˈdʒiː/", meaning: "bên nhận bảo lãnh" },
        { word: "Financial obligations", pos: "n", ipa: "/faɪˈnæn.ʃəl ˌɑː.blɪˈɡeɪ.ʃənz/", meaning: "nghĩa vụ tài chính" },
      ],
    },
    {
      type: "news",
      seconds: 11.9,
      category: "BANKING",
      location: "GUARANTEE",
      headline: "Common types of bank guarantees",
      visual: {
        type: "chips",
        kicker: "PRACTICAL EXAMPLES",
        title: "BANK GUARANTEES",
        chips: [
          { name: "Bid bonds", note: "Bảo lãnh dự thầu", at: 1.5 },
          { name: "Performance guarantees", note: "Bảo lãnh thực hiện hợp đồng", at: 3.4 },
          { name: "Payment guarantees", note: "Bảo lãnh thanh toán", at: 5.8 },
          { name: "Warranty guarantees", note: "Bảo lãnh bảo hành", at: 9.1 },
        ],
      },
      english:
        "Practical examples: **Bid bonds**, **performance guarantees**, **payment guarantees**, and **warranty guarantees**.",
      vietnamese: "Ví dụ thực tế: Bảo lãnh dự thầu, bảo lãnh thực hiện hợp đồng, bảo lãnh thanh toán, bảo lãnh bảo hành.",
      vocab: [
        { word: "Bid bonds", pos: "n", ipa: "/ˈbɪd ˌbɑːndz/", meaning: "bảo lãnh dự thầu" },
        { word: "Performance guarantees", pos: "n", ipa: "/pərˈfɔːr.məns ˌɡær.ənˈtiːz/", meaning: "bảo lãnh thực hiện hợp đồng" },
        { word: "Warranty guarantees", pos: "n", ipa: "/ˈwɔːr.ən.ti ˌɡær.ənˈtiːz/", meaning: "bảo lãnh bảo hành" },
      ],
    },
    {
      type: "card",
      seconds: 13.5,
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
        { text: "That's all for today's **Economic English Brief**.", size: "md", at: 0.9 },
        { text: "Understand the news. Learn the language.", size: "md", accent: true, at: 4.9 },
        { text: "Thanks for watching, and see you in the next update.", size: "sm", at: 8.2 },
      ],
    },
  ],
};
