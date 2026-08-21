"use client";

import { useState } from "react";
import { Mail, Phone, Check } from "lucide-react";
import type { ContactInfo } from "@/lib/pay/types";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  value: ContactInfo;
  onChange: (info: ContactInfo) => void;
  onSubmit: () => void;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^1[3-9]\d{9}$/;

export function ContactForm({ value, onChange, onSubmit }: ContactFormProps) {
  const [agree, setAgree] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailOk = EMAIL_RE.test(value.email);
  const phoneOk = value.phone === "" || PHONE_RE.test(value.phone);
  const valid = emailOk && phoneOk && agree;

  const showError = touched && !valid;

  return (
    <div className="mx-auto max-w-lg">
      <h3 className="mb-1 text-lg font-bold text-slate-900">填写联系信息</h3>
      <p className="mb-6 text-sm text-slate-500">
        支付成功后，开通信息将发送至你填写的邮箱（无需注册登录）。
      </p>

      <div className="space-y-5">
        <div>
          <label htmlFor="pay-email" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <Mail className="size-4 text-brand-600" />
            邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            id="pay-email"
            type="email"
            inputMode="email"
            placeholder="you@example.com"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            className={cn(
              "w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-colors",
              touched && !emailOk
                ? "border-red-300 bg-red-50/40 focus:border-red-400"
                : "border-slate-200 focus:border-brand-500"
            )}
          />
        </div>

        <div>
          <label htmlFor="pay-phone" className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <Phone className="size-4 text-brand-600" />
            手机号（选填）
          </label>
          <input
            id="pay-phone"
            type="tel"
            inputMode="tel"
            placeholder="138 0000 0000"
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value.trim() })}
            className={cn(
              "w-full rounded-xl border-2 px-4 py-3 text-sm outline-none transition-colors",
              touched && !phoneOk
                ? "border-red-300 bg-red-50/40 focus:border-red-400"
                : "border-slate-200 focus:border-brand-500"
            )}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
          <button
            type="button"
            role="checkbox"
            aria-checked={agree}
            onClick={() => setAgree((v) => !v)}
            className={cn(
              "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
              agree ? "border-brand-500 bg-brand-500" : "border-slate-300 bg-white"
            )}
          >
            {agree && <Check className="size-3.5 text-white" strokeWidth={3} />}
          </button>
          <span>
            我已阅读并同意《用户协议》与《隐私政策》，并确认所购商品与开通邮箱信息无误。
          </span>
        </label>

        {showError && (
          <p className="text-sm text-red-500">
            {!emailOk && "请输入正确的邮箱地址。"}
            {emailOk && !phoneOk && "手机号格式不正确。"}
            {emailOk && phoneOk && !agree && "请先同意用户协议与隐私政策。"}
          </p>
        )}

        <button
          type="button"
          onClick={() => {
            setTouched(true);
            if (valid) onSubmit();
          }}
          className={cn(
            "w-full rounded-full py-3.5 text-base font-semibold transition-all",
            valid
              ? "bg-gradient-to-r from-lime-500 via-brand-500 to-teal-500 text-white shadow-lg shadow-brand-500/30 hover:brightness-110"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          )}
        >
          下一步：确认订单
        </button>
      </div>
    </div>
  );
}
