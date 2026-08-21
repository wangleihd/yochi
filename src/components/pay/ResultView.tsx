"use client";

import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Mail } from "lucide-react";
import type { Order } from "@/lib/pay/types";

type ResultViewProps = {
  success: boolean;
  order: Order;
};

export function ResultView({ success, order }: ResultViewProps) {
  const methodName = order.method === "alipay" ? "支付宝" : "微信支付";

  return (
    <div className="mx-auto max-w-md text-center">
      <div
        className={
          "mx-auto flex size-20 items-center justify-center rounded-full " +
          (success ? "bg-brand-50" : "bg-red-50")
        }
      >
        {success ? (
          <CheckCircle2 className="size-12 text-brand-500" />
        ) : (
          <XCircle className="size-12 text-red-400" />
        )}
      </div>

      <h2
        className={
          "mt-6 text-2xl font-black " + (success ? "text-slate-900" : "text-slate-900")
        }
      >
        {success ? "支付成功" : "支付未完成"}
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        {success
          ? "你的订单已确认，权益即将到账。"
          : "订单未完成支付，你可以返回重新选择支付方式。"}
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">商品</span>
          <span className="font-semibold text-slate-800">{order.item.name}</span>
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-slate-500">支付方式</span>
          <span className="font-semibold text-slate-800">{methodName}</span>
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-slate-500">订单号</span>
          <span className="font-mono text-slate-800">{order.orderNo}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-dashed border-slate-200 pt-3">
          <span className="text-sm font-semibold text-slate-700">实付金额</span>
          <span className="text-lg font-black text-brand-600">
            {order.amount === 0 ? "¥0" : `¥${order.amount.toLocaleString()}`}
          </span>
        </div>
      </div>

      {success && (
        <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-brand-100 bg-brand-50/70 px-5 py-4 text-left text-sm text-brand-800">
          <Mail className="mt-0.5 size-4 shrink-0 text-brand-600" />
          <span>
            开通信息将发送至 <span className="font-bold">{order.contact.email}</span>
            {order.contact.phone && (
              <>，并将同步短信至 <span className="font-bold">{order.contact.phone}</span></>
            )}
            。请注意查收，通常 1–5 分钟内到账。
          </span>
        </div>
      )}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-lime-500 via-brand-500 to-teal-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:brightness-110"
        >
          继续选购
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-7 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
