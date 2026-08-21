# 曜驰 Yochi 支付服务（支付宝 / 微信）

当前官网以**模拟支付**模式跑通全流程（纯静态，GitHub Pages 可演示，不产生真实扣款）。
本目录是**真实支付**的后端对接代码：拿到商户资质并部署到服务器后，配置环境变量即可切换。

## 切换真实支付的步骤

1. **申请资质**
   - 支付宝开放平台创建应用，签约「当面付 / 电脑网站支付」，获取 `app_id`、生成应用私钥、上传公钥并获取「支付宝公钥」
   - 微信支付商户平台申请商户号，下载 API 证书（商户私钥 + 证书序列号）、设置 APIv3 密钥、下载「微信支付平台公钥」

2. **部署本服务**（任意支持 Node 18+ 的服务器 / 云函数）
   ```bash
   cd server
   npm install
   # 配置环境变量（见 lib/config.js）
   export PAY_BASE_URL="https://api.yochix.com"        # 你的后端域名
   export ALIPAY_APP_ID="..." ALIPAY_PRIVATE_KEY="..." ALIPAY_PUBLIC_KEY="..."
   export WECHAT_APPID="..." WECHAT_MCHID="..." WECHAT_SERIAL_NO="..." \
          WECHAT_PRIVATE_KEY="..." WECHAT_API_V3_KEY="..." WECHAT_PLATFORM_PUBLIC_KEY="..."
   npm start
   ```
   沙箱联调：支付宝可在开放平台沙箱环境获取沙箱参数并设置 `ALIPAY_GATEWAY=https://openapi-sandbox.dl.alipaydev.com/gateway.do`。

3. **前端切换真实支付**
   ```bash
   NEXT_PUBLIC_PAY_MODE=real NEXT_PUBLIC_PAY_API_BASE="https://api.yochix.com" pnpm build
   ```
   重新部署后，支付页将展示支付宝 / 微信官方支付二维码，支付结果以后端回调为准。

## 接口

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/orders` | 创建订单（调支付宝 precreate / 微信 NATIVE 下单，返回 `payParams.qrContent`） |
| GET | `/api/orders/:orderNo` | 查询订单状态（created / paid） |
| POST | `/api/pay/alipay/notify` | 支付宝异步通知（RSA2 验签） |
| POST | `/api/pay/wechat/notify` | 微信支付回调（v3 验签 + AES-256-GCM 解密） |
| GET | `/api/health` | 健康检查 |

## 说明

- 订单存储为内存 Map，仅用于演示 / 联调；**生产环境必须替换为数据库**（`lib/store.js`），并在回调中持久化订单状态、幂等处理重复回调。
- 支付成功后建议在回调中触发「权益开通」逻辑（发送开通邮件 / 短信至用户邮箱手机号）。
- 本服务与官网前端相互独立，可分别部署。
