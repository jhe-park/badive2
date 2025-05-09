'use client';

import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@heroui/react';
import { createClient, createTypedSupabaseClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { checkIsDDayMinus1 } from '@/utils/checkIsDDayMinus1';
import { checkIsSameDay } from '@/utils/checkIfSameDay';
import { TypeDBreservationJoinWithTimeslot } from '@/utils/supabase/dbTableTypes';
import { Z_INDEX } from '@/constants/constants';

export default function ProgramTable({ member, totalAmount, setTotalAmount }) {
  const supabase = createTypedSupabaseClient();
  const [reservations, setReservations] = useState<TypeDBreservationJoinWithTimeslot[]>([]);

  const getReservation = async () => {
    const { data, error } = await supabase.from('reservation').select('*,time_slot_id(*,instructor_id(*),program_id(*))').eq('user_id', member?.id);

    if (error) {
      console.log('Error fetching reservation:', error);
    } else {
      console.log('Reservation fetched successfully:', data);
      setReservations(data);
      setTotalAmount(data.reduce((acc, curr) => (curr.status !== '취소완료' ? acc + curr.time_slot_id.program_id.price * curr.participants : acc), 0));
    }
  };

  useEffect(() => {
    if (member) {
      getReservation();
    }
  }, [member]);

  const isRefundable = date => {
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

  const handleConfirmRequest = async (reservation: TypeDBreservationJoinWithTimeslot) => {
    const programDate = new Date(reservation.time_slot_id.date);
    const today = new Date();

    // 날짜 차이 계산 (밀리초를 일로 변환)
    const diffTime = programDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const isSameDay = checkIsSameDay(programDate, new Date());

    // 지난 프로그램인 경우
    if (diffDays < 0) {
      toast.error('지난 프로그램은 환불이 불가능합니다.');
      return;
    }

    // 당일 취소
    if (isSameDay) {
      toast.error('당일 프로그램은 환불이 불가능합니다.');
      return;
    }

    const isDDayMinus1 = checkIsDDayMinus1(programDate, today);

    // -환불규정
    // 당일 : 전액 환불 불가
    // 교육 시작 하루 전 : 50% 환불
    // 교육 시작 이틀 전 :  100% 환불
    const refundAmount = isDDayMinus1 ? reservation.amount / 2 : reservation.amount;

    const { data, error } = await supabase.from('reservation').update({ status: '취소완료' }).eq('id', reservation.id);

    if (error) {
      toast.error('프로그램 취소에 실패했습니다.');
    } else {
      const { data: timeSlotData, error: timeSlotError } = await supabase
        .from('timeslot')
        .update({
          current_participants: reservation.time_slot_id.current_participants - reservation.participants,
        })
        .eq('id', reservation.time_slot_id.id);

      if (timeSlotError) {
        toast.error('참가자 수 업데이트에 실패했습니다.');
        return;
      }

      const tossPaymentResponse = await fetch(`/api/toss/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_key: reservation.payment_key,
          refundAmount,
        }),
      });

      if (!tossPaymentResponse.ok) {
        toast.error(`토스페이먼츠 결제 취소 과정에서 알 수 없는 오류가 발생했습니다.`);
        return;
      }

      const resJson = await tossPaymentResponse.json();

      if (resJson.status === 'FAILED') {
        toast.error(`결제 취소에 실패했습니다. ${JSON.stringify(resJson.error)}`, { autoClose: false });
        // return;
      } else {
        toast.success('프로그램 취소가 신청 완료되었습니다.');
      }

      getReservation();
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <ToastContainer
        style={{
          zIndex: Z_INDEX.TOAST,
        }}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full text-center text-2xl font-bold">강습신청내역</div>
      <Table classNames={{ wrapper: 'p-0' }} aria-label="Example static collection table whitespace-nowrap overflow-x-auto" shadow="none">
        <TableHeader>
          <TableColumn className="w-1/4 text-center">프로그램명</TableColumn>
          <TableColumn className="w-1/4 text-center">강사</TableColumn>
          <TableColumn className="w-1/4 text-center">날짜</TableColumn>
          <TableColumn className="w-1/4 text-center">상태태</TableColumn>
          <TableColumn className="w-1/4 text-center">환불</TableColumn>
        </TableHeader>
        <TableBody className="">
          {reservations.map(program => (
            <TableRow key={program.id}>
              <TableCell className="whitespace-nowrap text-center">{program.time_slot_id.program_id.title}</TableCell>
              <TableCell className="whitespace-nowrap text-center">{program.time_slot_id.instructor_id.name}</TableCell>
              <TableCell className="whitespace-nowrap text-center">{program.time_slot_id.date}</TableCell>
              <TableCell className="whitespace-nowrap text-center">{program.status}</TableCell>
              <TableCell className="whitespace-nowrap text-center">
                {program.status === '예약확정' && (
                  <Button
                    color={isRefundable(program.time_slot_id.date) ? 'success' : 'danger'}
                    variant="bordered"
                    onPress={() => handleConfirmRequest(program)}
                    isDisabled={!isRefundable(program.time_slot_id.date)}
                  >
                    {isRefundable(program.time_slot_id.date) ? '환불 가능' : '환불 불가'}
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
      </Table>{' '}
    </div>
  );
}
