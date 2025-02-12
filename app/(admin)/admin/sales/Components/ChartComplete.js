"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Select, SelectItem, DateRangePicker, Button } from "@heroui/react";
import { createClient } from "@/utils/supabase/client";
import {parseDate} from "@internationalized/date";
import BarChart from "./BarChart";
import TotalSales from "./TotalSales";
import DetailSales from "./DetailSales";
import { MdEdit } from "react-icons/md";


export default function ChartComplete() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = new Date().toISOString().split('T')[0];
  const sixMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 6));
  sixMonthsAgo.setDate(1);
  const sixMonthsAgoFormatted = sixMonthsAgo.toISOString().split('T')[0];

  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <div className="w-full flex flex-row gap-4">
        <DateRangePicker
          isRequired
          className="w-full md:w-1/3"
          defaultValue={{
            start: parseDate(sixMonthsAgoFormatted),
            end: parseDate(today),
          }}
          label="기간"
        />
      </div>
      <div>
        <BarChart></BarChart>
      </div>
      {/* <div className="w-full h-full">
        <TotalSales></TotalSales>
      </div> */}
      <div className="w-full h-full mb-4">
        <DetailSales></DetailSales>
      </div>
      <div className="w-full h-full flex justify-end ">
        <Button startContent={<MdEdit />} variant="flat" className="mb-6" >
          매출수정하기
        </Button>
      </div>
    </div>
  );
}
