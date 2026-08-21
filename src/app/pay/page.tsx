import { Suspense } from "react";
import type { Metadata } from "next";
import { ShieldCheck, Zap, RefreshCcw } from "lucide-react";
import { CheckoutFlow } from "@/components/pay/CheckoutFlow";

export const metadata: Metadata = {
  title: "订阅支付 — 曜驰 Yochi",
  description:
    "选择套餐或次数包，支持支付宝与微信支付。支付成功后开通信息将发送至你的邮箱。",
};

export default function PayPage() {
  return (
    <>
      {/* 页头 */}
      <section className="relative overflow-hidden py-14 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_55%)]"
        />
        <div className="container-page relative text-center">
          <span className="section-eyebrow">订阅支付</span>
          <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            安全下单，
            <span className="text-gradient-brand"> 即刻开通</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            支持支付宝与微信支付。无需注册，支付成功后权益将发送至你填写的邮箱。
          </p>
          <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand-600" /> 支付全程加密
            </span>
            <span className="inline-flex items-center gap-2">
              <Zap className="size-4 text-brand-600" /> 支付后 1–5 分钟开通
            </span>
            <span className="inline-flex items-center gap-2">
              <RefreshCcw className="size-4 text-brand-600" /> 支持随时取消与退款
            </span>
          </div>
        </div>
      </section>

      {/* 支付流程 */}
      <section className="pb-24">
        <div className="container-page">
          <Suspense fallback={<div className="py-20 text-center text-slate-400">加载中…</div>}>
            <CheckoutFlow />
          </Suspense>
        </div>
      </section>
    </>
  );
}
