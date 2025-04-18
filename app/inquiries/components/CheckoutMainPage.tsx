'use client';

import { usePendingSession } from '@/app/store/usePendingSession';
import { removeSpecialCharacters } from '@/utils/removeSpecialCharacters';
import { generateRandomString } from '@/utils/supabase/generateRandomString';
import { Button, Skeleton } from '@heroui/react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useEffect, useRef, useState } from 'react';

const tossPaymentsClientKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_CLIENT_KEY;

export function CheckoutMainPage({ session }: { session: string }) {
  const { pendingSession: sessionData, setGlobalPendingSession } = usePendingSession();

  const [isTossPaymentsReady, setIsTossPaymentsReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedResult, setSelectedResult] = useState(sessionData.selected_data);
  const [userData, setUserData] = useState(sessionData.user_data);
  const [profile, setProfile] = useState(sessionData.profile);

  const isAlreadyInitialized = useRef(false);

  useEffect(
    function initializeTossPayments() {
      if (isAlreadyInitialized.current) return;
      isAlreadyInitialized.current = true;
      if (selectedResult && userData && !widgets && !isTossPaymentsReady) {
        async function fetchPaymentWidgets() {
          const tossPayments = await loadTossPayments(tossPaymentsClientKey);
          const widgets = tossPayments.widgets({ customerKey: userData.id });
          setWidgets(widgets);
          try {
            await widgets.setAmount({
              currency: 'KRW',
              value: selectedResult.totalPrice,
            });

            await Promise.all([
              widgets.renderPaymentMethods({
                selector: '#payment-method',
                variantKey: 'DEFAULT',
              }),
              widgets.renderAgreement({
                selector: '#agreement',
                variantKey: 'AGREEMENT',
              }),
            ]);

            setIsLoading(false);
            setIsTossPaymentsReady(true);
          } catch (error) {
            console.log('결제 위젯 렌더링 중 오류 발생:', error);
          }
        }
        fetchPaymentWidgets();
      }
      // 컴포넌트 언마운트 시 정리
      return () => {
        setIsTossPaymentsReady(false);
      };
    },
    [tossPaymentsClientKey, userData, widgets],
  );

  const handlePaymentClick = async () => {
    const searchParams = new URLSearchParams({
      program_id: selectedResult.program_id.toString(),
      instructor_id: selectedResult.instructor_id.toString(),
      time_slot_id: selectedResult.slot_id.map(e => e.toString()).join(','),
      user_id: userData.id.toString(),
      participants: selectedResult.noParticipants.toString(),
    });

    const successUrlWithParams = `${window.location.origin}/inquiries/complete?${searchParams.toString()}`;

    const refinedPhoneNumber = removeSpecialCharacters(profile.phone);

    try {
      await widgets.requestPayment({
        orderId: generateRandomString(),
        orderName: selectedResult.program,
        successUrl: successUrlWithParams,
        failUrl: window.location.origin + '/inquiries/fail',
        customerEmail: profile.email,
        customerName: profile.name,
        customerMobilePhone: refinedPhoneNumber,
      });
    } catch (error) {
      console.error('[🚫결제 요청 중 오류 발생] : ', error);
    }
  };

  return (
    <div className="wrapper pt-[100px] w-[100vw] h-full flex justify-center items-center px-4 md:px-12">
      <div className="w-full flex-col items-center justify-center h-full my-12 ">
        <div id="payment-method" className="w-100 h-[60vh] overflow-y-auto" style={{ display: isLoading ? 'none' : 'block' }} />
        <div id="agreement" className="w-100" style={{ display: isLoading ? 'none' : 'block' }} />
        {!isTossPaymentsReady && <Skeleton className="w-full h-[610px] lg:h-[670px]" />}
        <div className="btn-wrapper w-full">
          <Button
            color="primary"
            className="btn primary w-full"
            onClick={async () => {
              handlePaymentClick();
            }}
          >
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}
