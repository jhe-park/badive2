"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function ProgramTable({ member,totalAmount,setTotalAmount }) {
  const supabase = createClient();
  const [programs, setPrograms] = useState([]);
  
  const getReservation = async () => {
    const { data, error } = await supabase
      .from("reservation")
      .select("*,time_slot_id(*,instructor_id(*),program_id(*))")
      .eq("user_id", member?.id);

    if (error) {
      console.log("Error fetching reservation:", error);
    } else {
      console.log("Reservation fetched successfully:", data);
      setPrograms(data);
      setTotalAmount(
        data.reduce((acc, curr) => 
          curr.status !== "취소완료" 
            ? acc + curr.time_slot_id.program_id.price * curr.participants 
            : acc
        , 0)
      );
    }
  };

  useEffect(() => {
    getReservation();
  }, [member]);

  const isRefundable = (date) => {
    const programDate = new Date(date);
    const today = new Date();

    // 시간을 00:00:00으로 설정하여 날짜만 비교
    programDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    // 프로그램 날짜가 오늘로부터 하루 이상 남았는지 확인
    const diffTime = programDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 1;
  };

  console.log("programs:", programs);
  const handleConfirmRequest = async (program) => {
    //날짜 계산하기
    // 프로그램 실행 날짜와 현재 날짜 가져오기
    const programDate = new Date(program.time_slot_id.date);
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
    let refundAmount =
      program.time_slot_id.program_id.price *
      program.participants;

    if (diffDays <= 7) {
      // 7일 이내: 100% 환불
      refundAmount = refundAmount;
    } else {
      // 7일 초과: 100% 환불
      console.log("100% 환불");
    }
    console.log("refundAmount:", refundAmount);

    const { data, error } = await supabase
      .from("reservation")
      .update({ status: "취소완료" })
      .eq("id", program.id);

    if (error) {
      toast.error("프로그램 취소에 실패했습니다.");
    } else {
      const { data: timeSlotData, error: timeSlotError } = await supabase
        .from("timeslot")
        .update({
          current_participants:
            program.time_slot_id.current_participants -
            program.participants,
        })
        .eq("id", program.time_slot_id.id);

      if (timeSlotError) {
        toast.error("참가자 수 업데이트에 실패했습니다.");
        return;
      }

      // 토스페이먼츠 결제 취소 요청
      const secretKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_SECRET_KEY;

      const encryptedSecretKey =
        "Basic " + Buffer.from(secretKey + ":").toString("base64");
      const url = `https://api.tosspayments.com/v1/payments/${program.payment_key}/cancel`;
      const paymentResponse = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          cancelReason: "사용자 예약 취소",
          cancelAmount: refundAmount,
        }),
      });

      if (!paymentResponse.ok) {
        console.log("결제 취소 실패:", paymentResponse);
      }

      toast.success("프로그램 취소가 신청 완료되었습니다.");
      getReservation();
    }
  };

  return (
    <div className="w-full h-full gap-y-6 flex flex-col">
      <ToastContainer
      position='top-center'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      />
      <div className="text-2xl font-bold w-full text-center">강습신청내역</div>
      <Table
        classNames={{ wrapper: "p-0" }}
        aria-label="Example static collection table whitespace-nowrap overflow-x-auto"
        shadow="none"
      >
        <TableHeader>
          <TableColumn className="text-center w-1/4">프로그램명</TableColumn>
          <TableColumn className="text-center w-1/4">강사</TableColumn>
          <TableColumn className="text-center w-1/4">날짜</TableColumn>
          <TableColumn className="text-center w-1/4">상태태</TableColumn>
          <TableColumn className="text-center w-1/4">환불</TableColumn>
        </TableHeader>
        <TableBody className="">
          {programs.map((program) => (
            <TableRow key={program.id}>
              <TableCell className="text-center whitespace-nowrap">
                {program.time_slot_id.program_id.title}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {program.time_slot_id.instructor_id.name}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {program.time_slot_id.date}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {program.status}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {program.status === "예약확정" && (
                  <Button
                  color={
                    isRefundable(program.time_slot_id.date)
                      ? "success"
                      : "danger"
                  }
                  variant="bordered"
                  onPress={() => handleConfirmRequest(program)}
                  isDisabled={!isRefundable(program.time_slot_id.date)}
                >
                  {isRefundable(program.time_slot_id.date)
                    ? "환불 가능"
                    : "환불 불가"}
                </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {/* <TableRow key="1">
            <TableCell className="text-center">스쿠버다이빙</TableCell>
            <TableCell className="text-center">홍길동</TableCell>
            <TableCell className="text-center">2024-01-01</TableCell>
            <TableCell className="text-center"><Button color='danger' variant="bordered">환불 불가</Button></TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell className="text-center">스쿠버다이빙</TableCell>
            <TableCell className="text-center">홍길동</TableCell>
            <TableCell className="text-center">2024-01-01</TableCell>
            <TableCell className="text-center"><Button color='danger' variant="bordered">환불 불가</Button></TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell className="text-center">스쿠버다이빙</TableCell>
            <TableCell className="text-center">홍길동</TableCell>
            <TableCell className="text-center">2024-01-01</TableCell>
            <TableCell className="text-center"><Button color='success' variant="bordered">환불 가능</Button></TableCell>
          </TableRow> */}
        </TableBody>
      </Table>{" "}
    </div>
  );
}
