"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Pagination,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Select,
  SelectItem,
  Divider,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";
import CellWrapper from "./cell-wrapper";
import { useEffect } from "react";
import useModalOpen from "@/app/store/useModalOpen";
import { ToastContainer, toast } from "react-toastify";
export default function ProgramTable({ profile }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isCancelOpen, setIsOpen: setIsCancelOpen } = useModalOpen();
  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onOpenChange: onDetailOpenChange,
  } = useDisclosure();

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchFilter, setSearchFilter] = useState("제목");
  const [searchValue, setSearchValue] = useState("");
  const supabase = createClient();
  const [program, setProgram] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handleGetProgram = async () => {
    let query = supabase
      .from("reservation")
      .select("*,time_slot_id(*, program_id(*), instructor_id(*))", {
        count: "exact",
      })
      .eq("user_id", profile.id)
      .not("time_slot_id", "is", null)
      .not("time_slot_id.program_id", "is", null)
      .not("time_slot_id.instructor_id", "is", null)
      .order("created_at", { ascending: false })
      .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

    if (searchValue) {
      switch (searchFilter) {
        case "제목":
          query = query.ilike(
            "time_slot_id.program_id.title",
            `%${searchValue}%`
          );
          break;
        case "장소":
          query = query.ilike(
            "time_slot_id.program_id.region",
            `%${searchValue}%`
          );
          break;
        case "강사":
          query = query.ilike(
            "time_slot_id.instructor_id.name",
            `%${searchValue}%`
          );
          break;
        case "상태":
          query = query.ilike("status", `%${searchValue}%`);
          break;
      }
    }

    const { data, count, error } = await query;
    if (error) {
      console.error("Error fetching programs:", error);
      return;
    }
    setProgram(data);
    setTotalPage(Math.ceil(count / pageSize));
  };

  useEffect(() => {
    handleGetProgram();
  }, [searchValue, searchFilter, currentPage]);

  const handleDetailOpen = (program) => {
    setSelectedProgram(program);
    onDetailOpen();
  };

  const handleCancel = () => {
    onOpen();
    onDetailOpen();
  };

  const handleConfirmClose = (onClose) => {
    setSelectedProgram(null);
    onClose();
    onDetailOpenChange();
    setIsCancelOpen(false);
  };

  const handleConfirmRequest = async (onClose) => {

//날짜 계산하기
      // 프로그램 실행 날짜와 현재 날짜 가져오기
      const programDate = new Date(selectedProgram.time_slot_id.date);
      const today = new Date();
      
      // 날짜 차이 계산 (밀리초를 일로 변환)
      const diffTime = programDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // 지난 프로그램인 경우
      if (diffDays < 0) {
        toast.error("지난 프로그램은 환불이 불가능합니다.");
        return;
      }

      // 1일 이내 취소
      if (diffDays <= 1) {
        toast.error("교육 시작일 기준 1일 이내 취소는 환불이 불가능합니다.");
        return;
      }

      // 환불 금액 계산
      let refundAmount = selectedProgram.time_slot_id.program_id.price*selectedProgram.participants;
      
      if (diffDays <= 7) {
        // 7일 이내: 100% 환불
        refundAmount = refundAmount;
      } else {
        // 7일 초과: 100% 환불
        console.log("100% 환불")
      }
      console.log("refundAmount:", refundAmount);

    onClose();
    onDetailOpenChange();
    setSelectedProgram(null);
    setIsCancelOpen(false);

    const { data, error } = await supabase
      .from("reservation")
      .update({ status: "취소완료" })
      .eq("id", selectedProgram.id);

    if (error) {
      toast.error("프로그램 취소에 실패했습니다.");
    } else {
      const { data: timeSlotData, error: timeSlotError } = await supabase
        .from("timeslot")
        .update({
          current_participants:
            selectedProgram.time_slot_id.current_participants -
            selectedProgram.participants,
        })
        .eq("id", selectedProgram.time_slot_id.id);

      if (timeSlotError) {
        toast.error("참가자 수 업데이트에 실패했습니다.");
        return;
      }

      // 토스페이먼츠 결제 취소 요청
      const secretKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_SECRET_KEY;

      

      const encryptedSecretKey =
      'Basic ' + Buffer.from(secretKey + ':').toString('base64');
      const url = `https://api.tosspayments.com/v1/payments/${selectedProgram.payment_key}/cancel`;
      const paymentResponse = await fetch(
        url,
        {

          method: "POST",
          headers: {
            Authorization: encryptedSecretKey,
            "Content-Type": "application/json",
            
          },

          body: JSON.stringify({
            cancelReason: "사용자 예약 취소",
            cancelAmount: refundAmount,
          }),
        }
      );

      if (!paymentResponse.ok) {
        console.log("결제 취소 실패:", paymentResponse);
      }

      toast.success("프로그램 취소가 신청 완료되었습니다.");
      handleGetProgram();
    }
  };
  console.log("currentPage:", currentPage);
  console.log()

  return (
    <div className="w-full flex-col justify-center items-center space-y-5 h-full">
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

      <div className="text-2xl font-bold w-full justify-center items-center text-center">
        프로그램 예약 조회
      </div>
      <Divider className="w-full bg-black h-0.5 my-5"></Divider>
      <div className="w-full flex flex-col justify-center items-center space-y-5">
        <div className="w-full flex justify-end items-center gap-2">
          <Select
            variant="bordered"
            className="w-1/2 md:w-[10%]"
            selectedKeys={[searchFilter]}
            onChange={(e) => setSearchFilter(e.target.value)}
          >
            <SelectItem key="제목" value="제목">
              제목
            </SelectItem>
            <SelectItem key="장소" value="장소">
              장소
            </SelectItem>
            <SelectItem key="강사" value="강사">
              강사
            </SelectItem>
            <SelectItem key="상태" value="상태">
              상태
            </SelectItem>
          </Select>
          <Input
            variant="bordered"
            placeholder="검색"
            className="w-1/2 md:w-1/4 text-gray-500"
            startContent={<FaSearch></FaSearch>}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          ></Input>
        </div>
        <Card className="w-full " shadow="none">
          <CardBody className="space-y-2">
            <Table removeWrapper aria-label="Example static collection table">
              <TableHeader className="border-2 border-gray-200">
                <TableColumn className="w-1/7 text-center">번호</TableColumn>
                <TableColumn className="w-1/7 text-center">이미지</TableColumn>
                <TableColumn className="w-1/7 text-center">제목</TableColumn>
                <TableColumn className="w-1/7 text-center">일시</TableColumn>

                <TableColumn className="w-1/7 text-center">장소</TableColumn>
                <TableColumn className="w-1/7 text-center">강사</TableColumn>
                <TableColumn className="w-1/7 text-center">상태</TableColumn>
                <TableColumn className="w-1/7 text-center">비고</TableColumn>
              </TableHeader>
              <TableBody>
                {program.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{item.id}</TableCell>

                    <TableCell className="text-center flex justify-center items-center">
                      <div className="w-12 h-12 md:w-24 md:h-24 relative">
                        <Image
                          alt="program"
                          src={item?.time_slot_id?.program_id?.images || ""}
                          fill
                        ></Image>
                      </div>
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item?.time_slot_id?.program_id?.title}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item?.time_slot_id?.date+" "+item?.time_slot_id?.start_time}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      {item?.time_slot_id?.program_id?.region}
                    </TableCell>

                    <TableCell className="text-center whitespace-nowrap">
                      {item?.time_slot_id?.instructor_id?.name}
                    </TableCell>

                    <TableCell className="text-center whitespace-nowrap">
                      {item?.status}
                    </TableCell>
                    <TableCell className="text-center whitespace-nowrap">
                      <Button
                        color="primary"
                        onPress={() => {
                          handleDetailOpen(item);
                          setIsCancelOpen(true);
                        }}
                      >
                        자세히보기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
        <div className="w-full flex justify-center items-center">
          <Pagination
            // initialPage={1}
            onChange={(page) => setCurrentPage(page)}
            page={currentPage}
            total={totalPage}
          />
        </div>
      </div>

      <Modal size="4xl" isOpen={isDetailOpen} onOpenChange={onDetailOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl font-bold flex justify-center">
                프로그램 예약 조회
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center gap-y-4">
                  <div className="w-96 h-96 relative">
                    <Image
                      src={
                        selectedProgram?.time_slot_id?.program_id?.images || ""
                      }
                      alt="program"
                      fill
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex justify-start items-center gap-x-2 w-full">
                      <span className="font-bold w-24 text-end">
                        프로그램명 |
                      </span>
                      <span>
                        {selectedProgram?.time_slot_id?.program_id?.title}
                      </span>
                    </div>
                    <div className="flex justify-start items-center gap-x-2 w-full">
                      <span className="font-bold w-24 text-end">장소 |</span>
                      <span>
                        {selectedProgram?.time_slot_id?.program_id?.region}
                      </span>
                    </div>
                    <div className="flex justify-start items-center gap-x-2 w-full">
                      <span className="font-bold w-24 text-end">강사 |</span>
                      <span>
                        {selectedProgram?.time_slot_id?.instructor_id?.name}
                      </span>
                    </div>
                    <div className="flex justify-start items-center gap-x-2 w-full">
                      <span className="font-bold w-24 text-end">인원 |</span>
                      <span>{selectedProgram?.participants}명</span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="w-full flex justify-between items-center">
                  <div className="text-gray-500 text-sm">
                    ＊ 수영장은 강사님과 별도로 협의 후 확정됩니다.
                  </div>
                  <div className="flex gap-x-2">
                    <Button
                      variant="flat"
                      onPress={() => {
                        onClose();
                        setIsCancelOpen(false);
                      }}
                    >
                      닫기
                    </Button>

                    <Button
                      isDisabled={selectedProgram.status === "취소완료"}
                      color="primary"
                      onPress={() => {
                        onOpen();
                        handleCancel();
                      }}
                    >
                      예약취소
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="flex flex-col justify-center items-center gap-y-4 py-6">
                <p>예약을 취소하시겠습니까?</p>
                <p>
                  (환불금액은 환불규정에 따라 환불이 진행됩니다. 환불 시 2-3일
                  이내에 환불이 완료됩니다.
                </p>
                <p>카드 ·현금 결제에 따라 환불 일시가 변경될 수 있습니다.)</p>
                <p>
                  예약취소 시 철회는 불가하며, 해당 프로그램을 재 예약하셔야
                  합니다.
                </p>
              </ModalBody>
              <ModalFooter>
                <div className="w-full flex flex-row justify-center items-center gap-x-4">
                  <Button
                    variant="flat"
                    onPress={() => {
                      handleConfirmClose(onClose);
                    }}
                    className="w-1/3"
                  >
                    취소
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleConfirmRequest(onClose);
                    }}
                    className="w-1/3"
                  >
                    예약취소
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
