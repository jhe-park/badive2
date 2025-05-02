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

    console.log('✅ 알림톡 전송 성공:', response.data);

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
