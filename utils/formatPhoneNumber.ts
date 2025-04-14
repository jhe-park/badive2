/**
 * 휴대전화 번호를 하이픈이 포함된 형식으로 변환합니다.
 * 입력된 문자열에서 숫자만 추출한 후 "xxx-xxxx-xxxx" 형식으로 반환합니다.
 *
 * @param phoneNumber - 변환할 휴대전화 번호 (숫자로만 구성된 문자열)
 * @returns 하이픈이 포함된 형식의 휴대전화 번호 문자열
 * @example
 * // "010-1234-5678" 반환
 * formatPhoneNumber("01012345678")
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');

  if (cleaned.length !== 11) {
    throw new Error('유효하지 않은 휴대전화 번호입니다. 11자리 숫자가 필요합니다.');
  }

  // xxx-xxxx-xxxx 형식으로 변환
  const formatted = `${cleaned.substring(0, 3)}-${cleaned.substring(3, 7)}-${cleaned.substring(7, 11)}`;

  return formatted;
};
