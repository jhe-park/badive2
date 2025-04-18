import dayjs from 'dayjs';

/**
 * 특정 날짜가 속한 월의 모든 날짜를 YYYY-MM-DD 형식의 문자열 배열로 반환합니다.
 * @param date 기준 날짜 (JavaScript Date 객체)
 * @returns 해당 월의 모든 날짜를 YYYY-MM-DD 형식으로 담은 문자열 배열
 */
export function getWholeMonthlyDate({ date }: { date: Date }): string[] {
  const dayjsDate = dayjs(date);
  const year = dayjsDate.year();
  const month = dayjsDate.month() + 1; // dayjs의 month는 0부터 시작하므로 +1

  // 해당 월의 마지막 날짜 구하기
  const daysInMonth = dayjsDate.daysInMonth();

  const allDays: string[] = [];

  // 1일부터 마지막 날까지 반복하며 날짜 문자열 생성
  for (let day = 1; day <= daysInMonth; day++) {
    // YYYY-MM-DD 형식으로 포맷팅
    const formattedDate = dayjs(new Date(year, month - 1, day)).format('YYYY-MM-DD');
    allDays.push(formattedDate);
  }

  return allDays;
}
