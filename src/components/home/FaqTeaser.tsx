import Link from "next/link";
import { ArrowRight, ChevronDown, HelpCircle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PRICING_FAQS } from "@/lib/pricing";

export function FaqTeaser() {
  return (
    <section className="bg-slate-50/70 py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="常见问题"
          title={
            <>
              还有疑问？
              <span className="text-gradient-brand"> 这里也许有答案</span>
            </>
          }
        />
        <div className="mx-auto max-w-3xl space-y-4">
          {PRICING_FAQS.map((f) => (
            <div
              key={f.q}
              className="card flex items-start gap-4 p-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <HelpCircle className="size-5" />
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{f.q}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-500/50 px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            前往帮助中心，查看更多问题
            <ChevronDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
