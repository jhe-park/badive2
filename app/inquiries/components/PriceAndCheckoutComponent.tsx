'use client';

import { usePendingSession } from '@/app/store/usePendingSession';
import { TSelectedResult, useSelectedResult } from '@/app/store/useSelectedResult';
import { usePaymentStatus } from '@/hooks/usePaymentStatus';
import { cn } from '@/lib/utils';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { TypeDBprofile } from '@/utils/supabase/dbTableTypes';
import { generateRandomString } from '@/utils/supabase/generateRandomString';
import { Button, Divider, useDisclosure } from '@heroui/react';
import { User } from '@supabase/supabase-js';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type TProps = { userData: User; profile: TypeDBprofile; showMode: 'MOBILE' | 'DESKTOP' };

export const PriceAndCheckOutComponent: React.FC<TProps> = ({ profile, userData, showMode }) => {
  const { changePaymentStatus, paymentStatus } = usePaymentStatus();
  const { pendingSession, setGlobalPendingSession } = usePendingSession();
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supabase = createTypedSupabaseClient();
  const router = useRouter();

  const handlePaymentClick = async () => {
    if (!selectedResult.isAgree) {
      console.log('동의안됨');
      onOpen();
      return;
    }

    if (selectedResult.price < 200) {
      toast.error('결제금액은 200원 이상이어야 합니다');
      onOpen();
      return;
    }

    if (!userData) {
      router.push('/login?returnUrl=/inquiries');
      return;
    }

    changePaymentStatus({ status: 'PAYMENT_WORK_IN_PROGRESS' });

    try {
      const uuid = generateRandomString();

      setGlobalPendingSession({
        uuid: uuid,
        selected_data: selectedResult,
        user_data: userData,
        profile: profile,
      });

      router.push(`/inquiries/checkout?session=${uuid}`);
      changePaymentStatus({ status: 'PAYMENT_COMPLETED' });
      return;
    } catch (error) {
      console.log('Error creating pending session:', error);
      toast.error('결제 진행 중 오류가 발생했습니다.');
    }

    setTimeout(() => {
      changePaymentStatus({ status: 'PAYMENT_READY' });
    }, 500);
    return;
  };

  const isReadyForCheckout = checkIsSelectedResultFullyReadyForCheckout(selectedResult);

  return (
    <div
      className={cn('mt-6 w-full lg:mt-0', showMode === 'MOBILE' && 'block w-full sm:w-[85%] md:w-full lg:hidden', showMode === 'DESKTOP' && 'hidden lg:block')}
    >
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="w-full py-4 text-lg font-bold md:text-2xl">결제</div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="flex w-full items-center justify-between">
        <div className="py-4 text-lg md:text-2xl">최종 결제 금액</div>
        <div className="flex w-1/3 flex-col items-center justify-center text-center md:w-1/5">
          {selectedResult?.totalPrice ? <div className="text-lg md:text-2xl">{selectedResult?.totalPrice.toLocaleString()}원</div> : <div className=""></div>}
        </div>
      </div>

      <div className="flex w-full justify-center pt-4">
        <Button
          isDisabled={paymentStatus === 'PAYMENT_WORK_IN_PROGRESS' || paymentStatus === 'PAYMENT_COMPLETED'}
          onClick={handlePaymentClick}
          className={cn('h-12 w-full bg-[#0077B6] text-lg text-white md:h-16 md:text-2xl', isReadyForCheckout === false && 'cursor-not-allowed bg-gray-400')}
        >
          {paymentStatus === 'PAYMENT_READY' && <p>결제하기</p>}
          {(paymentStatus === 'PAYMENT_WORK_IN_PROGRESS' || paymentStatus === 'PAYMENT_COMPLETED') && <LoaderCircle size={20} />}
        </Button>
      </div>
    </div>
  );
};

function checkIsSelectedResultFullyReadyForCheckout(selectedResult: TSelectedResult) {
  if (
    selectedResult.totalPrice > 0 &&
    selectedResult.instructor_id !== null &&
    selectedResult.program_id !== null &&
    selectedResult.slot_id?.length > 0 &&
    selectedResult.noParticipants > 0 &&
    selectedResult.date?.length > 0 &&
    selectedResult.isAgree === true
  ) {
    return true;
  } else return false;
}
