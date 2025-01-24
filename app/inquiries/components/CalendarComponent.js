"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {RadioGroup, Radio} from "@heroui/radio";
import { useDisclosure } from "@heroui/react";
import SelectModal from "./SelectModal";
const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();


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
    setSelectedDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    );
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

  return (
    <div className="col-span-1 flex flex-col items-center justify-start gap-y-12 h-full">
      <div className="flex justify-between items-center mb-4 w-full">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-x-2"
        >
          <ChevronLeft size={40} />
          <span className="text-3xl">이전달</span>
        </button>
        <div className="font-medium text-3xl underline my-6">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </div>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition flex items-center justify-center gap-x-2"
        >
          <span className="text-3xl">다음달</span>
          <ChevronRight size={40} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 w-full">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div
            key={day}
            className={`font-bold text-3xl text-center h-16 flex items-center justify-center w-full ${
              index === 0 ? "text-red-500" : ""
            }`}
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => i).map((_, i) => (
          <div key={`empty-${i}`} className="text-center text-gray-400"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`text-center text-3xl w-full h-16 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition ${
              selectedDate?.getDate() === day &&
              selectedDate?.getMonth() === currentDate.getMonth() &&
              selectedDate?.getFullYear() === currentDate.getFullYear()
                ? "bg-blue-500 text-white rounded-full"
                : ""
            }`}
            onClick={() => handleDateSelect(day)}
          >
            {day}
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="mt-4 text-center">
          Selected date: {selectedDate.toLocaleDateString()}
        </div>
      )}
      <div className="w-[90%] h-full items-center justify-start gap-y-6 flex flex-col">
        <div className="w-full h-16 flex items-center justify-center border-2 border-[#0077B6] rounded-lg p-2">
          <RadioGroup>
            <Radio value="1">
              <span className="text-3xl">12. 19(목) AM 8:00~ AM 10:00 이세원강사</span>
            </Radio>
          </RadioGroup>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2 text-xl">
          <p>※위 내용 일정으로 예약을 신청하시겠습니까?</p>
          <p>(예약이 확정된 이후에는 변경이 어려울 수 있습니다.)</p>
        </div>
      </div>
      <SelectModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}></SelectModal>
    </div>
  );
};

export default CalendarComponent;
