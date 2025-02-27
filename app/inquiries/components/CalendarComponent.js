"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RadioGroup, Radio } from "@heroui/radio";
import { useDisclosure } from "@heroui/react";
import SelectModal from "./SelectModal";
import { useProgramStore } from "@/app/store/useProgramStore";
import { Skeleton } from "@heroui/skeleton";
import { Checkbox } from "@heroui/react";
import { Card } from "@heroui/card";
import Image from "next/image";
import { useSelectedResult } from "@/app/store/useSelectedResult";
import useSelectedImageUrl from "@/app/store/useSelectedImageUrl";

const CalendarComponent = ({
  isSelectProgram,
  setIsSelectProgram,
  isSelectInstructor,
  setIsSelectInstructor,
  userReservations,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const { programStore } = useProgramStore();
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const [isAgree, setIsAgree] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { selectedImageUrl, setSelectedImageUrl } = useSelectedImageUrl();

  useEffect(() => {
    if (selectedResult?.program) {
      const program = programStore.find(item => item.title === selectedResult.program);
      console.log("program111:", program)
      if (program?.images) {
        setSelectedImageUrl(program.images);
      }
    }
  }, [selectedResult, programStore])
  console.log("selectedImageUrl:", selectedImageUrl)
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleDateSelect = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dayOfWeek = selectedDate.getDay();
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - dayOfWeek);
    const endOfWeek = new Date(selectedDate);
    endOfWeek.setDate(selectedDate.getDate() + (6 - dayOfWeek));

    setSelectedDate({ start: startOfWeek, end: endOfWeek });

    const dateList = [];
    const tempDate = new Date(startOfWeek);

    while (tempDate <= endOfWeek) {
      const year = tempDate.getFullYear();
      const month = String(tempDate.getMonth() + 1).padStart(2, "0");
      const date = String(tempDate.getDate()).padStart(2, "0");
      dateList.push(`${year}-${month}-${date}`);
      tempDate.setDate(tempDate.getDate() + 1);
    }

    setSelectedResult({
      ...selectedResult,
      date: dateList,
    });

    onOpen();
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const findSelectedProgram = () => {
    const selectedProgram = programStore.find(
      (item) =>
        item.title === selectedResult?.program &&
        item.instructor_id.name === selectedResult?.instructor
    );
    if (selectedProgram) {
      if (selectedProgram?.id && selectedProgram?.instructor_id?.id) {
        if (
          selectedResult?.program_id !== selectedProgram.id ||
          selectedResult?.instructor_id !== selectedProgram.instructor_id.id
        ) {
          setSelectedResult({
            ...selectedResult,
            program_id: selectedProgram.id,
            instructor_id: selectedProgram.instructor_id.id,
          });
        }
      }
    }
  };

  useEffect(() => {
    findSelectedProgram();
  }, [selectedResult?.program, selectedResult?.instructor]);


  console.log('isSelectedInstructor:', isSelectInstructor)
  return (
    <div
      className={`col-span-1 flex flex-col items-center justify-center gap-y-2 md:gap-y-12 h-full`}
    >
      {!isSelectProgram ? (
        // <div className=" w-48 h-48 md:w-1/2 md:h-1/2  flex items-center justify-center relative">
        //   <Image src="/noimage/noimage.jpg" alt="Program Image" fill className="rounded-2xl" />
        // </div>

        <div className="w-full h-full flex items-center justify-center">
          <Image src='/inquiries/logo.png' alt='logo' width={500} height={500}></Image>
        </div>
      ) : !isSelectInstructor ? (
        selectedImageUrl ? (
          <div className="w-48 h-48 md:w-[90%] md:h-2/3 flex items-center justify-center relative">
            <Image src={selectedImageUrl} alt="Program Image" fill />
          </div>
        ) : null
      ) : (
        <>
          <div className="flex justify-between items-center md:mb-4 w-full">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-x-2"
            >
              <ChevronLeft className="text-4xl md:text-9xl font-bold" />
              <span className="text-sm md:text-2xl">이전달</span>
            </button>
            <div className="font-medium text-sm md:text-3xl underline my-6">
              {currentDate.toLocaleString("default", { month: "long" })}{" "}
              {currentDate.getFullYear()}
            </div>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-x-2"
            >
              <span className="text-sm md:text-2xl">다음달</span>
              <ChevronRight className="text-4xl md:text-9xl font-bold" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0 w-full border-1 p-6 border-gray-300 rounded-lg">
            {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
              <div
                key={day}
                className={`font-bold text-sm md:text-3xl text-center h-16 flex items-center justify-center w-full ${
                  index === 0 ? "text-red-500" : ""
                }`}
              >
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }, (_, i) => i).map(
              (_, i) => (
                <div
                  key={`empty-${i}`}
                  className="text-center text-gray-400"
                ></div>
              )
            )}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const currentDateObj = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              );
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const isPastDate = currentDateObj < today;

              const isSelected =
                selectedDate &&
                selectedDate.start <= currentDateObj &&
                selectedDate.end >= currentDateObj;

              const isStart = selectedDate && selectedDate.start.getDate() === day;
              const isEnd = selectedDate && selectedDate.end.getDate() === day;

              return (
                <div
                  key={day}
                  className={`text-center text-sm md:text-3xl w-full h-8 md:h-16 flex items-center justify-center ${
                    isPastDate 
                      ? "text-gray-300 cursor-not-allowed" 
                      : "cursor-pointer hover:bg-gray-200"
                  } transition ${
                    isSelected
                      ? isStart
                        ? "bg-blue-500 text-white rounded-l-lg px-2"
                        : isEnd
                          ? "bg-blue-500 text-white rounded-r-lg px-2"
                          : "bg-blue-500 text-white px-2"
                      : ""
                  }`}
                  onClick={() => !isPastDate && handleDateSelect(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="w-[90%] h-full items-center justify-start gap-y-6 flex flex-col">
            {selectedResult?.slot_date && (
              <>
                <div className="w-full h-16 flex items-center justify-center border-2 border-[#0077B6] rounded-lg p-2">
                  <span className="text-sm md:text-3xl">
                    {selectedResult?.slot_date} {selectedResult?.slot_start_time}~
                    {selectedResult?.slot_end_time} {selectedResult?.instructor}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center gap-y-2 text-sm md:text-xl">
                  <Checkbox
                    size="lg"
                    checked={selectedResult.isAgree}
                    onChange={() =>
                      setSelectedResult({
                        ...selectedResult,
                        isAgree: !selectedResult.isAgree,
                      })
                    }
                  >
                    <p>※위 내용 일정으로 예약을 신청하시겠습니까?</p>
                    <p className="font-bold">
                      (하단 예약 주의사항과 환불규정을 꼭 확인 후 결제해주시기 바랍니다.)
                    </p>
                    <p className="font-bold">
                      (단체예약문의는 카카오톡 채널 or 전화로 문의 주시면 예약이 가능합니다.)
                    </p>
                  </Checkbox>
                </div>
              </>
            )}
          </div>
          <SelectModal
            userReservations={userReservations}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          ></SelectModal>
        </>
      )}
      {/* {selectedDate && (
        <div className="mt-4 text-center">
          Selected date: {selectedDate.toLocaleDateString()}
        </div>
      )} */}
    </div>
  );
};

export default CalendarComponent;
