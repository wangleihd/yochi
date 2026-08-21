import Link from "next/link";
import { Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

const FOOTER_GROUPS = [
  {
    title: "产品",
    links: [
      { label: "功能总览", href: "/features" },
      { label: "定价方案", href: "/pricing" },
      { label: "帮助中心", href: "/faq" },
      { label: "更新日志", href: "/faq" },
    ],
  },
  {
    title: "支持",
    links: [
      { label: "常见问题", href: "/faq" },
      { label: "联系客服", href: "/faq#contact" },
      { label: "服务状态", href: "/faq" },
    ],
  },
  {
    title: "合规",
    links: [
      { label: "用户协议", href: "/faq" },
      { label: "隐私政策", href: "/faq" },
      { label: "平台合规说明", href: "/faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo showText={false} />
          <div className="mt-4 text-2xl font-bold text-white">
            曜驰 <span className="text-gradient-brand">Yochi</span>
          </div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed">
            曜启光彩，驰传万域。
            <br />
            Yochi, spread your light everywhere.
            <br />
            一站式多账号小红书种草发布平台，让好内容触达更远。
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="mailto:hello@yochix.com"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-brand-500 hover:text-white"
            >
              <Mail className="size-4 text-brand-400" />
              hello@yochix.com
            </a>
            <a
              href="/faq#contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-brand-500 hover:text-white"
            >
              <MessageCircle className="size-4 text-brand-400" />
              在线客服
            </a>
          </div>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <div key={group.title}>
            <h4 className="mb-4 text-sm font-semibold text-white">
              {group.title}
            </h4>
            <ul className="space-y-3 text-sm">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800/80">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Yochi（曜驰）· yochix.com 保留所有权利</p>
          <p className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-brand-500" />
            平台合规运营 · 数据加密存储 · 账号安全无忧
          </p>
        </div>
      </div>
    </footer>
  );
}
