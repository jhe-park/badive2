import React from 'react';
import TabContents from './components/TabContents';
import { createClient } from '@/utils/supabase/server';
import { handleGetProgram } from '@/utils/supabase/getRegisteredProgramsFromDB';

export default async function MyPage() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const userId = user.data.user.id;
  const userEmail = user.data.user.email;

  let [profile, resForRegisteredPrograms] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', userId).single(),
    handleGetProgram({
      supabase: supabase as any,
      profileId: userId,
    }),
  ]);

  if (!profile.data.email) {
    const { data, error } = await supabase.from('profiles').update({ email: userEmail }).eq('id', userId);
    if (error) {
      console.error('error:', error);
    }
    profile = await supabase.from('profiles').select('*').eq('id', userId).single();
  }

  if (resForRegisteredPrograms.status === 'FAILED') {
    return <div className="">{JSON.stringify(resForRegisteredPrograms.data)}</div>;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-4 md:p-16">
      <TabContents profile={profile} registeredPrograms={resForRegisteredPrograms.data} totalCountOfRegisteredPrograms={resForRegisteredPrograms.count} />
    </div>
  );
}
