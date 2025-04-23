// app/api/send-cancel-talk/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { AWS_LAMBDA_URL } from '@/constants/constants';

export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const requestData = await request.json();
    const { phone, name, program, region, instructor, date } = requestData;

    // 필수 필드 검증
    if (!phone || !name || !program || !region || !instructor || !date) {
      return NextResponse.json({ error: '필수 필드가 누락되었습니다.' }, { status: 400 });
    }

    // AWS Lambda 함수 호출
    const response = await axios.post(
      `${AWS_LAMBDA_URL}/cancel-alimtalk`,
      {
        phone,
        name,
        program,
        region,
        instructor,
        date,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    // 성공 로그
    console.log('✅ 알림톡 전송 성공:', response.data);

    // 클라이언트에 응답 반환
    return NextResponse.json({
      success: true,
      message: '알림톡 전송 성공',
      data: response.data,
    });
  } catch (error: any) {
    // 오류 로깅
    console.error('🚫 알림톡 전송 실패:', error);

    // 오류 응답 반환
    return NextResponse.json(
      {
        success: false,
        message: '알림톡 전송 실패',
        error: error.message || '알 수 없는 오류가 발생했습니다.',
      },
      { status: error.response?.status || 500 },
    );
  }
}

// /**
//  * @file app/api/alimtalk/cancel/route.ts
//  * 예약 취소 알림톡 전송을 위한 API 라우트 핸들러
//  */

// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import { getAligoToken } from '@/utils/aligo';
// import { ALIGO_SENDER_PHONE_NUMBER, ALIGO_TPL_CODE } from '@/constants/constants';

// // 상수 정의
// const ALIGO_API_KEY = process.env.ALIGO_API_KEY;
// const ALIGO_SENDER_KEY = process.env.ALIGO_SENDER_KEY;
// const ALIGO_USER_ID = process.env.ALIGO_USER_ID;

// /**
//  * 알림톡 요청을 위한 인터페이스
//  * @interface MessageRequest
//  * @property {string} phone - 수신자 전화번호
//  * @property {string} name - 수신자 이름
//  * @property {string} program - 예약 프로그램명
//  * @property {string} region - 지역 정보 (선택사항)
//  * @property {string} instructor - 강사 정보 (선택사항)
//  * @property {string} date - 예약 날짜 및 시간 (선택사항)
//  */
// interface MessageRequest {
//   phone: string;
//   name: string;
//   program: string;
//   region?: string;
//   instructor?: string;
//   date?: string;
// }

// /**
//  * 예약 취소 알림톡 발송 POST 핸들러
//  * @param {Request} request - HTTP 요청 객체, MessageRequest 형식의 JSON 본문 필요
//  * @returns {Promise<NextResponse>} HTTP 응답
//  */
// export async function POST(request: Request) {
//   try {
//     const body: MessageRequest = await request.json();
//     const { phone, name, program } = body;
//     console.log('in aligo-alarm-talk/cancel');

//     console.log('{ phone, name, program }');
//     console.log({ phone, name, program });

//     // 토큰 생성
//     const token = await getAligoToken();

//     console.log('token');
//     console.log(token);

//     // 버튼 정보
//     const buttonInfo = {
//       button: [
//         {
//           name: '채널 추가',
//           linkType: 'AC',
//           linkTypeName: '채널 추가',
//           linkMo: '',
//           linkPc: '',
//         },
//       ],
//     };

//     console.log('arguments ');
//     console.log({
//       apikey: ALIGO_API_KEY,
//       userid: ALIGO_USER_ID,
//       token: token,
//       senderkey: ALIGO_SENDER_KEY,
//       tpl_code: ALIGO_TPL_CODE,
//       sender: ALIGO_SENDER_PHONE_NUMBER,
//       receiver_1: phone,
//       subject_1: '취소톡',
//       message_1: `[BADIVE | 예약취소안내]\n\n안녕하세요! ${name}회원님\n${program} 예약 취소 완료되었습니다. \n\n결제 수단에 따라 결제취소/ 환불까지 시일이 소요될 수 있습니다.\n자세한 내용은 마이페이지를 통해 확인하실 수 있습니다.`,
//       button_1: JSON.stringify(buttonInfo),
//     });

//     // 알림톡 발송 데이터
//     const data = new URLSearchParams({
//       apikey: ALIGO_API_KEY,
//       userid: ALIGO_USER_ID,
//       token: token,
//       senderkey: ALIGO_SENDER_KEY,
//       tpl_code: ALIGO_TPL_CODE,
//       sender: ALIGO_SENDER_PHONE_NUMBER,
//       receiver_1: phone,
//       subject_1: '취소톡',
//       message_1: `[BADIVE | 예약취소안내]\n\n안녕하세요! ${name}회원님\n${program} 예약 취소 완료되었습니다. \n\n결제 수단에 따라 결제취소/ 환불까지 시일이 소요될 수 있습니다.\n자세한 내용은 마이페이지를 통해 확인하실 수 있습니다.`,
//       button_1: JSON.stringify(buttonInfo),
//     });

//     console.log('before https://kakaoapi.aligo.in/akv10/alimtalk/send/');
//     console.log();
//     // 알림톡 발송
//     const response = await axios.post('https://kakaoapi.aligo.in/akv10/alimtalk/send/', data, {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     });
//     console.log('after https://kakaoapi.aligo.in/akv10/alimtalk/send/');

//     console.log('response.statusText');
//     console.log(response.statusText);

//     console.log('response.data');
//     console.log(response.data);
//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error('취소 알림톡 발송 오류:', error);
//     return NextResponse.json({ error: error instanceof Error ? error.message : '취소 알림톡 발송에 실패했습니다.' }, { status: 500 });
//   }
// }
