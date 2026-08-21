import { Fragment } from "react";
import { Check, Minus, ShieldCheck, CreditCard, RefreshCcw } from "lucide-react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { FaqAccordion } from "@/components/FaqAccordion";
import { COMPARISON, PRICING_FAQS, PLANS } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { ComparisonCell } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "定价方案 — 曜驰 Yochi",
  description:
    "曜驰 Yochi 提供免费版、基础版、专业版与企业版四档方案，支持多账号小红书种草发布。透明定价，随时升级与取消。",
};

function Cell({ value, featured }: { value: ComparisonCell; featured: boolean }) {
  if (value === true) {
    return (
      <span
        className={cn(
          "mx-auto flex size-6 items-center justify-center rounded-full",
          featured ? "bg-brand-500/20 text-brand-300" : "bg-brand-50 text-brand-600"
        )}
      >
        <Check className="size-3.5" strokeWidth={3} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="mx-auto flex size-6 items-center justify-center text-slate-300">
        <Minus className="size-4" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "text-sm font-medium",
        featured ? "text-brand-200" : "text-slate-700"
      )}
    >
      {value}
    </span>
  );
}

export default function PricingPage() {
  return (
    <>
      {/* 页头 */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_55%)]"
        />
        <div className="container-page relative text-center">
          <span className="section-eyebrow">定价方案</span>
          <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            为每一个阶段的你，
            <span className="text-gradient-brand"> 匹配合适方案</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            从个人博主到品牌矩阵，透明定价，按需升级。所有套餐均支持随时取消。
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <CreditCard className="size-4 text-brand-600" /> 无需信用卡即可试用
            </span>
            <span className="inline-flex items-center gap-2">
              <RefreshCcw className="size-4 text-brand-600" /> 随时取消，按天折算
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand-600" /> 企业级数据安全
            </span>
          </div>
        </div>
      </section>

      {/* 套餐 */}
      <section className="pb-20">
        <div className="container-page">
          <PricingPlans />
        </div>
      </section>

      {/* 对比表 */}
      <section className="bg-slate-50/70 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="详细对比"
            title="每个套餐包含什么，一目了然"
            subtitle="对照你的账号数量与团队规模，选择最合适的一档。"
          />
          <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-sm">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-5 text-sm font-semibold text-slate-500">
                    功能
                  </th>
                  {PLANS.map((plan) => (
                    <th
                      key={plan.id}
                      className={cn(
                        "px-6 py-5 text-center",
                        plan.featured && "bg-slate-950"
                      )}
                    >
                      <div
                        className={cn(
                          "text-base font-bold",
                          plan.featured ? "text-white" : "text-slate-900"
                        )}
                      >
                        {plan.name}
                      </div>
                      <div
                        className={cn(
                          "mt-0.5 text-xs font-medium",
                          plan.featured ? "text-brand-300" : "text-slate-400"
                        )}
                      >
                        {plan.nameEn}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((group) => (
                  <Fragment key={group.group}>
                    <tr>
                      <td
                        colSpan={5}
                        className="bg-slate-50/80 px-6 py-3 text-sm font-bold text-brand-700"
                      >
                        {group.group}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                          {row.feature}
                        </td>
                        {row.cells.map((cell, i) => (
                          <td
                            key={i}
                            className={cn(
                              "px-6 py-4 text-center",
                              PLANS[i].featured && "bg-slate-950"
                            )}
                          >
                            <Cell
                              value={cell}
                              featured={Boolean(PLANS[i].featured)}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">
            * 以上价格均为人民币含税价，年付按年一次性结算。企业版可定制增购项，欢迎{" "}
            <a href="/faq#contact" className="font-semibold text-brand-600 hover:underline">
              联系销售
            </a>
            。
          </p>
        </div>
      </section>

      {/* 计费 FAQ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="计费说明"
            title="订阅与计费常见问题"
          />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={PRICING_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
