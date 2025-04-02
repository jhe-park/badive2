import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Banner from "@/app/components/Banner";
import Story from "@/app/components/Story";
import Experts from "@/app/components/Experts";
import Instagram from "@/app/components/Instagram";
import Curriculum from "@/app/components/Curriculum";
import Resort from "@/app/components/Resort";
import SlideUp from "@/components/animation/SlideUp";
import ToastBegin from "@/app/components/ToastBegin";
import WelcomePopup from "@/app/components/WelcomePopup";
import { ComponentForTest } from "@/components/SomeComponents";

export default async function Home() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-start ">
      <WelcomePopup />
      <ToastBegin />
      <Banner></Banner>
      <Story></Story>
      <Experts></Experts>
      <Instagram></Instagram>
      <Curriculum></Curriculum>
      <Resort></Resort>
    </div>
  );
}
