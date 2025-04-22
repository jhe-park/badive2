// import { sendAlarmTalkByAWSLambda } from '@/utils/sendAlarmTalk';
// import { Database } from '@/utils/supabase/database.types';
// import { TypeDBreservation } from '@/utils/supabase/dbTableTypes';
// import { createClient } from '@/utils/supabase/server';
// import { SupabaseClient } from '@supabase/supabase-js';

import { type NextRequest } from 'next/server';
import z from 'zod';

const tossSecretKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_SECRET_KEY;

const zodSchema = z.object({});

export async function POST(request: NextRequest) {
  // 토스페이먼츠 결제 취소 요청

  const { payment_key, refundAmount } = await request.json();

  console.log('{ payment_key, refundAmount }');
  console.log({ payment_key, refundAmount });

  const encryptedSecretKey = 'Basic ' + Buffer.from(tossSecretKey + ':').toString('base64');
  const url = `https://api.tosspayments.com/v1/payments/${payment_key}/cancel`;

  const paymentResponse = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: encryptedSecretKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cancelReason: '사용자 예약 취소',
      cancelAmount: refundAmount,
    }),
  });

  if (!paymentResponse.ok) {
    console.log('결제 취소 실패:', paymentResponse);
    return Response.json({ status: 'FAILED', error: paymentResponse });
  }

  return Response.json({ status: 'SUCCESS', error: paymentResponse });
}
