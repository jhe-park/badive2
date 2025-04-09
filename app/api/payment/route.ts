import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { paymentKey, orderId, amount, customerData } = await request.json();
    const secretKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_SECRET_KEY;
    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D

    const encryptedSecretKey = 'Basic ' + Buffer.from(secretKey + ':').toString('base64');

    // ------ 결제 승인 API 호출 ------
    // @docs https://docs.tosspayments.com/guides/payment-widget/integration#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8-api-%ED%98%B8%EC%B6%9C%ED%95%98%EA%B8%B0
    // @docs https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8
    // 결제 승인에 성공하면 Payment 객체가 돌아옵니다. 사용한 결제수단 필드에 값이 제대로 들어왔는지 확인하세요.
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: encryptedSecretKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, amount, paymentKey }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Payment API Error:', errorData);
      return NextResponse.json({ message: '결제 처리 중 오류가 발생했습니다.' }, { status: response.status });
    }

    const data = await response.json();
    console.log('confirm data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Payment Processing Error:', error);
    return NextResponse.json({ message: '결제 요청을 처리할 수 없습니다.' }, { status: 400 });
  }
}
