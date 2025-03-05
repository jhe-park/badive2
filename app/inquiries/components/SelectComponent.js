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
import useSelectedImageUrl from "@/app/store/useSelectedImageUrl";

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
  const [widgets, setWidgets] = useState(null);
  const [ready, setReady] = useState(false);
  const [paymentMethodWidget, setPaymentMethodWidget] = useState(null);
  const { selectedImageUrl, setSelectedImageUrl } = useSelectedImageUrl();

  const clientKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_CLIENT_KEY;
  const customerKey = userData?.id;

  const router = useRouter();

  const increment = () => setNoParticipants((prev) => prev + 1);
  const decrement = () => setNoParticipants((prev) => Math.max(1, prev - 1));

  const supabase = createClient();
  const getProgram = async () => {
    const { data, error } = await supabase
      .from("program")
      .select("*,instructor_id(*)")
      .eq("available", true);

    if (error) {
      console.log(error);
    } else {
      const uniqueTitles = [...new Set(data.map((item) => item.title))];
      setProgram(uniqueTitles);
      setData(data);
      setProgramStore(data);
      console.log("Loaded program data:", data);
    }
  };

  useEffect(() => {
    getProgram();
  }, [selectedProgram, selectedRegion, selectedInstructor]);

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

  useEffect(() => {
    if (selectedResult?.program_id && programStore?.length > 0) {
      const matchedProgram = programStore.find(
        (program) => program.id === selectedResult.program_id
      );

      if (matchedProgram) {
        setSelectedResult({
          ...selectedResult,
          category: matchedProgram.category,
        });
      }
    }
  }, [selectedResult?.program_id, programStore]);

  const handlePaymentClick = async () => {
    if (!selectedResult.isAgree) {
      toast.error("일정을 확인 후 체크박스를 클릭해주세요");
      return;
    }
    if (!userData) {
      router.push("/login?returnUrl=/inquiries");
      return;
    }

    try {
      const uuid = generateRandomString();
      const { error } = await supabase.from("pending_sessions").insert({
        uuid: uuid,
        selected_data: selectedResult,
        user_data: userData,
        profile: profile,
      });

      if (error) throw error;

      router.push(`/inquiries/checkout?session=${uuid}`);
    } catch (error) {
      console.log("Error creating pending session:", error);
      toast.error("결제 진행 중 오류가 발생했습니다.");
    }
  };

  const handleConfirmPayment = async () => {
    try {
      const successUrlWithParams = `${window.location.origin}/inquiries/complete?instructor_id=${selectedResult.instructor_id}&time_slot_id=${selectedResult.slot_id.join(',')}&user_id=${userData.id}&participants=${selectedResult.noParticipants}`;

      await widgets?.requestPayment({
        orderId: generateRandomString(),
        orderName: selectedResult.program,
        customerName: profile.name,
        customerEmail: profile.email,
        customerMobilePhone: removeSpecialCharacters(profile.phone),
        successUrl: successUrlWithParams,
        failUrl: window.location.origin + "/inquiries/fail",
      });
    } catch (error) {
      console.log("Payment request failed:", error);
      toast.error("결제 요청 중 오류가 발생했습니다.");
    }
  };

  const handleInstructorSelect = (e) => {
    const selectedName = e.target.value;
    setSelectedInstructor(selectedName);
    setIsSelectInstructor(true);

    const selectedInstructorData = data.find(
      (item) =>
        item.title === selectedProgram &&
        item.region === selectedRegion &&
        item.instructor_id?.name === selectedName
    );
    console.log("selectedInstructorData:", selectedInstructorData);

    console.log('instructor_id11:',selectedInstructorData.instructor_id.id)
    const newResult = {
      ...selectedResult,
      instructor: selectedName,
      instructor_id: selectedInstructorData.instructor_id.id,
      program_id: selectedInstructorData.id,
      totalPrice: selectedInstructorData.price || 0,
      slot_id: null,
      date:null
    };

    setSelectedResult(newResult);
    console.log("newResult:", newResult);
    console.log("Updated Result:", newResult);
  };

  console.log("selectedResult:", selectedResult);

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
      {selectedResult?.category && (
        <>
          <div className="text-center text-2xl md:text-4xl font-bold">
            {selectedResult?.category}
          </div>
          <div className="text-center text-sm md:text-xl">
            {selectedResult?.program}
          </div>
        </>
      )}
      <Divider className="w-full bg-[#A6A6A6]"></Divider>
      <div className="w-full text-lg md:text-2xl font-bold">강습프로그램</div>
      <Select
        label="프로그램명"
        aria-label="강습프로그램 선택"
        onChange={(e) => {
          setSelectedImageUrl("");
          setSelectedProgram(e.target.value);
          setIsSelectProgram(true);
          setSelectedRegion("");
          setSelectedInstructor("");
          setIsSelectInstructor(false);
          setNoParticipants(1);
          setSelectedResult({
            program: e.target.value,
            noParticipants: 1,
            program_id: null,
            instructor_id: null,
            instructor: "",
            region: "",
            category: null,
            totalPrice: null,
            date:null
          });
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
        label="지역명"
        aria-label="지역 선택"
        selectedKeys={[selectedRegion]}
        onChange={(e) => {
          setSelectedInstructor("");
          setSelectedRegion(e.target.value);
          setIsSelectInstructor(false);
          setSelectedResult({
            ...selectedResult,
            region: e.target.value,
            instructor: "",
            date:null
          });
        }}
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
        label="강사명"
        aria-label="강사 선택"
        selectedKeys={selectedInstructor ? [selectedInstructor] : []}
        onChange={handleInstructorSelect}
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
          {selectedResult?.totalPrice && (
            <>
              <p className="text-lg md:text-2xl">
                {selectedResult?.totalPrice.toString()}원
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          <ModalHeader>결제 진행</ModalHeader>
          <ModalBody>
            <div id="payment-widget-modal" className="w-full" />
            <div id="agreement-widget-modal" className="w-full" />
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex justify-center">
              <Button
                className="w-full "
                color="primary"
                onPress={handleConfirmPayment}
                disabled={!ready}
              >
                결제하기
              </Button>
            </div>
          </ModalFooter>
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
