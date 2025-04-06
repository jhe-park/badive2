import { type NextRequest } from 'next/server';
import z from 'zod';

// const TOSS_SECRET_KEY = process.env.NEXT_PUBLIC_TOSSPAYMENTS_SECRET_KEY;
const TOSS_SECRET_KEY = process.env.TOSSPAYMENTS_SECRET_KEY;

const zodSchema = z.object({
  payment_key: z.string().min(1, { message: '결제 키는 필수입니다.' }),
  refundAmount: z.number().min(0, { message: '환불 금액은 0보다 커야 합니다.' }),
});

export async function POST(request: NextRequest) {
  const reqJson = await request.json();

  console.log('reqJson');
  console.log(reqJson);

  const data = {};
  const parsedResult = zodSchema.safeParse(reqJson);
  if (parsedResult.error) {
    return Response.json({ status: 'FAILED', error: parsedResult.error });
  }
  const { payment_key, refundAmount } = parsedResult.data;

  const requestBody = {};
  try {
    console.log('TOSS_SECRET_KEY');
    console.log(TOSS_SECRET_KEY);

    const encryptedSecretKey = 'Basic ' + Buffer.from(TOSS_SECRET_KEY + ':').toString('base64');
    // const url = `https://api.tosspayments.com/v1/payments/${payment_key}/cancel`;
    const paymentResponse = await fetch(`https://api.tosspayments.com/v1/payments/${payment_key}/cancel`, {
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
      const paymentFailedReason = await paymentResponse.json();
      console.error('결제 취소 실패:', paymentFailedReason);
      return Response.json({ status: 'FAILED', error: paymentFailedReason });
    }
    // const res = await fetch('', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    //   body: JSON.stringify(requestBody),
    // });

    // const objFromAPI = await res.json();

    console.log('paymentResponse');
    console.log(paymentResponse);

    return Response.json({ status: 'SUCCESS', data: '성공' });
  } catch (error) {
    return Response.json({ status: 'FAILED', error });
  }
}
