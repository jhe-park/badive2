"use client";
import React, { useState, useEffect } from "react";
import { Divider, Select, SelectItem, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useProgramStore } from "@/app/store/useProgramStore";
import { useSelectedResult } from "@/app/store/useSelectedResult";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { ToastContainer, toast } from "react-toastify";
export default function SelectComponent({
  isSelectProgram,
  setIsSelectProgram,

  isSelectInstructor,
  setIsSelectInstructor,
  userData,
  profile,
}) {
  const [program, setProgram] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [region, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [instructor, setInstructor] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const { programStore, setProgramStore } = useProgramStore();
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const [data, setData] = useState([]);
  const [noParticipants, setNoParticipants] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [payment, setPayment] = useState(null);

  const clientKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_CLIENT_KEY;
  const customerKey = userData?.id;

  const router = useRouter();

  const increment = () => setNoParticipants((prev) => prev + 1);
  const decrement = () => setNoParticipants((prev) => Math.max(1, prev - 1));

  const supabase = createClient();
  const getProgram = async () => {
    const { data, error } = await supabase
      .from("program")
      .select("*,instructor_id(*)");
    if (error) {
      console.error(error);
    } else {
      const uniqueTitles = [...new Set(data.map((item) => item.title))];
      setProgram(uniqueTitles);
      setData(data);
      setProgramStore(data);
    }
  };

  useEffect(() => {
    getProgram();
  }, []);

  const filterRegion = () => {
    const filteredRegion = data?.filter(
      (item) => item.title === selectedProgram
    );
    const uniqueRegions = [
      ...new Set(filteredRegion.map((item) => item.region)),
    ];
    setRegion(uniqueRegions);
  };

  useEffect(() => {
    filterRegion();
  }, [selectedProgram]);

  const filterInstructor = () => {
    const filteredInstructor = data.filter(
      (item) => item.title === selectedProgram && item.region === selectedRegion
    );
    const uniqueInstructors = [
      ...new Set(filteredInstructor.map((item) => item.instructor_id.name)),
    ];
    setInstructor(uniqueInstructors);
  };

  useEffect(() => {
    filterInstructor();
  }, [selectedRegion]);

  useEffect(() => {
    setSelectedResult({
      program: selectedResult.program,
      instructor: selectedResult.instructor,
      noParticipants: noParticipants,
    });
  }, [noParticipants]);

  const handlePaymentClick = async () => {
    if (!selectedResult.isAgree) {
      toast.error("일정을 확인 후 체크박스를 클릭해주세요");
      return;
    }
    if (!userData) {
      router.push("/login?returnUrl=/inquiries");
      return;
    }
    
    if (payment) {
      onOpen();
    } else {
      toast.error("결제 모듈을 불러오는 중입니다. 잠시만 기다려주세요.");
    }
  };

  //결제기능

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        });
        // 비회원 결제
        // const payment = tossPayments.payment({ customerKey: ANONYMOUS });

        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPayment();
    console.log("페이먼츠 로드 완료")
  }, []);

  console.log("phone:", removeSpecialCharacters(profile.phone));
  // 결제함수

  async function requestPayment() {
    //기본적으로 생성되는 searchParams말고 필요한건 여기다가 더 적자
    const successUrlWithParams = `${window.location.origin}/inquiries/complete?time_slot_id=${selectedResult.slot_id}&user_id=${userData.id}&participants=${selectedResult.noParticipants}`;

    switch (selectedPaymentMethod) {
      case "CARD":
        await payment.requestPayment({
          method: "CARD",
          amount: { currency: "KRW", value: selectedResult.totalPrice },
          orderId: generateRandomString(),
          orderName: selectedResult.program,
          successUrl: successUrlWithParams,
          failUrl: window.location.origin + "/fail",
          customerEmail: profile.email,
          customerName: profile.name,
          customerMobilePhone: removeSpecialCharacters(profile.phone),

          card: {
            useEscrow: false,
            flowMode: "DEFAULT",
            useCardPoint: false,
            useAppCardOnly: false,
          },
        });
        break;
      case "TRANSFER":
        await payment.requestPayment({
          method: "TRANSFER",
          amount: { currency: "KRW", value: selectedResult.totalPrice },
          orderId: generateRandomString(),
          orderName: selectedResult.program,
          successUrl: successUrlWithParams,
          failUrl: window.location.origin + "/fail",
          customerEmail: profile.email,
          customerName: profile.name,
          customerMobilePhone: removeSpecialCharacters(profile.phone),
          transfer: {
            cashReceipt: {
              type: "소득공제",
            },
            useEscrow: false,
          },
        });
        break;
      case "VIRTUAL_ACCOUNT":
        await payment.requestPayment({
          method: "VIRTUAL_ACCOUNT",
          amount: { currency: "KRW", value: selectedResult.totalPrice },
          orderId: generateRandomString(),
          orderName: selectedResult.program,
          successUrl: successUrlWithParams,
          failUrl: window.location.origin + "/fail",
          customerEmail: profile.email,
          customerName: profile.name,
          customerMobilePhone: removeSpecialCharacters(profile.phone),
          virtualAccount: {
            cashReceipt: {
              type: "소득공제",
            },
            useEscrow: false,
            validHours: 24,
          },
        });
        break;
      case "MOBILE_PHONE":
        await payment.requestPayment({
          method: "MOBILE_PHONE",
          amount: { currency: "KRW", value: selectedResult.totalPrice },
          orderId: generateRandomString(),
          orderName: selectedResult.program,
          successUrl: successUrlWithParams,
          failUrl: window.location.origin + "/fail",
          customerEmail: profile.email,
          customerName: profile.name,
          customerMobilePhone: removeSpecialCharacters(profile.phone),
        });
        break;
      case "CULTURE_GIFT_CERTIFICATE":
        await payment.requestPayment({
          method: "CULTURE_GIFT_CERTIFICATE",
          amount: { currency: "KRW", value: selectedResult.totalPrice },
          orderId: generateRandomString(),
          orderName: selectedResult.program,
          successUrl: successUrlWithParams,
          failUrl: window.location.origin + "/fail",
          customerEmail: profile.email,
          customerName: profile.name,
          customerMobilePhone: removeSpecialCharacters(profile.phone),
        });
        break;
      case "FOREIGN_EASY_PAY":
        await payment.requestPayment({
          method: "FOREIGN_EASY_PAY",
          amount: {
            value: selectedResult.totalPrice,
            currency: "KRW",
          },
          orderId: generateRandomString(),
          orderName: selectedResult.program,
          successUrl: successUrlWithParams,
          failUrl: window.location.origin + "/fail",
          customerEmail: userData.email,
          customerName: profile.name,
          customerMobilePhone: removeSpecialCharacters(profile.phone),
          foreignEasyPay: {
            provider: "PAYPAL",
            country: "KR",
          },
        });
        break;
    }
  }

  useEffect(() => {
    if (selectedPaymentMethod) {
      requestPayment();
    }
  }, [selectedPaymentMethod]);

  return (
    <div className="col-span-1 h-full flex flex-col items-center justify-center gap-y-3 md:gap-y-6">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="text-center text-2xl md:text-4xl font-bold">
        스쿠버 다이빙 - 오픈워터 다이버
      </div>
      <div className="text-center text-sm md:text-xl">
        스쿠버 다이빙의 첫걸음 오픈워터 다이버 강습 프로그램
      </div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="w-full text-lg md:text-2xl font-bold">강습프로그램</div>
      <Select
        onChange={(e) => {
          setSelectedProgram(e.target.value);
          setIsSelectProgram(true);
          setSelectedResult({ ...selectedResult, program: e.target.value });
        }}
        className="w-full h-full text-xl"
      >
        {program.map((item) => (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </Select>

      <div className="w-full text-lg md:text-2xl font-bold">희망하는 지역</div>
      <Select
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="w-full h-full text-xl"
      >
        {region.map((item) => (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </Select>

      <div className="w-full text-lg md:text-2xl font-bold">강사</div>
      <Select
        onChange={(e) => {
          setSelectedInstructor(e.target.value);
          setIsSelectInstructor(true);
          setSelectedResult({ ...selectedResult, instructor: e.target.value });
        }}
        className="w-full h-full text-xl"
      >
        {instructor.map((item) => (
          <SelectItem value={item} key={item}>
            {item}
          </SelectItem>
        ))}
      </Select>

      <div className="w-full text-lg md:text-2xl font-bold">인원선택</div>
      <div className="w-full flex items-center justify-end">
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            id="decrement-button"
            data-input-counter-decrement="quantity-input"
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            onClick={decrement}
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            data-input-counter
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="999"
            required
            value={noParticipants}
            readOnly
          />
          <button
            type="button"
            id="increment-button"
            data-input-counter-increment="quantity-input"
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            onClick={increment}
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="w-[90%] text-lg md:text-2xl font-bold">결제</div>
      <Divider className="w-[90%] bg-[#A6A6A6]"></Divider>

      {/* <div className="flex justify-between items-center w-[90%]">
        <div className="text-lg md:text-2xl">합계</div>
        <div className="text-lg md:text-2xl w-1/5 text-center">0원</div>
      </div>
      <Divider className="w-[90%] bg-[#A6A6A6]"></Divider> */}
      <div className="flex justify-between items-center w-[90%]">
        <div className="text-lg md:text-2xl">최종 결제 금액</div>
        <div className="flex flex-col justify-center items-center w-1/3 md:w-1/5 text-center">
          {selectedResult.totalPrice && (
            <>
              <p className="text-lg md:text-2xl">
                {selectedResult.totalPrice.toString()}원
              </p>
              <p className="text-lg md:text-2xl">(vat포함)</p>
            </>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Button
          onClick={handlePaymentClick}
          className="bg-[#0077B6] text-white w-full text-lg md:text-2xl h-12 md:h-16"
        >
          결제하기
        </Button>
      </div>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPaymentMethod(null);
          }
          onOpenChange(open);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                결제 방식 선택
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-4 ">
                  <Button
                    className="flex flex-col items-center justify-center h-full p-6 bg-[#eee] hover:bg-gray-200 rounded-lg hover:scale-105 transition-all duration-300 hover:border-2 hover:border-blue-500"
                    onPress={() => {
                      setSelectedPaymentMethod("CARD");
                    }}
                  >
                    <span className="text-3xl mb-2">💳</span>
                    <span className="text-sm">카드결제</span>
                  </Button>
                  <Button
                    className="flex flex-col items-center justify-center h-full p-6 bg-[#eee] hover:bg-gray-200 rounded-lg hover:scale-105 transition-all duration-300 hover:border-2 hover:border-blue-500"
                    onPress={() => {
                      setSelectedPaymentMethod("VIRTUAL_ACCOUNT");
                    }}
                  >
                    <span className="text-3xl mb-2">🏦</span>
                    <span className="text-sm">가상계좌</span>
                  </Button>
                  <Button
                    className="flex flex-col items-center justify-center h-full p-6 bg-[#eee] hover:bg-gray-200 rounded-lg hover:scale-105 transition-all duration-300 hover:border-2 hover:border-blue-500"
                    onPress={() => {
                      setSelectedPaymentMethod("TRANSFER");
                    }}
                  >
                    <span className="text-3xl mb-2">🏧</span>
                    <span className="text-sm">계좌이체</span>
                  </Button>
                  <Button
                    className="flex flex-col items-center justify-center h-full p-6 bg-[#eee] hover:bg-gray-200 rounded-lg hover:scale-105 transition-all duration-300 hover:border-2 hover:border-blue-500"
                    onPress={() => {
                      setSelectedPaymentMethod("MOBILE_PHONE");
                    }}
                  >
                    <span className="text-3xl mb-2">📱</span>
                    <span className="text-sm">휴대폰결제</span>
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={() => {
                    setSelectedPaymentMethod(null);
                    onClose();
                  }}
                >
                  취소
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}

function removeSpecialCharacters(str) {
  return str.replace(/[^a-zA-Z0-9가-힣]/g, "");
}
