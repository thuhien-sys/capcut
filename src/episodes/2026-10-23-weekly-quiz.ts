import { Episode, QuizScene } from "../NewsBrief/types";

const TOTAL = 6;

/** A quiz scene with the shared labels; the countdown runs 5 seconds and the answer holds 6. */
const question = (
  number: number,
  countdownAt: number,
  scene: Pick<QuizScene, "question" | "vietnamese" | "vocab">,
): QuizScene => ({
  type: "quiz",
  seconds: countdownAt + 5 + 6,
  category: "WEEKLY REVIEW",
  location: "QUIZ",
  headline: `Can you fill in the blanks? Question ${number} of ${TOTAL}`,
  number,
  total: TOTAL,
  countdownAt,
  ...scene,
});

export const weeklyQuiz20261023: Episode = {
  channel: "THE ECONOMIC ENGLISH BRIEF",
  source: "Weekly review",
  date: "October 23, 2026",
  // Narration to come; until then the countdowns are timed for an estimated reading pace.
  music: "audio/music-calm-214s.wav",
  musicVolume: 0.1,
  tickers: [
    "Weekly review: 6 questions from this week's briefs",
    "Pause the video if you need more time",
    "Comment your score below!",
  ],
  scenes: [
    {
      type: "card",
      seconds: 12,
      opener: "breaking",
      openerText: "WEEKLY REVIEW",
      category: "WEEKLY REVIEW",
      location: "QUIZ",
      headline: "This week's fill-in-the-blanks challenge",
      visual: { type: "title", kicker: "WEEKLY REVIEW", title: "QUIZ TIME", subtitle: `Fill in the blanks · ${TOTAL} questions` },
      art: { icon: "question", satellites: ["bookOpen", "sparkles", "graduationCap"] },
      lines: [
        { text: "Hello everyone, and welcome to", size: "md", at: 0.3 },
        { text: "THE ECONOMIC ENGLISH BRIEF", size: "lg", accent: true, at: 1.8 },
        { text: "Understand the news. Learn the language.", size: "sm", at: 3.4 },
        { text: "Let's review what we've learned this week with a quick **fill-in-the-blanks challenge**.", size: "md", at: 5.2 },
        { text: "Let's get started!", size: "sm", at: 9.5 },
      ],
    },
    question(1, 22.8, {
      question:
        '"[[Credit extension]]" means an agreement that allows an organization or individual to use a sum of money or a commitment to allow use of a sum of money on the [[repayment]] principle by lending, discounting, finance lease, factoring, bank guarantee, letter of credit or another credit extension operation.',
      vietnamese:
        "**Cấp tín dụng** là việc thỏa thuận để tổ chức, cá nhân sử dụng một khoản tiền hoặc cam kết cho phép sử dụng một khoản tiền theo nguyên tắc có **hoàn trả** bằng nghiệp vụ cho vay, chiết khấu, cho thuê tài chính, bao thanh toán, bảo lãnh ngân hàng, thư tín dụng và các nghiệp vụ cấp tín dụng khác.",
      vocab: [
        { word: "Credit extension", pos: "n", ipa: "/ˈkrɛdɪt ɪkˈstɛnʃən/", meaning: "cấp tín dụng" },
        { word: "Repayment", pos: "n", ipa: "/rɪˈpeɪmənt/", meaning: "hoàn trả" },
      ],
    }),
    question(2, 20.3, {
      question:
        '"[[Lending]]" means a form of credit extension whereby the lender gives or commits to give the borrower a sum of money for use for a specific purpose in a certain period on the principle of payment of both [[principal]] and interest as agreed.',
      vietnamese:
        "**Cho vay** là hình thức cấp tín dụng thông qua việc bên cho vay giao hoặc cam kết giao cho khách hàng một khoản tiền để sử dụng vào mục đích xác định, trong một thời gian nhất định, theo nguyên tắc có hoàn trả đầy đủ **tiền gốc**, lãi theo thỏa thuận cho bên cho vay.",
      vocab: [
        { word: "Lending", pos: "n", ipa: "/ˈlɛndɪŋ/", meaning: "cho vay" },
        { word: "Principal", pos: "n", ipa: "/ˈprɪnsəpəl/", meaning: "tiền gốc" },
      ],
    }),
    question(3, 24.4, {
      question:
        "[[A2A payments]], also called account-to-account payments, is broadly speaking the method of moving money directly from one bank account to another. Through the use of real-time payment rails the transactions happen real time, but if automated clearing house (ACH) rails are used then transactions may happen near-real-time or slower.",
      vietnamese:
        "**Thanh toán A2A** là hình thức chuyển tiền trực tiếp giữa hai tài khoản ngân hàng. Tốc độ xử lý giao dịch phụ thuộc vào hạ tầng thanh toán được sử dụng: giao dịch có thể được xử lý theo thời gian thực nếu sử dụng hệ thống thanh toán thời gian thực, hoặc chậm hơn nếu sử dụng hệ thống thanh toán bù trừ tự động ACH.",
      vocab: [{ word: "A2A payments", pos: "n", ipa: "/ˌeɪ tuː ˈeɪ ˈpeɪmənts/", meaning: "thanh toán A2A" }],
    }),
    question(4, 16.9, {
      question:
        "[[A current account]] is a bank account used mainly for everyday transactions, such as depositing and withdrawing money, making payments, and transferring funds. It is generally designed for frequent transactions rather than long-term savings.",
      vietnamese:
        "**Tài khoản thanh toán** là tài khoản ngân hàng được sử dụng chủ yếu cho các giao dịch hằng ngày, chẳng hạn như nộp tiền, rút tiền, thanh toán và chuyển khoản. Tài khoản này thường được sử dụng để phục vụ các giao dịch thường xuyên thay vì mục đích tiết kiệm dài hạn.",
      vocab: [{ word: "A current account", pos: "n", ipa: "/ə ˈkɜːrənt əˌkaʊnt/", meaning: "tài khoản thanh toán" }],
    }),
    question(5, 23.2, {
      question:
        '"[[Discounting]]" means a form of credit extension involving the purchase, for a specified term, of negotiable instruments and other valuable papers, or the purchase of the right to collect amounts due under such instruments and papers, from [[beneficiaries]] before their due date.',
      vietnamese:
        "**Chiết khấu** là hình thức cấp tín dụng thông qua việc mua có kỳ hạn hoặc mua có bảo lưu quyền truy đòi các công cụ chuyển nhượng, giấy tờ có giá khác của **bên thụ hưởng** trước khi đến hạn thanh toán.",
      vocab: [
        { word: "Discounting", pos: "n", ipa: "/dɪsˈkaʊntɪŋ/", meaning: "chiết khấu" },
        { word: "Beneficiaries", pos: "n", ipa: "/ˌbenɪˈfɪʃiˌeriz/", meaning: "bên thụ hưởng" },
      ],
    }),
    question(6, 18.2, {
      question:
        '"[[Factoring]]" means a form of extension of credit by purchasing [[accounts receivable]] from a seller or giving an advance on behalf of a purchaser under a sale contract or service contract between the seller and the purchaser.',
      vietnamese:
        "**Bao thanh toán** là hình thức cấp tín dụng thông qua việc mua lại **khoản phải thu** của bên bán hoặc ứng trước tiền thanh toán thay cho bên mua theo hợp đồng mua, bán hàng hóa, cung ứng dịch vụ giữa bên mua và bên bán.",
      vocab: [
        { word: "Factoring", pos: "n", ipa: "/ˈfæktərɪŋ/", meaning: "bao thanh toán" },
        { word: "Accounts receivable", pos: "n", ipa: "/əˌkaʊnts rɪˈsiːvəbl/", meaning: "khoản phải thu" },
      ],
    }),
    {
      type: "card",
      seconds: 9,
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
        { text: "Understand the news. Learn the language.", size: "md", accent: true, at: 3 },
        { text: "Thanks for watching, and see you in the next update.", size: "sm", at: 5.2 },
      ],
    },
  ],
};
