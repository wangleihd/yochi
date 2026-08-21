# Cloudflare Pages Functions —— 支付宝真实支付后端

本目录是部署到 Cloudflare Pages 的支付后端（Pages Functions），与前端静态产物（`out/`）一起部署。

## 架构

- **无状态**：订单不落库，状态通过 `alipay.trade.query` 实时向支付宝查询
- **电脑网页支付**：`alipay.trade.page.pay`，用户跳转支付宝网页收银台
- **信息透传**：邮箱/手机号/商品信息编码进 `passback_params`，支付回调时取回用于开通权益
- **签名**：RSA2（SHA256withRSA / PKCS1 v1.5），Web Crypto 实现，Node 与 workerd 均兼容

## 路由

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/orders` | 创建订单，返回支付宝收银台跳转 URL |
| GET | `/api/orders/:orderNo` | 查询订单状态（实时查支付宝） |
| POST | `/api/pay/alipay/notify` | 支付宝异步通知（验签 + 触发开通） |
| GET | `/api/pay/alipay/return` | 支付宝同步回跳（验签后 302 到前端结果页） |

## 环境变量（Cloudflare Pages → Settings → Environment variables / Secrets）

| 变量 | 说明 | 示例 |
| --- | --- | --- |
| `ALIPAY_APP_ID` | 开放平台应用 app_id | `2021003xxxx` |
| `ALIPAY_PRIVATE_KEY` | 应用私钥（**PKCS8** PEM，`-----BEGIN PRIVATE KEY-----`） | — |
| `ALIPAY_PUBLIC_KEY` | 支付宝公钥（SPKI PEM） | — |
| `ALIPAY_GATEWAY` | 网关（生产可省略，默认开放平台网关） | `https://openapi.alipay.com/gateway.do` |
| `PAY_BASE_URL` | 本服务域名（拼接回调地址） | `https://yochi.pages.dev` |
| `FRONTEND_BASE` | 前端静态页面根（回跳目标） | `https://yochi.pages.dev/yochi` |

密钥类（私钥/公钥）建议用 Secret 存储：`wrangler pages secret put ALIPAY_APP_ID --project-name yochi` 等。

## 本地测试

```bash
# 安装依赖后（无第三方依赖，纯 Web Crypto）
node -e "import('./lib/alipay.js').then(async m => {
  // 用本地生成的 RSA 密钥对做自检
})"
```

## 支付宝开放平台配置

在开放平台应用后台，确认：
- 已签约「电脑网站支付」产品
- 回调地址（return_url / notify_url）允许的域名包含 `PAY_BASE_URL`（如 `https://yochi.pages.dev`）
- 如需沙箱联调：设置 `ALIPAY_GATEWAY=https://openapi-sandbox.dl.alipaydev.com/gateway.do`，并使用沙箱应用参数

## 开通权益（TODO 接入点）

`notify.js` 中支付成功分支已解析 `passback_params`（email / phone / itemName / periodLabel），
在 `// TODO: grantBenefit(...)` 处接入真实开通逻辑（邮件/短信/权益库写入）。
