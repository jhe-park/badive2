# www.badive.co.kr

본 프로젝트는 `https://www.badive.co.kr`의 구현체이다

스택 

- Next.js App Route (v 15.1.4이며 추후 버전업될 수 있음)
- Typescript 5.8
- 백엔드 FastAPI 
  - : Supabase 위주로 사용하였고, 알람톡/예약 기능 일의 경우 fast api + lambda로 api 구축
- 결제 모듈 : [토스페이먼트 v2](https://docs.tosspayments.com/guides/v2/payment-widget/integration)
- 정적파일 버킷 : AWS S3
- 서버 : Supabase
- 배포 플랫폼 : Vercel (서버리스 플랫폼)
- 로그인 : next-auth
- 도메인 : 가비야에서 구매하였음
- 카카오톡 알림 서비스 : [알리고](https://smartsms.aligo.in/)
  - 환불시 해당 알림서비스 호출할 것

# .예약관리

- timeslot 형태로 데이타 구성중(supabase내 timeslot)
- lambda+fast api로 일괄 타임슬롯생성 API 구성(nextjs에서 호출)
- eventbridge+lambda 통해서 주기적으로 timeslot 연장해주는 event 구성(하루1회 작동)

# 4. 인증 관리

- AUTH 관련된 사항은 Supabase 기반으로 구성
- 아래 URL 기반으로 참고하여 구성할것

https://supabase.com/docs/reference/javascript/introduction

- middleware 기반으로 client, master, expert가 구분되어 role 구성
- supabase 내에 profiles 테이블에 보면 role 기능이 구성되어있으니 참고 요망
- OAUTH 관련 kakao, google은 supabase 내장 기능을 이용, naver는 직접 OAUTH2 구현
- 
## TODO

- `/inquiries` : 고객 예약 페이지
  - checkout 페이지로 넘어가기 직전 DB에 create 또는 update 작업을 추가할 것
- `/inquiries/checkout` : 결제 페이지 (토스페이먼츠 페이지)
- `inquiries/complete` :  결제완료 페이지
- `/admin/schedule` : admin의 스케줄 페이지 수정할 것
  - 본 페이지는 "예약가능, 예약불가" 기능을 담당한다
  - 테이블 기반의 예약 기능을 단순화한 UI로 변경할 것
- `/expert/schedule` : admin의 스케줄 페이지 수정할 것
  - 본 페이지는 "예약가능, 예약불가" 기능을 담당한다
  - 테이블 기반의 예약 기능을 단순화한 UI로 변경할 것
  - URLSearchParams의 타입슬롯은 ID는 3개인데 실제로 db의 reservation 테이블에 삽입되는 time slot id는 1개인지 체크할 것


- 파일 제거할 것
  - `* copy.js` 포멧의 파일 전부 제거할 것. 제거하기 전

- JS 파일을 전부 TS로 변경할 것
- tsconfig.json 의 strictNullCheck는 맨 마지막에 해제할 것
- eslint 적용할 것 (맨 마지막에 처리할 것것)