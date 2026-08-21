export type Plan = {
  id: string;
  name: string;
  nameEn: string;
  tagline: string;
  /** 月付价格（元/月），null 表示定制报价 */
  monthly: number | null;
  /** 年付折算月价（元/月），null 表示定制报价 */
  yearly: number | null;
  featured?: boolean;
  cta: string;
  highlight: string[];
  metrics: { label: string; value: string }[];
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "免费版",
    nameEn: "Free",
    tagline: "轻量体验，先跑通一次完整发布流程",
    monthly: 0,
    yearly: 0,
    cta: "免费开始",
    highlight: ["1 个账号位", "每月 10 篇发布额度", "基础图文模板", "社区支持"],
    metrics: [
      { label: "账号位", value: "1" },
      { label: "月度发布", value: "10 篇" },
      { label: "素材存储", value: "1 GB" },
    ],
  },
  {
    id: "starter",
    name: "基础版",
    nameEn: "Starter",
    tagline: "个人博主与起步团队的日常选择",
    monthly: 99,
    yearly: 79,
    cta: "立即订阅",
    highlight: [
      "5 个账号位",
      "每月 200 篇发布额度",
      "定时发布队列",
      "数据周报",
    ],
    metrics: [
      { label: "账号位", value: "5" },
      { label: "月度发布", value: "200 篇" },
      { label: "素材存储", value: "10 GB" },
    ],
  },
  {
    id: "pro",
    name: "专业版",
    nameEn: "Pro",
    tagline: "多账号矩阵运营团队的效率引擎",
    monthly: 299,
    yearly: 239,
    featured: true,
    cta: "立即订阅",
    highlight: [
      "20 个账号位",
      "每月 1000 篇发布额度",
      "AI 标题与文案助手",
      "实时数据看板",
      "5 个团队成员席位",
    ],
    metrics: [
      { label: "账号位", value: "20" },
      { label: "月度发布", value: "1000 篇" },
      { label: "素材存储", value: "100 GB" },
    ],
  },
  {
    id: "enterprise",
    name: "企业版",
    nameEn: "Enterprise",
    tagline: "品牌、机构与规模化团队的定制方案",
    monthly: null,
    yearly: null,
    cta: "联系销售",
    highlight: [
      "不限账号位",
      "专属发布额度",
      "私有化部署可选",
      "专属客户成功经理",
      "SLA 服务保障",
    ],
    metrics: [
      { label: "账号位", value: "不限" },
      { label: "月度发布", value: "定制" },
      { label: "部署方式", value: "SaaS / 私有化" },
    ],
  },
];

export type ComparisonCell = boolean | string;

export const COMPARISON: {
  group: string;
  rows: { feature: string; cells: [ComparisonCell, ComparisonCell, ComparisonCell, ComparisonCell] }[];
}[] = [
  {
    group: "账号与发布",
    rows: [
      { feature: "绑定小红书账号", cells: [true, true, true, true] },
      { feature: "账号数量", cells: ["1 个", "5 个", "20 个", "不限"] },
      { feature: "月度发布额度", cells: ["10 篇", "200 篇", "1000 篇", "定制"] },
      { feature: "定时发布队列", cells: [false, true, true, true] },
      { feature: "多平台扩展（抖音 / 微博 / B站）", cells: [false, "即将上线", true, true] },
      { feature: "草稿多账号批量分发", cells: [false, false, true, true] },
    ],
  },
  {
    group: "内容与 AI",
    rows: [
      { feature: "图文模板库", cells: ["基础", "基础", "高级", "定制"] },
      { feature: "素材云存储", cells: ["1 GB", "10 GB", "100 GB", "不限"] },
      { feature: "AI 标题生成", cells: [false, false, true, true] },
      { feature: "AI 文案润色与改写", cells: [false, false, true, true] },
      { feature: "标签（话题）智能推荐", cells: [false, true, true, true] },
    ],
  },
  {
    group: "数据与协作",
    rows: [
      { feature: "发布数据统计", cells: [true, true, true, true] },
      { feature: "数据周报", cells: [false, true, true, true] },
      { feature: "实时数据看板", cells: [false, false, true, true] },
      { feature: "团队成员席位", cells: ["1 人", "2 人", "5 人", "不限"] },
      { feature: "内容审核流", cells: [false, false, true, true] },
      { feature: "专属客户成功经理", cells: [false, false, false, true] },
    ],
  },
  {
    group: "服务与合规",
    rows: [
      { feature: "人工客服支持", cells: ["社区", "工单", "工单 + 企微", "专属 1v1"] },
      { feature: "数据加密存储", cells: [true, true, true, true] },
      { feature: "私有化部署", cells: [false, false, false, true] },
      { feature: "SLA 服务保障", cells: [false, false, false, true] },
    ],
  },
];

export const PRICING_FAQS = [
  {
    q: "订阅后可以随时取消吗？",
    a: "可以。月付与年付均支持随时取消，取消后服务保留至当期结束，不会立刻中断你的发布计划。年付用户未使用部分可按比例退款。",
  },
  {
    q: "账号额度不够用怎么办？",
    a: "可在「工作台 → 订阅」中随时升级套餐或增购账号位与发布额度包，按天折算费用，即时生效。",
  },
  {
    q: "企业版支持私有化部署吗？",
    a: "支持。企业版提供 SaaS 与私有化部署两种形态，私有化部署支持内网环境与专属数据合规要求，具体可联系销售获取方案。",
  },
  {
    q: "可以开发票吗？",
    a: "可以。支持开具增值税普通发票与专用发票，订阅后可在「账单中心」自助申请，电子发票即时推送至邮箱。",
  },
];
