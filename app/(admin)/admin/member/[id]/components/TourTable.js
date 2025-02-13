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
            다이빙투어내역
        </div>
      <Table aria-label="Example static collection table" shadow="none">
        <TableHeader>
          <TableColumn className="text-center w-1/4">투어명</TableColumn>
          <TableColumn className="text-center w-1/4">강사</TableColumn>
          <TableColumn className="text-center w-1/4">날짜</TableColumn>
          <TableColumn className="text-center w-1/4">상태</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell className="text-center">필리핀코론 수중 프로필</TableCell>
            <TableCell className="text-center">정은지,고송미강사</TableCell>
            <TableCell className="text-center">2024-01-01</TableCell>
            <TableCell className="text-center"><Button color='danger' variant="bordered">투어종료</Button></TableCell>
          </TableRow>
          <TableRow key="1">
            <TableCell className="text-center">필리핀코론 수중 프로필</TableCell>
            <TableCell className="text-center">정은지,고송미강사</TableCell>
            <TableCell className="text-center">2024-01-01</TableCell>
            <TableCell className="text-center"><Button color='success' variant="bordered">투어예정</Button></TableCell>
          </TableRow>
          <TableRow key="1">
            <TableCell className="text-center">필리핀코론 수중 프로필</TableCell>
            <TableCell className="text-center">정은지,고송미강사</TableCell>
            <TableCell className="text-center">2024-01-01</TableCell>
            <TableCell className="text-center"><Button color='warning' variant="bordered">투어중중</Button></TableCell>
          </TableRow>
        </TableBody>
      </Table>{" "}
    </div>
  );
}
