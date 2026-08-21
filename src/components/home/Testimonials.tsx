import { Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const TESTIMONIALS = [
  {
    quote:
      "以前 6 个账号发一篇笔记要一下午，现在在曜驰里一稿多投，10 分钟搞定。矩阵内容产出效率直接翻了三倍。",
    name: "林小满",
    role: "美妆品牌 · 内容负责人",
    initials: "林",
    color: "from-brand-500 to-teal-500",
  },
  {
    quote:
      "智能定时太懂小红书了，错峰发布后互动率明显提升。数据看板让我们第一次能说清楚每个账号的价值。",
    name: "陈一舟",
    role: "生活方式博主 · 12 个矩阵账号",
    initials: "陈",
    color: "from-lime-500 to-brand-500",
  },
  {
    quote:
      "AI 标题助手给到的灵感命中率很高，团队协作审核流程也顺畅。最安心的是账号安全防护，再也没有担心过账号异常。",
    name: "苏芮",
    role: "MCN 机构 · 运营总监",
    initials: "苏",
    color: "from-teal-500 to-cyan-500",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="用户声音"
          title={
            <>
              他们正在用曜驰
              <span className="text-gradient-brand"> 驰传万域</span>
            </>
          }
          subtitle="来自博主、品牌与 MCN 机构的真实反馈。"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card flex flex-col p-8">
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-slate-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span
                  className={`flex size-11 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-base font-bold text-white`}
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
