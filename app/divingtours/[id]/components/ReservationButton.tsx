'use client';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
export default function ReservationButton({ tour_id, isDisabled, buttonText }: { tour_id: any; isDisabled?: boolean; buttonText?: string }) {
  const router = useRouter();
  return (
    <Button
      isDisabled={isDisabled === true ? true : false}
      onPress={() => {
        router.push(`/divingtours/reservation/${tour_id}`);
      }}
      className="h-full w-full px-2 py-2 text-medium font-bold md:px-6 md:py-4 md:text-2xl"
    >
      {typeof buttonText === 'string' ? buttonText : '신청서 작성하기'}
    </Button>
  );
}
