/**
 * 모바일 디바이스 감지 관련 유틸리티 함수 모음
 */

/**
 * 기본적인 사용자 에이전트 문자열을 기반으로 모바일 디바이스를 감지합니다.
 *
 * @returns {boolean} 모바일 디바이스면 true, 아니면 false
 */
export function checkIsMobileDevice(): boolean {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // 일반적인 모바일 키워드 검사
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;

  return mobileRegex.test(userAgent);
}
