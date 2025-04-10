import { type NextRequest } from 'next/server';
import z from 'zod';

const secretKey = process.env.NEXT_PUBLIC_TOSSPAYMENTS_SECRET_KEY;

const zodSchema = z.object({
  createdAt: z.string(),
  secret: z.string(),
  orderId: z.string(),
  status: z.string(),
  transactionKey: z.string(),
});

export async function POST(request: NextRequest) {
  // 아래 튜토리얼을 참조할 것
  // @doc https://docs.tosspayments.com/blog/virtual-account-webhook
  //  응답 포멧은 아래와 같다
  //   {
  // 	createdAt: '2023-05-23T14:42:26.000000',
  // 	secret: 'ps_Z1aOwX7K8mYpalqAGRwj8yQxzvNP',
  // 	orderId: '3f9c765d-60ed-4735-8af5-ab9d1142a3e8',
  // 	status: 'DONE',
  // 	transactionKey: '83B3CD71DF004878066FEDCB7C21E775'
  //   }
  //   POST /hook 200 0.752 ms - -

  //   테스트를 끝냈다면 라이브 환경에서 웹훅을 연동해보세요. 라이브 환경에서는 아래 세 가지를 꼭 확인하세요.
  // 	✔️ 토스페이먼츠의 IP 주소를 방화벽에서 허용해주세요.
  // 	✔️ 웹훅 이벤트 전송에 실패하면 최대 7회까지 다시 전송을 시도해요.
  // 	✔️ 가상계좌 결제 상태가 DONE에서 WAITING_FOR_DEPOSIT으로 바뀌면 구매자에게 재입금 안내가 필요해요.

  const reqJson = await request.json();

  const data = {};
  const parsedResult = zodSchema.safeParse(reqJson);
  if (parsedResult.error) {
    return Response.json({ status: 'FAILED', error: parsedResult.error });
  }
  const parsedReqJson = parsedResult.data;

  if (status !== 'DONE') {
    console.error('입금완료 상태가 아닙니다');
    console.error('status', status);
    return;
  }

  const requestBody = {};
  try {
    const res = await fetch('', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const objFromAPI = await res.json();
    return Response.json({ status: 'SUCCESS', data: objFromAPI });
  } catch (error) {
    return Response.json({ status: 'FAILED', error });
  }
}
