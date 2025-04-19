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
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div className="my-24 flex h-full w-[calc(1320/1920*100%)] flex-col items-center justify-center gap-y-5">
        <RequestForm className={''} tourData={tourData} user={user}></RequestForm>
      </div>
    </div>
  );
}
