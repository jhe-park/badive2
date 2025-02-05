import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import React, { useState, useEffect } from "react";
import { useSelectedResult } from "@/app/store/useSelectedResult";
import { createClient } from "@/utils/supabase/client";
export default function SelectModal({ isOpen, onOpenChange, onClose }) {
  const [selectedCell, setSelectedCell] = useState(null);
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const [data, setData] = useState([]);
  const supabase = createClient();
  console.log('selectedResult.instructor_id:', selectedResult.instructor_id);
  console.log('selectedResult.program_id:', selectedResult.program_id);
  const getSchedule = async () => {
    try {
      console.log('Fetching schedule with:', {
        instructor_id: selectedResult?.instructor_id,
        program_id: selectedResult?.program_id
      });
      
      if (!selectedResult?.instructor_id || !selectedResult?.program_id) {
        console.log('필수 ID 값이 없습니다');
        return;
      }

      const { data, error } = await supabase
        .from("timeslot")
        .select("*")
        .eq("instructor_id", selectedResult.instructor_id)
        .eq("program_id", selectedResult.program_id)
        .in("date", selectedResult.date)
        .order('date', { ascending: true })
        

      if (error) {
        console.error('데이터 조회 에러:', error);
        return;
      }
      
      console.log('조회된 데이터:', data);
      setData(data);
    } catch (err) {
      console.error('예외 발생:', err);
    }
  };
  useEffect(() => {
    if (selectedResult?.date?.length > 0) {
      getSchedule();
    }
  }, [selectedResult]);
  console.log("data:", data);

  
  // 날짜와 시간의 형태로 구성된 더미 데이터 생성
  const dummyData = [
    {
      date: "2023-10-01",
      weekday: "월",
      schedule: [
        { time: "06:00~07:00", status: 0 },
        { time: "07:00~08:00", status: 1 },
        { time: "08:00~09:00", status: 2 },
        { time: "09:00~10:00", status: 0 },
        { time: "10:00~11:00", status: 1 },
        { time: "11:00~12:00", status: 2 },
        { time: "12:00~13:00", status: 0 },
      ],
    },
    {
      date: "2023-10-02",
      weekday: "화",
      schedule: [
        { time: "06:00~07:00", status: 1 },
        { time: "07:00~08:00", status: 0 },
        { time: "08:00~09:00", status: 1 },
        { time: "09:00~10:00", status: 2 },
        { time: "10:00~11:00", status: 0 },
        { time: "11:00~12:00", status: 1 },
        { time: "12:00~13:00", status: 2 },
      ],
    },
    {
      date: "2023-10-03",
      weekday: "수",
      schedule: [
        { time: "06:00~07:00", status: 2 },
        { time: "07:00~08:00", status: 1 },
        { time: "08:00~09:00", status: 0 },
        { time: "09:00~10:00", status: 1 },
        { time: "10:00~11:00", status: 2 },
        { time: "11:00~12:00", status: 0 },
        { time: "12:00~13:00", status: 1 },
      ],
    },
    {
      date: "2023-10-04",
      weekday: "목",
      schedule: [
        { time: "06:00~07:00", status: 0 },
        { time: "07:00~08:00", status: 2 },
        { time: "08:00~09:00", status: 1 },
        { time: "09:00~10:00", status: 0 },
        { time: "10:00~11:00", status: 1 },
        { time: "11:00~12:00", status: 2 },
        { time: "12:00~13:00", status: 0 },
      ],
    },
    {
      date: "2023-10-05",
      weekday: "금",
      schedule: [
        { time: "06:00~07:00", status: 1 },
        { time: "07:00~08:00", status: 0 },
        { time: "08:00~09:00", status: 2 },
        { time: "09:00~10:00", status: 1 },
        { time: "10:00~11:00", status: 0 },
        { time: "11:00~12:00", status: 1 },
        { time: "12:00~13:00", status: 2 },
      ],
    },
    {
      date: "2023-10-06",
      weekday: "토",
      schedule: [
        { time: "06:00~07:00", status: 2 },
        { time: "07:00~08:00", status: 1 },
        { time: "08:00~09:00", status: 0 },
        { time: "09:00~10:00", status: 2 },
        { time: "10:00~11:00", status: 1 },
        { time: "11:00~12:00", status: 0 },
        { time: "12:00~13:00", status: 1 },
      ],
    },
    {
      date: "2023-10-07",
      weekday: "일",
      schedule: [
        { time: "06:00~07:00", status: 0 },
        { time: "07:00~08:00", status: 1 },
        { time: "08:00~09:00", status: 2 },
        { time: "09:00~10:00", status: 0 },
        { time: "10:00~11:00", status: 1 },
        { time: "11:00~12:00", status: 2 },
        { time: "12:00~13:00", status: 0 },
      ],
    },
  ];

  const handleCellClick = (key) => {
    setSelectedCell(key);
  };

  const generateTimeSlots = () => {
    return dummyData.map((slot) => slot.time);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "bg-[#F4F4F4]"; // 예약가능
      case 1:
        return "bg-[#A9D6E5]"; // 예약완료
      case 2:
        return "bg-[#FD0000]"; // 예약불가
      default:
        return "";
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="">
                <div className="flex md:flex-row flex-col justify-between w-full gap-y-2">
                  <div className="text-lg md:text-2xl font-bold">{selectedResult.instructor}</div>
                  <div className="flex items-center gap-2 pr-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#A9D6E5]"></div>
                      <div className="text-sm md:text-lg">예약완료</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#F4F4F4]"></div>
                      <div className="text-sm md:text-lg">예약가능</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#FD0000]"></div>
                      <div className="text-sm md:text-lg">예약불가</div>
                    </div>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="overflow-x-auto">
                  <Table aria-label="Example static collection table" shadow="none" removeWrapper>
                    <TableHeader>
                      <TableColumn className="text-sm md:text-lg text-center w-1/8">시간/요일</TableColumn>
                      {dummyData.map((slot, index) => (
                        <TableColumn key={index} className="text-sm md:text-lg text-center w-1/8">{slot.weekday}</TableColumn>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {dummyData[0].schedule.map((schedule, timeIndex) => (
                        <TableRow key={timeIndex} className="text-center overflow-x-auto">
                          <TableCell className="text-center text-sm md:text-lg z-50">{schedule.time}</TableCell>
                          {dummyData.map((slot, dateIndex) => (
                            <TableCell
                              key={dateIndex}
                              className={`text-center ${getStatusColor(slot.schedule[timeIndex].status)} ${selectedCell === `${timeIndex}-${dateIndex}` ? "bg-[#CAD593]" : ""} ${slot.schedule[timeIndex].status === 0 ? "cursor-pointer" : "cursor-not-allowed"}`}
                              onClick={() => slot.schedule[timeIndex].status === 0 && handleCellClick(`${timeIndex}-${dateIndex}`)}
                            >
                              {slot.schedule[timeIndex].status}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-[#0077B6] text-white w-full text-lg md:text-xl h-12 md:h-16"
                  onPress={onClose}
                >
                  예약일정 선택하기
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
