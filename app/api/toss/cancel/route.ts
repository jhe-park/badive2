import { type NextRequest } from 'next/server';

const tossSecretKey = process.env.TOSSPAYMENTS_SECRET_KEY;

export async function POST(request: NextRequest) {
  const { payment_key, refundAmount } = await request.json();

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
