import type { Metadata } from "next";
import localFont from "next/font/local";
import "@styles/globals.css";
import { Providers } from "@/store/providers";
import GNB from "@/components/common/gnb/GNB";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "Moving",
  description: "이사 소비자와 이사 전문가 매칭 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={pretendard.className}>
        <div className="min-h-screen">
          <Providers>
            <GNB />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
