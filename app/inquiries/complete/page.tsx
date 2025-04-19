import { getDomain } from '@/utils/getDomain';
import { Database } from '@/utils/supabase/database.types';
import { TypeDBprofile } from '@/utils/supabase/dbTableTypes';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

const PageForPaymentComplete: NextPage<NextPageProps> = async ({ searchParams }) => {
  const { orderId, instructor_id, time_slot_id, user_id, participants, paymentKey, amount, pay_type, program_id } = await searchParams;
  const { domainWithProtocol } = await getDomain();

  console.log('받은 파라미터들:', {
    orderId,
    time_slot_id,
    user_id,
    participants,
    paymentKey,
    amount,
    instructor_id,
    program_id,
  });

  const numOfParticipantsForCheckout = parseInt(participants as string);

  if (isNaN(numOfParticipantsForCheckout)) {
    redirect(`/inquiries/fail?code=${-1}&message=${'participants 데이터가 없습니다. 관리자에게 문의해 주세요'}`);
  }

  try {
    // const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.badive.co.kr';

    // console.log('baseUrl');
    // console.log(baseUrl);

    const tossPaymentResponse = await fetch(`${domainWithProtocol}/api/payment`, {
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

    console.log('✅ tossPaymentResponse');
    console.log(tossPaymentResponse);

    if (!tossPaymentResponse.ok) {
      const errorData = await tossPaymentResponse.json();
      redirect(`/inquiries/fail?code=${errorData.code}&message=${errorData.message}`);
    }

    const tossPaymentsResJson = await tossPaymentResponse.json();

    console.log('✅paymentData');
    console.log(tossPaymentsResJson);

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

    console.log('✅ existingReservation');
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

    const updatedCurrentParticipants = timeSlot.current_participants + numOfParticipantsForCheckout;

    console.log('✅newParticipants');
    console.log(updatedCurrentParticipants);

    if (updatedCurrentParticipants > timeSlot.max_participants) {
      const searchParams = new URLSearchParams({
        code: '-1',
        message: "참여인원이 최대 허용인원을 초과하였습니다. 관리자에게 문의해 주세요'",
      });
      redirect(`/inquiries/fail?${searchParams.toString()}`);
    }

    const isFullyBooked = updatedCurrentParticipants === timeSlot.max_participants;

    console.log('✅isFullyBooked');
    console.log(isFullyBooked);

    console.log('✅reservation insert value');

    console.log({
      updatedCurrentParticipants: updatedCurrentParticipants,
      isFullyBooked,
      orderId: orderId as string,
      participants: numOfParticipantsForCheckout,
      slotId: parseInt(slotId),
      user_id: user_id as string,
      timeSlot,
      paymentKey: paymentKey as string,
      instructor_id: parseInt(instructor_id as string),
      amount: parseInt(amount as string),
      paymentMethod: tossPaymentsResJson.method,
      paymentStatus: tossPaymentsResJson.method === '가상계좌' ? '입금대기' : '예약확정',
    });

    console.log('✅ timeslot insert value');

    const transactionResult = await doTransactionForReservation({
      supabase,
      orderId: orderId as string,
      slotId: parseInt(slotId),
      user_id: user_id as string,
      instructor_id: parseInt(instructor_id as string),
      paymentKey: paymentKey as string,
      amount: parseInt(amount as string),
      numOfParticipantsForCheckout: numOfParticipantsForCheckout,
      paymentMethod: tossPaymentsResJson.method,
      paymentStatus: tossPaymentsResJson.method === '가상계좌' ? '입금대기' : '예약확정',
    });

    console.log('✅ transactionResult');
    console.log(transactionResult);

    if (transactionResult.success === false) {
      console.log('✅ transactionResult 에러발생');
      const searchParams = new URLSearchParams({
        code: '-1',
        message: `${JSON.stringify(transactionResult.error)} / ${JSON.stringify(transactionResult?.error_detail ?? '')}`,
      });
      console.log(searchParams.toString());
      redirect(`/inquiries/fail?${searchParams.toString()}`);
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

    if (userProfile.phone == null) {
      console.log('전화번호가 없습니다.');
    } else if (userProfile.phone) {
      console.log('전화번호가 있습니다.');

      await sendAlarmTalk({
        userProfile,
        dateStr: timeSlot.date + ' ' + timeSlot.start_time,
        instructorName: programData.instructor_id.name,
        programRegion: programData.region,
        programTitle: programData.title,
      });
    }
  } catch (error) {
    redirect(`/inquiries/fail?code=${error.code}&message=${error.message}`);
  }

  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center gap-y-6 px-4 md:px-0">
      <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center gap-y-12 text-4xl font-bold">
        <FaCheckCircle className="animate-scale-fade-in text-[100px] text-[#0077B6]"></FaCheckCircle>
        <div className="text-2xl font-bold">강습프로그램 결제가 완료되었습니다.</div>
        <div className="text-center text-lg">
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

const doTransactionForReservation = async ({
  supabase,
  orderId,
  slotId,
  user_id,
  paymentKey,
  instructor_id,
  amount,
  numOfParticipantsForCheckout,
  paymentMethod,
  paymentStatus,
}: {
  supabase: SupabaseClient<Database>;
  paymentStatus: string;
  orderId: string;
  slotId: number;
  user_id: string;
  numOfParticipantsForCheckout: number;
  paymentKey: string;
  instructor_id: number;
  paymentMethod: string;
  amount: number;
}): Promise<
  { success: true; message: string; updated_participants: number; is_available: boolean } | { success: false; error: string; error_detail?: string }
> => {
  // @ts-ignore
  const { data: transactionResult, error } = await supabase.rpc('create_reservation_transaction', {
    p_order_id: orderId,
    p_time_slot_id: slotId,
    p_user_id: user_id,
    p_payment_key: paymentKey,
    p_instructor_id: instructor_id,
    p_amount: amount,
    p_pay_type: paymentMethod,
    p_payment_status: paymentStatus,
    p_number_of_participants_for_checkout: numOfParticipantsForCheckout,
  });

  if (error) {
    console.error('🚫 예약 트랜잭션 오류:', error);
    console.error(error);

    return { success: false, error: JSON.stringify(error) };
  }
  return transactionResult;
};

async function sendAlarmTalk({
  userProfile,
  dateStr,
  instructorName,
  programRegion,
  programTitle,
}: {
  dateStr: string;
  programTitle: string;
  programRegion: string;
  instructorName: string;
  userProfile: TypeDBprofile;
}) {
  try {
    const response = await axios.post(
      'https://g2skecpigqunnzvt3l24k2h4640srabj.lambda-url.ap-southeast-2.on.aws/send-alimtalk',
      {
        phone: userProfile.phone,
        name: userProfile.name,
        program: programTitle,
        region: programRegion,
        instructor: instructorName,
        date: dateStr,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      },
    );

    console.log('✅ 알림톡 전송 성공:', response.data);
    return response;
  } catch (error) {
    console.error('🚫 알림톡 전송 실패:');
    console.error(error);
  }
}

export default PageForPaymentComplete;
