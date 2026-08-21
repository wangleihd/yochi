/**
 * Mock 支付宝网关（本地 workerd 联调用，完整模拟电脑网页支付）
 * - POST alipay.trade.query：验签后返回 TRADE_SUCCESS（带签名响应）
 * - GET（page.pay 跳转）：返回「模拟支付宝收银台」页面，点击支付后签名回跳 return_url
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
    const m = raw.match(new RegExp(`${key}\\s*=\\s*"((?:[^"\\\\]|\\\\[^"\\\\])*)"`));
    return m ? m[1].replace(/\\n/g, "\n") : null;
  };
  return { privateKey: get("ALIPAY_PRIVATE_KEY"), publicKey: get("ALIPAY_PUBLIC_KEY") };
}

const { privateKey, publicKey } = readDevVars();
if (!privateKey || !publicKey) {
  console.error(".dev.vars 缺少 ALIPAY_PRIVATE_KEY / ALIPAY_PUBLIC_KEY");
  process.exit(1);
}

/** 构造支付宝支付成功后的签名回跳 URL（模拟真实回跳参数） */
async function buildReturnUrl(params, biz) {
  const ret = {
    charset: "utf-8",
    timestamp: "2026-08-21 17:00:00",
    version: "1.0",
    sign_type: "RSA2",
    app_id: params.app_id || "2021000000000000",
    method: "alipay.trade.page.pay",
    out_trade_no: biz.out_trade_no || "",
    trade_no: "20260821220010000001",
    total_amount: biz.total_amount || "0.00",
    trade_status: "TRADE_SUCCESS",
  };
  const { sign } = await signParams(ret, privateKey);
  const qs = Object.keys(ret)
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(ret[k])}`)
    .join("&");
  return `${params.return_url || ""}?${qs}&sign=${encodeURIComponent(sign)}`;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);

  if (req.method === "GET") {
    // ===== 模拟 page.pay 跳转：支付宝电脑网页收银台 =====
    const params = Object.fromEntries(url.searchParams);
    let biz = {};
    try {
      biz = JSON.parse(params.biz_content || "{}");
    } catch {}

    buildReturnUrl(params, biz).then((returnUrl) => {
      const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="utf-8">
<title>模拟支付宝收银台</title>
<style>body{font-family:-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f5f7fa;margin:0}
.card{background:#fff;border-radius:16px;padding:40px 48px;box-shadow:0 12px 40px rgba(0,0,0,.08);text-align:center;max-width:420px}
.logo{display:inline-flex;align-items:center;gap:8px;color:#1677FF;font-size:20px;font-weight:700}
.amt{font-size:28px;font-weight:800;color:#1677FF;margin:16px 0 8px}
.order{margin:16px 0;padding:16px;background:#f8fafc;border-radius:12px;font-size:14px;color:#475569;text-align:left}
.order div{margin:6px 0}
.btn{display:inline-block;background:#1677FF;color:#fff;border:none;border-radius:999px;padding:14px 40px;font-size:16px;font-weight:600;cursor:pointer;margin-top:8px}
.tip{color:#94a3b8;font-size:12px;margin-top:16px}</style></head><body>
<div class="card">
  <div class="logo">支 支付宝收银台</div>
  <p class="amt">¥${biz.total_amount || "0.00"}</p>
  <div class="order">
    <div>商品：${biz.subject || ""}</div>
    <div>订单号：${biz.out_trade_no || ""}</div>
  </div>
  <button class="btn" id="pay">模拟支付成功（¥${biz.total_amount || "0.00"}）</button>
  <p class="tip">本地联调模拟收银台，不产生真实扣款</p>
</div>
<script>
document.getElementById('pay').onclick = function () {
  location.href = ${JSON.stringify(returnUrl)};
};
</script></body></html>`;
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(html);
    });
    return;
  }

  // ===== POST：trade.query 等 API =====
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", async () => {
    const params = Object.fromEntries(new URLSearchParams(body));
    const valid = await verifyParams(params, publicKey).catch(() => false);
    console.log(`  [mock网关] POST ${params.method || ""} 验签:`, valid ? "✅" : "❌");

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
