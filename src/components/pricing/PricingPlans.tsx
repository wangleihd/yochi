"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { PLANS } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("yearly");

  return (
    <div>
      {/* 切换 */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setBilling("monthly")}
          className={cn(
            "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
            billing === "monthly"
              ? "bg-slate-900 text-white"
              : "text-slate-500 hover:text-slate-900"
          )}
        >
          月付
        </button>
        <button
          type="button"
          onClick={() => setBilling("yearly")}
          className={cn(
            "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
            billing === "yearly"
              ? "bg-slate-900 text-white"
              : "text-slate-500 hover:text-slate-900"
          )}
        >
          年付
          <span className="rounded-full bg-gradient-to-r from-lime-400 to-brand-500 px-2.5 py-0.5 text-xs font-bold text-white">
            省 20%
          </span>
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {PLANS.map((plan) => {
          const price =
            billing === "yearly" ? plan.yearly : plan.monthly;
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl p-7 transition-all duration-300",
                plan.featured
                  ? "bg-slate-950 text-white shadow-2xl shadow-brand-500/25 lg:-translate-y-3 lg:scale-[1.02]"
                  : "card"
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-lime-400 to-brand-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                  <Sparkles className="mr-1 inline size-3" />
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
              </h3>
              <p
                className={cn(
                  "mt-1 text-sm font-medium",
                  plan.featured ? "text-brand-300" : "text-slate-400"
                )}
              >
                {plan.nameEn}
              </p>
              <p
                className={cn(
                  "mt-3 min-h-10 text-sm leading-relaxed",
                  plan.featured ? "text-slate-400" : "text-slate-500"
                )}
              >
                {plan.tagline}
              </p>

              <div className="mt-6">
                {price === null ? (
                  <p
                    className={cn(
                      "text-4xl font-black",
                      plan.featured ? "text-white" : "text-slate-900"
                    )}
                  >
                    定制
                  </p>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span
                      className={cn(
                        "text-4xl font-black",
                        plan.featured ? "text-white" : "text-slate-900"
                      )}
                    >
                      ¥{price}
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
                )}
                {price !== null && price > 0 && (
                  <p
                    className={cn(
                      "mt-1.5 text-xs",
                      plan.featured ? "text-slate-500" : "text-slate-400"
                    )}
                  >
                    {billing === "yearly"
                      ? `按年支付，¥${(price * 12).toLocaleString()}/年`
                      : "按月支付，随时可取消"}
                  </p>
                )}
                {price === null && (
                  <p
                    className={cn(
                      "mt-1.5 text-xs",
                      plan.featured ? "text-slate-500" : "text-slate-400"
                    )}
                  >
                    按需报价，提供专属方案
                  </p>
                )}
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
                href="/faq#contact"
                className={cn(
                  "mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-semibold transition-all",
                  plan.featured
                    ? "bg-gradient-to-r from-lime-500 via-brand-500 to-teal-500 text-white shadow-lg shadow-brand-500/30 hover:brightness-110"
                    : plan.id === "enterprise"
                      ? "border-2 border-slate-300 text-slate-700 hover:border-brand-500 hover:text-brand-700"
                      : "border-2 border-brand-500/50 text-brand-700 hover:bg-brand-50"
                )}
              >
                {plan.cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
