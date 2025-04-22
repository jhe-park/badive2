import dayjs from 'dayjs';

/**
 * 두 날짜가 같은 날짜인지 확인합니다 (년, 월, 일만 비교)
 *
 * @param date1 첫 번째 Date 객체
 * @param date2 두 번째 Date 객체
 * @returns 두 날짜가 같은 날짜이면 true, 아니면 false
 */
export function checkIsSameDay(date1: Date, date2: Date): boolean {
  return dayjs(date1).format('YYYY-MM-DD') === dayjs(date2).format('YYYY-MM-DD');
}

