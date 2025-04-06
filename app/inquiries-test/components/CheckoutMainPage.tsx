'use client';

import { useEffect, useRef, useState, use } from 'react';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { Button } from '@heroui/react';
import { TypeDBpendingSessionsModified } from '@/utils/supabase/dbTableTypes';
import { Skeleton } from '@heroui/react';

// import { createClient } from '@/utils/supabase/client';
// import { useSelectedResult } from '@/app/store/useSelectedResult';
// import { useSearchParams } from 'next/navigation';

// profile: Json | null;
// selected_data: Json | null;
// user_data: Json | null;

const tossPaymentsClientKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_CLIENT_KEY;

export function CheckoutMainPage({ session, sessionData }: { session: string; sessionData: TypeDBpendingSessionsModified }) {
  const [isTossPaymentsReady, setIsTossPaymentsReady] = useState(false);
  const [widgets, setWidgets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedResult, setSelectedResult] = useState(sessionData.selected_data);
  const [userData, setUserData] = useState(sessionData.user_data);
  const [profile, setProfile] = useState(sessionData.profile);

  const isAlreadyInitialized = useRef(false);
  //   const [amount, setAmount] = useState({
  //     currency: 'KRW',
  //     value: 0,
  //   });

  //   const { session } = use(searchParams) as any;
  //   const supabase = createClient();

  console.log('useData:', userData);
  console.log('selectedResult:', selectedResult);

  //   useEffect(() => {
  //     const fetchSessionData = async () => {
  //       const { data, error } = await supabase.from('pending_sessions').select('*').eq('uuid', session).single();

  //       if (error) {
  //         console.log('Error fetching session data:', error);
  //       } else {
  //         setSelectedResult(data.selected_data);
  //         setUserData(data.user_data);
  //         setProfile(data.profile);
  //       }
  //     };

  //     if (session) {
  //       fetchSessionData();
  //     }
  //   }, [session]);

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
            //   const amount = {
            //     currency: 'KRW',
            //     value: selectedResult.totalPrice,
            //   };

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

    console.log('profile.phone');
    console.log(profile.phone);

    console.log('refinedPhoneNumber');
    console.log(refinedPhoneNumber);

    try {
      await widgets.requestPayment({
        // amount: { currency: "KRW", value: selectedResult.totalPrice },
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
  console.log('ready:', isTossPaymentsReady);

  return (
    <div className="wrapper pt-[100px] w-[100vw] h-full flex justify-center items-center px-4 md:px-12">
      <div className="w-full flex-col items-center justify-center h-full my-12 ">
        <div id="payment-method" className="w-100 h-[60vh] overflow-y-auto" style={{ display: isLoading ? 'none' : 'block' }} />
        <div id="agreement" className="w-100" style={{ display: isLoading ? 'none' : 'block' }} />
        {!isTossPaymentsReady && (
          <Skeleton className="w-full h-[610px] lg:h-[670px]" />
          //   <div className="w-full h-[600px] lg:h-[600px] mx-auto space-y-6">
          //     {[...Array(3)].map((_, index) => (
          //       <div key={index} className="w-full flex items-center gap-3">
          //         <div>
          //           <Skeleton className="flex rounded-full w-12 h-12" />
          //         </div>
          //         <div className="w-full flex flex-col gap-2">
          //           <Skeleton className="h-4 w-4/5 rounded-lg" />
          //           <Skeleton className="h-4 w-full rounded-lg" />
          //         </div>
          //       </div>
          //     ))}
          //   </div>
        )}
        {/* {isLoading ? (
          <div className="max-w-[600px] mx-auto space-y-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="w-full flex items-center gap-3">
                <div>
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-4 w-4/5 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : ( */}
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
        {/* )} */}
      </div>
    </div>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

function removeSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z0-9가-힣]/g, '');
}

//   useEffect(() => {
//     if (selectedResult && widgets && !ready) {
//       const renderPaymentWidgets = async () => {
//         try {
//           const amount = {
//             currency: 'KRW',
//             value: selectedResult.totalPrice,
//           };
//           await widgets.setAmount(amount);

//           await Promise.all([
//             widgets.renderPaymentMethods({
//               selector: '#payment-method',
//               variantKey: 'DEFAULT',
//             }),
//             widgets.renderAgreement({
//               selector: '#agreement',
//               variantKey: 'AGREEMENT',
//             }),
//           ]);
//           setIsLoading(false);
//           setReady(true);
//         } catch (error) {
//           console.log('결제 위젯 렌더링 중 오류 발생:', error);
//         }
//       };

//       renderPaymentWidgets();
//     }

//     // 컴포넌트 언마운트 시 정리
//     return () => {
//       setReady(false);
//     };
//   }, [selectedResult, widgets]);
