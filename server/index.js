/**
 * 曜驰 Yochi 支付服务
 * 提供支付宝 / 微信支付的下单与回调接口，供前端（/pay）在真实支付模式下调用。
 *
 * 启动：npm install && npm start（或 node index.js）
 * 需先配置环境变量，见 lib/config.js
 */
import express from "express";
import ordersRouter from "./routes/orders.js";
import notifyRouter from "./routes/notify.js";
import { config } from "./lib/config.js";

const app = express();

// 保留原始 body 供微信回调验签使用
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString("utf8");
    },
  })
);

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "yochi-pay" }));
app.use("/api/orders", ordersRouter);
app.use("/api/pay", notifyRouter);

app.use((err, _req, res, _next) => {
  console.error("未处理错误:", err);
  res.status(500).json({ message: "服务内部错误" });
});

app.listen(config.port, () => {
  console.log(`曜驰支付服务已启动: http://localhost:${config.port}`);
  console.log(`支付宝: ${config.alipay.appId ? "已配置" : "未配置（沙箱联调请设置 ALIPAY_*）"}`);
  console.log(`微信: ${config.wechat.mchid ? "已配置" : "未配置（请设置 WECHAT_*）"}`);
});
