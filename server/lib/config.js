/**
 * 支付服务配置（环境变量）
 *
 * 支付宝（沙箱可先用沙箱参数联调）：
 *   ALIPAY_APP_ID         应用 app_id（沙箱：在开放平台沙箱环境获取）
 *   ALIPAY_PRIVATE_KEY    商户应用私钥（PKCS8，含 BEGIN/END 行）
 *   ALIPAY_PUBLIC_KEY     支付宝公钥（用于回调验签）
 *   ALIPAY_GATEWAY        网关，沙箱为 https://openapi-sandbox.dl.alipaydev.com/gateway.do，
 *                         生产为 https://openapi.alipay.com/gateway.do（缺省）
 *
 * 微信支付（需微信支付商户号）：
 *   WECHAT_APPID          小程序/公众号 AppID
 *   WECHAT_MCHID          商户号
 *   WECHAT_SERIAL_NO      商户 API 证书序列号
 *   WECHAT_PRIVATE_KEY    商户 API 私钥（apiclient_key.pem 内容）
 *   WECHAT_API_V3_KEY     APIv3 密钥（32 位）
 *   WECHAT_PLATFORM_PUBLIC_KEY 微信支付平台公钥（商户平台可下载，用于回调验签与解密）
 *
 * 通用：
 *   PORT                  服务端口（默认 3001）
 *   PAY_BASE_URL          部署域名，用于拼接回调地址，如 https://api.yochix.com
 */
export const config = {
  port: Number(process.env.PORT || 3001),
  payBaseUrl: process.env.PAY_BASE_URL || "http://localhost:3001",

  alipay: {
    appId: process.env.ALIPAY_APP_ID || "",
    privateKey: process.env.ALIPAY_PRIVATE_KEY || "",
    alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY || "",
    gateway: process.env.ALIPAY_GATEWAY || "https://openapi.alipay.com/gateway.do",
  },

  wechat: {
    appid: process.env.WECHAT_APPID || "",
    mchid: process.env.WECHAT_MCHID || "",
    serialNo: process.env.WECHAT_SERIAL_NO || "",
    privateKey: process.env.WECHAT_PRIVATE_KEY || "",
    apiV3Key: process.env.WECHAT_API_V3_KEY || "",
    platformPublicKey: process.env.WECHAT_PLATFORM_PUBLIC_KEY || "",
  },
};
