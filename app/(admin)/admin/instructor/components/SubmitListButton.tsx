'use client';

import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function SubmitListButton() {
  const router = useRouter();
  return (
    <Button
      onPress={() => {
        router.push('/admin/instructor/submitlist');
      }}
      color="primary"
      className="w-1/4 h-full text-lg text-white"
    >
      강사 신청서 확인
    </Button>
  );
}
