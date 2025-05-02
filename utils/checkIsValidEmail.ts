/**
 * 이메일 주소의 유효성을 검사하는 함수
 * @param email 검사할 이메일 주소
 * @returns 이메일이 유효하면 true, 그렇지 않으면 false 반환
 */
export function checkIsValidEmail(email: string): boolean {
  // 기본 이메일 형식 검사를 위한 정규식
  // 1. @ 앞에 한 개 이상의 문자가 있어야 함
  // 2. @ 다음에 도메인 이름이 있어야 함
  // 3. 도메인 이름 다음에 반드시 점(.)과 TLD(최상위 도메인)가 있어야 함
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일이 null, undefined, 빈 문자열인 경우 처리
  if (!email || typeof email !== 'string') {
    return false;
  }

  // 이메일 길이 검사 (최소 5자: a@b.c)
  if (email.length < 5) {
    return false;
  }

  // 정규식으로 기본 형식 검사
  if (!emailRegex.test(email)) {
    return false;
  }

  // 추가 유효성 검사
  const parts = email.split('@');
  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domainPart] = parts;

  // 로컬 파트 검사
  if (localPart.length === 0) {
    return false;
  }

  // 도메인 파트 검사
  if (domainPart.length === 0) {
    return false;
  }

  // 도메인에 점(.)이 있는지 확인하고, 최상위 도메인이 있는지 확인
  const domainParts = domainPart.split('.');
  if (domainParts.length < 2 || domainParts[domainParts.length - 1].length === 0) {
    return false;
  }

  return true;
}
