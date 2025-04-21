import dayjs from 'dayjs';

/**
 * 주어진 날짜가 속한 달의 모든 날짜를 "YYYY-MM-DD" 형식으로 반환합니다.
 * @param date 기준 날짜 (Date 객체, 문자열, 또는 dayjs 객체)
 * @returns 해당 월의 모든 날짜를 "YYYY-MM-DD" 형식의 문자열 배열로 반환
 */
export function getAllDatesInMonth(date: string | Date | dayjs.Dayjs): string[] {
	
  const targetDate = dayjs(date);
  const daysInMonth = targetDate.daysInMonth();
  const year = targetDate.year();
  const month = targetDate.month() + 1; // dayjs에서 month는 0부터 시작

  const allDates: string[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    // 날짜 형식을 "YYYY-MM-DD"로 포맷팅
    const formattedDate = dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD');
    allDates.push(formattedDate);
  }

  return allDates;
}

// export default getAllDatesInMonth;
