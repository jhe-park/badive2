import FooterComponent from '@/app/components/FooterComponent';
import MainActionBar from '@/app/components/MainActionBar';
import NavbarComponent from '@/app/components/NavbarComponent';
import AuthSession from '@/app/components/session-provider';
import '@/app/globals.css';
import { HeroUIProvider } from '@heroui/react';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import { SmartMediaLog } from './components/SmartMediaLog';

export const metadata: Metadata = {
  title: 'BADIVE (바다이브) - 스쿠버다이빙·프리다이빙·다이빙 투어 전문',
  description:
    '바다이브는 스쿠버다이빙 교육부터 프리다이빙, 머메이드, 언더워터 댄스까지 다양한 과정을 제공합니다. 필리핀, 일본, 제주도 다이빙 투어 및 수중 촬영, 특별 프로그램 운영.',
  keywords:
    '바다이브, badive, 스쿠버다이빙, 프리다이빙, 머메이드, 언더워터 댄스, 다이빙 투어, 필리핀 사방비치, 일본 이시가키, 일본 미쿠라지마, 필리핀 세부, 해상 스포츠, 수중 활동, 다이빙 교육, 해양 레저',
  icons: {
    icon: '/favicon/favicon.png',
  },
  verification: {
    naver: 'a80e93584636989db774ce1754a65b6ac69d0421',
  } as any,
  other: {
    'naver-site-verification': 'a80e93584636989db774ce1754a65b6ac69d0421',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  // const SmartMediaLogAccountId = 'UHPT-31657';
  // const SmartMediaLogServer = 'a29';

  return (
    <html lang="ko" className={geistSans.className} suppressHydrationWarning>
      <head>
        <meta name="naver-site-verification" content="a80e93584636989db774ce1754a65b6ac69d0421" />
        <SmartMediaLog />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
          // enableSystem
        >
          {/* <AuthSession> */}
          <HeroUIProvider>
            <AuthSession>
              <h1 className="seo-heading fixed hidden h-[0px] w-[0px] overflow-hidden">바다이브(BADIVE) - 스쿠버다이빙·프리다이빙·다이빙 투어 전문 센터</h1>
              <main className="flex min-h-screen flex-col items-center">
                <div className="flex w-full flex-col items-center">
                  <NavbarComponent />
                  <div className="flex h-full w-full flex-col gap-20">{children}</div>
                  <FooterComponent></FooterComponent>
                </div>
              </main>
              <MainActionBar />
            </AuthSession>
          </HeroUIProvider>
          {/* </AuthSession> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
