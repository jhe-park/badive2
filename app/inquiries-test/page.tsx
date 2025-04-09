import { CautionForReservation } from '@/components/CautionForReservation';
import { ContactToCompany } from '@/components/Contact';
import { HeroImageForInquiries } from '@/components/HeroImageForInquiries';
import { createClient } from '@/utils/supabase/server';
import { Divider } from '@heroui/react';
import OrderComponents from './components/OrderComponents';

export default async function RSCForInquiries() {
  const supabase = await createClient();

  const [{ data: reservationData }, { data: loginData }] = await Promise.all([supabase.from('reservation').select('*'), supabase.auth.getUser()]);

  const { data: loginUserProfile } = await supabase.from('profiles').select('*').eq('id', loginData?.user?.id).single();

  const loginUserData = loginData?.user;

  const userReservations = loginUserData ? reservationData.filter(reservation => reservation.user_id === loginUserData.id) : [];

  // if (loginUserData) {
  //   userReservations = reservationData.filter(reservation => reservation.user_id === loginUserData.id);
  // }

  console.log('userData');
  console.log(loginUserData);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] gap-y-6">
      <HeroImageForInquiries />
      <div className="w-[90%] md:max-w-[1280px] h-full flex flex-col items-center justify-center gap-y-6 md:gap-y-12 py-12">
        <h1 className="text-2xl md:text-5xl font-bold text-start w-full">예약</h1>
        <Divider className="w-full bg-[#A6A6A6]"></Divider>
        <div className="w-full h-full flex flex-col items-center justify-center gap-x-5">
          <OrderComponents userReservations={userReservations} userData={loginUserData} profile={loginUserProfile} />
        </div>
        <Divider className="w-full bg-[#A6A6A6]"></Divider>
        <CautionForReservation />
      </div>
      <ContactToCompany />
    </div>
  );
}
