"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { PlanPicker } from "@/components/pay/PlanPicker";
import { ContactForm } from "@/components/pay/ContactForm";
import { OrderSummary } from "@/components/pay/OrderSummary";
import { MethodPicker } from "@/components/pay/MethodPicker";
import { MockCheckout } from "@/components/pay/MockCheckout";
import { ResultView } from "@/components/pay/ResultView";
import { planToItem, packToItem } from "@/lib/pay/catalog";
import { createOrder, mockPay, queryOrder } from "@/lib/pay/provider";
import { isRealPay } from "@/lib/pay/config";
import { cn } from "@/lib/utils";
import type { ContactInfo, Order, OrderItem, PayMethod } from "@/lib/pay/types";

type Step = "plan" | "contact" | "confirm" | "paying" | "result";

const STEPS: { id: Step; label: string }[] = [
  { id: "plan", label: "选择商品" },
  { id: "contact", label: "联系信息" },
  { id: "confirm", label: "确认订单" },
  { id: "paying", label: "收银台" },
  { id: "result", label: "完成" },
];

export function CheckoutFlow() {
  const searchParams = useSearchParams();

  // 从 URL 参数预选商品：/pay?plan=pro&billing=yearly 或 /pay?pack=write-100
  const initialItem = useMemo<OrderItem | null>(() => {
    const planId = searchParams.get("plan");
    if (planId) {
      const billing = searchParams.get("billing") === "monthly" ? "monthly" : "yearly";
      return planToItem(planId, billing);
    }
    const packId = searchParams.get("pack");
    if (packId) return packToItem(packId);
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [step, setStep] = useState<Step>(initialItem ? "contact" : "plan");
  const [item, setItem] = useState<OrderItem | null>(initialItem);
  const [contact, setContact] = useState<ContactInfo>({ email: "", phone: "" });
  const [method, setMethod] = useState<PayMethod>("alipay");
  const [order, setOrder] = useState<Order | null>(null);
  const [result, setResult] = useState<{ success: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // 支付宝回跳恢复：/pay?alipayReturn=1&result=success&out_trade_no=YC...
  useEffect(() => {
    if (searchParams.get("alipayReturn") !== "1") return;
    const saved = sessionStorage.getItem("yochi_order");
    let restored: Order | null = null;
    if (saved) {
      try {
        restored = JSON.parse(saved);
        sessionStorage.removeItem("yochi_order");
      } catch {
        restored = null;
      }
    }
    const orderNo = searchParams.get("out_trade_no") || restored?.orderNo || "";
    if (restored) setOrder(restored);
    if (orderNo) {
      const fake = restored ?? {
        orderNo,
        item: { kind: "plan" as const, id: "", name: "支付宝订单", periodLabel: "", price: 0, priceText: "—" },
        contact: { email: "", phone: "" },
        method: "alipay" as const,
        amount: 0,
        createdAt: new Date().toISOString(),
        expiresInMin: 15,
      };
      if (!restored) setOrder(fake);
      // 轮询后端确认真实状态（支付宝通知可能稍慢，最多等 ~40s）
      let tries = 0;
      const timer = setInterval(async () => {
        tries += 1;
        try {
          const st = await queryOrder(orderNo, "created");
          if (st === "paid") {
            clearInterval(timer);
            setResult({ success: true });
          } else if (st === "failed" || st === "cancelled" || tries >= 26) {
            clearInterval(timer);
            setResult({ success: false });
          }
        } catch {
          if (tries >= 26) {
            clearInterval(timer);
            setResult({ success: false });
          }
        }
      }, 1500);
    } else {
      // 没有订单号，直接用回跳参数展示
      setResult({ success: searchParams.get("result") === "success" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (result) setStep("result");
  }, [result]);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const goPlan = () => setStep("plan");
  const goContact = () => setStep("contact");
  const goConfirm = () => setStep("confirm");

  const handleSubmitOrder = async () => {
    if (!item) return;
    setSubmitting(true);
    try {
      const created = await createOrder(item, contact, method);
      setOrder(created);
      if (isRealPay) {
        // 真实支付：保存订单（回跳后恢复），支付宝模式跳转收银台
        sessionStorage.setItem("yochi_order", JSON.stringify(created));
        if (created.payParams?.redirectUrl) {
          window.location.href = created.payParams.redirectUrl;
          return;
        }
        if (method === "wechat") {
          alert("微信支付暂未开通，请使用支付宝完成支付。");
          setStep("confirm");
          return;
        }
      }
      setStep("paying");
    } catch (e) {
      alert(e instanceof Error ? e.message : "下单失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaid = async () => {
    if (!order) return;
    if (isRealPay && order.payParams?.qrContent) {
      // 真实支付：轮询后端订单状态确认
      for (let i = 0; i < 12; i++) {
        const status = await queryOrder(order.orderNo, "created");
        if (status === "paid") {
          setResult({ success: true });
          return;
        }
        await new Promise((r) => setTimeout(r, 1500));
      }
      alert("暂未检测到支付完成，请确认是否已完成付款；如已支付请稍后在订单中查询。");
      return;
    }
    const res = await mockPay(order, true);
    setResult({ success: res.status === "paid" });
  };

  const handleFailed = async () => {
    if (!order) return;
    await mockPay(order, false);
    setResult({ success: false });
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* 步骤指示器 */}
      <ol className="mb-10 flex items-center justify-center gap-2 sm:gap-4">
        {STEPS.map((s, i) => {
          const done = i < stepIndex;
          const active = i === stepIndex;
          return (
            <li key={s.id} className="flex items-center gap-2 sm:gap-4">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-xs font-bold transition-colors",
                  done
                    ? "bg-gradient-to-r from-lime-400 to-brand-500 text-white"
                    : active
                      ? "bg-brand-500 text-white"
                      : "bg-slate-200 text-slate-500"
                )}
              >
                {done ? "✓" : i + 1}
              </span>
              <span
                className={cn(
                  "text-xs font-semibold sm:text-sm",
                  active ? "text-slate-900" : done ? "text-slate-600" : "text-slate-400"
                )}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <span className="h-px w-4 bg-slate-200 sm:w-8" />
              )}
            </li>
          );
        })}
      </ol>

      {/* 步骤内容 */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10">
        {step === "plan" && (
          <div>
            <PlanPicker value={item} onChange={setItem} />
            <div className="mt-10 flex justify-end">
              <button
                type="button"
                disabled={!item}
                onClick={goContact}
                className={cn(
                  "rounded-full px-8 py-3 text-base font-semibold transition-all",
                  item
                    ? "bg-gradient-to-r from-lime-500 via-brand-500 to-teal-500 text-white shadow-lg shadow-brand-500/30 hover:brightness-110"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                )}
              >
                下一步：填写联系信息
              </button>
            </div>
          </div>
        )}

        {step === "contact" && (
          <div>
            <ContactForm
              value={contact}
              onChange={setContact}
              onSubmit={goConfirm}
            />
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={goPlan}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
              >
                <ArrowLeft className="size-4" /> 返回重新选择商品
              </button>
            </div>
          </div>
        )}

        {step === "confirm" && item && (
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-3">
              <MethodPicker value={method} onChange={setMethod} real={isRealPay} />
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={goContact}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
                >
                  <ArrowLeft className="size-4" /> 上一步
                </button>
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={submitting}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:brightness-110",
                    submitting
                      ? "cursor-wait bg-slate-400"
                      : "bg-gradient-to-r from-lime-500 via-brand-500 to-teal-500"
                  )}
                >
                  <Lock className="size-4" />
                  {submitting
                    ? "提交中…"
                    : isRealPay && method === "alipay"
                      ? "提交订单并前往支付宝"
                      : `提交订单并支付 ${item.price === 0 ? "¥0" : item.priceText}`}
                </button>
              </div>
            </div>
            <div className="lg:col-span-2">
              <OrderSummary item={item} contact={contact} method={method} />
            </div>
          </div>
        )}

        {step === "paying" && order && (
          <MockCheckout
            order={order}
            onPaid={handlePaid}
            onFailed={handleFailed}
            onCancel={() => setStep("confirm")}
          />
        )}

        {step === "result" && order && result && (
          <ResultView success={result.success} order={order} />
        )}
      </div>

      {isRealPay && (
        <p className="mt-4 text-center text-xs text-slate-400">
          已接入真实支付通道，订单由服务器创建。
        </p>
      )}
    </div>
  );
}
