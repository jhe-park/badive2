import { createClient } from '@/utils/supabase/server';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

const PageForPaymentComplete: NextPage<NextPageProps> = async ({ searchParams }) => {
  const { orderId, instructor_id, time_slot_id, user_id, participants, paymentKey, amount, pay_type, program_id } = await searchParams;

  console.log('받은 파라미터들:', {
    orderId,
    time_slot_id,
    user_id,
    participants,
    paymentKey,
    amount,
    instructor_id,
    program_id,
  }); // 디버깅용

  const numOfParticipants = parseInt(participants as string);

  if (isNaN(numOfParticipants)) {
    redirect(`/inquiries/fail?code=${-1}&message=${'participants 데이터가 없습니다. 관리자에게 문의해 주세요'}`);
  }

  // 결제 확인 로직
  try {
    const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.badive.co.kr';

    console.log('baseUrl');
    console.log(baseUrl);

    const tossPaymentResponse = await fetch(`${baseUrl}/api/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        amount,
        paymentKey,
      }),
    });

    // console.log('tossPaymentResponse');
    // console.log(tossPaymentResponse);

    if (!tossPaymentResponse.ok) {
      const errorData = await tossPaymentResponse.json();
      // 에러 발생시 fail 페이지로 리다이렉트
      redirect(`/inquiries/fail?code=${errorData.code}&message=${errorData.message}`);
    }

    const paymentData = await tossPaymentResponse.json();

    console.log('✅paymentData');
    console.log(paymentData);

    // 기존의 예약 생성 로직
    const supabase = await createClient();

    if (orderId == null) {
      redirect(`/inquiries/fail?code=${-1}&message=${'orderId가 없습니다. 관리자에게 문의해 주세요'}`);
    }

    // 먼저 예약 존재 여부 확인
    const { data: existingReservation } = await supabase
      .from('reservation')
      .select('*')
      .eq('order_id', orderId as string)
      .single();

    console.log('✅existingReservation');
    console.log(existingReservation);

    if (existingReservation) {
      redirect(`/inquiries/fail?code=${-1}&message=${'이미 예약이 존재합니다. 관리자에게 문의해 주세요'}`);
    }

    // time_slot 테이블 업데이트
    const timeSlotIds: string[] = Array.isArray(time_slot_id) ? time_slot_id : time_slot_id.split(',');
    console.log('✅timeSlotIds');
    console.log(timeSlotIds);

    if (timeSlotIds.length === 0) {
      redirect(`/inquiries/fail?code=${-1}&message=${'예약에 할당된 timeslot이 없습니다. 관리자에게 문의해 주세요'}`);
    }

    if (timeSlotIds.length >= 2) {
      redirect(`/inquiries/fail?code=${-1}&message=${'예약에 할당된 timeslot이 2개 이상입니다. 관리자에게 문의해 주세요'}`);
    }

    const slotId = timeSlotIds.at(0)!;

    console.log('✅slotId');
    console.log(slotId);

    const { data: timeSlot } = await supabase.from('timeslot').select('*').eq('id', parseInt(slotId)).single();

    console.log('✅timeSlot');
    console.log(timeSlot);

    // console.log('timeSlot', timeSlot);

    if (!timeSlot) {
      redirect(`/inquiries/fail?code=${-1}&message=${'해당 timeslot이 없습니다. 관리자에게 문의해 주세요'}`);
    }

    console.log('슬롯잇음');

    const newParticipants = timeSlot.current_participants + numOfParticipants;

    console.log('✅newParticipants');
    console.log(newParticipants);

    if (newParticipants > timeSlot.max_participants) {
      redirect(`/inquiries/fail?code=${-1}&message=${'참여인원이 최대 허용인원을 초과하였습니다. 관리자에게 문의해 주세요'}`);
    }

    const isFullyBooked = newParticipants === timeSlot.max_participants;

    console.log('✅isFullyBooked');
    console.log(isFullyBooked);

    console.log('✅reservation insert value');

    console.log({
      status: paymentData.method === '가상계좌' ? '입금대기' : '예약확정',
      order_id: orderId as string,
      time_slot_id: parseInt(slotId),
      user_id: user_id as string,
      participants: numOfParticipants,
      payment_key: paymentKey as string,
      instructor_id: parseInt(instructor_id as string),
      amount: parseInt(amount as string),
      pay_type: paymentData.method,
    });

    console.log('✅ timeslot insert value');

    console.log({
      current_participants: newParticipants,
      available: !isFullyBooked,
    });

    const [{ error: reservationError }, { error: updateError }] = await Promise.all([
      supabase.from('reservation').insert([
        {
          status: paymentData.method === '가상계좌' ? '입금대기' : '예약확정',
          order_id: orderId as string,
          time_slot_id: parseInt(slotId),
          user_id: user_id as string,
          participants: numOfParticipants,
          payment_key: paymentKey as string,
          instructor_id: parseInt(instructor_id as string),
          amount: parseInt(amount as string),
          pay_type: paymentData.method,
        },
      ]),
      supabase
        .from('timeslot')
        .update({
          current_participants: newParticipants,
          available: !isFullyBooked,
        })
        .eq('id', parseInt(slotId)),
    ]);

    if (reservationError) {
      console.log('reservation 테이블의 row 생성 오류:', reservationError);
      return;
    } else {
      console.log('reservation 테이블의 row 생성 성공:');
    }

    if (updateError) {
      console.log(`타임슬롯 ${slotId} 업데이트 오류:`, updateError);
    } else {
      console.log(`타임슬롯 ${slotId} 업데이트 성공`);
    }

    const [{ data: userProfile }, { data: programData }] = await Promise.all([
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user_id as string)
        .single(),
      supabase
        .from('program')
        .select('*,instructor_id(*)')
        .eq('id', parseInt(program_id as string))
        .single(),
    ]);

    console.log('✅userProfile');
    console.log(userProfile);

    console.log('✅programData');
    console.log(programData);
    // const { data: userData } = await supabase.from('profiles').select('*').eq('id', user_id).single();

    // const { data: programData } = await supabase.from('program').select('*,instructor_id(*)').eq('id', program_id).single();

    if (userProfile.phone) {
      console.log('전화번호가 있습니다.');
      // 알림톡 전송
      try {
        const response = await axios.post(
          'https://g2skecpigqunnzvt3l24k2h4640srabj.lambda-url.ap-southeast-2.on.aws/send-alimtalk',
          {
            phone: userProfile.phone,
            name: userProfile.name,
            program: programData.title,
            region: programData.region,
            instructor: programData.instructor_id.name,
            date: timeSlot.date + ' ' + timeSlot.start_time,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
          },
        );
        console.log('알림톡 전송 성공:', response.data);
      } catch (error) {
        console.error('알림톡 전송 실패:', error);
      }
    } else {
      console.log('전화번호가 없습니다.');
    }
  } catch (error) {
    redirect(`/inquiries/fail?code=${error.code}&message=${error.message}`);
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center mt-[100px] gap-y-6 px-4 md:px-0">
      <div className="text-4xl font-bold w-full h-[calc(100vh-100px)] flex flex-col justify-center items-center gap-y-12">
        <FaCheckCircle className="text-[100px] text-[#0077B6] animate-scale-fade-in"></FaCheckCircle>
        <div className="text-2xl font-bold">강습프로그램 결제가 완료되었습니다.</div>
        <div className="text-lg text-center">
          <p>예약하신 강습프로그램 내역은 마이페이지에서 확인 가능하며,</p>
          <p>예약환불은 환불 규정에 따라 진행됩니다. (교육일정 변경은 교육 시작일로부터 4일전까지만 가능)</p>
          <p>궁금하신 점은 언제든지 전화, 카카오톡으로 문의 부탁드립니다.</p>
        </div>
        <Link className="text-2xl font-bold text-[#0077B6]" href="/">
          홈으로 이동
        </Link>
      </div>
    </div>
  );
};

async function 트랜잭션으로_처리되어야_함() {
  // 예약이 없는 경우에만 새로운 예약 생성
  // const { error: reservationError } = await supabase.from('reservation').insert([
  //   {
  //     order_id: orderId,
  //     time_slot_id: time_slot_id.split(',')[0],
  //     user_id: user_id,
  //     status: '예약확정',
  //     participants: participants,
  //     payment_key: paymentKey,
  //     instructor_id: instructor_id,
  //     amount: amount,
  //     pay_type: paymentData.method,
  //   },
  // ]);
  // if (reservationError) {
  //   console.log('예약 생성 오류:', reservationError);
  //   return;
  // }
  // const { error: updateError } = await supabase
  //     .from('timeslot')
  //     .update({
  //       current_participants: timeSlot.current_participants + parseInt(participants),
  //       available: !isFullyBooked,
  //     })
  //     .eq('id', parseInt(slotId));
  //   if (updateError) {
  //     console.log(`타임슬롯 ${slotId} 업데이트 오류:`, updateError);
  //   } else {
  //     console.log(`타임슬롯 ${slotId} 업데이트 성공`);
  //   }
}

// async function sendAlarmTalk({ userData, programData, timeSlot }: { userData: TypeDBprofile; programData: TypeDBprogram; timeSlot: TypeDBtimeslot }) {
//   try {
//     const response = await axios.post(
//       'https://g2skecpigqunnzvt3l24k2h4640srabj.lambda-url.ap-southeast-2.on.aws/send-alimtalk',
//       {
//         phone: userData.phone,
//         name: userData.name,
//         program: programData.title,
//         region: programData.region,
//         instructor: programData.instructor_id.name,
//         date: timeSlot.date + ' ' + timeSlot.start_time,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           accept: 'application/json',
//         },
//       },
//     );
//     console.log('알림톡 전송 성공:', response.data);
//   } catch (error) {
//     console.error('알림톡 전송 실패:', error);
//   }
// }

export default PageForPaymentComplete;
