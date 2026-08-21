"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockQrToken } from "@/lib/pay/provider";
import type { Order, PayMethod } from "@/lib/pay/types";

type MockCheckoutProps = {
  order: Order;
  onPaid: () => void;
  onFailed: () => void;
  onCancel: () => void;
};

/** 生成模拟二维码图案（伪随机，基于 token 种子） */
function MockQr({ token, method }: { token: string; method: PayMethod }) {
  const cells = useMemo(() => {
    const size = 21;
    let seed = 0;
    for (const ch of token) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) >>> 0;
      return seed / 4294967296;
    };
    const grid: boolean[][] = [];
    for (let y = 0; y < size; y++) {
      const row: boolean[] = [];
      for (let x = 0; x < size; x++) row.push(rand() > 0.52);
      grid.push(row);
    }
    // finder patterns（三个角）
    const finder = (ox: number, oy: number) => {
      for (let y = 0; y < 7; y++)
        for (let x = 0; x < 7; x++) {
          const edge = x === 0 || y === 0 || x === 6 || y === 6;
          const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
          grid[oy + y][ox + x] = edge || core;
        }
    };
    finder(0, 0);
    finder(size - 7, 0);
    finder(0, size - 7);
    return grid;
  }, [token]);

  const fg = method === "alipay" ? "#1677FF" : "#07C160";

  return (
    <svg viewBox="0 0 21 21" className="h-44 w-44" role="img" aria-label="模拟支付二维码">
      {cells.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={fg} />
          ) : null
        )
      )}
    </svg>
  );
}

export function MockCheckout({ order, onPaid, onFailed, onCancel }: MockCheckoutProps) {
  const [token] = useState(() => mockQrToken());
  const isAlipay = order.method === "alipay";
  const realQr = order.payParams?.qrContent ?? null;

  // 真实支付：用官方二维码内容生成二维码
  const [realQrDataUrl, setRealQrDataUrl] = useState<string | null>(null);
  useEffect(() => {
    if (realQr) {
      QRCode.toDataURL(realQr, {
        width: 320,
        margin: 2,
        color: { dark: isAlipay ? "#1677FF" : "#07C160" },
      }).then(setRealQrDataUrl).catch(() => setRealQrDataUrl(null));
    }
  }, [realQr, isAlipay]);

  return (
    <div className="mx-auto max-w-md">
      <div
        className={cn(
          "overflow-hidden rounded-3xl border-2 shadow-xl",
          isAlipay ? "border-[#1677FF]/30" : "border-[#07C160]/30"
        )}
      >
        {/* 收银台头部 */}
        <div
          className={cn(
            "flex items-center justify-between px-6 py-4 text-white",
            isAlipay ? "bg-gradient-to-r from-[#1677FF] to-[#0E5CD6]" : "bg-gradient-to-r from-[#07C160] to-[#06AD56]"
          )}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-white/20 font-black">
              {isAlipay ? "支" : "微"}
            </span>
            <span className="text-sm font-bold">{isAlipay ? "支付宝收银台" : "微信支付收银台"}</span>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-1.5 transition-colors hover:bg-white/20"
            aria-label="取消支付"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="bg-white px-6 py-7 text-center">
          <p className="text-xs text-slate-400">
            订单号 <span className="font-mono">{order.orderNo}</span>
          </p>
          <p className="mt-3 text-4xl font-black text-slate-900">
            {order.amount === 0 ? "¥0" : `¥${order.amount.toLocaleString()}`}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {order.item.name} · {order.item.periodLabel}
          </p>

          {/* 二维码区域 */}
          <div
            className={cn(
              "mx-auto mt-6 flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border-2",
              realQr ? "border-slate-200 bg-white p-2" : "border-dashed",
              !realQr && isAlipay
                ? "border-[#1677FF]/30 bg-[#1677FF]/5"
                : !realQr
                  ? "border-[#07C160]/30 bg-[#07C160]/5"
                  : ""
            )}
          >
            {realQr ? (
              realQrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={realQrDataUrl} alt="支付二维码" className="h-full w-full" />
              ) : (
                <span className="text-xs text-slate-400">二维码生成中…</span>
              )
            ) : (
              <MockQr token={token} method={order.method} />
            )}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            {realQr
              ? `请使用${isAlipay ? "支付宝" : "微信"}扫一扫完成支付`
              : `请使用${isAlipay ? "支付宝" : "微信"}扫码完成支付`}
          </p>
          <p className="mt-1 text-xs text-slate-400">订单有效期 {order.expiresInMin} 分钟，超时自动关闭</p>

          {/* 操作按钮 */}
          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              onClick={onPaid}
              className={cn(
                "w-full rounded-full py-3 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110",
                isAlipay
                  ? "bg-gradient-to-r from-[#1677FF] to-[#0E5CD6] shadow-[#1677FF]/30"
                  : "bg-gradient-to-r from-[#07C160] to-[#06AD56] shadow-[#07C160]/30"
              )}
            >
              {realQr ? "我已完成支付" : "模拟支付成功"}
            </button>
            {!realQr && (
              <button
                type="button"
                onClick={onFailed}
                className="w-full rounded-full border-2 border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-300"
              >
                模拟支付失败 / 取消
              </button>
            )}
          </div>
        </div>
      </div>

      {!realQr && (
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-amber-600">
          <AlertTriangle className="size-3.5" />
          当前为模拟收银台演示，不产生真实扣款。接入支付宝 / 微信后此处将展示官方支付二维码。
        </p>
      )}
    </div>
  );
}
