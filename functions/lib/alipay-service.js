/**
 * 支付宝业务封装：电脑网页支付下单 + 交易查询（无状态，实时向支付宝查询）
 */
import {
  signParams,
  verifyParams,
  buildGatewayUrl,
  buildSignContent,
  verifyContent,
} from "./alipay.js";

const DEFAULT_GATEWAY = "https://openapi.alipay.com/gateway.do";

function now() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function baseParams(env, method) {
  return {
    app_id: env.ALIPAY_APP_ID,
    method,
    format: "JSON",
    charset: "utf-8",
    sign_type: "RSA2",
    timestamp: now(),
    version: "1.0",
  };
}

/**
 * 创建电脑网页支付订单，返回支付宝收银台跳转 URL
 * @param {{outTradeNo, totalAmount, subject, passbackParams}} arg
 */
export async function createPagePay(arg, env) {
  const params = {
    ...baseParams(env, "alipay.trade.page.pay"),
    notify_url: `${env.PAY_BASE_URL}/api/pay/alipay/notify`,
    return_url: `${env.PAY_BASE_URL}/api/pay/alipay/return`,
    biz_content: JSON.stringify({
      out_trade_no: arg.outTradeNo,
      product_code: "FAST_INSTANT_TRADE_PAY",
      total_amount: arg.totalAmount,
      subject: arg.subject,
      // 原样返回给回调：携带联系信息与商品，用于支付后开通
      passback_params: encodeURIComponent(JSON.stringify(arg.passbackParams)),
    }),
  };
  const { sign } = await signParams(params, env.ALIPAY_PRIVATE_KEY);
  const gateway = env.ALIPAY_GATEWAY || DEFAULT_GATEWAY;
  return buildGatewayUrl(params, sign, gateway);
}

/**
 * 查询支付宝交易状态
 * @returns {Promise<{status: string, trade: object|null}>} status: created|paid|failed|not_found
 */
export async function queryTrade(outTradeNo, env) {
  const params = {
    ...baseParams(env, "alipay.trade.query"),
    biz_content: JSON.stringify({ out_trade_no: outTradeNo }),
  };
  const { sign } = await signParams(params, env.ALIPAY_PRIVATE_KEY);
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) body.append(k, v);
  body.append("sign", sign);

  const res = await fetch(env.ALIPAY_GATEWAY || DEFAULT_GATEWAY, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
    body: body.toString(),
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`支付宝查询响应解析失败: ${text.slice(0, 200)}`);
  }

  const biz = data.alipay_trade_query_response;
  if (!biz) throw new Error("支付宝查询响应缺少 alipay_trade_query_response");

  // 响应验签（可选增强；签名失败仅告警不影响主流程）
  try {
    const respContent = buildSignContent({
      alipay_trade_query_response: JSON.stringify(biz),
    });
    const ok = await verifyContent(respContent, data.sign, env.ALIPAY_PUBLIC_KEY);
    if (!ok) console.warn(`[alipay.query] 响应验签失败 order=${outTradeNo}`);
  } catch (e) {
    console.warn(`[alipay.query] 验签异常: ${e.message}`);
  }

  if (biz.code !== "10000") {
    // 40004 交易不存在等
    if (biz.code === "40004") return { status: "not_found", trade: null };
    throw new Error(`支付宝查询失败: ${biz.sub_msg || biz.msg}`);
  }

  const tradeStatus = biz.trade_status;
  let status = "created";
  if (tradeStatus === "TRADE_SUCCESS" || tradeStatus === "TRADE_FINISHED") {
    status = "paid";
  } else if (tradeStatus === "TRADE_CLOSED") {
    status = "failed";
  } else if (tradeStatus === "WAIT_BUYER_PAY") {
    status = "created";
  }
  return { status, trade: biz };
}

/** 解析支付宝回调 / 回跳参数 */
export function parseAlipayParams(input) {
  const params = {};
  for (const [k, v] of input.entries()) params[k] = v;
  return params;
}

/** 支付宝 notify 验签（异步） */
export async function verifyNotifyParams(params, env) {
  return verifyParams(params, env.ALIPAY_PUBLIC_KEY);
}
