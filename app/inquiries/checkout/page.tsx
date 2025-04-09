import { createClient } from '@/utils/supabase/server';
import { NextPage } from 'next';
import { CheckoutMainPage } from '../components/CheckoutMainPage';

const CheckoutPage: NextPage<NextPageProps> = async ({ searchParams }) => {
  const session = (await searchParams).session as string;

  const supabase = await createClient();

  const { data: sessionData, error } = await supabase.from('pending_sessions').select('*').eq('uuid', session).single();

  return <CheckoutMainPage session={session} sessionData={sessionData as any} />;
};

export default CheckoutPage;
