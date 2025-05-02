import dayjs from 'dayjs';

/**
 * 두 날짜가 정확히 하루 차이인지 확인합니다
 *
 * @param date1 첫 번째 Date 객체
 * @param date2 두 번째 Date 객체
 * @returns 두 날짜가 정확히 하루 차이이면 true, 아니면 false
 */
export function checkIsDDayMinus1(date1: Date, date2: Date): boolean {
  // 날짜만 비교하기 위해 시간 부분을 제거
  const d1 = dayjs(date1).startOf('day');
  const d2 = dayjs(date2).startOf('day');

  // 두 날짜의 차이를 일수로 계산
  const diffInDays = d1.diff(d2, 'day');

  // 정확히 1일 차이인지 확인
  return diffInDays === 1;
}
