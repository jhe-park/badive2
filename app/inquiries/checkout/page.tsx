import { createClient } from '@/utils/supabase/server';
import { NextPage } from 'next';
import { CheckoutMainPage } from '../components/CheckoutMainPage';
import { redirect } from 'next/navigation';

const CheckoutPage: NextPage<NextPageProps> = async ({ searchParams }) => {
  const session = (await searchParams).session as string;
  const supabase = await createClient();
  // const { data: sessionData, error } = await supabase.from('pending_sessions').select('*').eq('uuid', session).single();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    redirect(`/inquiries/fail?code=${-1}&message=${'로그인 정보를 찾지 못하였습니다. 관리자에게 문의해 주세요'}`);
  }

  return (
    <CheckoutMainPage
      session={session}
      // sessionData={sessionData as any}
    />
  );
};

export default CheckoutPage;
