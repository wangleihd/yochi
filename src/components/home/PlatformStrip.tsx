const PLATFORMS = [
  { name: "小红书", desc: "核心支持", hot: true },
  { name: "抖音", desc: "即将上线" },
  { name: "微博", desc: "即将上线" },
  { name: "B 站", desc: "即将上线" },
  { name: "视频号", desc: "规划中" },
  { name: "公众号", desc: "规划中" },
];

export function PlatformStrip() {
  return (
    <section className="border-y border-slate-100 bg-white py-10">
      <div className="container-page">
        <p className="mb-6 text-center text-sm font-medium text-slate-400">
          一套工作台 · 多平台触达 · 小红书种草为核心场景
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {PLATFORMS.map((p) => (
            <span
              key={p.name}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                p.hot
                  ? "bg-gradient-to-r from-lime-500 to-brand-500 text-white shadow-lg shadow-brand-500/25"
                  : "border border-slate-200 bg-slate-50 text-slate-500"
              }`}
            >
              {p.name}
              <span
                className={`text-xs ${p.hot ? "text-white/80" : "text-slate-400"}`}
              >
                {p.desc}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
