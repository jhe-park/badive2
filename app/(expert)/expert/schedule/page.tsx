import React from 'react';
import { ScheduleNew } from '@/components/schedule/ScheduleNew';
import { createClient } from '@/utils/supabase/server';

export default async function ExpertSchedulePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    { data: instructors, error: instructorsError },
    { data: instructorMyself, error: errorForInstructorMyself },
    { data: profiles, error: profilesError },
    { data: programs, error: errorForPrograms },
  ] = await Promise.all([
    supabase.from('instructor').select('*').eq('available', true),
    supabase.from('instructor').select('*').eq('available', true).eq('email', user.email).single(),
    supabase.from('profiles').select('*').eq('bye', false),
    supabase.from('program').select('*').eq('available', true),
  ]);

  const profilesForLoginUser = profiles.find(profile => profile.email === user.email);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <ScheduleNew
        profilesForLoginUser={profilesForLoginUser}
        instructorMyself={instructorMyself}
        instructors={instructors}
        profiles={profiles}
        everyPrograms={programs}
      />
    </div>
  );
}
