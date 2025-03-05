'use client'
import React, { useEffect, useCallback } from "react";
import { Input } from "@nextui-org/react";
import { debounce } from "lodash";
import { createClient } from '@/utils/supabase/client';
import { Spinner } from "@heroui/react";
// Supabase 클라이언트 초기화
const supabase = createClient('https://your-project.supabase.co', 'public-anon-key');

const CustomTable = ({ isLoading, setIsLoading, tourInput, setTourInput, selectedMonth, reservation }) => {
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
    try {
      // 먼저 해당 월의 데이터가 있는지 확인
      const { data: existingData } = await supabase
        .from('tour_input')
        .select('*')
        .eq('date', selectedMonth)
        .single();

      if (existingData) {
        // 데이터가 있으면 업데이트
        const { error } = await supabase
          .from('tour_input')
          .update({ amount: value })
          .eq('date', selectedMonth);
        
        if (error) throw error;
      } else {
        // 데이터가 없으면 새로 생성
        const { error } = await supabase
          .from('tour_input')
          .insert([{ date: selectedMonth, amount: value }]);
        
        if (error) throw error;
      }
    } catch (error) {
      console.error("Error handling tour input:", error);
    }
  };

  // debounce된 업데이트 함수 생성
  const debouncedUpdate = useCallback(
    debounce(async (value) => {
      await updateTourInput(value);
    }, 500),
    [selectedMonth] // selectedMonth가 변경될 때마다 함수 재생성
  );

  // Input의 onChange 핸들러 수정
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setTourInput(newValue);
    debouncedUpdate(newValue);
  };

  // selectedMonth가 변경될 때마다 해당 월의 데이터 가져오기
  useEffect(() => {
    const fetchTourInput = async () => {
      try {
        const { data, error } = await supabase
          .from('tour_input')
          .select('amount')
          .eq('date', selectedMonth)
          .single();
        
        if (error) throw error;
        if (data) {
          setTourInput(data.amount.toString());
        } else {
          setTourInput(''); // 데이터가 없으면 입력값 초기화
        }
      } catch (error) {
        console.error("Error fetching tour input:", error);
      }
    };

    fetchTourInput();
  }, [selectedMonth]);

  console.log("selectedMonth",selectedMonth)
  return (
    <div className="container mx-auto whitespace-nowrap overflow-x-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner label="로딩중" />
        </div>
      ) : (
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
          {/* <tr className="">
            <td className="border px-4 py-2 text-center font-bold bg-gray-100 font-bold">
              {selectedMonth}(전체)
            </td>
            <td className="border px-4 py-2 text-center ">다이빙투어</td>
            <td className="border px-4 py-2 text-center">-</td>
            <td className="border px-4 py-2 text-center font-bold">수동입력</td>
            <td className="border px-4 py-2 text-center font-bold">
              <Input
                value={tourInput}
                onChange={handleInputChange}
                classNames={{ wrapper: "text-center", input: "text-center" }}
                variant='solid'
                placeholder='금액 입력'
              />
            </td>
          </tr> */}
        </tbody>
        <tfoot>
          <tr className="bg-gray-200 font-bold">
            <td colSpan={4} className="border px-4 py-2 text-center">
              총 합계
            </td>
            <td className="border px-4 py-2 text-center">
              {(
                reservation.reduce((sum, curr) => sum + curr.amount, 0)
              ).toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
      )}
    </div>
  );
};

export default CustomTable;
