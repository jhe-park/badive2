import React from "react";
import Image from "next/image";
import { Divider } from "@heroui/react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import axios from "axios";

export default async function page({ searchParams }) {
  const {
    orderId,
    instructor_id,
    time_slot_id,
    user_id,
    participants,
    paymentKey,
    amount,
    pay_type,
    program_id,
  } = searchParams;

  console.log("받은 파라미터들:", {
    orderId,
    time_slot_id,
    user_id,
    participants,
    paymentKey,
    amount,
    instructor_id,
    program_id,
  }); // 디버깅용

  // 결제 확인 로직
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://www.badive.co.kr";

    const response = await fetch(`${baseUrl}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        amount,
        paymentKey,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // 에러 발생시 fail 페이지로 리다이렉트
      redirect(`/fail?code=${errorData.code}&message=${errorData.message}`);
    }

    const paymentData = await response.json();
    // 기존의 예약 생성 로직
    const supabase = await createClient();

    if (orderId) {
      // 먼저 예약 존재 여부 확인
      const { data: existingReservation } = await supabase
        .from("reservation")
        .select("*")
        .eq("order_id", orderId)
        .single();

      if (!existingReservation) {
        // 예약이 없는 경우에만 새로운 예약 생성
        const { error: reservationError } = await supabase
          .from("reservation")
          .insert([
            {
              order_id: orderId,
              time_slot_id: time_slot_id,
              user_id: user_id,
              status: "예약확정",
              participants: participants,
              payment_key: paymentKey,
              instructor_id: instructor_id,
              amount: amount,
              pay_type: paymentData.method,
            },
          ]);

        if (reservationError) {
          console.log("예약 생성 오류:", reservationError);
          return;
        }

        // time_slot 테이블 업데이트
        const { data: timeSlot } = await supabase
          .from("timeslot")
          .select("*")
          .eq("id", time_slot_id)
          .single();

        console.log("timeSlot", timeSlot);

        if (timeSlot) {
          console.log("슬롯잇음");
          const newParticipants = timeSlot.current_participants + 1;
          const isFullyBooked = newParticipants >= timeSlot.max_participants;

          const { error: updateError } = await supabase
            .from("timeslot")
            .update({
              current_participants: newParticipants,
              available: !isFullyBooked,
              current_participants:
                timeSlot.current_participants + parseInt(participants),
            })
            .eq("id", time_slot_id);

          if (updateError) {
            console.log("타임슬롯 업데이트 오류:", updateError);
          } else {
            console.log("타임슬롯 업데이트 성공");

            const { data: userData } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", user_id)
              .single();

            const { data: programData } = await supabase
              .from("program")
              .select("*,instructor_id(*)")
              .eq("id", program_id)
              .single();

            if (userData.phone) {
              console.log("전화번호가 있습니다.");
              // 알림톡 전송
              try {
                const response = await axios.post(
                  "https://g2skecpigqunnzvt3l24k2h4640srabj.lambda-url.ap-southeast-2.on.aws/send-alimtalk",
                  {
                    phone: userData.phone,
                    name: userData.name,
                    program: programData.title,
                    region: programData.region,
                    instructor: programData.instructor_id.name,
                    date: timeSlot.date + timeSlot.start_time,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      accept: "application/json",
                    },
                  }
                );
                console.log("알림톡 전송 성공:", response.data);
              } catch (error) {
                console.error("알림톡 전송 실패:", error);
              }
            } else {
              console.log("전화번호가 없습니다.");
            }
          }
        }
      }
    }
  } catch (error) {
    redirect(`/fail?code=${error.code}&message=${error.message}`);
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] gap-y-6 px-4 md:px-0">
      <div className="text-4xl font-bold w-full h-[calc(100vh-100px)] flex flex-col justify-center items-center gap-y-12">
        <FaCheckCircle className="text-[100px] text-[#0077B6] animate-scale-fade-in"></FaCheckCircle>

        <div className="text-2xl font-bold">
          강습프로그램 결제가 완료되었습니다.
        </div>
        <div className="text-lg text-center">
          <p>예약하신 강습프로그램 내역은 마이페이지에서 확인 가능하며,</p>
          <p>
            예약환불은 환불 규정에 따라 진행됩니다. (교육일정 변경은 교육
            시작일로부터 4일전까지만 가능)
          </p>
          <p>궁금하신 점은 언제든지 전화, 카카오톡으로 문의 부탁드립니다.</p>
        </div>
        <Link className="text-2xl font-bold text-[#0077B6]" href="/">
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
