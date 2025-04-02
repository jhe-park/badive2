import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { HeroUIProvider } from "@heroui/react";
import NavbarComponent from "@/app/components/NavbarComponent";
import FooterComponent from "@/app/components/FooterComponent";
import "@/app/globals.css";
import Image from "next/image";
import AuthSession from "@/app/components/session-provider";
import MainActionBar from "@/app/components/MainActionBar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BADIVE",
  description: "BADIVE",
  icons: {
    icon: "/favicon/favicon.png",
  },
  verification: {
    naver: "a80e93584636989db774ce1754a65b6ac69d0421",
  },
  other: {
    "naver-site-verification": "a80e93584636989db774ce1754a65b6ac69d0421",
  },
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    // 추가적인 동적 설정이 필요할 경우 여기에 로직 추가
  };
}

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        <meta
          name="naver-site-verification"
          content="a80e93584636989db774ce1754a65b6ac69d0421"
        />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
          // defaultTheme="system" // 이 옵션을 적용하면 배경화면이 검정색으로 변환되므로 절대 적용하지 말 것
          // enableSystem
        >
          {/* <AuthSession> */}
          <HeroUIProvider>
            <AuthSession>
              <main className="flex flex-col items-center min-h-screen">
                <div className="flex flex-col items-center w-full">
                  <NavbarComponent />

                  <div className="flex flex-col w-full h-full gap-20 ">
                    {children}
                  </div>
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
