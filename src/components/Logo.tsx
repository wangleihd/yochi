import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showText?: boolean;
};

/**
 * 曜驰 Yochi 品牌图标
 * 设计：绿色渐变圆角方块 + 中心光芒星（曜）+ 右上传播弧线（驰传万域）
 */
export function Logo({ className, showText = true }: LogoProps) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const bgId = `yochi-bg-${rawId}`;
  const glowId = `yochi-glow-${rawId}`;

  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 320 320"
          className="size-full"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient
              id={bgId}
              x1="48"
              y1="20"
              x2="272"
              y2="300"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#A3E635" />
              <stop offset="0.55" stopColor="#10B981" />
              <stop offset="1" stopColor="#14B8A6" />
            </linearGradient>
            <radialGradient id={glowId} cx="0.5" cy="0.32" r="0.78">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.32" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* 圆角底 */}
          <rect x="0" y="0" width="320" height="320" rx="72" fill={`url(#${bgId})`} />
          <rect x="0" y="0" width="320" height="320" rx="72" fill={`url(#${glowId})`} />
          {/* 光芒星（曜） */}
          <path
            d="M160 74 C165 123 197 155 246 160 C197 165 165 197 160 246 C155 197 123 165 74 160 C123 155 155 123 160 74 Z"
            fill="#FFFFFF"
          />
          {/* 传播弧线（驰传万域） */}
          <path
            d="M215.6 61.9 A112 112 0 0 1 258.1 215.6"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.92"
          />
          <path
            d="M228.9 46.6 A136 136 0 0 1 273.4 228.9"
            stroke="#FFFFFF"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight text-slate-900">
            曜驰
            <span className="ml-1.5 font-medium text-brand-600">Yochi</span>
          </span>
          <span className="mt-0.5 text-[11px] font-medium text-slate-400">
            曜启光彩 · 驰传万域
          </span>
        </span>
      )}
    </Link>
  );
}
