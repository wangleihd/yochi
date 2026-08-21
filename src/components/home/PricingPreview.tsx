import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PLANS } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingPreview() {
  const plans = PLANS.filter((p) => p.id !== "enterprise");

  return (
    <section className="bg-slate-50/70 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="定价方案"
          title={
            <>
              透明定价，
              <span className="text-gradient-brand"> 按需升级</span>
            </>
          }
          subtitle="从免费体验到大矩阵运营，总有一档适合你的阶段。随时升级，随时取消。"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl p-8 transition-all duration-300",
                plan.featured
                  ? "bg-slate-950 text-white shadow-2xl shadow-brand-500/20 lg:-translate-y-3"
                  : "card"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-lime-400 to-brand-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                  最受欢迎
                </span>
              )}
              <h3
                className={cn(
                  "text-lg font-bold",
                  plan.featured ? "text-white" : "text-slate-900"
                )}
              >
                {plan.name}
                <span
                  className={cn(
                    "ml-2 text-sm font-medium",
                    plan.featured ? "text-slate-400" : "text-slate-400"
                  )}
                >
                  {plan.nameEn}
                </span>
              </h3>
              <p
                className={cn(
                  "mt-2 text-sm",
                  plan.featured ? "text-slate-400" : "text-slate-500"
                )}
              >
                {plan.tagline}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-4xl font-black",
                    plan.featured ? "text-white" : "text-slate-900"
                  )}
                >
                  ¥{plan.monthly}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    plan.featured ? "text-slate-500" : "text-slate-400"
                  )}
                >
                  / 月
                </span>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.highlight.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                        plan.featured
                          ? "bg-brand-500/20 text-brand-300"
                          : "bg-brand-50 text-brand-600"
                      )}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span
                      className={cn(
                        plan.featured ? "text-slate-300" : "text-slate-600"
                      )}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className={cn(
                  "mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold transition-all",
                  plan.featured
                    ? "bg-gradient-to-r from-lime-500 via-brand-500 to-teal-500 text-white shadow-lg shadow-brand-500/30 hover:brightness-110"
                    : "border-2 border-brand-500/50 text-brand-700 hover:bg-brand-50"
                )}
              >
                {plan.cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            查看全部套餐与详细对比
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
