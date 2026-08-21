/**
 * POST /api/pay/alipay/notify 支付宝异步通知
 * - 验签（RSA2）
 * - 支付成功后通过 passback_params 触发权益开通（当前记录日志，可接入邮件/短信等）
 * - 必须返回 success，否则支付宝会重试
 */
import { verifyNotifyParams, parseAlipayParams } from "../../lib/alipay-service.js";

export async function onRequestPost(context) {
  try {
    const form = await context.request.formData();
    const params = parseAlipayParams(form);

    const ok = await verifyNotifyParams(params, context.env);
    if (!ok) {
      console.warn("[alipay.notify] 验签失败");
      return new Response("failure", { status: 200 });
    }

    const tradeStatus = params.trade_status;
    if (tradeStatus === "TRADE_SUCCESS" || tradeStatus === "TRADE_FINISHED") {
      // 解析透传参数（邮箱/手机号/商品），用于开通权益
      let passback = {};
      try {
        if (params.passback_params) {
          passback = JSON.parse(decodeURIComponent(params.passback_params));
        }
      } catch {
        console.warn("[alipay.notify] passback_params 解析失败");
      }

      console.log(
        `[alipay.notify] 支付成功 order=${params.out_trade_no} trade=${params.trade_no} amount=${params.total_amount} buyer=${params.buyer_logon_id || ""}`
      );
      if (passback.email) {
        console.log(
          `[alipay.notify] 开通权益 email=${passback.email} item=${passback.itemName} period=${passback.periodLabel}`
        );
        // TODO: 在此接入真实开通逻辑（发送开通邮件 / 短信、写入用户权益库）
        // await grantBenefit({ email: passback.email, item: passback.itemName, periodLabel: passback.periodLabel, orderNo: params.out_trade_no, tradeNo: params.trade_no });
      }
    }

    return new Response("success", { status: 200 });
  } catch (err) {
    console.error("[alipay.notify] 处理异常:", err.message);
    return new Response("failure", { status: 200 });
  }
}
