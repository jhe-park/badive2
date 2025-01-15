import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { NextUIProvider } from "@nextui-org/react";
import NavbarComponent from "@/app/components/NavbarComponent";
import FooterComponent from "@/app/components/FooterComponent";
import "@/app/globals.css";
import Image from "next/image";
import { PiCertificate } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { BsTelephoneForward } from "react-icons/bs";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaChevronUp } from "react-icons/fa6";
import { Divider } from "@nextui-org/react";

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
          <NextUIProvider>
            <main className="min-h-screen flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                <NavbarComponent />
                <div className="flex flex-col gap-20 w-full">{children}</div>

                <FooterComponent></FooterComponent>
              </div>
            </main>
            <div className="fixed right-4 bottom-4 flex flex-col bg-[#F5F5F5] rounded-lg p-2 ">
              {[
                {
                  label: "소속강사",
                  src: "/floating/license.png",
                  Icon: PiCertificate,
                },
                {
                  label: "다이빙투어",
                  src: "/floating/location.png",
                  Icon: MdLocationPin,
                },
                {
                  label: "전화문의",
                  src: "/floating/phone.png",
                  Icon: BsTelephoneForward,
                },
                {
                  label: "카카오상담",
                  src: "/floating/kakao.png",
                  Icon: RiKakaoTalkFill,
                },
                { label: "TOP", src: "/floating/top.png", Icon: FaChevronUp },
              ].map(({ label, src, Icon }, index) => (
                <div
                  key={index}
                  className={`text-white p-2 flex flex-col items-center justify-center ${
                    index !== 4 ? "border-b border-gray-300" : ""
                  }`}
                >
                  <div>
                    <Icon className="text-black text-2xl" />
                  </div>
                  <div className="text-black text-xs">{label}</div>
                </div>
              ))}
              <div className="w-full h-full bg-black text-lg rounded-md p-2">
                <p className="font-bold text-2xl text-white text-center blink">100일</p>
                <p className="text-white text-center text-2xl font-bold">
                  <span className="text-red-500 font-bold">無</span>사고
                </p>{" "}
              </div>
            </div>
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
