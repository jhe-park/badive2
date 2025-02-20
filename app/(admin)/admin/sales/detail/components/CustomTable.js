'use client'
import React, { useEffect, useCallback } from "react";
import { Input } from "@nextui-org/react";
import { debounce } from "lodash";
import { createClient } from '@/utils/supabase/client';

// Supabase 클라이언트 초기화
const supabase = createClient('https://your-project.supabase.co', 'public-anon-key');

const CustomTable = ({ tourInput, setTourInput, selectedMonth, reservation }) => {
  // 날짜별로 데이터를 그룹핑
  const groupedData = reservation.reduce((acc, curr) => {
    const date = curr.created_at.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      name: curr.time_slot_id.program_id.category,
      instructor: curr.time_slot_id.instructor_id.name,
      payment: curr.pay_type,
      amount: curr.amount.toLocaleString(), // 금액을 천 단위로 포맷
    });
    return acc;
  }, {});

  // 테이블에 표시할 데이터 형식으로 변환
  const data = Object.entries(groupedData).map(([date, items]) => ({
    date,
    items,
  }));

  // Supabase에 tourInput 업데이트 함수
  const updateTourInput = async (value) => {
    const { error } = await supabase
      .from('tour_input')
      .update({ amount:value })
      .eq('date', selectedMonth); // 적절한 조건으로 변경하세요

    if (error) {
      console.log("Error updating tour input:", error);
    }
  };

  // debounce를 사용하여 입력 변경 시 Supabase 업데이트
  const debouncedUpdateTourInput = useCallback(
    debounce((value) => {
      updateTourInput(value);
    }, 300), // 300ms 지연
    []
  );

  // tourInput이 변경될 때마다 debouncedUpdateTourInput 호출
  useEffect(() => {
    debouncedUpdateTourInput(tourInput);
  }, [tourInput, debouncedUpdateTourInput]);

  return (
    <div className="container mx-auto whitespace-nowrap overflow-x-auto">
      <table className="w-full border border-gray-300 text-left rounded-2xl ">
        <thead>
          <tr className="bg-gray-200 rounded-t-2xl">
            <th className="border px-4 py-2 text-center">날짜</th>
            <th className="border px-4 py-2 text-center">프로그램</th>
            <th className="border px-4 py-2 text-center">강사</th>
            <th className="border px-4 py-2 text-center">결제내역</th>
            <th className="border px-4 py-2 text-center">금액</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, entryIndex) => (
            <React.Fragment key={entryIndex}>
              {entry.items.map((item, itemIndex) => (
                <tr key={`${entryIndex}-${itemIndex}`}>
                  {itemIndex === 0 ? (
                    <td
                      rowSpan={entry.items.length}
                      className="border px-4 py-2 text-center font-bold bg-gray-100"
                    >
                      {entry.date}
                    </td>
                  ) : null}
                  <td className="border px-4 py-2 text-center">{item.name}</td>
                  <td className="border px-4 py-2 text-center">{item.instructor}</td>
                  <td className="border px-4 py-2 text-center font-bold">{item.payment}</td>
                  <td className="border px-4 py-2 text-center font-bold">{item.amount}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
          <tr className="">
            <td className="border px-4 py-2 text-center font-bold bg-gray-100 font-bold">
              {selectedMonth}(전체)
            </td>
            <td className="border px-4 py-2 text-center ">다이빙투어</td>
            <td className="border px-4 py-2 text-center">-</td>
            <td className="border px-4 py-2 text-center font-bold">수동입력</td>
            <td className="border px-4 py-2 text-center font-bold">
              <Input
                value={tourInput}
                onChange={(e) => setTourInput(e.target.value)}
                classNames={{ wrapper: "text-center", input: "text-center" }}
                variant='solid'
                placeholder='금액 입력'
              />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="bg-gray-200 font-bold">
            <td colSpan={4} className="border px-4 py-2 text-center">
              총 합계
            </td>
            <td className="border px-4 py-2 text-center">
              {(
                reservation.reduce((sum, curr) => sum + curr.amount, 0) +
                (parseFloat(tourInput) || 0) // tourInput을 숫자로 변환하여 합산
              ).toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CustomTable;
