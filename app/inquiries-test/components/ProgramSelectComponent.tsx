"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Divider, Select, SelectItem, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import {
  createClient,
  createTypedSupabaseClient,
} from "@/utils/supabase/client";
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

import useSelectedImageUrl from "@/app/store/useSelectedImageUrl";
import { ToastContainer, toast } from "react-toastify";
import { Database } from "@/utils/supabase/database.types";

// 프리다이빙
// 체험다이빙
// 머메이드
// 언더워터
// 스쿠버다이빙

const LECTURE_CATEGORY = [
  "스쿠버다이빙",
  "프리다이빙",
  "머메이드",
  "언더워터 댄스",
] as const;

export default function ProgramSelectComponent({
  isSelectProgram,
  setIsSelectProgram,

  isSelectInstructor,
  setIsSelectInstructor,
  userData,
  profile,
}) {
  const [everyProgram, setEveryProgram] = useState<
    Array<Database["public"]["Tables"]["program"]["Row"]>
  >([]);
  const [program, setProgram] = useState([]);
  const [selectedLectureCategory, setSelectedLectureCategory] = useState<
    "스쿠버다이빙" | "프리다이빙" | "머메이드" | "언더워터 댄스" | undefined
  >();
  const [selectedProgram, setSelectedProgram] = useState("");
  const [region, setRegion] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [instructor, setInstructor] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const { programStore, setProgramStore } = useProgramStore();
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const [data, setData] = useState([]);
  const [noParticipants, setNoParticipants] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [payment, setPayment] = useState(null);
  const [widgets, setWidgets] = useState(null);
  const [ready, setReady] = useState(false);
  const [paymentMethodWidget, setPaymentMethodWidget] = useState(null);
  const { selectedImageUrl, setSelectedImageUrl } = useSelectedImageUrl();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const clientKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_CLIENT_KEY;
  const customerKey = userData?.id;

  const router = useRouter();

  const increment = () => {
    const newValue = noParticipants + 1;
    setNoParticipants(newValue);
    setSelectedResult({
      ...selectedResult,
      noParticipants: newValue,
    });
  };

  const decrement = () => {
    const newValue = Math.max(1, noParticipants - 1);
    setNoParticipants(newValue);
    setSelectedResult({
      ...selectedResult,
      noParticipants: newValue,
    });
  };

  useEffect(() => {
    setSelectedResult({
      ...selectedResult,
      isAgree: false,
      date: null,
      noParticipants: noParticipants,
    });
  }, [noParticipants]);

  console.log("selectedResult33:", selectedResult);

  const supabase = createTypedSupabaseClient();
  // const supabase = createTypedSupabaseClient()
  const getProgram = async () => {
    const { data: programs, error } = await supabase
      .from("program")
      .select("*,instructor_id(*)")
      .eq("available", true);

    if (error) {
      console.log(error);
      return;
    }
    setEveryProgram(programs);

    const uniqueTitles = [...new Set(programs.map((item) => item.title))];
    setProgram(uniqueTitles);
    setData(programs);
    setProgramStore(programs);
    console.log("Loaded program data:", programs);
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

    if (uniqueRegions.length === 1) {
      selectRegion({ location: uniqueRegions.at(0) });
    }
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

    if (uniqueInstructors.length === 1) {
      handleInstructorSelect({ selectedName: uniqueInstructors.at(0) });
      // selectInstructor({ instructor: uniqueInstructors.at(0) });
    }
  };

  useEffect(() => {
    filterInstructor();
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedResult?.program_id && programStore?.length > 0) {
      const matchedProgram = programStore.find(
        (program) => program.id === selectedResult.program_id
      );

      if (matchedProgram) {
        const totalPrice = matchedProgram.price * noParticipants;
        setSelectedResult({
          ...selectedResult,
          totalPrice: totalPrice,
        });
      }
    }
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
      console.log("동의안됨");
      onOpen();
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
        selected_data: selectedResult as any,
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

  // const handleConfirmPayment = async () => {
  //   try {
  //     const successUrlWithParams = `${window.location.origin}/inquiries/complete?instructor_id=${selectedResult.instructor_id}&time_slot_id=${selectedResult.slot_id.join(",")}&user_id=${userData.id}&participants=${selectedResult.noParticipants}`;

  //     await widgets?.requestPayment({
  //       orderId: generateRandomString(),
  //       orderName: selectedResult.program,
  //       customerName: profile.name,
  //       customerEmail: profile.email,
  //       customerMobilePhone: removeSpecialCharacters(profile.phone),
  //       successUrl: successUrlWithParams,
  //       failUrl: window.location.origin + "/inquiries/fail",
  //     });
  //   } catch (error) {
  //     console.log("Payment request failed:", error);
  //     toast.error("결제 요청 중 오류가 발생했습니다.");
  //   }
  // };

  const handleInstructorSelect = ({
    selectedName,
  }: {
    selectedName: string;
  }) => {
    // const selectedName = e.target.value;
    setSelectedInstructor(selectedName);
    setIsSelectInstructor(true);

    const selectedInstructorData = data.find(
      (item) =>
        item.title === selectedProgram &&
        item.region === selectedRegion &&
        item.instructor_id?.name === selectedName
    );
    console.log("selectedInstructorData:", selectedInstructorData);

    console.log("instructor_id11:", selectedInstructorData.instructor_id.id);
    const newResult = {
      ...selectedResult,
      instructor: selectedName,
      instructor_id: selectedInstructorData.instructor_id.id,
      program_id: selectedInstructorData.id,
      totalPrice: selectedInstructorData.price || 0,
      slot_id: null,
      date: null,
    };

    setSelectedResult(newResult);
    console.log("newResult:", newResult);
    console.log("Updated Result:", newResult);
  };

  function selectInstructor({ instructor }: { instructor: string }) {}
  function selectRegion({ location }: { location: string }) {
    setSelectedInstructor("");
    setSelectedRegion(location);
    setIsSelectInstructor(false);
    setSelectedResult({
      ...selectedResult,
      region: location,
      instructor: "",
      date: null,
    });
  }

  // console.log("selectedResult:", selectedResult);
  // console.log("noParticipants:", noParticipants);

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
      {!isSelectProgram && (
        // w-56 h-56
        <div className=" flex items-center justify-center relative">
          <Image
            src="/inquiries/logo.png"
            alt="logo"
            // fill
            width={500}
            height={500}
            className="object-contain"
          ></Image>
        </div>
      )}
      {isSelectProgram && selectedImageUrl && (
        <div className="w-full max-w-[500px] aspect-square flex items-center justify-center relative">
          <Image src={selectedImageUrl} alt="Program Image" fill />
        </div>
      )}
      {/* {selectedResult?.category && (
        <>
          <div className="text-center text-2xl md:text-4xl font-bold">
            {selectedResult?.category}
          </div>
          <div className="text-center text-sm md:text-xl">
            {selectedResult?.program}
          </div>
        </>
      )} */}
      {/* <Divider className="w-full bg-[#A6A6A6]"></Divider> */}
      <div className="flex">
        <div className="text-lg md:text-2xl font-bold">강습프로그램</div>
        <div className="md:text-2xl font-bold">
          - 원하시는 강습을 선택해주세요.
        </div>
      </div>
      <div className="flex gap-2">
        {LECTURE_CATEGORY.map((category) => {
          return (
            <Badge
              key={category}
              variant={"outline"}
              className="font-bold text-[12px] lg:text-[14px] py-2 px-7 cursor-pointer"
              onClick={() => setSelectedLectureCategory(category)}
            >
              {category}
            </Badge>
          );
        })}
      </div>
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
            date: null,
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
          selectRegion({ location: e.target.value });
          // setSelectedInstructor("");
          // setSelectedRegion(e.target.value);
          // setIsSelectInstructor(false);
          // setSelectedResult({
          //   ...selectedResult,
          //   region: e.target.value,
          //   instructor: "",
          //   date: null,
          // });
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
        onChange={(e) =>
          handleInstructorSelect({ selectedName: e.target.value })
        }
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

      <div className="flex justify-between items-center w-[90%]">
        <div className="text-lg md:text-2xl">최종 결제 금액</div>
        <div className="flex flex-col justify-center items-center w-1/3 md:w-1/5 text-center">
          {selectedResult?.totalPrice && (
            <>
              <p className="text-lg md:text-2xl">
                {selectedResult?.totalPrice.toLocaleString()}원
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">알람</ModalHeader>
              <ModalBody>
                <p>달력 하단의 체크박스를 확인 후에 결제하기를 눌러주세요</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  확인
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
