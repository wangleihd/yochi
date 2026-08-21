import type { Metadata } from "next";
import {
  Users2,
  ShieldCheck,
  FolderOpen,
  Wand2,
  Send,
  CalendarClock,
  BarChart3,
  Users,
  Check,
  X,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "功能总览 — 曜驰 Yochi",
  description:
    "曜驰 Yochi 功能总览：多账号矩阵管理、小红书种草图文批量发布、智能定时队列、云端素材库、数据洞察与团队协作。",
};

const GROUPS = [
  {
    icon: Users2,
    eyebrow: "多账号管理",
    title: "矩阵运营，从混乱到有序",
    desc: "无论 3 个还是 30 个账号，统一接入、统一管理、统一安全防护。",
    items: [
      {
        icon: Users2,
        title: "批量绑定与分组",
        desc: "扫码批量授权，按品牌、品类、人设分组运营，账号再多也井井有条。",
      },
      {
        icon: ShieldCheck,
        title: "登录态自动维护",
        desc: "登录态加密托管、自动刷新，告别频繁重授权；异常登录实时告警。",
      },
      {
        icon: BarChart3,
        title: "账号健康度监测",
        desc: "实时评估每个账号的运营健康度，风险提前预警，止损在发生之前。",
      },
      {
        icon: Users,
        title: "多角色权限",
        desc: "管理员、运营、审核、只读等角色灵活配置，谁动过什么一目了然。",
      },
    ],
  },
  {
    icon: Wand2,
    eyebrow: "内容与 AI",
    title: "让好内容批量生长",
    desc: "素材库 + AI 助手，把内容生产效率拉满，把创作灵感留给真正重要的事。",
    items: [
      {
        icon: FolderOpen,
        title: "云端素材库",
        desc: "图片、文案、模板统一沉淀，团队共享、版本管理，随取随用。",
      },
      {
        icon: Wand2,
        title: "AI 标题与文案",
        desc: "输入主题即可生成多个标题方案，一键润色改写，适配不同账号人设。",
      },
      {
        icon: Send,
        title: "话题标签推荐",
        desc: "基于品类与热点自动推荐话题组合，提升笔记被发现的概率。",
      },
      {
        icon: BarChart3,
        title: "爆文结构拆解",
        desc: "解析爆款笔记的开头、结构与钩子，生成可复用的创作模板。",
      },
    ],
  },
  {
    icon: CalendarClock,
    eyebrow: "发布与排期",
    title: "精准踩点，自动分发",
    desc: "一稿多投、智能定时、失败重试，发布这件事从此全自动。",
    items: [
      {
        icon: Send,
        title: "一稿多账号分发",
        desc: "一篇内容同步发布到多个账号，可分别微调标题与标签，效率提升 10 倍。",
      },
      {
        icon: CalendarClock,
        title: "智能定时队列",
        desc: "结合粉丝活跃曲线推荐黄金时段，错峰发布，让每篇笔记都在最佳时机上线。",
      },
      {
        icon: Users,
        title: "可视化排期日历",
        desc: "月历视图纵览全部排期，拖拽调整、批量修改，团队协作更高效。",
      },
      {
        icon: ShieldCheck,
        title: "失败自动重试",
        desc: "发布异常自动重试并通知，杜绝漏发、重发，全程可追溯。",
      },
    ],
  },
  {
    icon: BarChart3,
    eyebrow: "数据洞察",
    title: "用数据驱动每一次迭代",
    desc: "从曝光到涨粉，全链路数据复盘，让内容策略越做越准。",
    items: [
      {
        icon: BarChart3,
        title: "实时数据看板",
        desc: "曝光、阅读、互动、涨粉实时更新，核心指标一屏掌握。",
      },
      {
        icon: Users,
        title: "多账号横向对比",
        desc: "账号间数据同屏对比，快速定位问题账号与潜力账号。",
      },
      {
        icon: Wand2,
        title: "爆文归因分析",
        desc: "拆解爆文背后的选题、标题与发布时间，沉淀为可复用策略。",
      },
      {
        icon: FolderOpen,
        title: "数据周报自动生成",
        desc: "每周自动汇总团队数据表现，一键导出，汇报零负担。",
      },
    ],
  },
];

const COMPARE = [
  { label: "绑定 10 个账号", manual: "分别登录、分别发布", yochi: "扫码批量绑定，一次搞定" },
  { label: "一篇内容发 10 个号", manual: "重复编辑 10 遍", yochi: "一稿多投，自动分发" },
  { label: "把握黄金发布时间", manual: "靠感觉，凭运气", yochi: "数据模型智能推荐" },
  { label: "复盘数据表现", manual: "手动截图，逐个统计", yochi: "实时看板 + 自动周报" },
  { label: "账号异常与安全", manual: "发现问题时已晚", yochi: "健康监测，提前预警" },
];

export default function FeaturesPage() {
  return (
    <>
      {/* 页头 */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_55%)]"
        />
        <div className="container-page relative text-center">
          <span className="section-eyebrow">功能总览</span>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            围绕小红书种草场景，
            <span className="text-gradient-brand"> 打造完整工具链</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            从账号管理、内容创作到批量发布与数据复盘，四大能力模块覆盖多账号运营全流程。
          </p>
        </div>
      </section>

      {/* 功能组 */}
      {GROUPS.map((group) => (
        <section
          key={group.eyebrow}
          className={group.eyebrow === "发布与排期" ? "bg-slate-50/70 py-20 lg:py-24" : "bg-white py-20 lg:py-24"}
        >
          <div className="container-page">
            <div className="mb-12 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
                  <group.icon className="size-4" />
                  {group.eyebrow}
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-3 text-slate-600">{group.desc}</p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {group.items.map((item) => (
                <div key={item.title} className="card group p-6">
                  <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400/20 via-brand-500/20 to-teal-500/20 text-brand-600 transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="size-5" />
                  </span>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 对比 */}
      <section className="bg-slate-950 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            dark
            eyebrow="效率对比"
            title={
              <>
                手动运营 vs{" "}
                <span className="text-gradient-brand"> 曜驰 Yochi</span>
              </>
            }
            subtitle="同样是多账号运营，差别一目了然。"
          />
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-800">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-slate-800 bg-slate-900/80 text-sm font-bold">
              <div className="px-6 py-4 text-slate-400">场景</div>
              <div className="px-6 py-4 text-center text-slate-400">手动运营</div>
              <div className="px-6 py-4 text-center text-brand-300">
                曜驰 Yochi
              </div>
            </div>
            {COMPARE.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[1.2fr_1fr_1fr] border-b border-slate-800/80 text-sm last:border-0"
              >
                <div className="px-6 py-4 font-semibold text-slate-200">
                  {row.label}
                </div>
                <div className="flex items-center justify-center gap-1.5 px-6 py-4 text-center text-slate-400">
                  <X className="size-4 shrink-0 text-slate-600" />
                  <span className="text-xs leading-snug sm:text-sm">
                    {row.manual}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1.5 px-6 py-4 text-center text-slate-300">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-500/20">
                    <Check className="size-3 text-brand-300" strokeWidth={3} />
                  </span>
                  <span className="text-xs leading-snug sm:text-sm">
                    {row.yochi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
