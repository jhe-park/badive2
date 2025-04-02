import dayjs from "dayjs";

type TFormattedDate = string;

// export function getWholeMonthlyDate({
//   selectedDate,
// }: {
//   selectedDate: Date;
// }): TFormattedDate[] {
//   const dayOfWeek = selectedDate.getDay();
//   const startOfWeek = new Date(selectedDate);
//   startOfWeek.setDate(selectedDate.getDate() - dayOfWeek);
//   const endOfWeek = new Date(selectedDate);
//   endOfWeek.setDate(selectedDate.getDate() + (6 - dayOfWeek));

//   // setSelectedDate({ start: selectedDate, end: selectedDate });

//   const dateList: string[] = [];
//   const tempDate = new Date(startOfWeek);

//   while (tempDate <= endOfWeek) {
//     const year = tempDate.getFullYear();
//     const month = String(tempDate.getMonth() + 1).padStart(2, "0");
//     const date = String(tempDate.getDate()).padStart(2, "0");
//     dateList.push(`${year}-${month}-${date}`);
//     tempDate.setDate(tempDate.getDate() + 1);
//   }
//   return dateList;
// }

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
    const formattedDate = dayjs(new Date(year, month - 1, day)).format(
      "YYYY-MM-DD"
    );
    allDays.push(formattedDate);
  }

  return allDays;
}
