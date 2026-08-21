"use client";

import { PLANS, WRITE_PACKS, IMAGE_PACKS } from "@/lib/pricing";
import type { BillingCycle, OrderItem } from "@/lib/pay/types";
import { cn } from "@/lib/utils";

type PlanPickerProps = {
  value: OrderItem | null;
  onChange: (item: OrderItem | null) => void;
};

/** 商品选择：基础套餐（月付/年付）+ 写文次数包 + 生图次数包 */
export function PlanPicker({ value, onChange }: PlanPickerProps) {
  const billing: BillingCycle = value?.kind === "plan" && value.id !== "free"
    ? (value.periodLabel.startsWith("年付") ? "yearly" : "monthly")
    : "yearly";

  const selectPlan = (planId: string, cycle: BillingCycle) => {
    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) return;
    onChange({
      kind: "plan",
      id: plan.id,
      name: `${plan.name}（${plan.nameEn}）`,
      periodLabel: cycle === "yearly" ? "年付 · 付 10 用 12" : "月付 · 随时取消",
      price: cycle === "yearly" ? plan.yearly : plan.monthly,
      priceText:
        (cycle === "yearly" ? plan.yearly : plan.monthly) === 0
          ? "免费"
          : `¥${((cycle === "yearly" ? plan.yearly : plan.monthly) as number).toLocaleString()}`,
    });
  };

  const selectPack = (pack: (typeof WRITE_PACKS)[number] | (typeof IMAGE_PACKS)[number], kind: "write-pack" | "image-pack") => {
    onChange({
      kind,
      id: pack.id,
      name: kind === "write-pack" ? `${pack.count} 次写文包` : `${pack.count} 张生图包`,
      periodLabel: "12 个月有效",
      price: pack.price,
      priceText: `¥${pack.price}`,
    });
  };

  const selectedId = value?.id;

  return (
    <div className="space-y-10">
      {/* 基础套餐 */}
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">① 选择基础套餐</h3>
          <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 text-sm font-semibold">
            <button
              type="button"
              onClick={() => value?.kind === "plan" && selectPlan(value.id, "monthly")}
              className={cn(
                "rounded-full px-4 py-1.5 transition-colors",
                billing === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              )}
            >
              月付
            </button>
            <button
              type="button"
              onClick={() => value?.kind === "plan" && selectPlan(value.id, "yearly")}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-colors",
                billing === "yearly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              )}
            >
              年付
              <span className="rounded-full bg-gradient-to-r from-lime-400 to-brand-500 px-2 py-0.5 text-[10px] font-bold text-white">
                付10用12
              </span>
            </button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => {
            const price = billing === "yearly" ? plan.yearly : plan.monthly;
            const active = selectedId === plan.id && value?.kind === "plan";
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => selectPlan(plan.id, billing)}
                className={cn(
                  "relative flex flex-col rounded-2xl border-2 p-5 text-left transition-all",
                  active
                    ? "border-brand-500 bg-brand-50/60 shadow-lg shadow-brand-500/10"
                    : "border-slate-200 bg-white hover:border-brand-300"
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-2.5 left-4 rounded-full bg-gradient-to-r from-lime-400 to-brand-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                    最受欢迎
                  </span>
                )}
                <span className="text-base font-bold text-slate-900">{plan.name}</span>
                <span className="mt-0.5 text-xs text-slate-400">{plan.audience}</span>
                <span className="mt-3 text-xl font-black text-slate-900">
                  {price === 0 ? (
                    "免费"
                  ) : (
                    <>
                      ¥{price.toLocaleString()}
                      <span className="text-xs font-medium text-slate-400">
                        {" "}/ {billing === "yearly" ? "年" : "月"}
                      </span>
                    </>
                  )}
                </span>
                <span className="mt-1 text-xs text-slate-400">
                  {price > 0 && billing === "yearly"
                    ? `折合 ¥${Math.round((price / 12) * 10) / 10}/月`
                    : plan.tagline}
                </span>
                {active && (
                  <span className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-brand-500">
                    <svg viewBox="0 0 24 24" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 次数包 */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">② 或选写文次数包</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {WRITE_PACKS.map((pack) => {
              const active = selectedId === pack.id && value?.kind === "write-pack";
              return (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() => selectPack(pack, "write-pack")}
                  className={cn(
                    "rounded-2xl border-2 p-4 text-center transition-all",
                    active
                      ? "border-brand-500 bg-brand-50/60 shadow-lg shadow-brand-500/10"
                      : "border-slate-200 bg-white hover:border-brand-300"
                  )}
                >
                  <span className="block text-lg font-black text-slate-900">
                    {pack.count}
                    <span className="text-xs font-medium text-slate-400"> 次写文</span>
                  </span>
                  <span className="mt-1 block text-sm font-bold text-brand-600">
                    ¥{pack.price}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-slate-400">12 个月有效</span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">③ 或选生图次数包</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            {IMAGE_PACKS.map((pack) => {
              const active = selectedId === pack.id && value?.kind === "image-pack";
              return (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() => selectPack(pack, "image-pack")}
                  className={cn(
                    "rounded-2xl border-2 p-4 text-center transition-all",
                    active
                      ? "border-brand-500 bg-brand-50/60 shadow-lg shadow-brand-500/10"
                      : "border-slate-200 bg-white hover:border-brand-300"
                  )}
                >
                  <span className="block text-lg font-black text-slate-900">
                    {pack.count}
                    <span className="text-xs font-medium text-slate-400"> 张生图</span>
                  </span>
                  <span className="mt-1 block text-sm font-bold text-brand-600">
                    ¥{pack.price}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-slate-400">12 个月有效</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
