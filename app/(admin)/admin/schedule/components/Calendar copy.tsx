'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '@heroui/react';
import { useDisclosure } from '@heroui/react';
// import SelectModal from './SelectModal';
import { useProgramStore } from '@/app/store/useProgramStore';
import { useSelectedResult } from '@/app/store/useSelectedResult';
// import Image from "next/image";
import { Skeleton } from '@heroui/skeleton';
import { createClient } from '@/utils/supabase/client';
import { Card, CardBody, CardFooter, Image, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@heroui/react';

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
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
  const [filteredUserReservations, setFilteredUserReservations] = useState(null);
  const [timeslots, setTimeslots] = useState([]);

  const supabase = createClient();
  const instructorRef = useRef(null);
  console.log('selectedMonth:', selectedMonth);
  console.log('selectedInstructor:', selectedInstructor);

  useEffect(() => {
    const getInstructors = async () => {
      const { data: instructors, error: instructorsError } = await supabase.from('instructor').select('*');
      if (instructorsError) {
        console.log('강사 조회 중 에러 발생:', instructorsError);
        return;
      }
      if (instructors) {
        setInstructors(instructors);
      }
    };

    getInstructors();
  }, []);

  useEffect(() => {
    const getReservations = async () => {
      try {
        const { data: reservation, error: reservationError } = await supabase
          .from('reservation')
          .select('*,time_slot_id(*,program_id(*)),user_id(*)')
          .ilike('time_slot_id.date', `${selectedMonth}%`)
          .not('time_slot_id', 'is', null)
          .neq('status', '취소완료');

        if (reservationError) {
          console.log('예약 조회 중 에러 발생:', reservationError);
          return;
        }
        if (reservation) {
          // const filteredReservation = reservation.filter(item => item.time_slot_id !== null);
          setUserReservations(reservation);
        }
      } catch (err) {
        console.log('예약 조회 중 에러 발생:', err);
      }
    };

    if (selectedMonth) {
      getReservations();
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (userReservations && instructors) {
      const updatedInstructors = instructors.map(instructor => {
        const reservationCount = userReservations.filter(
          reservation => reservation.time_slot_id?.instructor_id === instructor.id && reservation.status !== '예약불가',
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
      const newMonth = String(newDate.getMonth() + 1).padStart(2, '0');
      months.push(`${newYear}-${newMonth}`);
    }

    setMonthList(months);
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const [year, month] = selectedMonth.split('-');
      setCurrentDate(new Date(parseInt(year), parseInt(month) - 1, 1));
    }
  }, [selectedMonth]);

  const handleDateSelect = day => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
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
      const month = String(tempDate.getMonth() + 1).padStart(2, '0');
      const date = String(tempDate.getDate()).padStart(2, '0');
      dateList.push(`${year}-${month}-${date}`);
      tempDate.setDate(tempDate.getDate() + 1);
    }

    setSelectedResult({
      ...selectedResult,
      date: dateList,
    });

    onOpen();
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleInstructorClick = instructor => {
    setSelectedInstructor(instructor);
    setSelectedResult({
      ...selectedResult,
      instructor_id: instructor.id,
      instructor: instructor.name,
    });
  };
  console.log('selectedInstructor:', selectedInstructor);
  console.log('selectedResult:', selectedResult);

  useEffect(() => {
    const handleClickOutside = event => {
      if (instructorRef.current && !instructorRef.current.contains(event.target)) {
        setSelectedInstructor(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedInstructor) {
      const filteredReservations = userReservations.filter(reservation => reservation.time_slot_id.instructor_id === selectedInstructor.id);
      setFilteredUserReservations(filteredReservations);
    } else {
      setFilteredUserReservations(null);
    }
  }, [selectedInstructor, userReservations]);

  //   console.log('filteredUserReservations:',filteredUserReservations);
  //   console.log('instructors:',instructors);
  //   console.log('timeslots:',timeslots);
  //   console.log('userReservations:',userReservations);
  console.log('selectedResult:', selectedResult);

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-start">
      <div className="flex w-full justify-start gap-x-4">
        <Select
          selectedKeys={[selectedMonth]}
          onChange={e => setSelectedMonth(e.target.value)}
          label="년월"
          className="w-full md:w-1/3"
          placeholder="년월 선택"
        >
          {monthList.map(month => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </Select>
        <Select
          selectedKeys={[selectedInstructor]}
          onChange={e => setSelectedInstructor(e.target.value)}
          label="강사"
          className="w-full md:w-1/3"
          placeholder="강사 선택"
        >
          {instructors.map(instructor => (
            <SelectItem key={instructor.id} value={instructor.id}>
              {instructor.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-7 gap-0 w-full my-6">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`font-bold text-sm md:text-3xl text-center h-16 flex items-center justify-center w-full ${index === 0 ? 'text-red-500' : ''}`}
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDayOfMonth }, (_, i) => i).map((_, i) => (
          <div key={`empty-${i}`} className="text-center text-gray-400"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const isSelected =
            selectedDate &&
            selectedDate.start <= new Date(currentDate.getFullYear(), currentDate.getMonth(), day) &&
            selectedDate.end >= new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

          const isStart = selectedDate && selectedDate.start.getDate() === day;
          const isEnd = selectedDate && selectedDate.end.getDate() === day;

          const reservationsToCheck = filteredUserReservations !== null ? filteredUserReservations : userReservations;

          const hasReservation = reservationsToCheck.some(reservation => {
            const reservationDate = new Date(reservation.time_slot_id.date);
            return (
              reservationDate.getFullYear() === currentDate.getFullYear() &&
              reservationDate.getMonth() === currentDate.getMonth() &&
              reservationDate.getDate() === day
            );
          });

          const hasUnavailableReservation = reservationsToCheck.some(reservation => {
            const reservationDate = new Date(reservation.time_slot_id.date);
            return (
              reservationDate.getFullYear() === currentDate.getFullYear() &&
              reservationDate.getMonth() === currentDate.getMonth() &&
              reservationDate.getDate() === day &&
              reservation.status === '예약불가'
            );
          });

          return (
            <div
              key={day}
              className={`relative text-center text-sm md:text-3xl w-full h-8 md:h-16 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition ${
                isSelected
                  ? isStart
                    ? 'bg-gray-300 text-white rounded-l-full'
                    : isEnd
                      ? 'bg-gray-300 text-white rounded-r-full'
                      : 'bg-gray-300 text-white rounded-none'
                  : ''
              }`}
              onClick={() => handleDateSelect(day)}
            >
              {hasReservation && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>}
              {hasUnavailableReservation && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full ml-3"></div>}
              {day}
            </div>
          );
        })}
      </div>
      <div ref={instructorRef} className="gap-2 flex flex-col md:flex-row flex-wrap w-full md:w-[80%] justify-evenly items-center">
        {instructors.map((item, index) => (
          /* eslint-disable no-console */
          <div
            key={index}
            className={`w-full md:w-[20%] h-20 md:h-32 rounded-lg p-2  flex flex-col justify-center items-start hover:cursor-pointer transition-all duration-300 ${
              selectedInstructor?.id === item.id ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            // shadow="none"
            onClick={() => handleInstructorClick(item)}
          >
            <div className="w-full text-center text-sm md:text-lg font-bold">{item?.name}</div>
            <Divider className={`w-full my-2 ${selectedInstructor?.id === item.id ? 'bg-white' : ''}`} />
            <div className="w-full text-center text-bold text-sm md:text-lg">{item?.count}</div>
          </div>
        ))}
      </div>
      {/* 
      <SelectModal
        userReservations={filteredUserReservations !== null ? filteredUserReservations : userReservations}
        selectedInstructor={selectedInstructor}
        isOpen={isOpen} 
                       
        // onOpen={onOpen}
        onClose={onclose}
        onOpenChange={onOpenChange}
      /> */}
    </div>
  );
}
