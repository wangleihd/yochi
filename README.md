# 曜驰 Yochi 官网

曜驰 Yochi（yochix.com）—— 多账号小红书种草发布平台的官方品牌网站。
Slogan：**曜启光彩，驰传万域 · Yochi, spread your light everywhere.**

## 技术栈

- **Next.js 15**（App Router，全静态生成）
- **React 19**
- **Tailwind CSS v4**（亮绿色品牌主题，`src/app/globals.css` 中的 `@theme` 定义）
- **lucide-react**（图标）

## 页面

| 路由 | 说明 |
| --- | --- |
| `/` | 首页：Hero、平台矩阵、核心功能、三步上手、深度能力、定价预览、用户案例、FAQ 摘要、CTA |
| `/pricing` | 定价：免费版 / 入门版 / 专业版 / 企业版四档套餐、次数包、年付对比、推荐组合、详细对比表、计费 FAQ |
| `/pay` | 支付：选择商品 → 填写邮箱/手机号 → 确认订单 → 支付宝 / 微信收银台 → 结果页（当前为模拟支付，可完整演示流程） |
| `/features` | 功能总览：多账号管理、内容与 AI、发布与排期、数据洞察、手动 vs 曜驰对比 |
| `/faq` | 帮助中心：产品使用、账号安全、订阅计费、支持服务、联系方式 |

## 支付说明

- 当前为**模拟支付模式**（静态托管可直接演示全流程，不产生真实扣款）。
- 真实支付对接代码在 `server/` 目录（支付宝 RSA2 + 微信支付 v3，含下单与回调验签），
  申请到商户资质并部署到 Node 服务器后，按 `server/README.md` 配置即可一键切换。

## 本地开发

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## 生产构建

```bash
pnpm build      # 输出 .next 静态产物
pnpm start      # 本地预览生产版本
```

## 线上部署（GitHub Pages）

**线上地址：https://wangleihd.github.io/yochi/**（仓库：github.com/wangleihd/yochi）

- 采用 Next.js 静态导出（`output: "export"`，`basePath: /yochi`），产物推送到 `gh-pages` 分支
- 已配置 `.nojekyll`，确保 GitHub Pages 正常服务 `_next` 静态资源
- **自动部署**：`.github/workflows/deploy.yml` 会在每次推送到 `main` 时自动构建并更新 `gh-pages`（Node 24 + pnpm 11）
- 手动更新：`git push origin main` 即可触发自动部署
- 修改部署路径：如改用自定义域名，调整 `next.config.ts` 中的 `basePath` 与域名解析即可

## 目录结构

```
src/
├── app/                  # 路由页面（layout / page / pricing / features / faq）
├── components/
│   ├── home/             # 首页区块组件
│   ├── pricing/          # 定价页组件（月付/年付切换）
│   ├── Navbar.tsx        # 全局导航（含移动端菜单）
│   ├── Footer.tsx        # 全局页脚
│   ├── FaqAccordion.tsx  # FAQ 手风琴
│   └── ...               # Logo / Button / SectionHeading 等通用组件
├── lib/
│   ├── pricing.ts        # 套餐与对比表数据（定价页与首页共用）
│   └── utils.ts          # cn() 工具
└── app/globals.css       # Tailwind v4 主题与通用样式
```

## 内容维护

- 套餐价格与对比表：`src/lib/pricing.ts`
- 导航与页脚：`src/components/Navbar.tsx`、`src/components/Footer.tsx`
- 页面文案：各页面组件内直接维护

## 截图

验证截图存放在 `docs/screenshots/`（home / pricing / features / faq / home-mobile）。
