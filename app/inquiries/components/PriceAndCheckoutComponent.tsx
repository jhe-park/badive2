'use client';

import { usePendingSession } from '@/app/store/usePendingSession';
import { TSelectedResult, useSelectedResult } from '@/app/store/useSelectedResult';
import { cn } from '@/lib/utils';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { TypeDBprofile } from '@/utils/supabase/dbTableTypes';
import { generateRandomString } from '@/utils/supabase/generateRandomString';
import { Button, Divider, useDisclosure } from '@heroui/react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type TProps = { userData: User; profile: TypeDBprofile; showMode: 'MOBILE' | 'DESKTOP' };

export const PriceAndCheckOutComponent: React.FC<TProps> = ({ profile, userData, showMode }) => {
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

    try {
      const uuid = generateRandomString();

      setGlobalPendingSession({
        uuid: uuid,
        selected_data: selectedResult,
        user_data: userData,
        profile: profile,
      });

      // FIXME :  해당 코드는 더이상 사용되지 않는 것으로 추정되나 본인이 예상하지 못한 경우에 사용될 수 있으므로 일단 남겨둠
      supabase.from('pending_sessions').insert({
        uuid: uuid,
        selected_data: selectedResult as any,
        user_data: userData as any,
        profile: profile,
      });

      // const { error } = await supabase.from('pending_sessions').insert({
      //   uuid: uuid,
      //   selected_data: selectedResult as any,
      //   user_data: userData as any,
      //   profile: profile,
      // });

      // if (error) throw error;

      router.push(`/inquiries/checkout?session=${uuid}`);
    } catch (error) {
      console.log('Error creating pending session:', error);
      toast.error('결제 진행 중 오류가 발생했습니다.');
    }
  };

  const isReadyForCheckout = checkIsSelectedResultFullyReadyForCheckout(selectedResult);

  return (
    <div
      className={cn('w-full mt-6 lg:mt-0', showMode === 'MOBILE' && 'block lg:hidden w-full sm:w-[85%] md:w-full', showMode === 'DESKTOP' && 'hidden lg:block')}
    >
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="w-full text-lg md:text-2xl font-bold py-4">결제</div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="flex justify-between items-center w-full">
        <div className="text-lg md:text-2xl py-4">최종 결제 금액</div>
        <div className="flex flex-col justify-center items-center w-1/3 md:w-1/5 text-center">
          {selectedResult?.totalPrice && (
            <>
              <p className="text-lg md:text-2xl">{selectedResult?.totalPrice.toLocaleString()}원</p>
              {/* <p className="text-lg md:text-2xl">(vat포함)</p> */}
            </>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center pt-4">
        <Button
          onClick={handlePaymentClick}
          className={cn('bg-[#0077B6] text-white w-full text-lg md:text-2xl h-12 md:h-16', isReadyForCheckout === false && 'bg-gray-400 cursor-not-allowed')}
        >
          결제하기
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
