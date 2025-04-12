import React from 'react';
import { ScheduleNew } from '@/components/schedule/ScheduleNew';
import { createClient } from '@/utils/supabase/server';

export default async function AdminSchedulePage() {
  const supabase = await createClient();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  const [
    {
      data: { user },
    },
    { data: instructors, error: instructorsError },
    { data: profiles, error: profilesError },
    { data: programs, error: errorForPrograms },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from('instructor').select('*').eq('available', true),
    supabase.from('profiles').select('*').eq('bye', false),
    supabase.from('program').select('*').eq('available', true),
  ]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <ScheduleNew user={user} instructors={instructors} profiles={profiles} everyPrograms={programs} />
    </div>
  );
}
