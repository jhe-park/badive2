import { createClient } from '@/utils/supabase/server';
import { Input } from '@heroui/react';
import React from 'react';
import SearchTable from './components/SearchTable';

export default async function InstructorPage() {
  const supabase = await createClient();
  const { data: instructor, error: instructorError } = await supabase.from('instructor').select('*').eq('available', true);
  const bdnInstructorCount = instructor?.filter(item => item.role === 'bdn').length || 0;
  const nonBdnInstructorCount = instructor?.filter(item => item.role !== 'bdn').length || 0;
  return (
    <div className="flex flex-col w-full h-full gap-y-6">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="flex flex-row gap-4 w-full md:w-1/2 justify-start items-center">
          {/* <h1 className="text-lg font-bold w-24">소속강사</h1> */}
          <Input label="소속강사" isDisabled value={bdnInstructorCount} placeholder="" />
        </div>
        <div className="flex flex-row gap-4 w-full md:w-1/2 justify-start items-center">
          {/* <h1 className="text-lg font-bold w-24">협력강사</h1> */}
          <Input label="협력강사" isDisabled value={nonBdnInstructorCount} placeholder="" />
        </div>
      </div>
      <SearchTable></SearchTable>
    </div>
  );
}
