import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-16 text-center sm:px-16 lg:py-24">
          {/* 背景光效 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.35),transparent_55%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-0 size-72 rounded-full bg-brand-500/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-lime-400/20 blur-3xl"
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-300">
              <Sparkles className="size-4" />
              今天就开始
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              让每一束光，
              <span className="text-gradient-brand"> 都传到更远的地方</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-slate-400">
              免费版即刻可用，无需信用卡。2 分钟绑定账号，体验多账号种草发布的全新效率。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lime-500 via-brand-500 to-teal-500 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-brand-500/40 transition-all hover:brightness-110"
              >
                免费试用
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/faq#contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-8 py-4 text-base font-semibold text-slate-300 transition-colors hover:border-brand-500 hover:text-white"
              >
                预约产品演示
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Yochi, spread your light everywhere. · 曜启光彩，驰传万域
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
