import { type NextRequest } from 'next/server';
import z from 'zod';

// const TOSS_SECRET_KEY = process.env.NEXT_PUBLIC_TOSSPAYMENTS_SECRET_KEY;
const TOSS_SECRET_KEY = process.env.TOSSPAYMENTS_SECRET_KEY;

const zodSchema = z.object({
  payment_key: z.string().min(1, { message: '결제 키는 필수입니다.' }),
  refundAmount: z.number().min(0, { message: '환불 금액은 0보다 커야 합니다.' }),
  bankCode: z.string().nullish(),
  accountNumber: z.string().nullish(),
  accountOwnerName: z.string().nullish(),
});

export async function POST(request: NextRequest) {
  const reqJson = await request.json();

  console.log('✅ in app\api\cancel-payment');
  console.log();
  console.log('reqJson');
  console.log(reqJson);

  const data = {};
  const parsedResult = zodSchema.safeParse(reqJson);
  if (parsedResult.error) {
    return Response.json({ status: 'FAILED', error: parsedResult.error });
  }
  const { payment_key, refundAmount, accountNumber, accountOwnerName, bankCode } = parsedResult.data;

  console.log('{ payment_key, refundAmount, accountNumber, accountOwnerName, bankCode }');
  console.log({ payment_key, refundAmount, accountNumber, accountOwnerName, bankCode });

  const requestBody = {};
  try {
    console.log('TOSS_SECRET_KEY');
    console.log(TOSS_SECRET_KEY);

    // 아래 공식문서 참조할 것
    // @doc https://docs.tosspayments.com/guides/v2/cancel-payment

    // FIXME : 토스페이먼트 취소 요청이 실패 하였습니다 :
    // {"status":"FAILED","error":{"code":"INVALID_REFUND_ACCOUNT_NUMBER",
    // "message":"잘못된 환불 계좌번호입니다."}}

    // 구매자가 입금을 완료했으면: refundReceiveAccount에 환불받을 계좌 정보를 포함해서 결제 취소를 요청하세요. 환불 계좌의 번호와 예금주의 유효성이 확인되면 해당 계좌로 취소 금액이 환불됩니다.
    // "refundReceiveAccount":{"bank":"20","accountNumber":"1000123456789","holderName":"김토페"}
    const encryptedSecretKey = 'Basic ' + Buffer.from(TOSS_SECRET_KEY + ':').toString('base64');
    // const url = `https://api.tosspayments.com/v1/payments/${payment_key}/cancel`;
    const paymentResponse = await fetch(`https://api.tosspayments.com/v1/payments/${payment_key}/cancel`, {
      method: 'POST',
      headers: {
        Authorization: encryptedSecretKey,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(
        // 가상계좌 결제 환불하기
        // @doc https://docs.tosspayments.com/guides/v2/cancel-payment
        typeof bankCode === 'string'
          ? {
              cancelReason: '사용자 예약 취소',
              cancelAmount: refundAmount,
              refundReceiveAccount: { bank: bankCode, accountNumber: accountNumber, holderName: accountOwnerName },
            }
          : {
              cancelReason: '사용자 예약 취소',
              cancelAmount: refundAmount,
            },
      ),
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
