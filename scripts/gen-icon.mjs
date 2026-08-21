// 生成曜驰 Yochi 品牌图标（320x320 PNG）
// 用法：node scripts/gen-icon.mjs
// 依赖 sharp（项目已安装）
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SVG = `<svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="48" y1="20" x2="272" y2="300" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#A3E635"/>
      <stop offset="0.55" stop-color="#10B981"/>
      <stop offset="1" stop-color="#14B8A6"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.32" r="0.78">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <!-- 圆角底 -->
  <rect x="0" y="0" width="320" height="320" rx="72" fill="url(#bg)"/>
  <rect x="0" y="0" width="320" height="320" rx="72" fill="url(#glow)"/>
  <!-- 光芒星（曜） -->
  <path d="M160 74 C165 123 197 155 246 160 C197 165 165 197 160 246 C155 197 123 165 74 160 C123 155 155 123 160 74 Z" fill="#FFFFFF"/>
  <!-- 传播弧线（驰传万域） -->
  <path d="M215.6 61.9 A112 112 0 0 1 258.1 215.6" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" opacity="0.92"/>
  <path d="M228.9 46.6 A136 136 0 0 1 273.4 228.9" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" opacity="0.45"/>
</svg>`;

async function main() {
  mkdirSync("public", { recursive: true });
  const png = await sharp(Buffer.from(SVG)).png().toBuffer();
  const meta = await sharp(png).metadata();
  await sharp(png).toFile("public/icon-320.png");
  console.log(
    `已生成 public/icon-320.png (${meta.width}x${meta.height}, ${(png.length / 1024).toFixed(1)} KB)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
