"use client";
import { useEffect, useRef, useState, use } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useSelectedResult } from "@/app/store/useSelectedResult";
import { Button } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {Skeleton} from "@heroui/react"
export default function CheckoutPage({ searchParams }) {
  const [selectedResult, setSelectedResult] = useState(null);
  const [ready, setReady] = useState(false);
  const [userData, setUserData] = useState(null);
  const [widgets, setWidgets] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 0,
  });
  const clientKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_CLIENT_KEY_DEV
  console.log("useData:", userData);
  const { session } = use(searchParams);
  const supabase = createClient();
  console.log("selectedResult:", selectedResult);

  useEffect(() => {
    const fetchSessionData = async () => {
      const { data, error } = await supabase
        .from("pending_sessions")
        .select("*")
        .eq("uuid", session)
        .single();

      if (error) {
        console.log("Error fetching session data:", error);
      } else {
        setSelectedResult(data.selected_data);
        setUserData(data.user_data);
        setProfile(data.profile);
        
      }
    };

    if (session) {
      fetchSessionData();
    }
  }, [session]);

  useEffect(() => {
    if (userData && !widgets) {
      async function fetchPaymentWidgets() {
        const tossPayments = await loadTossPayments(clientKey);
        const widgets = tossPayments.widgets({ customerKey: userData.id });
        setWidgets(widgets);
      }

      fetchPaymentWidgets();
    }
  }, [clientKey, userData, widgets]);

  useEffect(() => {
    if (selectedResult && widgets && !ready) {
      const renderPaymentWidgets = async () => {
        try {
          const amount = {
            currency: "KRW",
            value: selectedResult.totalPrice,
          };
          await widgets.setAmount(amount);

          await Promise.all([
            widgets.renderPaymentMethods({
              selector: "#payment-method",
              variantKey: "DEFAULT",
            }),
            widgets.renderAgreement({
              selector: "#agreement",
              variantKey: "AGREEMENT",
            }),
          ]);
          setIsLoading(false);
          setReady(true);
        } catch (error) {
          console.log("결제 위젯 렌더링 중 오류 발생:", error);
        }
      };

      renderPaymentWidgets();
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      setReady(false);
    };
  }, [selectedResult, widgets]);
  console.log("selectedResult:", selectedResult);
  const handlePaymentClick = async () => {
    const successUrlWithParams = `${window.location.origin}/inquiries/complete?program_id=${selectedResult.program_id}&instructor_id=${selectedResult.instructor_id}&time_slot_id=${selectedResult.slot_id}&user_id=${userData.id}&participants=${selectedResult.noParticipants}`;

    try {
      await widgets.requestPayment({
        // amount: { currency: "KRW", value: selectedResult.totalPrice },
        orderId: generateRandomString(),
        orderName: selectedResult.program,
        successUrl: successUrlWithParams,
        failUrl: window.location.origin + "/inquiries/fail",
        customerEmail: profile.email,
        customerName: profile.name,
        customerMobilePhone: removeSpecialCharacters(profile.phone),
      });
    } catch (error) {
      console.log("결제 요청 중 오류 발생:", error);
    }
  };

  return (
    <div className="wrapper pt-[100px] w-[100vw] h-full flex justify-center items-center px-4 md:px-12">
      <div className="w-full flex-col items-center justify-center h-full my-12 ">
        <div id="payment-method" className="w-100 h-[60vh] overflow-y-auto" style={{ display: isLoading ? 'none' : 'block' }} />
        <div id="agreement" className="w-100" style={{ display: isLoading ? 'none' : 'block' }} />
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
  return str.replace(/[^a-zA-Z0-9가-힣]/g, "");
}
