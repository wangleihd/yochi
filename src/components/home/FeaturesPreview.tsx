import {
  Users2,
  Send,
  CalendarClock,
  FolderOpen,
  BarChart3,
  Wand2,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const FEATURES = [
  {
    icon: Users2,
    title: "多账号矩阵管理",
    desc: "集中绑定、管理全部小红书账号，一键切换，统一授权与安全防护，账号再多也不乱。",
    tag: "核心能力",
  },
  {
    icon: Send,
    title: "种草图文批量发布",
    desc: "一篇内容同步分发到多个账号，支持图文、合集、话题标签一站式配置，效率提升 10 倍。",
    tag: "核心能力",
  },
  {
    icon: CalendarClock,
    title: "智能定时队列",
    desc: "错峰发布、黄金时段自动推送，可视化排期日历，让每篇笔记都在最合适的时间上线。",
    tag: "效率",
  },
  {
    icon: FolderOpen,
    title: "云端素材库",
    desc: "图片、文案、模板统一沉淀，团队共享、版本管理，创作素材随取随用。",
    tag: "内容资产",
  },
  {
    icon: BarChart3,
    title: "数据实时洞察",
    desc: "曝光、阅读、互动、涨粉全维度复盘，多账号横向对比，用数据驱动下一轮选题。",
    tag: "增长",
  },
  {
    icon: Wand2,
    title: "AI 创作助手",
    desc: "标题灵感、文案润色、标签推荐、爆款结构拆解，AI 辅助让你的内容更会种草。",
    tag: "AI 赋能",
  },
];

export function FeaturesPreview() {
  return (
    <section className="bg-slate-50/70 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="核心功能"
          title={
            <>
              从创作到复盘，
              <span className="text-gradient-brand"> 一站式搞定</span>
            </>
          }
          subtitle="围绕小红书种草场景打造的完整工具链，覆盖内容生产、发布管理与数据增长的每一个环节。"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="card group p-7">
              <div className="mb-5 flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-400/20 via-brand-500/20 to-teal-500/20 text-brand-600 transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="size-6" />
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  {f.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
