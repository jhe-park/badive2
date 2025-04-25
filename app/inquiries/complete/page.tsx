import { getDomain } from '@/utils/getDomain';
import { sendAlarmTalkByAWSLambda } from '@/utils/sendAlarmTalk';
import { Database } from '@/utils/supabase/database.types';
import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextPage } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

const PageForPaymentComplete: NextPage<NextPageProps> = async ({ searchParams }) => {
  const { orderId, instructor_id, time_slot_id, user_id, participants, paymentKey, amount, pay_type, program_id } = await searchParams;
  const { domainWithProtocol } = await getDomain();

  if (orderId == null) {
    redirect(`/inquiries/fail?code=${-1}&message=${'orderId가 없습니다. 관리자에게 문의해 주세요'}`);
  }

  const supabase = await createClient();

  // 이미 예약이 존재하는지 order_id로 쿼리한다
  const { data: existingReservation } = await supabase
    .from('reservation')
    .select('*')
    .eq('order_id', orderId as string)
    .single();

  if (existingReservation) {
    redirect(`/inquiries/fail?code=${-1}&message=${'이미 예약이 존재합니다. 관리자에게 문의해 주세요'}`);
  }

  const timeSlotIds: string[] = Array.isArray(time_slot_id) ? time_slot_id : time_slot_id.split(',');

  if (timeSlotIds.length === 0) {
    redirect(`/inquiries/fail?code=${-1}&message=${'예약에 할당된 timeslot이 없습니다. 관리자에게 문의해 주세요'}`);
  }

  if (timeSlotIds.length >= 2) {
    redirect(`/inquiries/fail?code=${-1}&message=${'예약에 할당된 timeslot이 2개 이상입니다. 관리자에게 문의해 주세요'}`);
  }

  const numOfParticipantsForCheckout = parseInt(participants as string);

  if (isNaN(numOfParticipantsForCheckout)) {
    redirect(`/inquiries/fail?code=${-1}&message=${'participants 데이터가 없습니다. 관리자에게 문의해 주세요'}`);
  }

  // 동일한 예약이 없는 것이 확인되었으므로 토스페이먼츠에 결제를 요청한다
  try {
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

    if (!tossPaymentResponse.ok) {
      const errorData = await tossPaymentResponse.json();
      redirect(`/inquiries/fail?code=${errorData.code}&message=${errorData.message}`);
    }

    const tossPaymentsResJson = await tossPaymentResponse.json();

    const slotId = timeSlotIds.at(0)!;
    const { data: timeSlot } = await supabase.from('timeslot').select('*').eq('id', parseInt(slotId)).single();

    if (!timeSlot) {
      cancelTossPayment({ payment_key: paymentKey as string, refundAmount: amount as string });
      // 실패
      redirect(`/inquiries/fail?code=${-1}&message=${'해당 timeslot이 없습니다. 관리자에게 문의해 주세요'}`);
    }

    const updatedCurrentParticipants = timeSlot.current_participants + numOfParticipantsForCheckout;

    if (updatedCurrentParticipants > timeSlot.max_participants) {
      const searchParams = new URLSearchParams({
        code: '-1',
        message: "참여인원이 최대 허용인원을 초과하였습니다. 관리자에게 문의해 주세요'",
      });
      cancelTossPayment({ payment_key: paymentKey as string, refundAmount: amount as string });
      // 실패
      redirect(`/inquiries/fail?${searchParams.toString()}`);
    }

    // const isFullyBooked = updatedCurrentParticipants === timeSlot.max_participants;

    const { data: dataForProgram, error: errorForProgram } = await supabase
      .from('program')
      .select('*')
      .eq('id', parseInt(program_id as string))
      .single();

    // dataForProgram
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
      programPrice: dataForProgram.price,
    });

    if (transactionResult.success === false) {
      const searchParams = new URLSearchParams({
        code: '-1',
        message: `${JSON.stringify(transactionResult.error)} / ${JSON.stringify(transactionResult?.error_detail ?? '')}`,
      });
      cancelTossPayment({ payment_key: paymentKey as string, refundAmount: amount as string });
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

    if (userProfile.phone == null) {
      console.log('전화번호가 없습니다.');
    } else if (userProfile.phone) {
      console.log('전화번호가 있습니다.');

      if (tossPaymentsResJson.method !== '가상계좌') {
        await sendAlarmTalkByAWSLambda({
          userProfile,
          dateStr: timeSlot.date + ' ' + timeSlot.start_time,
          instructorName: programData.instructor_id.name,
          programRegion: programData.region,
          programTitle: programData.title,
        });
      }
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
  programPrice,
}: {
  programPrice: number;
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
    p_program_price: programPrice,
  });

  if (error) {
    console.error('🚫 예약 트랜잭션 오류:', error);
    console.error(error);

    return { success: false, error: JSON.stringify(error) };
  }
  return transactionResult as any;
};

export default PageForPaymentComplete;

async function cancelTossPayment({ payment_key, refundAmount }: { payment_key: string; refundAmount: string }) {
  const tossPaymentResponse = await fetch(`/api/toss/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payment_key: payment_key,
      refundAmount,
    }),
  });

  if (!tossPaymentResponse.ok) {
    console.error('토스페이먼츠 결제 취소 실패');
    console.error('tossPaymentResponse.status');
    console.error(tossPaymentResponse.status);
    // toast.error(`토스페이먼츠 결제 취소 과정에서 알 수 없는 오류가 발생했습니다.`);
    return { status: 'FAILED' };
  }

  const resJson = await tossPaymentResponse.json();

  if (resJson.status === 'FAILED') {
    console.error('토스페이먼츠 결제 취소 실패');
    console.error(resJson);
    // toast.error(`결제 취소에 실패했습니다. ${JSON.stringify(resJson.error)}`, { autoClose: false });
    // return;
    return { status: 'FAILED' };
  } else {
    // toast.success('프로그램 취소가 신청 완료되었습니다.');
    return { status: 'SUCCESS' };
  }
}
