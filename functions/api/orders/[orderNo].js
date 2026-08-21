/**
 * GET /api/orders/:orderNo 查询订单状态（实时查询支付宝）
 */
import { json } from "../lib/util.js";
import { queryTrade } from "../lib/alipay-service.js";

export async function onRequestGet(context) {
  const { orderNo } = context.params;
  if (!orderNo) return json(400, { message: "缺少订单号" });

  try {
    const { status } = await queryTrade(orderNo, context.env);
    return json(200, { orderNo, status });
  } catch (err) {
    console.error(`[orders] 查询失败 ${orderNo}:`, err.message);
    return json(502, { message: err.message || "查询失败" });
  }
}
