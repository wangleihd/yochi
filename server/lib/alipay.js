/**
 * 支付宝对接（alipay-sdk）
 * - 下单：alipay.trade.precreate（当面付/扫码，返回 qr_code 供前端渲染二维码）
 * - 回调：checkNotifySign 验签
 */
import { AlipaySdk } from "alipay-sdk";
import { config } from "./config.js";

let sdk = null;

export function getAlipaySdk() {
  if (sdk) return sdk;
  if (!config.alipay.appId || !config.alipay.privateKey) {
    throw new Error("未配置 ALIPAY_APP_ID / ALIPAY_PRIVATE_KEY");
  }
  sdk = new AlipaySdk({
    appId: config.alipay.appId,
    privateKey: config.alipay.privateKey,
    alipayPublicKey: config.alipay.alipayPublicKey,
    gateway: config.alipay.gateway,
    signType: "RSA2",
    charset: "utf-8",
  });
  return sdk;
}

/**
 * 创建支付宝扫码支付订单
 * @param {{ outTradeNo: string, totalAmount: string, subject: string }} params
 * @returns {Promise<string>} qr_code 二维码内容
 */
export async function createAlipayPrecreate({ outTradeNo, totalAmount, subject }) {
  const sdk = getAlipaySdk();
  const notifyUrl = `${config.payBaseUrl}/api/pay/alipay/notify`;
  const res = await sdk.exec(
    "alipay.trade.precreate",
    {
      outTradeNo,
      totalAmount, // 元，字符串，两位小数
      subject,
      notifyUrl,
    },
    { validateSign: true }
  );
  if (res.code !== "10000") {
    throw new Error(`支付宝下单失败：${res.subMsg || res.msg}`);
  }
  return res.qrCode;
}

/** 验签支付宝异步通知参数（req.body 或 query 中的全部参数） */
export function verifyAlipayNotify(params) {
  const sdk = getAlipaySdk();
  return sdk.checkNotifySign(params);
}
