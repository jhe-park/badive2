/**
 * @file app/api/alimtalk/send/route.ts
 * 예약 알림톡 전송을 위한 API 라우트 핸들러
 */

import { NextResponse } from 'next/server';
import axios from 'axios';
import { getAligoToken } from '@/utils/aligo';

const ALIGO_API_KEY = process.env.ALIGO_API_KEY;
const ALIGO_SENDER_KEY = process.env.ALIGO_SENDER_KEY;
const ALIGO_USER_ID = process.env.ALIGO_USER_ID;

/**
 * 알림톡 요청을 위한 인터페이스
 * @interface MessageRequest
 * @property {string} phone - 수신자 전화번호
 * @property {string} name - 수신자 이름
 * @property {string} program - 예약 프로그램명
 * @property {string} region - 지역 정보
 * @property {string} instructor - 강사 정보
 * @property {string} date - 예약 날짜 및 시간
 */
interface MessageRequest {
  phone: string;
  name: string;
  program: string;
  region: string;
  instructor: string;
  date: string;
}

/**
 * 예약 알림톡 발송 POST 핸들러
 * @param {Request} request - HTTP 요청 객체, MessageRequest 형식의 JSON 본문 필요
 * @returns {Promise<NextResponse>} HTTP 응답
 */
export async function POST(request: Request) {
  try {
    const body: MessageRequest = await request.json();
    const { phone, name, program, region, instructor, date } = body;

    // 토큰 생성
    const token = await getAligoToken();

    // 버튼 정보
    const buttonInfo = {
      button: [
        {
          name: '채널 추가',
          linkType: 'AC',
          linkTypeName: '채널 추가',
          linkMo: '',
          linkPc: '',
        },
      ],
    };

    // 알림톡 발송 데이터
    const data = new URLSearchParams({
      apikey: ALIGO_API_KEY,
      userid: ALIGO_USER_ID,
      token: token,
      senderkey: ALIGO_SENDER_KEY,
      tpl_code: 'TZ_0282',
      sender: '01086448733',
      receiver_1: phone,
      subject_1: '체험단시대알림톡_재등록2',
      message_1: `[BADIVE | 예약안내]\n\n안녕하세요! \n${name}회원님\n예약하신 일정\n안내드립니다.\n\n${program}\n- 지역 : ${region}\n- 강사 : ${instructor}\n- 예약시간 : ${date}\n\n예약 일정은 강사님과 조율 후 변동될 수 있습니다.\n\n궁금하신 사항은 문의주시면 안내도와드리겠습니다.`,
      button_1: JSON.stringify(buttonInfo),
    });

    // 알림톡 발송
    const response = await axios.post('https://kakaoapi.aligo.in/akv10/alimtalk/send/', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('알림톡 발송 오류:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : '알림톡 발송에 실패했습니다.' }, { status: 500 });
  }
}
