'use client';

import React, { useState, useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { useSelectedResult } from '@/app/store/useSelectedResult';
import useExpertStore from '../../store/useExpertStore';
import { createClient } from '@/utils/supabase/client';
// import SelectModal from "./SelectModal";
import { useDisclosure } from '@nextui-org/react';

export default function Calendar() {
  // 현재 선택된 월 상태
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const { expertInformation } = useExpertStore();
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  });
  const [isSelected, setIsSelected] = useState(false);

  // 선택 가능한 월 목록 상태
  const [monthList, setMonthList] = useState([]);

  // 현재 표시되는 날짜 상태
  const [currentDate, setCurrentDate] = useState(new Date());

  const [userReservations, setUserReservations] = useState([]);
  const supabase = createClient();
  const [programs, setPrograms] = useState([]);
  console.log('selectedProgra:', selectedProgram);
  console.log('userReservations:', userReservations);

  // 선택된 날짜 범위를 저장할 상태 추가
  const [selectedDate, setSelectedDate] = useState(null);
  console.log('selectedProgram:', selectedProgram);

  // 예약 데이터 가져오기
  const getReservations = async () => {
    try {
      const { data: reservation, error: reservationError } = await supabase
        .from('reservation')
        .select('*,time_slot_id(*,program_id(*)),user_id(*)')
        .ilike('time_slot_id.date', `${selectedMonth}%`)
        .not('time_slot_id', 'is', null)
        .neq('status', '취소완료')
        .eq('instructor_id', expertInformation?.id);

      if (reservationError) {
        console.log('예약 조회 중 에러 발생:', reservationError);
        return;
      }
      if (reservation) {
        // selectedProgram이 있는 경우 필터링
        if (selectedProgram) {
          const filteredReservations = reservation.filter(item => item.time_slot_id.program_id.id.toString() === selectedProgram.toString());
          setUserReservations(filteredReservations);
        } else {
          setUserReservations(reservation);
        }
      }
    } catch (err) {
      console.log('예약 조회 중 에러 발생:', err);
    }
  };

  // 프로그램 데이터 가져오기
  const getPrograms = async () => {
    try {
      const { data: programs, error: programsError } = await supabase
        .from('program')
        .select('*')
        .eq('instructor_id', expertInformation?.id)
        .eq('available', true);

      if (programsError) {
        console.log('프로그램 조회 중 에러 발생:', programsError);
        return;
      }
      if (programs) {
        setPrograms(programs);
      }
    } catch (err) {
      console.log('프로그램 조회 중 에러 발생:', err);
    }
  };

  console.log('programs:', programs);
  // 선택된 월이 변경될 때마다 예약 데이터 가져오기
  useEffect(() => {
    console.log('expertInformation?.id:', expertInformation?.id);
    if (selectedMonth && expertInformation?.id) {
      getReservations();
    }
  }, [selectedMonth, selectedProgram, expertInformation?.id]);

  // 월 목록 생성
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

  // 선택된 월이 변경될 때 현재 날짜 업데이트
  useEffect(() => {
    if (selectedMonth) {
      const [year, month] = selectedMonth.split('-');
      setCurrentDate(new Date(parseInt(year), parseInt(month) - 1, 1));
    }
  }, [selectedMonth]);

  // expertInformation이 변경될 때마다 프로그램 데이터 가져오기
  useEffect(() => {
    if (expertInformation) {
      getPrograms();
    }
  }, [expertInformation]);

  // 달력에 표시될 날짜 수 계산
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // 달력의 첫 날 요일 계산
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleDateSelect = day => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = selectedDate.getDay();
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - dayOfWeek);
    const endOfWeek = new Date(selectedDate);
    endOfWeek.setDate(selectedDate.getDate() + (6 - dayOfWeek));

    // 선택된 날짜 범위 저장
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

    // 날짜 선택 후 모달 열기
    onOpen();
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-4">
      {/* 월 선택 Select */}
      <div className="flex w-full flex-col justify-start gap-x-4 gap-y-2 md:flex-row">
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
          selectedKeys={[selectedProgram]}
          onChange={e => setSelectedProgram(e.target.value)}
          label="프로그램"
          className="w-full md:w-1/3"
          placeholder="프로그램 선택"
          isRequired={true}
          renderValue={items => {
            const selectedProgramItem = programs.find(p => p.id.toString() === selectedProgram?.toString());
            return selectedProgramItem ? `${selectedProgramItem.title} - ${selectedProgramItem.region}` : '';
          }}
        >
          {programs?.map(program => (
            <SelectItem key={program.id} value={program.id}>
              {`${program.title} - ${program.region}`}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* 달력 그리드 */}
      <div className="my-6 grid w-full grid-cols-7 gap-0">
        {/* 요일 헤더 */}
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={day}
            className={`flex h-16 w-full items-center justify-center text-center text-sm font-bold md:text-3xl ${index === 0 ? 'text-red-500' : ''}`}
          >
            {day}
          </div>
        ))}

        {/* 첫 주 빈 칸 */}
        {Array.from({ length: firstDayOfMonth }, (_, i) => i).map((_, i) => (
          <div key={`empty-${i}`} className="text-center text-gray-400"></div>
        ))}

        {/* 날짜 */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const currentDateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          const hasUnavailableReservation = userReservations.some(
            reservation => reservation.time_slot_id.date === currentDateStr && reservation.status === '예약불가',
          );

          const hasCompletedReservation = userReservations.some(
            reservation => reservation.time_slot_id.date === currentDateStr && reservation.status !== '예약불가',
          );

          // 선택된 주 내의 날짜인지 확인
          const isSelected =
            selectedDate &&
            new Date(currentDate.getFullYear(), currentDate.getMonth(), day) >= selectedDate.start &&
            new Date(currentDate.getFullYear(), currentDate.getMonth(), day) <= selectedDate.end;

          // 선택된 주의 시작일과 마지막일 확인
          const isStart = selectedDate && selectedDate.start.getDate() === day;
          const isEnd = selectedDate && selectedDate.end.getDate() === day;

          return (
            <div
              key={day}
              className={`relative flex h-8 w-full cursor-pointer items-center justify-center text-center text-sm transition hover:bg-gray-200 md:h-16 md:text-3xl ${
                isSelected
                  ? isStart
                    ? 'rounded-l-full bg-primary-500 text-white'
                    : isEnd
                      ? 'rounded-r-full bg-primary-500 text-white'
                      : 'bg-primary-500 text-white'
                  : ''
              }`}
              onClick={() => handleDateSelect(day)}
            >
              {hasUnavailableReservation && <div className="absolute left-1/2 top-0 ml-3 h-2 w-2 -translate-x-1/2 transform rounded-full bg-red-500"></div>}
              {hasCompletedReservation && <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 transform rounded-full bg-blue-500"></div>}
              {day}
            </div>
          );
        })}
      </div>
      {/* <SelectModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        userReservations={userReservations}
        selectedProgram={selectedProgram}
        selectedInstructor={expertInformation}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        getReservations={getReservations}
        
      /> */}
    </div>
  );
}
