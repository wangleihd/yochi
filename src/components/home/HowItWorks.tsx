import { Plug, PenLine, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const STEPS = [
  {
    icon: Plug,
    step: "01",
    title: "绑定账号",
    desc: "扫码授权，将你的小红书账号安全接入曜驰。支持批量导入，几分钟完成矩阵搭建。",
  },
  {
    icon: PenLine,
    step: "02",
    title: "创作内容",
    desc: "使用素材库与 AI 助手高效产出种草图文，配置话题标签与目标账号，一稿多用。",
  },
  {
    icon: Rocket,
    step: "03",
    title: "一键发布",
    desc: "选择立即发布或定时推送，曜驰自动分发到全部目标账号，并持续追踪数据表现。",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%)]"
      />
      <div className="container-page relative">
        <SectionHeading
          dark
          eyebrow="三步上手"
          title={
            <>
              10 分钟，开启你的
              <span className="text-gradient-brand"> 多账号种草之旅</span>
            </>
          }
          subtitle="不需要学习成本，像发朋友圈一样简单，但比手动发布高效十倍。"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.step} className="relative">
              {/* 连接线 */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="absolute left-full top-16 hidden h-px w-6 bg-gradient-to-r from-brand-500/60 to-transparent md:block lg:w-12"
                />
              )}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur transition-colors hover:border-brand-500/40">
                <div className="flex items-center justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-lime-400 via-brand-500 to-teal-500 text-white shadow-lg shadow-brand-500/30">
                    <s.icon className="size-7" />
                  </span>
                  <span className="text-4xl font-black text-slate-800">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
