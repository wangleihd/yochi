import type { Metadata } from "next";
import { Mail, MessageCircle, CalendarCheck, LifeBuoy, Clock4 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PRICING_FAQS } from "@/lib/pricing";
import type { FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "帮助中心 — 曜驰 Yochi",
  description:
    "曜驰 Yochi 帮助中心：产品使用、账号安全、订阅计费与支持服务常见问题，以及联系客服方式。",
};

const PRODUCT_FAQS: FaqItem[] = [
  {
    q: "曜驰支持哪些平台？",
    a: "目前小红书为深度支持的核心平台，覆盖图文种草笔记的创建、定时发布与数据统计。抖音、微博、B 站等平台正在接入中，将陆续开放。",
  },
  {
    q: "如何绑定小红书账号？",
    a: "登录工作台后进入「账号管理 → 添加账号」，按提示使用小红书 App 扫码授权即可完成绑定。支持一次性批量绑定多个账号，整个流程约 2 分钟。",
  },
  {
    q: "多账号发布一篇内容需要重复编辑吗？",
    a: "不需要。你只需创作一篇内容，在发布时可选择目标账号并分别调整标题、标签等细节，系统会自动完成多账号分发，大幅减少重复劳动。",
  },
  {
    q: "定时发布最多可以提前多久？",
    a: "发布队列支持任意未来时间点，可提前数周规划。专业版及以上还可使用黄金时段智能推荐功能。",
  },
  {
    q: "数据多久更新一次？",
    a: "基础版数据每日更新并生成周报；专业版及以上提供实时数据看板，发布后数分钟内即可看到数据反馈。",
  },
  {
    q: "可以导入其他平台的内容吗？",
    a: "支持从公众号、微博等平台复制图文内容并快速转成小红书排版；也支持批量导入本地文档与图片素材。",
  },
];

const SECURITY_FAQS: FaqItem[] = [
  {
    q: "账号授权是否安全？会不会封号？",
    a: "曜驰遵循平台合规运营要求，采用官方授权与安全模拟操作结合的方式，所有发布行为均模拟真人操作节奏，严格控制频率与行为特征，最大限度降低风险。同时内置账号健康度监测与操作频率保护。",
  },
  {
    q: "账号密码会被看到吗？",
    a: "不会。我们通过官方扫码授权与加密 Cookie 会话管理，全程不保存你的明文密码。登录态加密存储，支持一键失效。",
  },
  {
    q: "账号出现异地登录或异常怎么办？",
    a: "系统会实时监测账号登录态与异常行为，一旦发现风险立即告警并自动暂停相关任务，你可以在工作台一键重置授权。",
  },
  {
    q: "数据如何存储与保护？",
    a: "所有数据采用 AES-256 加密存储，传输全程 TLS 加密，通过等保三级认证。你的素材与内容数据不会用于任何其他用途。",
  },
  {
    q: "如果账号被封，曜驰负责吗？",
    a: "我们提供「账号安全承诺」：因平台风控导致的账号问题，专业版及以上用户可联系专属客服获得 1v1 申诉协助与运营策略调整建议。",
  },
];

const SUPPORT_FAQS: FaqItem[] = [
  {
    q: "如何联系人工客服？",
    a: "免费版用户可通过工单系统或官方社区获得支持；付费用户支持企业微信专属客服，工作时间内平均 5 分钟响应；企业版提供 7×24 小时专属服务。",
  },
  {
    q: "支持产品演示吗？",
    a: "支持。企业版与专业版用户可预约一对一产品演示，我们会根据你的账号规模与业务场景定制演示内容。",
  },
  {
    q: "有使用教程或帮助文档吗？",
    a: "有。绑定账号后可在工作台内查看「新手引导」，帮助中心也提供图文教程、视频教程与常见问题检索。",
  },
  {
    q: "如何反馈功能建议或 Bug？",
    a: "非常欢迎！可通过「帮助中心 → 反馈建议」提交，或发送邮件至 hello@yochix.com。我们每周都会汇总用户反馈并更新产品。",
  },
];

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "邮件联系",
    desc: "hello@yochix.com",
    sub: "商务合作 / 功能建议 / 一般咨询",
  },
  {
    icon: MessageCircle,
    title: "企业微信客服",
    desc: "工作日 9:00 – 21:00",
    sub: "付费用户专属，平均 5 分钟响应",
  },
  {
    icon: CalendarCheck,
    title: "预约产品演示",
    desc: "按需预约",
    sub: "专业版及以上可预约 1v1 演示",
  },
  {
    icon: LifeBuoy,
    title: "工单系统",
    desc: "工作台内提交",
    sub: "免费版用户支持渠道",
  },
];

export default function FaqPage() {
  return (
    <>
      {/* 页头 */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_55%)]"
        />
        <div className="container-page relative text-center">
          <span className="section-eyebrow">帮助中心</span>
          <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            常见问题
            <span className="text-gradient-brand"> 一站式解答</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            找不到答案？随时联系我们的支持团队，工作日平均 5 分钟响应。
          </p>
        </div>
      </section>

      {/* 产品使用 */}
      <section className="pb-20">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div>
            <SectionHeading
              align="left"
              eyebrow="产品使用"
              title="上手很简单"
              className="mb-6"
            />
            <p className="text-slate-500">
              从账号绑定到第一篇笔记发布，全程有引导。这里整理了使用中最常遇到的问题。
            </p>
          </div>
          <div className="lg:col-span-2">
            <FaqAccordion items={PRODUCT_FAQS} />
          </div>
        </div>
      </section>

      {/* 账号安全 */}
      <section className="bg-slate-50/70 py-20">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div>
            <SectionHeading
              align="left"
              eyebrow="账号与安全"
              title="安心运营，无后顾之忧"
              className="mb-6"
            />
            <p className="text-slate-500">
              关于账号授权、数据安全与平台合规，我们给出了最坦诚的说明。
            </p>
          </div>
          <div className="lg:col-span-2">
            <FaqAccordion items={SECURITY_FAQS} />
          </div>
        </div>
      </section>

      {/* 订阅计费 */}
      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div>
            <SectionHeading
              align="left"
              eyebrow="订阅与计费"
              title="消费明明白白"
              className="mb-6"
            />
            <p className="text-slate-500">
              订阅、发票、升级与退款相关的问题，都可以在这里找到答案。
            </p>
          </div>
          <div className="lg:col-span-2">
            <FaqAccordion items={PRICING_FAQS} />
          </div>
        </div>
      </section>

      {/* 支持服务 */}
      <section className="bg-slate-50/70 py-20">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div>
            <SectionHeading
              align="left"
              eyebrow="支持与服务"
              title="我们随时在你身边"
              className="mb-6"
            />
            <p className="text-slate-500">
              无论遇到什么问题，都有多种方式找到我们。
            </p>
          </div>
          <div className="lg:col-span-2">
            <FaqAccordion items={SUPPORT_FAQS} />
          </div>
        </div>
      </section>

      {/* 联系 */}
      <section id="contact" className="py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="联系我们"
            title="需要更直接的帮助？"
            subtitle="选择你习惯的方式，我们会尽快回复。"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_METHODS.map((m) => (
              <div key={m.title} className="card p-6 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-400/20 via-brand-500/20 to-teal-500/20 text-brand-600">
                  <m.icon className="size-6" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{m.title}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-600">
                  {m.desc}
                </p>
                <p className="mt-1 text-xs text-slate-400">{m.sub}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 px-6 py-4 text-sm text-brand-800">
            <Clock4 className="size-5 shrink-0 text-brand-600" />
            客服工作时间：周一至周日 9:00 – 21:00（企业版 7×24 小时）
          </div>
        </div>
      </section>
    </>
  );
}
