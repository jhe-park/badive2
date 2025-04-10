import { createClient } from '@/utils/supabase/server';
import React from 'react';
import RequestForm from './components/RequestForm';

export default async function page({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.from('tour').select('*').eq('id', id).single();
  const { data: user, error: userError } = await supabase.auth.getUser();
  const tourData = data;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] ">
      <div className="w-[calc(1320/1920*100%)] h-full flex flex-col items-center justify-center gap-y-5 my-24">
        <RequestForm className={''} tourData={tourData} user={user}></RequestForm>
      </div>
    </div>
  );
}
