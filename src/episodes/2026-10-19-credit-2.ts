import { Episode } from "../NewsBrief/types";

export const creditExtensionPart220261019: Episode = {
  channel: "THE ECONOMIC ENGLISH BRIEF",
  source: "Explainer",
  date: "October 19, 2026",
  // Narration lives outside git (public/audio is ignored); scene lengths below follow it.
  audio: "audio/2026-10-19-credit-2.m4a",
  tickers: [
    "Credit extension: lending · discounting · finance lease · factoring · bank guarantee · L/C",
    "Discounting: buying negotiable instruments and valuable papers before their due date",
    "L/C operation: issuance · confirmation · negotiation of payment · reimbursement",
    "Factoring: buying accounts receivable from a seller",
  ],
  scenes: [
    {
      type: "card",
      seconds: 14.3,
      opener: "breaking",
      openerText: "TOP STORY",
      category: "TOP STORY",
      location: "BANKING",
      headline: "Credit extension: discounting, L/C and factoring",
      visual: { type: "title", kicker: "TOP STORY", title: "CREDIT EXTENSION", subtitle: "Discounting · L/C · Factoring" },
      art: { icon: "handCoins", satellites: ["fileText", "percent", "landmark"] },
      lines: [
        { text: "Hello everyone, and welcome to", size: "md", at: 1 },
        { text: "THE ECONOMIC ENGLISH BRIEF", size: "lg", accent: true, at: 3 },
        { text: "Understand the news. Learn the language.", size: "sm", at: 6 },
        { text: "Our top story today is **Credit extension**.", size: "md", at: 9 },
        { text: "Let's get started.", size: "sm", at: 12.3 },
      ],
    },
    {
      type: "news",
      seconds: 28.5,
      category: "BANKING",
      location: "DEFINITION",
      headline: "What is credit extension?",
      visual: {
        type: "chips",
        kicker: "DEFINITION",
        title: "CREDIT EXTENSION",
        chips: [
          { name: "Lending", note: "Cho vay", at: 16.5 },
          { name: "Discounting", note: "Chiết khấu", at: 17.6 },
          { name: "Finance lease", note: "Cho thuê tài chính", at: 18.8 },
          { name: "Factoring", note: "Bao thanh toán", at: 20.3 },
          { name: "Bank guarantee", note: "Bảo lãnh ngân hàng", at: 21.7 },
          { name: "Letter of credit", note: "Thư tín dụng", at: 23.2 },
        ],
      },
      english:
        '**"Credit extension"** means an agreement that allows an organization or individual to use a sum of money or a commitment to allow use of a sum of money on the **repayment principle** by **lending**, **discounting**, **finance lease**, **factoring**, **bank guarantee**, **letter of credit** or another credit extension operation.',
      vietnamese:
        "**Cấp tín dụng** là việc thỏa thuận để tổ chức, cá nhân sử dụng một khoản tiền hoặc cam kết cho phép sử dụng một khoản tiền theo nguyên tắc có hoàn trả bằng nghiệp vụ cho vay, chiết khấu, cho thuê tài chính, bao thanh toán, bảo lãnh ngân hàng, thư tín dụng và các nghiệp vụ cấp tín dụng khác.",
      vocab: [],
    },
    {
      type: "news",
      seconds: 20.9,
      category: "BANKING",
      location: "DISCOUNTING",
      headline: "What is discounting?",
      visual: {
        type: "chips",
        kicker: "DEFINITION",
        title: "DISCOUNTING",
        chips: [
          { name: "Negotiable instruments", note: "Công cụ chuyển nhượng", at: 12.2 },
          { name: "Valuable papers", note: "Giấy tờ có giá", at: 14.2 },
          { name: "Before the due date", note: "Trước khi đến hạn thanh toán", at: 17.6 },
        ],
      },
      english:
        '**"Discounting"** means a form of credit extension by purchase on a definite term or purchase of the right to collect **negotiable instruments** and other **valuable papers** of **beneficiaries** prior to their due date.',
      vietnamese:
        "**Chiết khấu** là hình thức cấp tín dụng thông qua việc mua có kỳ hạn hoặc mua có bảo lưu quyền truy đòi các công cụ chuyển nhượng, giấy tờ có giá khác của bên thụ hưởng trước khi đến hạn thanh toán.",
      vocab: [
        { word: "Negotiable instruments", pos: "n", ipa: "/nɪˈɡəʊʃiəbəl ˈɪnstrəmənts/", meaning: "công cụ chuyển nhượng" },
        { word: "Valuable papers", pos: "n", ipa: "/ˈvæljuəbəl ˈpeɪpəz/", meaning: "giấy tờ có giá" },
        { word: "Beneficiaries", pos: "n", ipa: "/ˌbenɪˈfɪʃiəriz/", meaning: "bên thụ hưởng" },
      ],
    },
    {
      type: "news",
      seconds: 26.2,
      category: "BANKING",
      location: "EXAMPLE",
      headline: "Discounting: an example",
      visual: {
        type: "stats",
        stats: [
          { label: "BILL OF EXCHANGE", prefix: "VND", value: 100, suffix: "million", note: "payable in 90 days", at: 2.3 },
          { label: "COMPANY RECEIVES NOW", prefix: "VND", value: 98, suffix: "million", note: "from the bank", at: 17.6 },
          { label: "BANK'S DISCOUNT", prefix: "VND", value: 2, suffix: "million", direction: "down", note: "deducted by the bank", at: 21.6 },
        ],
      },
      english:
        "For example, a company holds a **bill of exchange** worth 100 million Vietnamese dong, payable in 90 days. Instead of waiting three months to receive the money, the company sells the bill to a bank and receives 98 million dong. The bank deducts 2 million dong as a **discount**.",
      vietnamese:
        "Ví dụ, một doanh nghiệp đang nắm giữ một hối phiếu có mệnh giá 100 triệu đồng, sẽ được thanh toán sau 90 ngày. Thay vì chờ 3 tháng để nhận tiền, doanh nghiệp bán hối phiếu này cho ngân hàng và nhận trước 98 triệu đồng. Ngân hàng chiết khấu 2 triệu đồng, tức là doanh nghiệp nhận ít hơn mệnh giá hối phiếu 2 triệu đồng để đổi lấy việc nhận tiền sớm.",
      vocab: [{ word: "a bill of exchange", pos: "n", ipa: "/ə ˌbɪl əv ɪksˈtʃeɪndʒ/", meaning: "hối phiếu" }],
    },
    {
      type: "news",
      seconds: 21.4,
      category: "BANKING",
      location: "L/C",
      headline: "What is an L/C operation?",
      visual: {
        type: "chips",
        kicker: "DEFINITION",
        title: "LETTER OF CREDIT (L/C)",
        chips: [
          { name: "Issuance", note: "Phát hành", at: 6.1 },
          { name: "Confirmation", note: "Xác nhận", at: 8.5 },
          { name: "Negotiation of payment", note: "Thương lượng thanh toán", at: 9.9 },
          { name: "Reimbursement", note: "Hoàn trả", at: 12.4 },
        ],
      },
      english:
        '**"L/C operation"** means a form of credit extension through **issuance**, **confirmation**, **negotiation of payment** or **reimbursement of L/C** to serve the purchase and sale of goods and services.',
      vietnamese:
        "**Nghiệp vụ thư tín dụng** là hình thức cấp tín dụng thông qua nghiệp vụ phát hành, xác nhận, thương lượng thanh toán, hoàn trả thư tín dụng để phục vụ cho hoạt động mua bán hàng hóa, dịch vụ.",
      vocab: [
        { word: "Issuance", pos: "n", ipa: "/ˈɪʃuːəns/", meaning: "phát hành" },
        { word: "Confirmation", pos: "n", ipa: "/ˌkɒnfəˈmeɪʃən/", meaning: "xác nhận" },
        { word: "Negotiation of payment", pos: "n", ipa: "/nɪˌɡəʊʃiˈeɪʃən əv ˈpeɪmənt/", meaning: "thương lượng thanh toán" },
        { word: "Reimbursement of L/C", pos: "n", ipa: "/ˌriːɪmˈbɜːsmənt əv ˌel ˈsiː/", meaning: "hoàn trả thư tín dụng" },
      ],
    },
    {
      type: "news",
      seconds: 23.5,
      category: "BANKING",
      location: "FACTORING",
      headline: "What is factoring?",
      visual: {
        type: "flow",
        kicker: "HOW IT WORKS",
        title: "FACTORING",
        nodes: [
          { label: "Purchaser", note: "Bên mua", icon: "users", at: 11.5 },
          { label: "Bank", note: "Tổ chức tín dụng", icon: "landmark", at: 1 },
          { label: "Seller", note: "Bên bán", icon: "building", at: 8.7 },
        ],
        arrows: ["pays when due", "pays the seller in advance"],
      },
      english:
        '**"Factoring"** means a form of extension of credit by purchasing **accounts receivable** from a seller or giving an advance on behalf of a **purchaser** under a sale contract or service contract between the seller and the purchaser.',
      vietnamese:
        "**Bao thanh toán** là hình thức cấp tín dụng thông qua việc mua lại khoản phải thu của bên bán hoặc ứng trước tiền thanh toán thay cho bên mua theo hợp đồng mua, bán hàng hóa, cung ứng dịch vụ giữa bên mua và bên bán.",
      vocab: [
        { word: "Accounts receivable", pos: "n", ipa: "/əˌkaʊnts rɪˈsiːvəbəl/", meaning: "khoản phải thu" },
        { word: "Purchaser", pos: "n", ipa: "/ˈpɜːtʃəsə/", meaning: "bên mua" },
      ],
    },
    {
      type: "news",
      seconds: 40.9,
      category: "BANKING",
      location: "EXAMPLE",
      headline: "Factoring: an example",
      visual: {
        type: "stats",
        stats: [
          { label: "GOODS SOLD TO A SUPERMARKET", prefix: "VND", value: 100, suffix: "million", note: "payable in 60 days", at: 1.6 },
          { label: "RECEIVED IN ADVANCE", prefix: "VND", value: 95, suffix: "million", note: "from the bank", at: 18.5 },
        ],
      },
      art: { icon: "handCoins", satellites: ["building", "landmark"] },
      english:
        "Example:\nCompany A sells goods worth VND 100 million to a supermarket, payable in 60 days. Instead of waiting two months, Company A sells its **receivable** to a bank and receives VND 95 million **in advance**. The bank then **collects the payment** from the supermarket when it is due. In simple terms, **factoring** helps businesses receive money earlier instead of waiting for customers to pay.",
      vietnamese:
        "Công ty A bán hàng trị giá 100 triệu đồng cho siêu thị, được thanh toán sau 60 ngày. Thay vì chờ hai tháng, công ty bán khoản phải thu cho ngân hàng và nhận trước 95 triệu đồng. Khi đến hạn, ngân hàng thu tiền từ siêu thị. Tóm lại, bao thanh toán giúp doanh nghiệp nhận tiền sớm thay vì phải chờ khách hàng thanh toán.",
      vocab: [],
    },
    {
      type: "card",
      seconds: 13.2,
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
        { text: "That's all for today's **Economic English Brief**.", size: "md", at: 0.7 },
        { text: "Understand the news. Learn the language.", size: "md", accent: true, at: 4.8 },
        { text: "Thanks for watching, and see you in the next update.", size: "sm", at: 7.9 },
      ],
    },
  ],
};
