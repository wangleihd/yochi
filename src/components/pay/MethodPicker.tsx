"use client";

import { cn } from "@/lib/utils";
import type { PayMethod } from "@/lib/pay/types";

type MethodPickerProps = {
  value: PayMethod;
  onChange: (m: PayMethod) => void;
  /** 真实支付模式：微信未开通，支付宝跳转官方收银台 */
  real?: boolean;
};

function AlipayMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[#1677FF] to-[#0E5CD6] font-black text-white",
        className
      )}
    >
      支
    </span>
  );
}

function WechatMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[#07C160] to-[#06AD56] font-black text-white",
        className
      )}
    >
      微
    </span>
  );
}

export function MethodPicker({ value, onChange, real = false }: MethodPickerProps) {
  const methods: { id: PayMethod; name: string; desc: string; mark: React.ReactNode }[] = [
    {
      id: "alipay",
      name: "支付宝",
      desc: "扫码支付 · 推荐有支付宝的用户",
      mark: <AlipayMark className="size-10 text-lg" />,
    },
    {
      id: "wechat",
      name: "微信支付",
      desc: "扫码支付 · 微信扫一扫即可完成",
      mark: <WechatMark className="size-10 text-lg" />,
    },
  ];

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-slate-900">选择支付方式</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {methods.map((m) => {
          const active = value === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              className={cn(
                "flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all",
                active
                  ? "border-brand-500 bg-brand-50/60 shadow-lg shadow-brand-500/10"
                  : "border-slate-200 bg-white hover:border-brand-300"
              )}
            >
              {m.mark}
              <span className="flex-1">
                <span className="block text-base font-bold text-slate-900">{m.name}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{m.desc}</span>
              </span>
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                  active ? "border-brand-500 bg-brand-500" : "border-slate-300"
                )}
              >
                {active && (
                  <svg viewBox="0 0 24 24" className="size-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-400">
        {real
          ? "微信支付接入中，暂请使用支付宝；选择支付宝后将跳转官方收银台完成支付。"
          : "当前为演示环境，将展示模拟收银台；接入真实支付后，将唤起支付宝 / 微信官方收银台。"}
      </p>
    </div>
  );
}
