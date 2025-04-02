import React from "react";
import Image from "next/image";
import { Divider } from "@heroui/react";
import OrderComponents from "./components/OrderComponents";
import { createClient } from "@/utils/supabase/server";
import { CautionForReservation } from "@/components/CautionForReservation";
import { ContactToCompany } from "@/components/Contact";
import { HeroImageForInquiries } from "@/components/HeroImageForInquiries";

export default async function RSCForInquiries() {
  const supabase = await createClient();

  const { data: reservationData } = await supabase
    .from("reservation")
    .select("*");

  const { data } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data?.user?.id)
    .single();

  const userData = data?.user;

  let userReservations = [];

  if (userData) {
    userReservations = reservationData.filter(
      (reservation) => reservation.user_id === userData.id
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] gap-y-6">
      <HeroImageForInquiries />
      <div className="w-[90%] md:max-w-[1280px] h-full flex flex-col items-center justify-center gap-y-6 md:gap-y-12 py-12">
        <h1 className="text-2xl md:text-5xl font-bold text-start w-full">
          예약
        </h1>
        <Divider className="w-full bg-[#A6A6A6]"></Divider>
        <div className="w-full h-full flex flex-col items-center justify-center gap-x-5">
          <OrderComponents
            userReservations={userReservations}
            userData={userData}
            profile={profile}
          />
        </div>
        <Divider className="w-full bg-[#A6A6A6]"></Divider>
        <CautionForReservation />
      </div>
      <ContactToCompany />
    </div>
  );
}
