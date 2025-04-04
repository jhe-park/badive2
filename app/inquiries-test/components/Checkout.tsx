'use client';

import { TSelectedResult, useSelectedResult } from '@/app/store/useSelectedResult';
import { cn } from '@/lib/utils';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { TypeDBprofile } from '@/utils/supabase/dbTableTypes';
import { generateRandomString } from '@/utils/supabase/generateRandomString';
import { Divider, Select, SelectItem, Button } from '@heroui/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

type TProps = { userData: User; profile: TypeDBprofile; showMode: 'MOBILE' | 'DESKTOP' };

// userReservations: TypeDBreservation[];

export const CheckOut: React.FC<TProps> = ({ profile, userData, showMode }) => {
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const supabase = createTypedSupabaseClient();
  const router = useRouter();

  const handlePaymentClick = async () => {
    debugger;
    if (!selectedResult.isAgree) {
      console.log('동의안됨');
      onOpen();
      return;
    }
    if (!userData) {
      router.push('/login?returnUrl=/inquiries');
      return;
    }

    try {
      const uuid = generateRandomString();
      const { error } = await supabase.from('pending_sessions').insert({
        uuid: uuid,
        // selected_data: selectedResult as any,
        selected_data: selectedResult as any,
        user_data: userData as any,
        profile: profile,
      });

      if (error) throw error;

      router.push(`/inquiries/checkout?session=${uuid}`);
    } catch (error) {
      console.log('Error creating pending session:', error);
      toast.error('결제 진행 중 오류가 발생했습니다.');
    }
  };

  const isReadyForCheckout = checkIsSelectedResultFullyReadyForCheckout(selectedResult);

  return (
    <div className={cn('w-full', showMode === 'MOBILE' && 'block lg:hidden w-[85%]', showMode === 'DESKTOP' && 'hidden lg:block')}>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="w-full text-lg md:text-2xl font-bold py-4">결제</div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="flex justify-between items-center w-full">
        <div className="text-lg md:text-2xl py-4">최종 결제 금액</div>
        <div className="flex flex-col justify-center items-center w-1/3 md:w-1/5 text-center">
          {selectedResult?.totalPrice && (
            <>
              <p className="text-lg md:text-2xl">{selectedResult?.totalPrice.toLocaleString()}원</p>
              <p className="text-lg md:text-2xl">(vat포함)</p>
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
    // selectedResult.totalPrice &&
    selectedResult.totalPrice > 0 &&
    // selectedResult.instructor_id &&
    selectedResult.instructor_id !== null &&
    // selectedResult.program_id &&
    selectedResult.program_id !== null &&
    // selectedResult.slot_id &&
    selectedResult.slot_id?.length > 0 &&
    // selectedResult.noParticipants &&
    selectedResult.noParticipants > 0 &&
    // selectedResult.date &&
    selectedResult.date?.length > 0 &&
    selectedResult.isAgree === true
    // && selectedResult.region && selectedResult.region !== null
    // && selectedResult.category && selectedResult.category !== null
  ) {
    return true;
  } else return false;
}
