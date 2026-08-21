/**
 * 支付配置
 *
 * 模式说明：
 * - "mock"（默认）：纯前端模拟支付，可在静态托管（GitHub Pages）直接跑通全流程，
 *   用于演示与联调。订单在本地生成，无需后端。
 * - "real"：真实支付，前端通过 PAY_API_BASE 调用后端下单接口（见 server/ 目录），
 *   后端对接支付宝 / 微信支付。
 *
 * 切换到真实支付：
 *   1. 将后端部署到支持 Node 的服务器（见 server/README.md），配置商户参数；
 *   2. 前端构建时设置 NEXT_PUBLIC_PAY_MODE=real 与 NEXT_PUBLIC_PAY_API_BASE=<后端地址>；
 *   3. 重新构建部署即可。
 */

export const PAY_CONFIG = {
  mode: (process.env.NEXT_PUBLIC_PAY_MODE ?? "mock") as "mock" | "real",
  apiBase: process.env.NEXT_PUBLIC_PAY_API_BASE ?? "",
} as const;

export const isRealPay = PAY_CONFIG.mode === "real";
