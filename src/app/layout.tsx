import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/yochi";

export const metadata: Metadata = {
  title: "曜驰 Yochi — 多账号小红书种草发布平台",
  description:
    "曜驰 Yochi 是一款社媒 SaaS 平台，支持多账号统一管理、小红书图文种草批量发布、定时推送与数据洞察。曜启光彩，驰传万域。",
  keywords: [
    "小红书发布",
    "多账号管理",
    "种草营销",
    "社媒SaaS",
    "定时发布",
    "Yochi",
    "曜驰",
  ],
  openGraph: {
    title: "曜驰 Yochi — 多账号小红书种草发布平台",
    description: "曜启光彩，驰传万域。Yochi, spread your light everywhere.",
    type: "website",
    locale: "zh_CN",
  },
  icons: {
    icon: `${basePath}/icon-320.png`,
    apple: `${basePath}/icon-320.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
