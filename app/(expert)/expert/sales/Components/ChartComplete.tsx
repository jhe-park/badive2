'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { Select, SelectItem, DateRangePicker, Button } from '@heroui/react';
import { createClient } from '@/utils/supabase/client';
import { parseDate } from '@internationalized/date';
import BarChart from './BarChart';
import TotalSales from './TotalSales';
import DetailSales from './DetailSales';
import { MdEdit } from 'react-icons/md';
import useExpertStore from '../../store/useExpertStore';
export default function ChartComplete() {
  // 현재 날짜 계산
  const now = new Date();
  const currentYear = now.getFullYear().toString();
  const currentMonth = (now.getMonth() + 1).toString();

  // 6개월 전 날짜 계산
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 5);
  const sixMonthsAgoYear = sixMonthsAgo.getFullYear().toString();
  const sixMonthsAgoMonth = (sixMonthsAgo.getMonth() + 1).toString();

  const [startYear, setStartYear] = useState(sixMonthsAgoYear);
  const [startMonth, setStartMonth] = useState(sixMonthsAgoMonth);
  const [endYear, setEndYear] = useState(currentYear);
  const [endMonth, setEndMonth] = useState(currentMonth);
  const [reservations, setReservations] = useState([]);
  const [detailSales, setDetailSales] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [tourInput, setTourInput] = useState(0);
  const { expertInformation } = useExpertStore();
  const programList = ['스쿠버다이빙', '프리다이빙', '머메이드', '언더워터', '체험다이빙'];
  const supabase = createClient();
  console.log('expertInformation:', expertInformation);
  const getReservations = async () => {
    const startDate = new Date(parseInt(startYear), parseInt(startMonth) - 1, 1).toISOString();
    const endDate = new Date(parseInt(endYear), parseInt(endMonth), 0, 23, 59, 59, 999).toISOString();

    const { data, error } = await supabase
      .from('reservation')
      .select('*,time_slot_id(*,program_id(*))')
      .eq('status', '예약확정')
      .eq('instructor_id', expertInformation?.id)
      .gte('created_at', startDate)
      .lte('created_at', endDate);

    if (error) {
      console.log('Error fetching reservations:', error);
    } else {
      setReservations(data);

      // 카테고리별 매출 계산
      const salesByCategory = programList.map(category => {
        const filteredReservations = data.filter(reservation => reservation.time_slot_id.program_id.category === category);

        const totalSales = filteredReservations.reduce((sum, reservation) => sum + (reservation.amount || 0), 0);

        return {
          key: category,
          name: category,
          sales: totalSales,
        };
      });

      setDetailSales(salesByCategory);

      // 월별 매출 계산 추가
      const monthlySalesData = {};

      // 시작 날짜부터 종료 날짜까지의 모든 월을 초기화
      let currentDate = new Date(parseInt(startYear), parseInt(startMonth) - 1);
      const endDateObj = new Date(parseInt(endYear), parseInt(endMonth) - 1);

      while (currentDate <= endDateObj) {
        const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
        monthlySalesData[yearMonth] = 0;
        currentDate.setMonth(currentDate.getMonth() + 1);
      }

      // 각 예약의 매출을 해당 월에 더하기
      data.forEach(reservation => {
        const reservationDate = new Date(reservation.created_at);
        const yearMonth = `${reservationDate.getFullYear()}-${String(reservationDate.getMonth() + 1).padStart(2, '0')}`;
        monthlySalesData[yearMonth] += reservation.amount || 0;
      });

      // monthlySales 형식에 맞게 변환
      const formattedMonthlySales = Object.entries(monthlySalesData).map(([yearMonth, sales]) => ({
        key: yearMonth,
        name: yearMonth,
        sales: sales,
      }));

      setMonthlySales(formattedMonthlySales);
    }
  };
  useEffect(() => {
    getReservations();
  }, [startYear, startMonth, endYear, endMonth, expertInformation]);
  console.log('reservations:', reservations);
  console.log('detailSales:', detailSales);
  console.log('monthlySales:', monthlySales);

  const getTourInput = async () => {
    let totalAmount = 0;
    let currentDate = new Date(parseInt(startYear), parseInt(startMonth) - 1);
    const endDateObj = new Date(parseInt(endYear), parseInt(endMonth) - 1);

    while (currentDate <= endDateObj) {
      const yearMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

      const { data, error } = await supabase.from('tour_input').select('amount').eq('date', yearMonth).single();

      if (error) {
        console.log(`Error fetching tour input for ${yearMonth}:`, error);
      } else if (data) {
        totalAmount += data.amount || 0;

        // monthlySales의 해당 월의 sales 값에 tour_input의 amount 값을 더하기
        setMonthlySales(prevMonthlySales =>
          prevMonthlySales.map(monthlySale =>
            monthlySale.name === yearMonth ? { ...monthlySale, sales: monthlySale.sales + (data.amount || 0) } : monthlySale,
          ),
        );
      }

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    setTourInput(totalAmount);
    setDetailSales(prevDetailSales => {
      const existingKeys = new Set(prevDetailSales.map(item => item.key));
      let uniqueKey = '다이빙투어';
      let counter = 1;

      // 고유한 키 생성
      while (existingKeys.has(uniqueKey)) {
        uniqueKey = `다이빙투어_${counter}`;
        counter++;
      }

      return [...prevDetailSales, { key: uniqueKey, name: '다이빙투어', sales: totalAmount }];
    });
  };
  // useEffect(() => {
  //   getTourInput();
  // }, [startYear, startMonth, endYear, endMonth]);
  console.log('tourInput:', tourInput);
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <Select label="시작년도" selectedKeys={[startYear]} onChange={e => setStartYear(e.target.value)}>
          <SelectItem key="2024" value="2024">
            2024년
          </SelectItem>
          <SelectItem key="2025" value="2025">
            2025년
          </SelectItem>
          <SelectItem key="2026" value="2026">
            2026년
          </SelectItem>
        </Select>
        <Select label="시작월" selectedKeys={[startMonth]} onChange={e => setStartMonth(e.target.value)}>
          <SelectItem key="1" value="1">
            1월
          </SelectItem>
          <SelectItem key="2" value="2">
            2월
          </SelectItem>
          <SelectItem key="3" value="3">
            3월
          </SelectItem>
          <SelectItem key="4" value="4">
            4월
          </SelectItem>
          <SelectItem key="5" value="5">
            5월
          </SelectItem>
          <SelectItem key="6" value="6">
            6월
          </SelectItem>
          <SelectItem key="7" value="7">
            7월
          </SelectItem>
          <SelectItem key="8" value="8">
            8월
          </SelectItem>
          <SelectItem key="9" value="9">
            9월
          </SelectItem>
          <SelectItem key="10" value="10">
            10월
          </SelectItem>
          <SelectItem key="11" value="11">
            11월
          </SelectItem>
          <SelectItem key="12" value="12">
            12월
          </SelectItem>
        </Select>
        <Select label="종료년도" selectedKeys={[endYear]} onChange={e => setEndYear(e.target.value)}>
          <SelectItem key="2024" value="2024">
            2024년
          </SelectItem>
          <SelectItem key="2025" value="2025">
            2025년
          </SelectItem>
          <SelectItem key="2026" value="2026">
            2026년
          </SelectItem>
        </Select>
        <Select label="종료월" selectedKeys={[endMonth]} onChange={e => setEndMonth(e.target.value)}>
          <SelectItem key="1" value="1">
            1월
          </SelectItem>
          <SelectItem key="2" value="2">
            2월
          </SelectItem>
          <SelectItem key="3" value="3">
            3월
          </SelectItem>
          <SelectItem key="4" value="4">
            4월
          </SelectItem>
          <SelectItem key="5" value="5">
            5월
          </SelectItem>
          <SelectItem key="6" value="6">
            6월
          </SelectItem>
          <SelectItem key="7" value="7">
            7월
          </SelectItem>
          <SelectItem key="8" value="8">
            8월
          </SelectItem>
          <SelectItem key="9" value="9">
            9월
          </SelectItem>
          <SelectItem key="10" value="10">
            10월
          </SelectItem>
          <SelectItem key="11" value="11">
            11월
          </SelectItem>
          <SelectItem key="12" value="12">
            12월
          </SelectItem>
        </Select>
      </div>
      <div>
        <BarChart monthlySales={monthlySales}></BarChart>
      </div>
      {/* <div className="w-full h-full">
        <TotalSales></TotalSales>
      </div> */}
      <div className="mb-4 h-full w-full">
        <DetailSales detailSales={detailSales}></DetailSales>
      </div>
      {/* <div className="w-full h-full flex justify-end ">
        <div className="text-sm text-gray-500 mb-12">
        ※ 다이빙 투어 매출 수정은 자세히 보기 안에서 가능 
        </div>
      </div> */}
    </div>
  );
}
