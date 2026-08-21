import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400 via-brand-500 to-teal-500 shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5 text-white"
          aria-hidden="true"
        >
          {/* 光芒 / 曜 */}
          <path
            d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5Z"
            fill="currentColor"
          />
          <path
            d="M19 14.5c.3 2.1 1.4 3.2 3.5 3.5-2.1.3-3.2 1.4-3.5 3.5-.3-2.1-1.4-3.2-3.5-3.5 2.1-.3 3.2-1.4 3.5-3.5Z"
            fill="currentColor"
            opacity="0.7"
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
