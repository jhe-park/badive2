"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TourTable({ member }) {
  const supabase = createClient();
  const [tours, setTours] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const getRequest = async () => {
    const { data, error } = await supabase
      .from("request")
      .select("*,tour_id(*)")
      .eq("user_id", member?.id);

    if (error) {
      console.log("Error fetching reservation:", error);
    } else {
      console.log("Tours fetched successfully:", data);
      setTours(data);
    }
  };

  const handleStatusChange = async (tour, newStatus) => {
    try {
      const { data, error } = await supabase
        .from("request")
        .update({ is_end: newStatus })
        .eq("id", tour.id);

      if (error) throw error;

      // 로컬 상태 업데이트
      setTours(
        tours.map((t) => (t.id === tour.id ? { ...t, is_end: newStatus } : t))
      );
    } catch (error) {
      console.error("상태 업데이트 중 오류:", error);
    }
  };

  const updateTourStatus = async (tour) => {
    const today = new Date();
    const tourDate = new Date(
      tour.tour_id.date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
    );

    // 날짜 비교를 위해 시간 제거
    today.setHours(0, 0, 0, 0);
    tourDate.setHours(0, 0, 0, 0);

    let newStatus = tour.is_end;

    if (tourDate.getTime() === today.getTime()) {
      newStatus = "투어중";
    } else if (tourDate < today) {
      newStatus = "투어종료";
    }

    if (newStatus !== tour.is_end) {
      await handleStatusChange(tour, newStatus);
    }
  };

  useEffect(() => {
    getRequest();
  }, [member]);

  // 새로운 useEffect 추가
  useEffect(() => {
    tours.forEach((tour) => {
      updateTourStatus(tour);
    });
  }, [tours]);

  return (
    <div className="w-full h-full flex flex-col gap-y-6 mb-24">
      <div className="text-2xl font-bold w-full text-center">
        다이빙투어내역
      </div>
      <Table
        classNames={{ wrapper: "p-0 " }}
        aria-label="Example static collection table"
        shadow="none"
      >
        <TableHeader>
          <TableColumn className="text-center w-1/4">투어명</TableColumn>
          <TableColumn className="text-center w-1/4">신청일</TableColumn>
          <TableColumn className="text-center w-1/4">투어일일</TableColumn>
          <TableColumn className="text-center w-1/4">상태</TableColumn>
        </TableHeader>
        <TableBody>
          {tours.map((tour) => (
            <TableRow key={tour.id}>
              <TableCell className="text-center whitespace-nowrap">
                {tour.tour_id.title}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {new Date(tour.created_at)
                  .toISOString()
                  .split("T")[0]
                  .replace(/-/g, "")}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                {tour.tour_id.date}
              </TableCell>
              <TableCell className="text-center whitespace-nowrap">
                <Select
                  color={
                    tour.is_end === "투어종료"
                      ? "danger"
                      : tour.is_end === "투어중"
                        ? "success"
                        : tour.is_end === "투어예정"
                          ? "primary"
                          : "default"
                  }
                  selectedKeys={[tour.is_end]}
                  onChange={(e) => handleStatusChange(tour, e.target.value)}
                >
                  <SelectItem
                    className="text-center text-red-500"
                    value="투어종료"
                    key="투어종료"
                  >
                    투어종료
                  </SelectItem>
                  <SelectItem
                    className="text-center text-green-500"
                    value="투어중"
                    key="투어중"
                  >
                    투어중
                  </SelectItem>
                  <SelectItem
                    className="text-center text-blue-500"
                    value="투어예정"
                    key="투어예정"
                  >
                    투어예정
                  </SelectItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>{" "}
    </div>
  );
}
