import type { ContactInfo, Order, OrderItem, OrderStatus, PayMethod, PayResult } from "@/lib/pay/types";
import { PAY_CONFIG } from "@/lib/pay/config";

/**
 * 支付服务提供方
 * - mock 模式：本地生成订单、模拟支付结果（静态托管可用）
 * - real 模式：调用后端 API 下单（见 server/ 目录），真实对接支付宝 / 微信
 */

function genOrderNo() {
  const d = new Date();
  const pad = (n: number, l = 2) => String(n).padStart(l, "0");
  const ts = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `YC${ts}${rand}`;
}

function genQrToken() {
  return Array.from({ length: 6 }, () =>
    "abcdefghjkmnpqrstuvwxyz23456789".charAt(Math.floor(Math.random() * 32))
  ).join("");
}

export async function createOrder(
  item: OrderItem,
  contact: ContactInfo,
  method: PayMethod
): Promise<Order> {
  if (PAY_CONFIG.mode === "real" && PAY_CONFIG.apiBase) {
    const res = await fetch(`${PAY_CONFIG.apiBase}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item, contact, method }),
    });
    if (!res.ok) throw new Error("下单失败，请稍后重试");
    const data = await res.json();
    return data.order as Order;
  }

  // mock：本地生成订单
  await new Promise((r) => setTimeout(r, 400));
  return {
    orderNo: genOrderNo(),
    item,
    contact,
    method,
    amount: item.price,
    createdAt: new Date().toISOString(),
    expiresInMin: 15,
  };
}

/** 查询订单状态（real 模式轮询后端；mock 模式本地状态） */
export async function queryOrder(
  orderNo: string,
  localStatus: OrderStatus
): Promise<OrderStatus> {
  if (PAY_CONFIG.mode === "real" && PAY_CONFIG.apiBase) {
    const res = await fetch(`${PAY_CONFIG.apiBase}/api/orders/${orderNo}`);
    if (res.ok) {
      const data = await res.json();
      return data.status as OrderStatus;
    }
  }
  return localStatus;
}

/**
 * mock 模式模拟支付结果
 * 返回模拟结果；真实模式下此函数不会被调用（改为轮询后端）
 */
export async function mockPay(
  order: Order,
  success: boolean
): Promise<PayResult> {
  await new Promise((r) => setTimeout(r, 800));
  return {
    status: success ? "paid" : "failed",
    orderNo: order.orderNo,
    paidAt: success ? new Date().toISOString() : undefined,
  };
}

/** 模拟收银台二维码 token（仅 mock 展示用） */
export function mockQrToken(): string {
  return genQrToken();
}
