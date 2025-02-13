"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@heroui/react";

export default function ProgramTable() {
  return (
    <div className="w-full h-full">
        <div className="text-2xl font-bold w-full text-center">
            강습신청내역
        </div>
      <Table aria-label="Example static collection table" shadow="none">
        <TableHeader>
          <TableColumn className="text-center w-1/4">프로그램명</TableColumn>
          <TableColumn className="text-center w-1/4">강사</TableColumn>
          <TableColumn className="text-center w-1/4">날짜</TableColumn>
          <TableColumn className="text-center w-1/4">상태</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
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
          </TableRow>

        </TableBody>
      </Table>{" "}
    </div>
  );
}
