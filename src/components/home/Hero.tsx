import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  TrendingUp,
  Users,
  Clock3,
  Sparkles,
} from "lucide-react";

const ACCOUNTS = [
  { name: "@种草小分队", color: "from-brand-500 to-teal-500" },
  { name: "@好物研究所", color: "from-lime-500 to-brand-500" },
  { name: "@生活美学志", color: "from-teal-500 to-cyan-500" },
];

const QUEUE = [
  { title: "秋冬保湿面霜真实测评｜干皮救星", status: "已发布", tone: "text-brand-700 bg-brand-50" },
  { title: "百元内通勤穿搭合集，上班族必收藏", status: "定时 14:30", tone: "text-amber-700 bg-amber-50" },
  { title: "露营新手装备清单，避坑指南来啦", status: "待审核", tone: "text-slate-600 bg-slate-100" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 背景光晕 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-lime-300/40 via-brand-400/30 to-teal-300/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,white_100%)]" />
      </div>

      <div className="container-page relative pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-brand-500" />
              多账号小红书种草发布平台 · 已助力 2,000+ 创作者与品牌
            </span>
          </div>

          <h1 className="animate-fade-up mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl [animation-delay:100ms]">
            曜启光彩
            <br className="sm:hidden" />
            <span className="text-gradient-brand"> 驰传万域</span>
          </h1>
          <p className="animate-fade-up mt-4 text-lg font-medium text-slate-500 [animation-delay:150ms]">
            Yochi, spread your light everywhere.
          </p>
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 [animation-delay:200ms]">
            一个工作台，统一管理你的全部小红书账号。批量创作种草图文、
            智能定时发布、实时数据复盘 —— 让每一次内容投放都事半功倍。
          </p>

          <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:250ms]">
            <Link
              href="/pricing"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-lime-500 via-brand-500 to-teal-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-brand-500/30 transition-all hover:shadow-2xl hover:shadow-brand-500/40 hover:brightness-110 sm:w-auto"
            >
              免费试用
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/features"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-colors hover:border-brand-400 hover:text-brand-700 sm:w-auto"
            >
              <PlayCircle className="size-5" />
              查看功能
            </Link>
          </div>

          <p className="animate-fade-up mt-6 text-sm text-slate-400 [animation-delay:300ms]">
            无需信用卡 · 2 分钟完成账号绑定 · 随时取消
          </p>
        </div>

        {/* 产品预览 */}
        <div className="animate-fade-up relative mx-auto mt-16 max-w-5xl [animation-delay:350ms]">
          {/* 浮动角标 */}
          <div className="absolute -left-4 top-10 z-10 hidden animate-float rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-xl shadow-slate-900/10 backdrop-blur lg:block">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-50">
                <CheckCircle2 className="size-5 text-brand-600" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">发布成功</p>
                <p className="text-xs text-slate-500">已同步至 3 个小红书账号</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 bottom-16 z-10 hidden animate-float rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-xl shadow-slate-900/10 backdrop-blur [animation-delay:1.5s] lg:block">
            <p className="text-xs text-slate-500">本月种草笔记</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              328 <span className="text-sm font-medium text-slate-400">篇</span>
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand-600">
              <TrendingUp className="size-3.5" /> 曝光 +245%
            </p>
          </div>

          {/* 主面板 */}
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10">
            {/* 窗口栏 */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-6 py-3.5">
              <span className="size-3 rounded-full bg-red-400/80" />
              <span className="size-3 rounded-full bg-amber-400/80" />
              <span className="size-3 rounded-full bg-brand-400/80" />
              <span className="ml-3 text-sm font-medium text-slate-500">
                曜驰工作台 · 发布中心
              </span>
            </div>

            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-5">
              {/* 账号矩阵 */}
              <div className="lg:col-span-2">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Users className="size-4 text-brand-600" />
                  账号矩阵
                </p>
                <div className="space-y-2.5">
                  {ACCOUNTS.map((acc) => (
                    <div
                      key={acc.name}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex size-8 items-center justify-center rounded-full bg-gradient-to-br ${acc.color} text-xs font-bold text-white`}
                        >
                          {acc.name.slice(1, 3)}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {acc.name}
                          </p>
                          <p className="text-xs text-slate-400">小红书 · 已授权</p>
                        </div>
                      </div>
                      <span className="flex size-5 items-center justify-center rounded-full bg-brand-500">
                        <CheckCircle2 className="size-3.5 text-white" />
                      </span>
                    </div>
                  ))}
                  <button className="flex w-full items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-200 px-4 py-3 text-sm font-medium text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-600">
                    + 添加账号
                  </button>
                </div>
              </div>

              {/* 发布队列 */}
              <div className="lg:col-span-3">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Clock3 className="size-4 text-brand-600" />
                  发布队列
                </p>
                <div className="space-y-2.5">
                  {QUEUE.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3.5 shadow-sm"
                    >
                      <p className="truncate text-sm font-medium text-slate-800">
                        {item.title}
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 数据速览 */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: "本月曝光", value: "128.4w", delta: "+245%" },
                    { label: "互动量", value: "3.2w", delta: "+86%" },
                    { label: "净增粉丝", value: "5,214", delta: "+31%" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl bg-gradient-to-br from-slate-50 to-brand-50/60 p-3.5"
                    >
                      <p className="text-xs text-slate-500">{s.label}</p>
                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {s.value}
                      </p>
                      <p className="text-xs font-semibold text-brand-600">
                        {s.delta}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
