/**
 * Mock 支付宝网关（本地 workerd 联调用）
 * - 验请求签名（用 ALIPAY_PUBLIC_KEY）
 * - 用 ALIPAY_PRIVATE_KEY 签名返回 alipay.trade.query 响应（TRADE_SUCCESS）
 * 密钥读取自项目根 .dev.vars
 * 用法：node functions/tests/mock-alipay-gateway.mjs [端口]
 */
import http from "node:http";
import { readFileSync } from "node:fs";
import path from "node:path";
import { signParams, verifyParams } from "../lib/alipay.js";

const port = Number(process.argv[2] || 8899);

function readDevVars() {
  const raw = readFileSync(path.resolve(process.cwd(), ".dev.vars"), "utf8");
  const get = (key) => {
    const m = raw.match(new RegExp(`${key}\\s*=\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    return m ? JSON.parse('"' + m[1] + '"') : null;
  };
  return { privateKey: get("ALIPAY_PRIVATE_KEY"), publicKey: get("ALIPAY_PUBLIC_KEY") };
}

const { privateKey, publicKey } = readDevVars();
if (!privateKey || !publicKey) {
  console.error(".dev.vars 缺少 ALIPAY_PRIVATE_KEY / ALIPAY_PUBLIC_KEY");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", async () => {
    const params = Object.fromEntries(new URLSearchParams(body));
    const valid = await verifyParams(params, publicKey).catch(() => false);
    console.log(`  [mock网关] ${req.method} ${params.method || ""} 验签:`, valid ? "✅" : "❌");

    let bizContent = {};
    try {
      bizContent = JSON.parse(params.biz_content || "{}");
    } catch {}

    if (params.method === "alipay.trade.query") {
      const resp = {
        code: "10000",
        msg: "Success",
        trade_status: "TRADE_SUCCESS",
        out_trade_no: bizContent.out_trade_no || "",
        trade_no: "20260821220010000001",
        total_amount: "4990.00",
      };
      const { sign } = await signParams(
        { alipay_trade_query_response: JSON.stringify(resp) },
        privateKey
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ alipay_trade_query_response: resp, sign }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ code: "10000", msg: "Success" }));
    }
  });
});

server.listen(port, () => console.log(`Mock 支付宝网关已启动: http://127.0.0.1:${port}`));
