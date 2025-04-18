export function formatDateString(dateString: string): string {
  if (dateString.length !== 8 || !/^\d+$/.test(dateString)) {
    //   throw new Error("입력값은 8자리 숫자여야 합니다.");
    return null;
  }

  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${year}년 ${month}월 ${day}일`;
}
