import { ShieldCheck, CalendarClock, LineChart, Check } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type Row = {
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  visual: React.ReactNode;
  reversed?: boolean;
};

function AccountVisual() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5">
      <p className="mb-4 text-sm font-semibold text-slate-700">账号安全中心</p>
      <div className="space-y-3">
        {[
          { n: "种草小分队", s: "小红书 · 主账号", p: "98" },
          { n: "好物研究所", s: "小红书 · 矩阵号", p: "92" },
          { n: "生活美学志", s: "小红书 · 矩阵号", p: "90" },
        ].map((a) => (
          <div
            key={a.n}
            className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium text-slate-800">{a.n}</p>
              <p className="text-xs text-slate-400">{a.s}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                <ShieldCheck className="size-3.5" /> 健康度 {a.p}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50/70 px-4 py-3 text-xs text-brand-700">
        <ShieldCheck className="size-4 shrink-0" />
        设备指纹风控 · 登录态自动刷新 · 异地异常实时告警
      </div>
    </div>
  );
}

function ScheduleVisual() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">本周排期</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
          <CalendarClock className="size-3.5" /> 24 篇待发布
        </span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["一", "二", "三", "四", "五", "六", "日"].map((d, i) => (
          <div
            key={d}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-xl py-3",
              i === 2 ? "bg-gradient-to-b from-lime-400 to-brand-500" : "bg-slate-50"
            )}
          >
            <span className={cn("text-xs", i === 2 ? "text-white" : "text-slate-400")}>
              周{d}
            </span>
            <span className={cn("text-lg font-bold", i === 2 ? "text-white" : "text-slate-700")}>
              {i + 8}
            </span>
            {i === 2 && (
              <span className="text-[10px] font-medium text-white/80">3 篇 · 黄金时段</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {[
          { t: "秋冬面霜测评", time: "今天 12:30", on: true },
          { t: "通勤穿搭合集", time: "周三 18:00", on: true },
          { t: "露营装备清单", time: "周六 10:00", on: false },
        ].map((x) => (
          <div
            key={x.t}
            className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-2.5 text-sm"
          >
            <span className="text-slate-700">{x.t}</span>
            <span className={cn("text-xs font-medium", x.on ? "text-brand-600" : "text-slate-400")}>
              {x.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataVisual() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">近 7 日曝光趋势</p>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
          <LineChart className="size-4" /> 环比 +42%
        </span>
      </div>
      <div className="flex h-36 items-end gap-2.5">
        {[35, 52, 40, 68, 58, 82, 95].map((h, i) => (
          <div key={i} className="flex-1">
            <div
              className={cn(
                "w-full rounded-t-lg",
                i === 6
                  ? "bg-gradient-to-t from-brand-500 to-lime-400"
                  : "bg-gradient-to-t from-brand-500/25 to-brand-400/40"
              )}
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { l: "平均曝光", v: "18.3w" },
          { l: "互动率", v: "6.2%" },
          { l: "爆文率", v: "12.5%" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl bg-slate-50 p-3 text-center">
            <p className="text-xs text-slate-500">{s.l}</p>
            <p className="mt-0.5 text-base font-bold text-slate-900">{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const ROWS: Row[] = [
  {
    eyebrow: "多账号管理",
    title: "矩阵再多，也能一手掌控",
    desc: "账号集中管理、健康度监测、异常告警与安全防护一体集成。支持批量导入与分组运营，让账号矩阵成为你真正的增长资产。",
    bullets: ["批量绑定与分组管理", "登录态自动维护，免频繁重授权", "异地登录与异常行为实时告警"],
    visual: <AccountVisual />,
  },
  {
    eyebrow: "智能发布",
    title: "踩准每个黄金时段",
    desc: "内置小红书流量时段模型，结合你的粉丝活跃曲线智能推荐发布时间。排期日历可视化呈现，一键批量调整，不错过任何流量窗口。",
    bullets: ["黄金时段智能推荐", "可视化排期日历，拖拽调整", "失败自动重试与异常通知"],
    visual: <ScheduleVisual />,
    reversed: true,
  },
  {
    eyebrow: "数据洞察",
    title: "每一篇笔记都有回响",
    desc: "曝光、阅读、互动、涨粉多维复盘，多账号横向对比找出最优内容策略。周报自动生成，团队汇报一键导出。",
    bullets: ["多账号数据横向对比", "爆文归因与选题推荐", "数据周报自动生成与导出"],
    visual: <DataVisual />,
  },
];

export function DeepDive() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="深度能力"
          title={
            <>
              把繁琐交给曜驰，
              <span className="text-gradient-brand"> 把精力留给内容</span>
            </>
          }
          subtitle="每一个细节都为小红书多账号运营场景打磨，让团队专注于真正重要的事。"
        />
        <div className="space-y-20 lg:space-y-28">
          {ROWS.map((row) => (
            <div
              key={row.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={cn(row.reversed && "lg:order-2")}>
                <span className="section-eyebrow">{row.eyebrow}</span>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {row.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {row.desc}
                </p>
                <ul className="mt-6 space-y-3">
                  {row.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-slate-700">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lime-500 to-teal-500">
                        <Check className="size-3 text-white" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cn("relative", row.reversed && "lg:order-1")}>
                <div
                  aria-hidden
                  className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-lime-200/40 via-brand-200/30 to-teal-200/40 blur-2xl"
                />
                <div className="relative">{row.visual}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
