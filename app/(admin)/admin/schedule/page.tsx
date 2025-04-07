// import Calendar from './components/Calendar';
// import { createClient } from '@/utils/supabase/server';
import React from 'react';
import { ScheduleNew } from './components/ScheduleNew';
import { createClient } from '@/utils/supabase/server';

export default async function SchedulePage() {
  const supabase = await createClient();
  //
  // ;(await supabase).from()

  const [{ data: instructors, error: instructorsError }, { data: profiles, error: profilesError }, { data: programs, error: errorForPrograms }] =
    await Promise.all([
      supabase.from('instructor').select('*').eq('available', true),
      supabase.from('profiles').select('*').eq('bye', false),
      supabase.from('program').select('*').eq('available', true),
    ]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {/* <Calendar /> */}
      <ScheduleNew instructors={instructors} profiles={profiles} programs={programs} />
    </div>
  );
}
