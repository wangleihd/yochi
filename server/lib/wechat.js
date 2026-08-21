/**
 * 微信支付 v3 对接（原生实现，无第三方 SDK）
 * - 下单：POST /v3/pay/transactions/native（扫码支付，返回 code_url）
 * - 请求签名：WECHATPAY2-SHA256-RSA2048
 * - 回调：验签（平台公钥）+ 解密（AES-256-GCM）
 */
import axios from "axios";
import crypto from "node:crypto";
import { config } from "./config.js";

const WECHAT_API = "https://api.mch.weixin.qq.com";

/** 生成请求签名（商户请求微信 API） */
function signRequest(method, urlPath, bodyStr, nonce, timestamp) {
  const message = `${method}\n${urlPath}\n${timestamp}\n${nonce}\n${bodyStr}\n`;
  return crypto
    .createSign("RSA-SHA256")
    .update(message)
    .sign(config.wechat.privateKey, "base64");
}

/** 发起带签名的微信 v3 请求 */
async function wechatRequest(method, urlPath, body = {}) {
  const nonce = crypto.randomBytes(16).toString("hex");
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const bodyStr = JSON.stringify(body);
  const signature = signRequest(method, urlPath, bodyStr, nonce, timestamp);

  const res = await axios({
    method,
    url: `${WECHAT_API}${urlPath}`,
    data: bodyStr,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "yochi-pay-server",
      Authorization: `WECHATPAY2-SHA256-RSA2048 mchid="${config.wechat.mchid}",nonce_str="${nonce}",signature="${signature}",timestamp="${timestamp}",serial_no="${config.wechat.serialNo}"`,
    },
    timeout: 10000,
  });
  return res.data;
}

/**
 * 创建微信 NATIVE 扫码支付订单
 * @returns {Promise<string>} code_url 二维码内容
 */
export async function createWechatNative({ outTradeNo, amountFen, description }) {
  const notifyUrl = `${config.payBaseUrl}/api/pay/wechat/notify`;
  const data = await wechatRequest("POST", "/v3/pay/transactions/native", {
    appid: config.wechat.appid,
    mchid: config.wechat.mchid,
    description,
    out_trade_no: outTradeNo,
    notify_url: notifyUrl,
    amount: { total: amountFen, currency: "CNY" },
  });
  if (!data.code_url) {
    throw new Error("微信下单失败：未返回 code_url");
  }
  return data.code_url;
}

/**
 * 验签微信回调（微信平台对回调内容的签名）
 * @param {string} body 原始请求体
 * @param {{ signature: string, timestamp: string, nonce: string }} headers
 */
export function verifyWechatNotify(body, { signature, timestamp, nonce }) {
  const message = `${timestamp}\n${nonce}\n${body}\n`;
  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(message);
  return verify.verify(config.wechat.platformPublicKey, signature, "base64");
}

/** 解密微信回调 resource（AES-256-GCM） */
export function decryptWechatResource(resource) {
  const key = Buffer.from(config.wechat.apiV3Key, "utf8");
  const iv = Buffer.from(resource.nonce, "utf8");
  const tag = Buffer.from(resource.ciphertext.slice(-16), "base64");
  const data = Buffer.from(resource.ciphertext.slice(0, -16), "base64");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  if (resource.associated_data) {
    decipher.setAAD(Buffer.from(resource.associated_data, "utf8"));
  }
  const decoded = Buffer.concat([decipher.update(data), decipher.final()]);
  return JSON.parse(decoded.toString("utf8"));
}

/** 查询微信订单状态（可选，用于轮询） */
export async function queryWechatOrder(outTradeNo) {
  const data = await wechatRequest(
    "GET",
    `/v3/pay/transactions/out-trade-no/${outTradeNo}?mchid=${config.wechat.mchid}`
  );
  return data;
}
