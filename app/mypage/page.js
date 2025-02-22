import React from "react";
import Image from "next/image";
import PurchaseTable from "./components/ProgramTable";
import TabContents from "./components/TabContents";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function page() {
  const cookieStore = cookies();
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  let profile = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.data?.user?.id)
    .single();

  
  
  
  if (!profile?.email) {
    const {data, error} = await supabase
      .from('profiles')
      .update({ email: user?.data?.user?.email })
      .eq('id', user?.data?.user?.id)
    if (error) {
      console.error('error:', error)
    }
    profile = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.data?.user?.id)
    .single();


  }






  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-4 md:p-16">
      <TabContents profile={profile} />
    </div>
  );
}
