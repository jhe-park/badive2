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

export default function ProgramTable({ member }) {
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
    }
  };

  useEffect(() => {
    getReservation();
  }, [member]);
  console.log("programs:", programs);

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

  return (
    <div className="w-full h-full gap-y-6 flex flex-col">
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
          <TableColumn className="text-center w-1/4">상태</TableColumn>
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
                <Button
                  color={
                    isRefundable(program.time_slot_id.date)
                      ? "success"
                      : "danger"
                  }
                  variant="bordered"
                  isDisabled={!isRefundable(program.time_slot_id.date)}
                >
                  {isRefundable(program.time_slot_id.date)
                    ? "환불 가능"
                    : "환불 불가"}
                </Button>
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
