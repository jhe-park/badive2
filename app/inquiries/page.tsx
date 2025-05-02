import { CautionForReservation } from '@/components/CautionForReservation';
import { ContactToCompany } from '@/components/Contact';
import { HeroImageForInquiries } from '@/components/HeroImageForInquiries';
import { createClient } from '@/utils/supabase/server';
import { Divider } from '@heroui/react';
import OrderComponents from './components/OrderComponents';
import { redirect } from 'next/navigation';

export default async function RSCForInquiries() {
  const supabase = await createClient();
  const [{ data: reservationData }, { data: loginData }] = await Promise.all([supabase.from('reservation').select('*'), supabase.auth.getUser()]);
  const { data: loginUserProfile } = await supabase.from('profiles').select('*').eq('id', loginData?.user?.id).single();

  const loginUserData = loginData?.user;
  const userReservations = loginUserData ? reservationData.filter(reservation => reservation.user_id === loginUserData.id) : [];

  if (loginUserData == null) {
    redirect('/login?returnUrl=/inquiries');
  }

  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center gap-y-6">
      <HeroImageForInquiries />
      <div className="flex h-full w-[90%] flex-col items-center justify-center gap-y-6 py-12 md:max-w-[1280px] md:gap-y-12">
        <h1 className="w-full text-start text-2xl font-bold md:text-5xl">예약</h1>
        <Divider className="w-full bg-[#A6A6A6]"></Divider>
        <div className="flex h-full w-full flex-col items-center justify-center gap-x-5">
          <OrderComponents userReservations={userReservations} userData={loginUserData} profile={loginUserProfile} />
        </div>
        <Divider className="w-full bg-[#A6A6A6]"></Divider>
        <CautionForReservation />
      </div>
      <ContactToCompany />
    </div>
  );
}
