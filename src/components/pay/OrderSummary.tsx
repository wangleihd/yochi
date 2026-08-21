"use client";

import { Mail, Phone } from "lucide-react";
import type { ContactInfo, OrderItem, PayMethod } from "@/lib/pay/types";

type OrderSummaryProps = {
  item: OrderItem;
  contact: ContactInfo;
  method: PayMethod;
};

export function OrderSummary({ item, contact, method }: OrderSummaryProps) {
  const methodName = method === "alipay" ? "支付宝" : "微信支付";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-4 text-sm font-bold text-slate-700">
        订单确认
      </div>
      <div className="space-y-4 px-6 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-900">{item.name}</p>
            <p className="mt-0.5 text-xs text-slate-400">{item.periodLabel}</p>
          </div>
          <p className="text-lg font-black text-slate-900">{item.priceText}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Mail className="size-4 text-brand-600" /> {contact.email}
          </span>
          {contact.phone && (
            <span className="inline-flex items-center gap-1.5 text-slate-500">
              <Phone className="size-4 text-brand-600" /> {contact.phone}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">支付方式</span>
          <span className="font-semibold text-slate-800">{methodName}</span>
        </div>

        <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4">
          <span className="text-sm font-semibold text-slate-700">应付金额</span>
          <span className="text-2xl font-black text-brand-600">
            {item.price === 0 ? "¥0" : item.priceText}
          </span>
        </div>
      </div>
    </div>
  );
}
