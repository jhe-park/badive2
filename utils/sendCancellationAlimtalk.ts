/**
 * API 엔드포인트 호출을 위한 타입 정의
 */
interface MessageRequest {
  phone: string;
  name: string;
  program: string;
  region?: string;
  instructor?: string;
  date?: string;
}

/**
 * 예약 취소 알림톡을 발송하는 함수
 *
 * @param {object} params - 알림톡 발송에 필요한 파라미터
 * @param {string} params.phone - 수신자 전화번호
 * @param {string} params.name - 수신자 이름
 * @param {string} params.program - 예약 프로그램명
 * @param {string} [params.region] - 지역 정보 (선택 사항)
 * @param {string} [params.instructor] - 강사 정보 (선택 사항)
 * @param {string} [params.date] - 예약 날짜 및 시간 (선택 사항)
 * @returns {Promise<any>} 알림톡 발송 결과
 * @throws {Error} 요청 실패 시 에러
 */
export async function sendCancellationAlimtalk({ phone, name, program, region, instructor, date }: MessageRequest): Promise<any> {
  // 필수 필드 검증
  if (!phone || !name || !program) {
    throw new Error('모든 필수 필드(phone, name, program)를 입력해주세요.');
  }

  try {
    console.log('before /api/aligo-alarm-talk/cancel');
    console.log('');

    const response = await fetch('/api/aligo-alarm-talk/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        name,
        program,
        region,
        instructor,
        date,
      }),
    });

    console.log("after '/api/aligo-alarm-talk/cancel");

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `취소 알림톡 발송 실패 (상태 코드: ${response.status})`);
    }

    return await response.json();
  } catch (error) {
    console.error('취소 알림톡 발송 오류:', error);
    throw error instanceof Error ? error : new Error('취소 알림톡 발송 중 알 수 없는 오류가 발생했습니다.');
  }
}
