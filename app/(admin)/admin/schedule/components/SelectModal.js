import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
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

export default function SelectModal({
  isOpen: isOpenProps,
  onOpenChange: onOpenChangeProps,
  onClose: onCloseProps,
  userReservations,
  selectedInstructor,
}) {
  const [selectedCell, setSelectedCell] = useState(null);
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const { isOpen, setIsOpen } = useModalOpen();
  const [data, setData] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    setIsOpen(isOpenProps);
  }, [isOpenProps]);

  const getSchedule = async () => {
    try {
      const { data, error } = await supabase
        .from("timeslot")
        .select("*,program_id(*)")
        .eq("instructor_id", selectedResult.instructor_id)
        .in("date", selectedResult.date)
        .order("date", { ascending: true });

      if (error) {
        console.log("데이터 조회 에러:", error);
        return;
      }

      // console.log('조회된 데이터:', data);
      setData(data);
    } catch (err) {
      console.log("예외 발생:", err);
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
      return {
        date: date,
        weekday: weekday,
        schedule: groupedByDate[date].map((slot) => {
          const remainingSpots =
            slot.max_participants - slot.current_participants;
          const isReserved =
            Array.isArray(userReservations) &&
            userReservations.some(
              (reservation) =>
                reservation.time_slot_id === slot.id &&
                reservation.status !== "취소완료"
            );

          return {
            id: slot.id,
            time: `${slot.start_time}~${slot.end_time}`,
            status:
              !slot.available || remainingSpots < selectedResult.noParticipants
                ? 2
                : isReserved
                  ? 1
                  : 0,
            remainingSpots: remainingSpots,
            available: slot.available,
          };
        }),
      };
    });

    return formattedData;
  };

  useEffect(() => {
    if (selectedResult?.date?.length > 0) {
      getSchedule();
    }
  }, [selectedResult]);

  // data가 업데이트될 때마다 포맷된 데이터 생성
  const formattedSchedule = data.length > 0 ? formatData(data) : [];

  // dummyData 대신 formattedSchedule 사용
  const tableData = formattedSchedule;

  const handleCellClick = (key, status, dateIndex, timeIndex) => {
    if (status === 0) {
      setSelectedCell(key);
      // selectedResult에 slot_id, slot_start_time, slot_end_time, slot_date, price 추가
      const selectedSlot = data.find(
        (slot) =>
          slot.date === tableData[dateIndex].date &&
          `${slot.start_time}~${slot.end_time}` ===
            tableData[dateIndex].schedule[timeIndex].time
      );

      if (selectedSlot) {
        const selectedDate = tableData[dateIndex].date;
        const selectedWeekday = tableData[dateIndex].weekday;
        const formattedDate = `${selectedDate.slice(5).replace("-", "/")}(${selectedWeekday})`;

        setSelectedResult({
          ...selectedResult,
          slot_id: selectedSlot.id,
          slot_start_time: selectedSlot.start_time,
          slot_end_time: selectedSlot.end_time,
          slot_date: formattedDate,
          price: selectedSlot.program_id.price, // price 값 추가
          totalPrice:
            selectedSlot.program_id.price * selectedResult.noParticipants, // totalPrice 계산
        });
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
  console.log("tableData:", tableData);
  console.log("data:", data);
  console.log("userReservations:", userReservations);
  console.log("userReservations:", userReservations); // userReservations 배열 전체 출력

  if (selectedInstructor === null) {
    toast.error("강사를 선택 후 일정을 선택해주세요");
    return; // 모달을 열지 않도록 반환
  }

  return (
    <>
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
      <Modal isOpen={isOpenProps} onOpenChange={onOpenChangeProps} size="full">
        <ModalContent className="max-h-[80vh]">
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
                      <TableColumn className="text-sm md:text-lg text-center w-1/8 border border-gray-300">
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
                          <TableCell className="text-center text-sm md:text-lg z-50 border border-gray-300">
                            {schedule.time}
                          </TableCell>
                          {tableData.map((slot, dateIndex) => (
                            <TableCell
                              key={dateIndex}
                              className={`text-center} 
                                  ${selectedCell === `${timeIndex}-${dateIndex}` ? "bg-[#CAD593]" : ""} 
                                  border border-gray-300`}
                              onClick={() =>
                                handleCellClick(
                                  `${timeIndex}-${dateIndex}`,
                                  slot.schedule[timeIndex].status,
                                  dateIndex,
                                  timeIndex
                                )
                              }
                              data-id={slot.schedule[timeIndex].id}
                            >
                              {/* id 값을 화면에 표시하지 않음 */}
                              {userReservations.map((reservation) => {
                                if (
                                  reservation.time_slot_id.id ===
                                  slot.schedule[timeIndex].id
                                ) {
                                  return (
                                    <div
                                      className="flex flex-col justify-center items-center rounded-lg bg-[#A9D6E5] p-2"
                                      key={reservation.id}
                                    >
                                      <p className="truncate w-full text-center">
                                        {
                                          reservation?.time_slot_id?.program_id
                                            ?.title
                                        }
                                      </p>
                                      <p className="truncate w-full text-center">
                                        {reservation?.user_id?.email}
                                      </p>
                                    </div>
                                  );
                                }
                                return null;
                              })}
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
                      onClose();
                    } else {
                      alert("예약할 시간을 선택해주세요.");
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
