#!/usr/bin/env bash
# 部署曜驰 Yochi 官网 + 支付宝支付后端到 Cloudflare Pages
# 前置：export CLOUDFLARE_API_TOKEN=xxx CLOUDFLARE_ACCOUNT_ID=xxx
# 用法：
#   1) 配置支付宝环境变量（wrangler pages secret put 或 Cloudflare 控制台）
#   2) ./scripts/deploy-cloudflare.sh

set -euo pipefail

PROJECT="yochi"
# 需替换为实际 pages.dev 域名（首次部署后 wrangler 会提示）
PAGES_DOMAIN="${PAGES_DOMAIN:-https://yochi-9uz.pages.dev}"

echo "==> 1/4 构建前端（真实支付模式）"
NEXT_PUBLIC_PAY_MODE=real \
NEXT_PUBLIC_PAY_API_BASE="${PAGES_DOMAIN}" \
pnpm build

echo "==> 1b/4 整理部署目录（静态文件放入 yochi/ 子目录，与 /yochi/* 路径对应）"
rm -rf out-deploy
mkdir -p out-deploy/yochi
cp -r out/. out-deploy/yochi/

echo "==> 2/4 创建 Pages 项目（已存在则跳过）"
wrangler pages project create "${PROJECT}" --production-branch main || true

echo "==> 3/4 设置非敏感环境变量"
wrangler pages project edit "${PROJECT}" \
  --var PAY_BASE_URL:"${PAGES_DOMAIN}" \
  --var FRONTEND_BASE:"${PAGES_DOMAIN}/yochi" \
  --var ALIPAY_GATEWAY:"https://openapi.alipay.com/gateway.do" || echo "  （如不支持 --var，请在 Cloudflare 控制台手动配置）"

echo "==> 4/4 部署（静态产物 + functions）"
wrangler pages deploy out-deploy --project-name "${PROJECT}"

echo ""
echo "部署完成！"
echo "  前端: ${PAGES_DOMAIN}/yochi"
echo "  支付 API: ${PAGES_DOMAIN}/api/orders"
echo ""
echo "还需在 Cloudflare 控制台（Pages → ${PROJECT} → Settings → Variables and Secrets）配置："
echo "  - ALIPAY_APP_ID        （应用 app_id）"
echo "  - ALIPAY_PRIVATE_KEY   （应用私钥 PKCS8 PEM，Secret）"
echo "  - ALIPAY_PUBLIC_KEY    （支付宝公钥 PEM，Secret）"
echo "然后到支付宝开放平台确认回调域名包含 ${PAGES_DOMAIN}"
