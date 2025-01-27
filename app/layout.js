import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import {HeroUIProvider} from "@heroui/react";
import NavbarComponent from "@/app/components/NavbarComponent";
import FooterComponent from "@/app/components/FooterComponent";
import "@/app/globals.css";
import Image from "next/image";

import Actionbar from "@/app/components/Actionbar";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BDN DIVE",
  description: "BDN DIVE",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HeroUIProvider>
            <main className="min-h-screen flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                <NavbarComponent />
                <div className="flex flex-col gap-20 w-full ">{children}</div>

                <FooterComponent></FooterComponent>
              </div>
            </main>
            <Actionbar></Actionbar>
            
          </HeroUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
