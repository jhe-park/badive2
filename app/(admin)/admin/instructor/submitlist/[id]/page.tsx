'use client';

import { createClient } from '@/utils/supabase/client';
import { Input, Spinner } from '@heroui/react';
import React, { use, useEffect, useState } from 'react';

export default function SubmitListPage({ params }) {
  const { id } = use<RouteParams>(params);
  const [instructor, setInstructor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getInstructor = async () => {
    const supabase = createClient();
    const { data: instructor, error } = await supabase.from('requestInstructor').select('*').eq('id', id).single();
    setInstructor(instructor);
    setIsLoading(false);
  };
  useEffect(() => {
    getInstructor();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Spinner label="로딩중..." />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <h1 className="col-span-2 grid-cols-2 text-lg font-bold">상세내용</h1>
          <Input variant="bordered" label="이름" value={instructor.name || ''}></Input>
          <Input variant="bordered" label="전화번호" value={instructor.phone || ''}></Input>
          <Input variant="bordered" label="성별" value={instructor.gender || ''}></Input>
          <Input variant="bordered" label="생년월일" value={instructor.birth || ''}></Input>
          <Input variant="bordered" label="지역" value={instructor.region || ''}></Input>
          <Input variant="bordered" label="자격증" value={instructor.license || ''}></Input>
          <Input variant="bordered" label="프로그램" value={instructor.program || ''}></Input>
          <Input variant="bordered" label="호출시간" value={instructor.callTime || ''}></Input>
          <Input variant="bordered" label="이메일" value={instructor.email || ''}></Input>
        </div>
      )}
    </div>
  );
}
