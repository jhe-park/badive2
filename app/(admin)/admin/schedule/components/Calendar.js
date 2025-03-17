"use client";
import React, { useState, useEffect, useRef } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Checkbox } from "@heroui/react";
import { useDisclosure } from "@heroui/react";
import SelectModal from "./SelectModal";
import { useProgramStore } from "@/app/store/useProgramStore";
import { useSelectedResult } from "@/app/store/useSelectedResult";
// import Image from "next/image";
import { Skeleton } from "@heroui/skeleton";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  });
  const [monthList, setMonthList] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const { programStore } = useProgramStore();
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [instructors, setInstructors] = useState([]);
  const [userReservations, setUserReservations] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [filteredUserReservations, setFilteredUserReservations] =
    useState(null);
  const [timeslots, setTimeslots] = useState([]);
  const [isSelected, setIsSelected] = useState(true);
  const [selectedInstructorName, setSelectedInstructorName] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  console.log("selectedInstructor:", selectedInstructor);

  const getPrograms = async () => {
    const { data: programs, error: programsError } = await supabase
      .from("program")
      .select("*")
      .eq("available", true);
    if (programsError) {
      console.log("프로그램 조회 중 에러 발생:", programsError);
      return;
    }
    if (programs && selectedInstructor) {
      const filteredPrograms = programs.filter(
        (program) => program.instructor_id === selectedInstructor?.id
      );
      setPrograms(filteredPrograms);
    }
  };
  console.log('programs:',programs)
  useEffect(() => {
    getPrograms();
  }, [selectedInstructor]);
  console.log("programs:", programs);
  console.log("selectedProgram:", selectedProgram);

  const supabase = createClient();
  const instructorRef = useRef(null);
  console.log("selectedMonth:", selectedMonth);
  console.log("selectedInstructor:", selectedInstructor);
  const getInstructors = async () => {
    const { data: instructors, error: instructorsError } = await supabase
      .from("instructor")
      .select("*")
      .eq("available", true);
    if (instructorsError) {
      console.log("강사 조회 중 에러 발생:", instructorsError);
      return;
    }
    if (instructors) {
      setInstructors(instructors);
    }
  };

  useEffect(() => {
    getInstructors();
  }, []);

  
  const getReservations = async () => {
    try {
      const { data: reservation, error: reservationError } = await supabase
        .from("reservation")
        .select("*,time_slot_id(*,program_id(*)),user_id(*)")
        .ilike("time_slot_id.date", `${selectedMonth}%`)
        .not("time_slot_id", "is", null)
        .neq("status", "취소완료");

      
      if (reservationError) {
        console.log("예약 조회 중 에러 발생:", reservationError);
        return;
      }
      if (selectedProgram) {
        const filteredReservation = reservation.filter(item => item.time_slot_id.program_id.id.toString() === selectedProgram.toString());
        setUserReservations(filteredReservation);
      } else {
        setUserReservations(reservation);
      }
    } catch (err) {
      console.log("예약 조회 중 에러 발생:", err);
    }
  };
  useEffect(() => {
    if (selectedMonth) {
      getReservations();
    }
  }, [selectedMonth, selectedProgram,selectedInstructor]);

  useEffect(() => {
    if (userReservations.length > 0 && instructors.length > 0) {
      const updatedInstructors = instructors.map((instructor) => {
        const reservationCount = userReservations.filter(
          (reservation) =>
            reservation.time_slot_id?.instructor_id === instructor.id &&
            reservation.status !== "예약불가"
        ).length;
        return {
          ...instructor,
          count: reservationCount,
        };
      });
      setInstructors(updatedInstructors);
    }
  }, [userReservations]);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const months = [];

    for (let i = -3; i <= 3; i++) {
      const newDate = new Date(year, month + i - 1, 1);
      const newYear = newDate.getFullYear();
      const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
      months.push(`${newYear}-${newMonth}`);
    }

    setMonthList(months);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const [year, month] = selectedMonth.split("-");
      setCurrentDate(new Date(year, month - 1, 1));
    }
  }, [selectedMonth]);

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

  const handleInstructorClick = (instructor) => {
    setSelectedInstructor(instructor);
    setSelectedResult({
      ...selectedResult,
      instructor_id: instructor.id,
      instructor: instructor.name,
    });
  };
  console.log("selectedInstructor:", selectedInstructor);
  console.log("selectedResult:", selectedResult);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        instructorRef.current &&
        !instructorRef.current.contains(event.target)
      ) {
        setSelectedInstructor(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedInstructor) {
      const filteredReservations = userReservations.filter(
        (reservation) =>
          reservation.time_slot_id.instructor_id === selectedInstructor.id
      );
      setFilteredUserReservations(filteredReservations);
    } else {
      setFilteredUserReservations(null);
    }
  }, [selectedInstructor, userReservations]);
  console.log("instructors:", instructors);
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-start">
      <div className="flex flex-col md:flex-row w-full justify-start gap-x-4 gap-y-2">
        <Select
          selectedKeys={[selectedMonth]}
          onChange={(e) => setSelectedMonth(e.target.value)}
          label="년월"
          className="w-full md:w-1/3"
          placeholder="년월 선택"
        >
          {monthList.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </Select>
        <Select
          color={!selectedInstructorName ? "danger" : "default"}
          selectedKeys={[selectedInstructorName]}
          onChange={(e) => setSelectedInstructorName(e.target.value)}
          label="강사"
          className="w-full md:w-1/3"
          placeholder="강사 선택"
          isRequired={true}
        >
          {instructors.map((instructor) => (
            <SelectItem
              onPress={() => handleInstructorClick(instructor)}
              key={instructor.name}
              value={instructor.name}
            >
              {instructor.name}
            </SelectItem>
          ))}
        </Select>
        {selectedInstructor && (
          <Select
            color={!selectedInstructorName ? "danger" : "default"}
            selectedKeys={[selectedProgram]}
            onChange={(e) => setSelectedProgram(e.target.value)}
            label="프로그램"
            className="w-full md:w-1/3"
          placeholder="프로그램 선택"
          isRequired={true}
        >
          {programs?.map((program) => (
            <SelectItem key={program.id} value={program.id}>
              {program.title}_{program.region}
            </SelectItem>
          ))}
        </Select>
        )}
      </div>

      <div className="grid grid-cols-7 gap-0 w-full my-6">
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
        {Array.from({ length: firstDayOfMonth }, (_, i) => i).map((_, i) => (
          <div key={`empty-${i}`} className="text-center text-gray-400"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const isSelected =
            selectedDate &&
            selectedDate.start <=
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              ) &&
            selectedDate.end >=
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

          const isStart = selectedDate && selectedDate.start.getDate() === day;
          const isEnd = selectedDate && selectedDate.end.getDate() === day;

          const reservationsToCheck =
            filteredUserReservations !== null
              ? filteredUserReservations
              : userReservations;

          const hasReservation = reservationsToCheck.some((reservation) => {
            const reservationDate = new Date(reservation.time_slot_id.date);
            return (
              reservationDate.getFullYear() === currentDate.getFullYear() &&
              reservationDate.getMonth() === currentDate.getMonth() &&
              reservationDate.getDate() === day &&
              reservation.status !== "예약불가"
            );
          });

          const hasUnavailableReservation = reservationsToCheck.some(
            (reservation) => {
              const reservationDate = new Date(reservation.time_slot_id.date);
              return (
                reservationDate.getFullYear() === currentDate.getFullYear() &&
                reservationDate.getMonth() === currentDate.getMonth() &&
                reservationDate.getDate() === day &&
                reservation.status === "예약불가"
              );
            }
          );

          return (
            <div
              key={day}
              className={`relative text-center text-sm md:text-3xl w-full h-8 md:h-16 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition ${
                isSelected
                  ? isStart
                    ? "bg-gray-300 text-white rounded-l-full"
                    : isEnd
                      ? "bg-gray-300 text-white rounded-r-full"
                      : "bg-gray-300 text-white rounded-none"
                  : ""
              }`}
              onClick={() => handleDateSelect(day)}
            >
              {hasReservation && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
              {hasUnavailableReservation && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full ml-3"></div>
              )}
              {day}
            </div>
          );
        })}
      </div>
      <div className="w-full overflow-x-auto">
        <Table
          classNames={{
            wrapper: "p-0 min-w-full whitespace-nowrap",
          }}
          aria-label="강사별 예약 현황"
          shadow="none"
        >
          <TableHeader>
            <TableColumn className="text-center w-[100px]">구분</TableColumn>
            {instructors.map((instructor) => (
              <TableColumn
                key={instructor.id}
                className="text-center w-[100px]"
              >
                {instructor.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center whitespace-nowrap">
                예약건수
              </TableCell>
              {instructors.map((instructor) => (
                <TableCell
                  key={instructor.id}
                  className="text-center whitespace-nowrap"
                >
                  {instructor.count}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <SelectModal
        userReservations={
          filteredUserReservations !== null
            ? filteredUserReservations
            : userReservations
        }
        selectedInstructor={selectedInstructor}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        getReservations={getReservations}
        selectedProgram={selectedProgram}
      />
    </div>
  );
}
