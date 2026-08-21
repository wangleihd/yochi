export type Plan = {
  id: string;
  name: string;
  nameEn: string;
  /** 适用人群 */
  audience: string;
  /** 价格区卖点 */
  tagline: string;
  /** 月付单价（元/月） */
  monthly: number;
  /** 年付总价（元/年）· 付 10 个月用 12 个月 */
  yearly: number;
  featured?: boolean;
  cta: string;
  highlight: string[];
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "免费版",
    nameEn: "Free",
    audience: "首次体验",
    tagline: "体验 AI 文案、生图和发布流程",
    monthly: 0,
    yearly: 0,
    cta: "免费开始",
    highlight: [
      "1 个小红书账号",
      "每月 5 次发布 / 写文 / 生图",
      "500 MB 存储空间",
      "额度与到期提醒",
    ],
  },
  {
    id: "starter",
    name: "入门版",
    nameEn: "Starter",
    audience: "个人创作者",
    tagline: "适合个人号日常更新",
    monthly: 99,
    yearly: 990,
    cta: "立即订阅",
    highlight: [
      "3 个小红书账号",
      "每月 30 次发布 / 写文 / 生图",
      "1 GB 存储空间",
      "多账号批量发布",
      "定时发布",
    ],
  },
  {
    id: "pro",
    name: "专业版",
    nameEn: "Pro",
    audience: "代运营、小团队",
    tagline: "适合代运营和内容团队",
    monthly: 499,
    yearly: 4990,
    featured: true,
    cta: "立即订阅",
    highlight: [
      "10 个小红书账号",
      "每月 1200 次发布 / 写文 / 生图",
      "2 GB 存储空间",
      "逐账号发布结果反馈",
      "优先技术支持",
    ],
  },
  {
    id: "enterprise",
    name: "企业版",
    nameEn: "Enterprise",
    audience: "MCN、机构",
    tagline: "适合 MCN、品牌机构和规模化投放",
    monthly: 1599,
    yearly: 15990,
    cta: "联系销售",
    highlight: [
      "30 个小红书账号",
      "每月 3600 次发布 / 写文 / 生图",
      "5 GB 存储空间",
      "专属客户经理",
    ],
  },
];

export type ComparisonCell = boolean | string;

export const COMPARISON: {
  group: string;
  rows: { feature: string; cells: [ComparisonCell, ComparisonCell, ComparisonCell, ComparisonCell] }[];
}[] = [
  {
    group: "账号与额度",
    rows: [
      { feature: "小红书账号", cells: ["1 个", "3 个", "10 个", "30 个"] },
      { feature: "发布次数 / 月", cells: ["5 次", "30 次", "1200 次", "3600 次"] },
      { feature: "写文次数 / 月", cells: ["5 次", "30 次", "1200 次", "3600 次"] },
      { feature: "生图次数 / 月", cells: ["5 张", "30 张", "1200 张", "3600 张"] },
      { feature: "存储空间", cells: ["500 MB", "1 GB", "2 GB", "5 GB"] },
    ],
  },
  {
    group: "核心功能",
    rows: [
      { feature: "爆款文案生成", cells: [true, true, true, true] },
      { feature: "AI 图片生成", cells: [true, true, true, true] },
      { feature: "多账号批量发布", cells: [false, true, true, true] },
      { feature: "定时发布", cells: [false, true, true, true] },
      { feature: "逐账号发布结果", cells: [false, true, true, true] },
    ],
  },
  {
    group: "服务与支持",
    rows: [
      { feature: "额度与到期提醒", cells: [true, true, true, true] },
      { feature: "优先技术支持", cells: [false, false, true, true] },
      { feature: "专属客户经理", cells: [false, false, false, true] },
    ],
  },
];

/** 写文次数包（独立购买，不占用套餐额度） */
export const WRITE_PACKS = [
  { id: "write-30", count: 30, price: 39 },
  { id: "write-100", count: 100, price: 99 },
  { id: "write-300", count: 300, price: 259 },
];

/** 生图次数包（独立购买，不占用套餐额度） */
export const IMAGE_PACKS = [
  { id: "image-30", count: 30, price: 59 },
  { id: "image-100", count: 100, price: 169 },
  { id: "image-300", count: 300, price: 469 },
];

export const PACK_RULES = [
  "可单独购买，也可叠加购买",
  "购买后 12 个月内有效",
  "写文和生图分开计费，缺什么补什么",
  "次数用完后可再次购买，不影响基础套餐周期",
];

/** 年付优势 · 付 10 个月，用 12 个月 */
export const YEARLY_SAVINGS = [
  { plan: "入门版", monthly: 99, yearly: 990, save: 198 },
  { plan: "专业版", monthly: 499, yearly: 4990, save: 998 },
  { plan: "企业版", monthly: 1599, yearly: 15990, save: 3198 },
];

export const YEARLY_SLOGAN = "年付立享“付 10 个月，用 12 个月”，最高省 ¥3,198";

/** 推荐购买组合 */
export const RECOMMENDATIONS = [
  {
    type: "个人创作者",
    plan: "入门版",
    extra: "30 次写文包",
    desc: "个人号日常更新，写文次数不够时灵活补充。",
  },
  {
    type: "代运营团队",
    plan: "专业版",
    extra: "100 次写文包 + 100 张生图包",
    desc: "多账号矩阵运营，内容产能按需增量。",
  },
  {
    type: "MCN / 机构",
    plan: "企业版",
    extra: "300 次写文包 + 300 张生图包",
    desc: "规模化投放，全量产能保障。",
  },
];

export const PRICING_FAQS = [
  {
    q: "年付“付 10 个月，用 12 个月”怎么算？",
    a: "年付一次性支付 10 个月的费用，即可使用 12 个月，折合月价更低：入门版省 ¥198、专业版省 ¥998、企业版省 ¥3,198。年付用户未使用部分可按比例退款。",
  },
  {
    q: "写文次数和生图次数如何扣减？",
    a: "两类次数独立扣减、互不影响：写文次数用于生成或改写文案，生图次数用于生成或编辑图片。每月账期结束时重新发放当月额度。",
  },
  {
    q: "每月额度用完了怎么办？",
    a: "可以单独购买写文或生图次数包（30 / 100 / 300 次），购买后 12 个月内有效，不强制升级套餐。基础套餐作为稳定产能，次数包作为灵活增量。",
  },
  {
    q: "次数包可以叠加购买吗？",
    a: "可以。次数包可单独购买也可叠加，次数用完后可再次购买，不影响基础套餐的计费周期。",
  },
  {
    q: "订阅后可以随时取消吗？",
    a: "可以。月付与年付均支持随时取消，取消后服务保留至当期结束，不会立刻中断你的发布计划。",
  },
  {
    q: "可以开发票吗？",
    a: "可以。支持开具增值税普通发票与专用发票，订阅后可在「账单中心」自助申请，电子发票即时推送至邮箱。",
  },
];
