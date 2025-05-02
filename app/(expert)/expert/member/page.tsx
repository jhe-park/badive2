import { createClient } from '@/utils/supabase/server';
import React from 'react';
import SearchTable from './components/SearchTable';

export default async function InstructorPage() {
  const supabase = await createClient();
  const { data: instructor, error: instructorError } = await supabase.from('instructor').select('*');
  const bdnInstructorCount = instructor?.filter(item => item.role === 'bdn').length || 0;
  const nonBdnInstructorCount = instructor?.filter(item => item.role !== 'bdn').length || 0;
  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <SearchTable></SearchTable>
    </div>
  );
}
