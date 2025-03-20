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
import Actionbar from "@/app/components/Actionbar";

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
    'naver-site-verification': 'a80e93584636989db774ce1754a65b6ac69d0421',
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
        <meta name="naver-site-verification" content="a80e93584636989db774ce1754a65b6ac69d0421" />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <AuthSession> */}
            <HeroUIProvider>
              <AuthSession>
              <main className="min-h-screen flex flex-col items-center">
                <div className="w-full flex flex-col items-center">
                  <NavbarComponent />

                  <div className="flex flex-col gap-20 w-full h-full ">{children}</div>
                  <FooterComponent></FooterComponent>
                </div>
              </main>
              <div className="">
                <Actionbar></Actionbar>
              </div>
              </AuthSession>
            </HeroUIProvider>
          {/* </AuthSession> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
