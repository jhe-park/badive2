import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
  Checkbox,
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
  isSelected,
  setIsSelected,
  getReservations,
  selectedProgram,
}) {
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedCellInfo, setSelectedCellInfo] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const { selectedResult, setSelectedResult } = useSelectedResult();
  const { isOpen, setIsOpen } = useModalOpen();
  const [data, setData] = useState([]);
  const supabase = createClient();
  
  // 드래그 선택을 위한 상태 추가
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCell, setDragStartCell] = useState(null);
  const [dragCurrentCell, setDragCurrentCell] = useState(null);
  
  console.log('selectedCell', selectedCell);
  console.log('selectedCells', selectedCells);
  console.log('data:', data)
  useEffect(() => {
    if (isOpenProps) {
      if (!selectedProgram) {
        toast.error("프로그램을 선택해주세요.");
        onOpenChangeProps(false);
        setIsSelected(false);
      }
    }
    setIsOpen(isOpenProps);
  }, [isOpenProps]);

  const getSchedule = async () => {
    try {
      const { data, error } = await supabase
        .from("timeslot")
        .select("*,program_id(*)")
        .eq("program_id", selectedProgram)
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

  // 드래그 시작 처리 함수
  const handleDragStart = (timeIndex, dateIndex, schedule) => {
    if (!multiSelectMode) return;
    
    setIsDragging(true);
    setDragStartCell({ timeIndex, dateIndex });
    setDragCurrentCell({ timeIndex, dateIndex });
    
    // 드래그 시작 셀 추가
    const key = `${timeIndex}-${dateIndex}`;
    const cellData = {
      key,
      dateIndex,
      timeIndex,
      schedule,
      slotId: schedule.id
    };
    
    setSelectedCells([cellData]);
  };
  
  // 드래그 중 처리 함수
  const handleDragOver = (timeIndex, dateIndex, schedule) => {
    if (!isDragging || !multiSelectMode) return;
    
    setDragCurrentCell({ timeIndex, dateIndex });
    
    // 선택 영역 계산
    const startTimeIndex = Math.min(dragStartCell.timeIndex, timeIndex);
    const endTimeIndex = Math.max(dragStartCell.timeIndex, timeIndex);
    const startDateIndex = Math.min(dragStartCell.dateIndex, dateIndex);
    const endDateIndex = Math.max(dragStartCell.dateIndex, dateIndex);
    
    // 새로운 선택 셀 배열 생성
    const newSelectedCells = [];
    
    for (let t = startTimeIndex; t <= endTimeIndex; t++) {
      for (let d = startDateIndex; d <= endDateIndex; d++) {
        if (tableData[d] && tableData[d].schedule[t]) {
          const key = `${t}-${d}`;
          const cellSchedule = tableData[d].schedule[t];
          
          newSelectedCells.push({
            key,
            dateIndex: d,
            timeIndex: t,
            schedule: cellSchedule,
            slotId: cellSchedule.id
          });
        }
      }
    }
    
    setSelectedCells(newSelectedCells);
  };
  
  // 드래그 종료 처리 함수
  const handleDragEnd = () => {
    if (!multiSelectMode) return;
    setIsDragging(false);
  };

  // 기존 handleCellClick 수정
  const handleCellClick = (key, status, dateIndex, timeIndex, schedule) => {
    console.log("timeIndex", timeIndex);
    console.log("dateIndex", dateIndex);
    console.log("schedule", schedule);
    
    if (multiSelectMode) {
      if (isDragging) return; // 드래그 중에는 클릭 처리 무시
      
      const cellData = {
        key,
        dateIndex,
        timeIndex,
        schedule,
        slotId: schedule.id
      };
      
      const alreadySelected = selectedCells.some(cell => cell.key === key);
      
      if (alreadySelected) {
        setSelectedCells(selectedCells.filter(cell => cell.key !== key));
      } else {
        setSelectedCells([...selectedCells, cellData]);
      }
    } else {
      setSelectedCell(key);
      setSelectedCellInfo(schedule);
      
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
          price: selectedSlot.program_id.price,
          totalPrice:
            selectedSlot.program_id.price * selectedResult.noParticipants,
        });
      }
    }
  };

  const toggleMultiSelectMode = () => {
    setMultiSelectMode(!multiSelectMode);
    if (!multiSelectMode) {
      setSelectedCell(null);
      setSelectedCellInfo(null);
    } else {
      setSelectedCells([]);
    }
  };

  const clearAllSelections = () => {
    setSelectedCells([]);
    setSelectedCell(null);
    setSelectedCellInfo(null);
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

  const handleMultiNotAvailable = async () => {
    if (selectedCells.length === 0) {
      toast.error("시간을 선택해주세요.");
      return;
    }

    try {
      const updatePromises = selectedCells.map(async (cell) => {
        const { error } = await supabase
          .from("timeslot")
          .update({ available: false })
          .eq("id", cell.schedule.id);

        if (error) {
          console.error("Error updating availability:", error);
          return { success: false, error };
        }

        const { error: reservationError } = await supabase
          .from("reservation")
          .insert({
            time_slot_id: cell.schedule.id,
            status: "예약불가",
            instructor_id: selectedInstructor.id,
          });

        if (reservationError) {
          console.error("Error inserting reservation:", reservationError);
          return { success: false, error: reservationError };
        }

        return { success: true };
      });

      const results = await Promise.all(updatePromises);
      const failures = results.filter(result => !result.success);

      if (failures.length > 0) {
        toast.error(`${failures.length}개 항목 처리 중 오류가 발생했습니다.`);
      } else {
        toast.success(`${selectedCells.length}개 항목이 예약불가로 수정되었습니다.`);
      }

      getSchedule();
      clearAllSelections();
    } catch (err) {
      console.error("예외 발생:", err);
      toast.error("수정 중 오류가 발생했습니다.");
    }
  };

  const handleMultiAvailable = async () => {
    if (selectedCells.length === 0) {
      toast.error("시간을 선택해주세요.");
      return;
    }

    try {
      const updatePromises = selectedCells.map(async (cell) => {
        const { error } = await supabase
          .from("timeslot")
          .update({ available: true })
          .eq("id", cell.schedule.id);

        if (error) {
          console.error("Error updating availability:", error);
          return { success: false, error };
        }

        const { error: reservationError } = await supabase
          .from("reservation")
          .delete()
          .eq("time_slot_id", cell.schedule.id);

        if (reservationError) {
          console.error("Error deleting reservation:", reservationError);
          return { success: false, error: reservationError };
        }

        return { success: true };
      });

      const results = await Promise.all(updatePromises);
      const failures = results.filter(result => !result.success);

      if (failures.length > 0) {
        toast.error(`${failures.length}개 항목 처리 중 오류가 발생했습니다.`);
      } else {
        toast.success(`${selectedCells.length}개 항목이 예약가능으로 수정되었습니다.`);
      }

      getSchedule();
      clearAllSelections();
    } catch (err) {
      console.error("예외 발생:", err);
      toast.error("수정 중 오류가 발생했습니다.");
    }
  };

  const handleNotAvailable = async () => {
    if (!selectedCell) {
      toast.error("시간을 선택해주세요.");
      return;
    }

    try {
      const { error } = await supabase
        .from("timeslot")
        .update({ available: false })
        .eq("id", selectedCellInfo.id);

      if (error) {
        toast.error("수정 중 오류가 발생했습니다.");
        console.error("Error updating availability:", error);
        return;
      }
      const { error: reservationError } = await supabase
        .from("reservation")
        .insert({
          time_slot_id: selectedCellInfo.id,
          status: "예약불가",
          instructor_id: selectedInstructor.id,
        });

      if (reservationError) {
        toast.error("예약 상태 변경 중 오류가 발생했습니다.");
        console.error("Error inserting reservation:", reservationError);
        return;
      }

      toast.success("예약불가로 수정되었습니다.");
      getSchedule(); // 테이블 데이터 새로고침
      clearAllSelections();
    } catch (err) {
      console.error("예외 발생:", err);
      toast.error("수정 중 오류가 발생했습니다.");
    }
  };

  const handleAvailable = async () => {
    if (!selectedCell) {
      toast.error("시간을 선택해주세요.");
      return;
    }

    try {
      const { error } = await supabase
        .from("timeslot")
        .update({ available: true })
        .eq("id", selectedCellInfo.id);

      if (error) {
          toast.error("수정 중 오류가 발생했습니다.");
        console.error("Error updating availability:", error);
        return;
      }
      const { error: reservationError } = await supabase
        .from("reservation")
        .delete()
        .eq("time_slot_id", selectedCellInfo.id);

      if (reservationError) {
        toast.error("예약 상태 변경 중 오류가 발생했습니다.");
        console.error("Error deleting reservation:", reservationError);
        return;
      }

      toast.success("예약가능으로 수정되었습니다.");
      getSchedule(); // 테이블 데이터 새로고침
      clearAllSelections();
    } catch (err) {
      console.error("예외 발생:", err);
      toast.error("수정 중 오류가 발생했습니다.");
    }
  };

  const handleOpenChange = (open) => {
    if (!open) {  // 모달이 닫힐 때
      getReservations();
    }
    onOpenChangeProps(open);
  };

  const isCellSelected = (key) => {
    if (multiSelectMode) {
      return selectedCells.some(cell => cell.key === key);
    } else {
      return selectedCell === key;
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    // 전역 마우스 업 이벤트 리스너 추가
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

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
      <Modal 
        isOpen={isOpenProps} 
        onOpenChange={handleOpenChange}
        size="full"
      >
        <ModalContent className="max-h-[80vh]">
          {(onClose) => {
            const handleClose = () => {
              console.log("handleClose");
              getReservations();
              onClose();
            };
            
            return (
              <>
                <ModalHeader className="">
                  <div className="flex md:flex-row flex-col justify-between w-full gap-y-2">
                    <div className="text-lg md:text-2xl font-bold">
                      {selectedResult.instructor}
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
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
                      <div className="flex items-center gap-2">
                        <Checkbox
                          isSelected={multiSelectMode}
                          onValueChange={toggleMultiSelectMode}
                        />
                        <label className="text-sm md:text-lg">다중 선택 모드</label>
                        {multiSelectMode && selectedCells.length > 0 && (
                          <Chip color="primary" className="ml-2">
                            {selectedCells.length}개 선택됨
                          </Chip>
                        )}
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
                                className={`text-center select-none
                                  ${getStatusColor(slot.schedule[timeIndex].status)}
                                  ${isCellSelected(`${timeIndex}-${dateIndex}`) 
                                    ? "border-5 border-primary" 
                                    : "border border-gray-300"}`}
                                onClick={() =>
                                  handleCellClick(
                                    `${timeIndex}-${dateIndex}`,
                                    slot.schedule[timeIndex].status,
                                    dateIndex,
                                    timeIndex,
                                    slot.schedule[timeIndex]
                                  )
                                }
                                onMouseDown={() => 
                                  handleDragStart(
                                    timeIndex, 
                                    dateIndex, 
                                    slot.schedule[timeIndex]
                                  )
                                }
                                onMouseOver={() => 
                                  handleDragOver(
                                    timeIndex, 
                                    dateIndex, 
                                    slot.schedule[timeIndex]
                                  )
                                }
                                onMouseUp={handleDragEnd}
                                data-id={slot.schedule[timeIndex].id}
                              >
                                {userReservations.map((reservation) => {
                                  if (
                                    reservation.time_slot_id.id ===
                                      slot.schedule[timeIndex].id &&
                                    reservation.status !== "예약불가"
                                  ) {
                                    return (
                                      <div
                                        className="flex flex-col justify-center items-center rounded-lg border-2 border-[#A9D6E5] p-2 my-2"
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
                  {multiSelectMode ? (
                    <>
                      <Button
                        color='danger'
                        className="w-full text-lg"
                        onPress={handleMultiNotAvailable}
                      >
                        선택한 {selectedCells.length}개 항목 예약불가로 수정
                      </Button>
                      <Button
                        color='success'
                        className="w-full text-white text-lg"
                        onPress={handleMultiAvailable}
                      >
                        선택한 {selectedCells.length}개 항목 예약가능으로 수정
                      </Button>
                      <Button
                        color='default'
                        className="w-full text-lg"
                        onPress={clearAllSelections}
                      >
                        선택 초기화
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color='danger'
                        className="w-full text-lg"
                        onPress={handleNotAvailable}
                      >
                        예약불가로 수정
                      </Button>
                      <Button
                        color='success'
                        className="w-full text-white text-lg"
                        onPress={handleAvailable}
                      >
                        예약가능으로 수정
                      </Button>
                    </>
                  )}
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}