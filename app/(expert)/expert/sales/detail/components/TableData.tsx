"use client";
import { createClient } from "@/utils/supabase/client";
import { Button, Select, SelectItem } from "@heroui/react";
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import * as XLSX from "xlsx";
import useExpertStore from "../../../store/useExpertStore";
import CustomTable from "./CustomTable";

export default function TableData() {
  // 월 목록 생성 함수
  const getLastSixMonths = () => {
    const months = [];
    const today = new Date();

    for (let i = 0; i < 6; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      months.push(`${year}-${month}`);
    }

    return months;
  };

  const monthList = getLastSixMonths();
  const supabase = createClient();
  const [selectedMonth, setSelectedMonth] = useState(monthList[0]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [programs, setPrograms] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [reservation, setReservation] = useState([]);
  const [tourInput, setTourInput] = useState(0);
  const {expertInformation} = useExpertStore();
  const [isLoading, setIsLoading] = useState(true);






  const programList = [
    "스쿠버다이빙",
    "프리다이빙",
    "머메이드",
    "언더워터",
    "체험다이빙",
    "다이빙투어",
  ];

  const getPrograms = async () => {
    const { data, error } = await supabase.from("program").select("*");
    if (error) {
      console.log("Error fetching programs:", error);
    } else {
      setPrograms(data);
    }
  };
  useEffect(() => {
    getPrograms();
  }, []);

  const getReservation = async () => {
    let query = supabase
      .from("reservation")
      .select("*,time_slot_id(*,instructor_id(*),program_id(*))")
      .eq("status", "예약확정")
      .eq("instructor_id", expertInformation?.id);

    if (selectedMonth) {
      // selectedMonth는 'YYYY-MM' 형식이므로, 해당 월의 시작과 끝 날짜를 계산
      const startDate = `${selectedMonth}-01`;
      const endDate = new Date(
        selectedMonth.split("-")[0],
        selectedMonth.split("-")[1],
        0
      )
        .toISOString()
        .split("T")[0];

      query = query.gte("created_at", startDate).lte("created_at", endDate);
    }
    if (selectedProgram) {
      query = query
        .eq("time_slot_id.program_id.category", selectedProgram)
    }
    if (selectedInstructor) {
      query = query.eq("instructor_id", selectedInstructor);
    }

    let { data, error } = await query;

    if (selectedProgram) {
      data = data.filter(item => 
        item.time_slot_id && 
        item.time_slot_id.program_id !== null
      );
    }

    if (error) {
      console.log("Error fetching reservation:", error);
    } else {
      setReservation(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getReservation();
  }, [selectedMonth, selectedProgram, selectedInstructor, expertInformation]);
  console.log("selectedInstructor:", selectedInstructor);
  console.log("reservation:", reservation);
  console.log("selectedProgram:", selectedProgram);

  const getInstructors = async () => {
    const { data, error } = await supabase
      .from("instructor")
      .select("*")
      .eq("available", true);
    if (error) {
      console.log("Error fetching instructors:", error);
    } else {
      setInstructors(data);
    }
  };
  useEffect(() => {
    getInstructors();
  }, []);
  
  const downloadExcel = () => {
    const worksheetData = reservation.map((curr) => ({
      날짜: curr.created_at.split("T")[0],
      프로그램: curr.time_slot_id.program_id.category,
      강사: curr.time_slot_id.instructor_id.name,
      결제내역: curr.pay_type,
      금액: curr.amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reservations");

    // 금액 합계 계산
    const totalAmount = reservation.reduce((sum, curr) => sum + curr.amount, 0);

    // D열에 "합계"와 E열에 합계 금액 추가
    const totalRow = { 날짜: "", 프로그램: "", 강사: "", 결제내역: "합계", 금액: totalAmount };
    XLSX.utils.sheet_add_json(worksheet, [totalRow], { skipHeader: true, origin: -1 });

    // 현재 날짜와 시간 가져오기
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    const formattedTime = now.toTimeString().split(' ')[0].replace(/:/g, '');

    // 파일명 생성
    const fileName = `reservations_${selectedMonth}_${selectedProgram || 'AllPrograms'}_${selectedInstructor || 'AllInstructors'}_${formattedDate}_${formattedTime}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-row justify-start w-full md:w-1/5">
        <Button
          className="w-full"
          color="primary"
          endContent={<MdDownload className="text-lg" />}
          onClick={downloadExcel}
        >
          엑셀로 다운로드 받기
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <Select
          selectedKeys={[selectedMonth]}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full md:w-1/3"
          label="년월"
        >
          {monthList.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </Select>
        
      </div>
      <div>
        <CustomTable isLoading={isLoading} setIsLoading={setIsLoading} tourInput={tourInput} setTourInput={setTourInput} selectedMonth={selectedMonth} reservation={reservation}></CustomTable>
      </div>
      {/* <div className="w-full h-full flex justify-end ">
        <Button startContent={<MdEdit />} variant="flat" className="mb-6">
          매출수정하기
        </Button>
      </div> */}
    </div>
  );
}
