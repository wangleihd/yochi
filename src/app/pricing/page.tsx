import { Fragment } from "react";
import {
  Check,
  Minus,
  ShieldCheck,
  CreditCard,
  RefreshCcw,
  PenLine,
  ImageIcon,
  BadgePercent,
  Users,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  COMPARISON,
  PRICING_FAQS,
  PLANS,
  WRITE_PACKS,
  IMAGE_PACKS,
  PACK_RULES,
  YEARLY_SAVINGS,
  YEARLY_SLOGAN,
  RECOMMENDATIONS,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { ComparisonCell } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "定价方案 — 曜驰 Yochi",
  description:
    "曜驰 Yochi 提供免费版、入门版、专业版与企业版四档方案，覆盖文案生成、AI 配图、多账号管理与批量发布。写文、生图、发布分开计费，缺什么补什么。",
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
            写文、生图、发布分开计费，缺什么补什么，不再为用不到的额度买单。
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <CreditCard className="size-4 text-brand-600" /> 无需信用卡即可试用
            </span>
            <span className="inline-flex items-center gap-2">
              <RefreshCcw className="size-4 text-brand-600" /> 随时取消，额度按月重置
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand-600" /> 企业级数据安全
            </span>
          </div>
        </div>
      </section>

      {/* 基础套餐 */}
      <section className="pb-20">
        <div className="container-page">
          <PricingPlans />
          <div className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-lime-50 px-6 py-4 text-center text-sm font-medium text-brand-800">
            <BadgePercent className="size-5 shrink-0 text-brand-600" />
            {YEARLY_SLOGAN}
          </div>
        </div>
      </section>

      {/* 功能对比 */}
      <section className="bg-slate-50/70 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="功能对比"
            title="每个套餐包含什么，一目了然"
            subtitle="写文次数用于生成或改写文案，生图次数用于生成或编辑图片，两类次数独立扣减，每月账期结束重新发放。"
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
                {/* 价格行：月订阅 / 年订阅 / 年付对比优势 */}
                <tr className="border-b-2 border-brand-100 bg-gradient-to-r from-brand-50/70 via-white to-lime-50/60">
                  <td className="px-6 py-5 text-sm font-bold text-slate-700">
                    订阅价格
                  </td>
                  {PLANS.map((plan) => {
                    const save = plan.monthly * 12 - plan.yearly;
                    return (
                      <td
                        key={plan.id}
                        className={cn(
                          "px-6 py-5 text-center align-top",
                          plan.featured && "bg-slate-950"
                        )}
                      >
                        <div
                          className={cn(
                            "text-xs font-medium",
                            plan.featured ? "text-slate-400" : "text-slate-400"
                          )}
                        >
                          月订阅
                        </div>
                        <div
                          className={cn(
                            "mt-0.5 text-base font-bold",
                            plan.featured ? "text-white" : "text-slate-900"
                          )}
                        >
                          ¥{plan.monthly.toLocaleString()}
                          <span
                            className={cn(
                              "text-xs font-medium",
                              plan.featured ? "text-slate-500" : "text-slate-400"
                            )}
                          >
                            {" "}/ 月
                          </span>
                        </div>
                        <div
                          className={cn(
                            "mt-2.5 text-xs font-medium",
                            plan.featured ? "text-slate-400" : "text-slate-400"
                          )}
                        >
                          年订阅
                        </div>
                        <div
                          className={cn(
                            "mt-0.5 text-lg font-black",
                            plan.featured ? "text-white" : "text-slate-900"
                          )}
                        >
                          ¥{plan.yearly.toLocaleString()}
                          <span
                            className={cn(
                              "text-xs font-medium",
                              plan.featured ? "text-slate-500" : "text-slate-400"
                            )}
                          >
                            {" "}/ 年
                          </span>
                        </div>
                        {plan.yearly > 0 ? (
                          <div className="mt-2">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
                                plan.featured
                                  ? "bg-brand-500/25 text-brand-300"
                                  : "bg-brand-50 text-brand-700"
                              )}
                            >
                              年付省 ¥{save.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "mt-2 text-xs",
                              plan.featured ? "text-slate-500" : "text-slate-400"
                            )}
                          >
                            免费版无年付
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
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
            * 以上价格均为人民币含税价，年付一次性结算。写文与生图次数独立扣减，互不影响。
          </p>
        </div>
      </section>

      {/* 独立次数包 */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="独立次数包"
            title={
              <>
                额度不够？<span className="text-gradient-brand">按需补充，不强制升级</span>
              </>
            }
            subtitle="基础套餐额度不够时，可单独购买次数包，12 个月内有效，用完可再购。"
          />
          <div className="grid gap-10 lg:grid-cols-2">
            {/* 写文次数包 */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400/20 via-brand-500/20 to-teal-500/20 text-brand-600">
                  <PenLine className="size-5" />
                </span>
                <h3 className="text-xl font-bold text-slate-900">写文次数包</h3>
                <span className="ml-auto rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  文案生成 / 改写
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {WRITE_PACKS.map((pack) => (
                  <div key={pack.id} className="card p-6 text-center">
                    <p className="text-2xl font-black text-slate-900">
                      {pack.count}
                      <span className="text-sm font-medium text-slate-400"> 次</span>
                    </p>
                    <p className="mt-2 text-sm text-slate-500">写文</p>
                    <p className="mt-4 text-lg font-bold text-brand-600">
                      ¥{pack.price}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">12 个月有效</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 生图次数包 */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400/20 via-brand-500/20 to-teal-500/20 text-brand-600">
                  <ImageIcon className="size-5" />
                </span>
                <h3 className="text-xl font-bold text-slate-900">生图次数包</h3>
                <span className="ml-auto rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  图片生成 / 编辑
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {IMAGE_PACKS.map((pack) => (
                  <div key={pack.id} className="card p-6 text-center">
                    <p className="text-2xl font-black text-slate-900">
                      {pack.count}
                      <span className="text-sm font-medium text-slate-400"> 张</span>
                    </p>
                    <p className="mt-2 text-sm text-slate-500">生图</p>
                    <p className="mt-4 text-lg font-bold text-brand-600">
                      ¥{pack.price}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">12 个月有效</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 次数包规则 */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {PACK_RULES.map((rule) => (
              <span
                key={rule}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-lime-400 to-teal-500">
                  <Check className="size-3 text-white" strokeWidth={3} />
                </span>
                {rule}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 年付优势 */}
      <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%)]"
        />
        <div className="container-page relative">
          <SectionHeading
            dark
            eyebrow="年付优势"
            title={
              <>
                年付立享
                <span className="text-gradient-brand"> “付 10 个月，用 12 个月”</span>
              </>
            }
            subtitle={YEARLY_SLOGAN}
          />
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-800">
            <div className="grid grid-cols-4 border-b border-slate-800 bg-slate-900/80 text-sm font-bold">
              <div className="px-6 py-4 text-slate-400">套餐</div>
              <div className="px-6 py-4 text-center text-slate-400">月付一年</div>
              <div className="px-6 py-4 text-center text-slate-400">年付价</div>
              <div className="px-6 py-4 text-center text-brand-300">年付省</div>
            </div>
            {YEARLY_SAVINGS.map((row) => (
              <div
                key={row.plan}
                className="grid grid-cols-4 border-b border-slate-800/80 text-sm last:border-0"
              >
                <div className="px-6 py-4 font-semibold text-slate-200">
                  {row.plan}
                </div>
                <div className="px-6 py-4 text-center text-slate-400">
                  ¥{(row.monthly * 12).toLocaleString()}
                </div>
                <div className="px-6 py-4 text-center font-semibold text-white">
                  ¥{row.yearly.toLocaleString()}
                </div>
                <div className="px-6 py-4 text-center">
                  <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-bold text-brand-300">
                    省 ¥{row.save.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 推荐组合 */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="推荐组合"
            title="不知道怎么选？照着组合买就对了"
            subtitle="基础套餐作为稳定产能，次数包作为灵活增量。"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {RECOMMENDATIONS.map((rec) => (
              <div key={rec.type} className="card flex flex-col p-8">
                <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
                  <Users className="size-4" />
                  {rec.type}
                </span>
                <p className="text-3xl font-black text-slate-900">{rec.plan}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-brand-600">
                  <ArrowRight className="size-4" />
                  {rec.extra}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {rec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 计费 FAQ */}
      <section className="bg-slate-50/70 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading eyebrow="计费说明" title="订阅与计费常见问题" />
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={PRICING_FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
