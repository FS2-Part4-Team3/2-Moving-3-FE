import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@styles/globals.css';
import GNB from '@/components/common/gnb/GNB';
import { ModeToggle } from '@/components/dropdown/ModeToggle';
import { ThemeProviders } from '@/hooks/theme-provider';
import ReactQueryProviders from '@/hooks/useReactQuery';
import { Providers } from '@/store/providers';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'Moving',
  description: '이사 소비자와 이사 전문가 매칭 서비스',
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
        <script type="text/javascript" src="https://developers.kakao.com/sdk/js/kakao.js" />
      </head>
      <body className={`${pretendard.className} dark:bg-dark-bg dark:text-dark-t`}>
        <div className="min-h-screen overflow-x-hidden">
          <Providers>
            <ReactQueryProviders>
              <ThemeProviders>
                <GNB />
                {children}
              </ThemeProviders>
            </ReactQueryProviders>
          </Providers>
        </div>
      </body>
    </html>
  );
}
