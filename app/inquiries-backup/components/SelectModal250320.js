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
import useModalOpen from "@/app/store/useModalOpen";
import { ToastContainer, toast } from "react-toastify";
import useCalendarClick from "@/app/store/useCalendarClick";
export default function SelectModal({
  isOpen: isOpenProps,
  onOpenChange: onOpenChangeProps,
  onClose: onCloseProps,
  userReservations,
}) {
  const [selectedCell, setSelectedCell] = useState(null);
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const { isOpen, setIsOpen } = useModalOpen();
  const [data, setData] = useState([]);
  const { calendarClick, setCalendarClick } = useCalendarClick();
  const supabase = createClient();

  useEffect(() => {
    setIsOpen(isOpenProps);
  }, [isOpenProps]);

  

  const getSchedule = async () => {
    try {
      console.log("Fetching schedule with:", {
        instructor_id: selectedResult?.instructor_id,
        program_id: selectedResult?.program_id,
      });

      if (!selectedResult?.instructor_id || !selectedResult?.program_id) {
        console.log("필수 ID 값이 없습니다");
        return;
      }

      const { data, error } = await supabase
        .from("timeslot")
        .select("*,program_id(*)")
        .eq("instructor_id", selectedResult.instructor_id)
        .eq("program_id", selectedResult.program_id)
        .in("date", selectedResult.date)
        .order("date", { ascending: true });

      if (error) {
        console.error("데이터 조회 에러:", error);
        return;
      }

      console.log("조회된 데이터:", data);
      setData(data);
    } catch (err) {
      console.error("예외 발생:", err);
    }
  };

  const formatData = (rawData) => {
    // unique_id에서 날짜와 시간을 추출하여 정렬
    const sortedData = [...rawData].sort((a, b) => {
      const [, , dateA, timeA] = a.unique_id.split("_");
      const [, , dateB, timeB] = b.unique_id.split("_");
      const dateTimeA = new Date(`${dateA} ${timeA}`);
      const dateTimeB = new Date(`${dateB} ${timeB}`);
      return dateTimeA - dateTimeB;
    });

    const groupedByDate = sortedData.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    const formattedData = Object.keys(groupedByDate).map((date) => {
      const weekday = new Date(date).toLocaleDateString("ko-KR", {
        weekday: "short",
      });

      // 해당 날짜의 예약된 슬롯들의 시작 시간을 찾습니다
      const reservedStartTimes = userReservations
        ?.filter(reservation => 
          reservation.status !== "취소완료" &&
          rawData.some(slot => 
            slot.id === reservation.time_slot_id && 
            slot.date === date
          )
        )
        .map(reservation => {
          const slot = rawData.find(s => s.id === reservation.time_slot_id);
          return slot ? slot.start_time : null;
        })
        .filter(time => time !== null);

      // 날짜별 스케줄 생성
      const schedules = groupedByDate[date].map((slot) => {
        const remainingSpots = slot.max_participants - slot.current_participants;
        return {
          time: `${slot.start_time}~${slot.end_time}`,
          startTime: slot.start_time,
          status: !slot.available ? 2 : 
                 remainingSpots < selectedResult.noParticipants ? 2 : 0,
          remainingSpots: remainingSpots,
          available: slot.available,
        };
      });

      // 예약된 시간대와 그 다음 2개 시간대를 예약완료로 표시
      reservedStartTimes.forEach(startTime => {
        const startIndex = schedules.findIndex(s => s.startTime === startTime);
        if (startIndex !== -1) {
          for (let i = 0; i < 3; i++) {
            if (startIndex + i < schedules.length) {
              if (schedules[startIndex + i].status !== 2) { // 예약불가가 아닌 경우에만
                schedules[startIndex + i].status = 1; // 예약완료로 설정
              }
            }
          }
        }
      });

      return {
        date: date,
        weekday: weekday,
        schedule: schedules
      };
    });

    return formattedData;
  };

  useEffect(() => {
    if (selectedResult?.date?.length > 0) {
      getSchedule();
    }
  }, [selectedResult, calendarClick]);

  // data가 업데이트될 때마다 포맷된 데이터 생성
  const formattedSchedule = data.length > 0 ? formatData(data) : [];

  // dummyData 대신 formattedSchedule 사용
  const tableData = formattedSchedule;

  const handleCellClick = (key, status, dateIndex, timeIndex) => {
    if (status === 0) {
      // 연속된 3개의 시간대 확인
      const nextTwoSlots = tableData[dateIndex].schedule.slice(timeIndex + 1, timeIndex + 3);
      const currentSlot = tableData[dateIndex].schedule[timeIndex];
      
      // 다음 2개의 슬롯이 존재하고 모두 예약 가능한지 확인
      if (nextTwoSlots.length === 2 && 
          nextTwoSlots.every(slot => slot.status === 0)) {
        
        // 3개의 연속된 셀 키 생성
        const selectedCells = [
          `${timeIndex}-${dateIndex}`,
          `${timeIndex + 1}-${dateIndex}`,
          `${timeIndex + 2}-${dateIndex}`
        ];
        setSelectedCell(selectedCells);

        // 선택된 첫 번째 슬롯 찾기
        const selectedSlot = data.find(
          (slot) =>
            slot.date === tableData[dateIndex].date &&
            `${slot.start_time}~${slot.end_time}` === currentSlot.time
        );

        // 두 번째 슬롯 찾기
        const secondSlot = data.find(
          (slot) =>
            slot.date === tableData[dateIndex].date &&
            `${slot.start_time}~${slot.end_time}` === tableData[dateIndex].schedule[timeIndex + 1].time
        );

        // 세 번째 슬롯 찾기
        const thirdSlot = data.find(
          (slot) =>
            slot.date === tableData[dateIndex].date &&
            `${slot.start_time}~${slot.end_time}` === tableData[dateIndex].schedule[timeIndex + 2].time
        );

        if (selectedSlot && secondSlot && thirdSlot) {
          const selectedDate = tableData[dateIndex].date;
          const selectedWeekday = tableData[dateIndex].weekday;
          const formattedDate = `${selectedDate.slice(5).replace("-", "/")}(${selectedWeekday})`;

          setSelectedResult({
            ...selectedResult,
            slot_id: [selectedSlot.id, secondSlot.id, thirdSlot.id],
            slot_start_time: selectedSlot.start_time,
            slot_end_time: thirdSlot.end_time,
            slot_date: formattedDate,
            price: selectedSlot.program_id.price,
            totalPrice: selectedSlot.program_id.price * selectedResult.noParticipants ,
          });
        }
      } else {
        toast.error("연속된 3시간이 모두 예약 가능해야 합니다.");
      }
    }
  };

  const generateTimeSlots = () => {
    return tableData.map((slot) => slot.time);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "bg-[#F4F4F4]"; // 예약가능
      case 1:
        return "bg-[#A9D6E5]"; // 예약완료
      case 2:
        return "bg-[#FD0000] text-white"; // 예약불가 (텍스트 색상을 흰색으로 변경)
      default:
        return "";
    }
  };
  // console.log("selectedResult:", selectedResult);
  // console.log('userReservations11:', userReservations)
  return (
    <>
      <Modal classNames={{base:"z-50 max-h-[70vh]"}}  size='full' isOpen={isOpenProps} onOpenChange={(open) => {
        if (!open) {
          setSelectedCell(null);
        }
        onOpenChangeProps(open);
      }}>
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
        <ModalContent   className="max-h-[80vh] ">
          {(onClose) => (
            <>
              <ModalHeader className="">
                <div className="flex md:flex-row flex-col justify-between w-full gap-y-2">
                  <div className="text-lg md:text-2xl font-bold">
                    {selectedResult.instructor}
                  </div>
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
              <ModalBody className="overflow-y-auto">
                <div className="overflow-x-auto">
                  <Table
                    aria-label="Schedule table"
                    shadow="none"
                    removeWrapper
                    className="border-collapse border border-gray-300"
                  >
                    <TableHeader>
                      <TableColumn 
                        className="text-sm md:text-lg text-center w-1/8 border border-gray-300 sticky left-0 bg-white z-10"
                      >
                        시간/요일
                      </TableColumn>
                      {tableData.map((slot, index) => (
                        <TableColumn
                          key={index}
                          className="text-sm md:text-lg text-center w-1/8 border border-gray-300"
                        >
                          {`${slot.date.slice(5).replace("-", "/")}(${slot.weekday})`}
                        </TableColumn>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {tableData[0]?.schedule.map((schedule, timeIndex) => (
                        <TableRow
                          key={timeIndex}
                          className="text-center overflow-x-auto"
                        >
                          <TableCell 
                            className="text-center text-sm md:text-lg z-50 border border-gray-300 sticky left-0 bg-white z-10"
                          >
                            {schedule.time}
                          </TableCell>
                          {tableData.map((slot, dateIndex) => (
                            <TableCell
                              key={dateIndex}
                              className={`text-center ${getStatusColor(slot.schedule[timeIndex].status)} 
                                ${Array.isArray(selectedCell) && selectedCell.includes(`${timeIndex}-${dateIndex}`) ? "bg-[#CAD593]" : ""} 
                                ${slot.schedule[timeIndex].status === 0 ? "cursor-pointer" : "cursor-not-allowed"}
                                border border-gray-300`}
                              onClick={() =>
                                handleCellClick(
                                  `${timeIndex}-${dateIndex}`,
                                  slot.schedule[timeIndex].status,
                                  dateIndex,
                                  timeIndex
                                )
                              }
                            >
                              &nbsp;
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
                  onPress={() => {
                    if (selectedCell && selectedResult.slot_id) {
                      setSelectedCell(null);
                      onClose();
                    } else {
                      toast.error("예약할 시간을 선택해주세요.");
                    }
                  }}
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
