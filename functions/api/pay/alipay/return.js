/**
 * GET /api/pay/alipay/return 支付宝电脑网页支付同步回跳
 * - 验签后 302 到前端结果页（/yochi/pay?alipayReturn=1&out_trade_no=...&result=success|failed）
 */
import { verifyNotifyParams, parseAlipayParams } from "../../../lib/alipay-service.js";

export async function onRequestGet(context) {
  const params = parseAlipayParams(context.request.url ? new URL(context.request.url).searchParams : new URLSearchParams());

  const ok = await verifyNotifyParams(params, context.env).catch(() => false);
  const frontendBase = context.env.FRONTEND_BASE || "https://yochi.pages.dev/yochi";
  const orderNo = params.out_trade_no || "";

  if (!ok) {
    return Response.redirect(`${frontendBase}/pay?alipayReturn=1&result=failed&out_trade_no=${encodeURIComponent(orderNo)}`, 302);
  }

  const success = params.trade_status === "TRADE_SUCCESS" || params.trade_status === "TRADE_FINISHED";
  return Response.redirect(
    `${frontendBase}/pay?alipayReturn=1&result=${success ? "success" : "failed"}&out_trade_no=${encodeURIComponent(orderNo)}`,
    302
  );
}
