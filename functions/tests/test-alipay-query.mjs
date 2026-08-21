import http from "node:http";
import crypto from "node:crypto";
import { signParams, verifyParams, buildSignContent } from "../lib/alipay.js";
import { queryTrade, createPagePay } from "../lib/alipay-service.js";

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 });
const privPem = privateKey.export({ type: "pkcs8", format: "pem" });
const pubPem = publicKey.export({ type: "spki", format: "pem" });

// 模拟支付宝网关：验请求签名 + 返回带签名的查询响应
const server = http.createServer(async (req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", async () => {
    const params = Object.fromEntries(new URLSearchParams(body));
    const valid = await verifyParams(params, pubPem); // 用"支付宝侧公钥"验请求签名
    console.log("  [mock网关] 请求验签:", valid ? "✅" : "❌");
    const resp = {
      code: "10000", msg: "Success", trade_status: "TRADE_SUCCESS",
      out_trade_no: params.biz_content ? JSON.parse(params.biz_content).out_trade_no : "",
      trade_no: "20260821220010000001", total_amount: "4990.00",
    };
    const { sign } = await signParams({ alipay_trade_query_response: JSON.stringify(resp) }, privPem);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ alipay_trade_query_response: resp, sign }));
  });
});
await new Promise((r) => server.listen(8899, r));

const env = {
  ALIPAY_APP_ID: "2021000000000000",
  ALIPAY_PRIVATE_KEY: privPem,
  ALIPAY_PUBLIC_KEY: pubPem,
  ALIPAY_GATEWAY: "http://127.0.0.1:8899",
  PAY_BASE_URL: "https://yochi.pages.dev",
  FRONTEND_BASE: "https://yochi.pages.dev/yochi",
};

// 1) 下单 → 生成跳转 URL
const url = await createPagePay({ outTradeNo: "YC202608211700001234", totalAmount: "4990.00", subject: "专业版", passbackParams: { email: "a@b.com" } }, env);
console.log("下单跳转 URL:", url.slice(0, 90) + "...");
console.log("URL 含 app_id/notify_url/sign:", url.includes("app_id="), url.includes("notify_url="), url.includes("sign="));

// 2) 查询 → 应返回 paid（mock 网关返回 TRADE_SUCCESS）
const { status, trade } = await queryTrade("YC202608211700001234", env);
console.log("查询订单状态:", status, trade?.trade_no || "");

server.close();
console.log(status === "paid" && url.includes("sign=") ? "query 链路全部通过 ✅" : "存在问题 ❌");
