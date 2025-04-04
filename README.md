# Project badive

<img src="/public/logo/logo_big.png" width="100%" />
<!-- ![](/public/logo/logo.png) -->


본 프로젝트는 `https://www.badive.co.kr`의 구현체이다

스택 

- Next.js App Route (v 15.1.4이며 추후 버전업될 수 있음)
- Typescript 5.8
- 백엔드 FastAPI 
  - : Supabase 위주로 사용하였고, 알람톡/예약 기능 일의 경우 fast api + lambda로 api 구축
  - 본 API는 next.js의 Route Handler로 작성하여도 무방하나 이전 작성자가 해당 기능의 구현체를 이미 가지고 있던 상황이라 FastAPI로 작성했다고 함. 본 프로젝트에서 `알람톡/예약 기능`을 관리하고 싶다면 next.js의 Route Handler로 해당 기능을 재작성할 것
- 결제 모듈 : [토스페이먼트 v2](https://docs.tosspayments.com/guides/v2/payment-widget/integration)
- 정적파일 버킷 : AWS S3
- 서버 : Supabase
- 배포 플랫폼 : Vercel (서버리스 플랫폼)
- 로그인 : next-auth
- 도메인 : 가비야에서 구매하였음
- 카카오톡 알림 서비스 : [알리고](https://smartsms.aligo.in/)
  - 환불시 해당 알림서비스 호출할 것

## 그 외 개발관련 문서
- [기획서(PDF)](http://naver.me/GfCNuDIo)
- [피그마](https://www.figma.com/design/yo6vVmRLJSGXgWrpm3xTrn/BND-%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80_%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80%2C-%EC%96%B4%EB%93%9C%EB%AF%BC?node-id=0-1&t=dhMoTfKEbXrbEHHB-1)
- [피그마(서브페이지)](https://www.figma.com/design/LBkwOpjAxdEWo14DaAd6Bk/BDN-%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%9C%EB%B8%8C%ED%8E%98%EC%9D%B4%EC%A7%80?node-id=0-1&m=dev&t=davo5JCMO0E72klg-1)
- 개발자료공유(배너영상, 기타 필요한 대용량자료) : http://naver.me/xZVUO0Sz


## 사이트 구성

본 웹사이트는 3가지 기능으로 구분되어 있다
- 일반 웹사이트 및 예약 페이지
  - https://www.badive.co.kr/ 로 접속하면 보이는 페이지이며 핵심 기능은 예약 기능이다.
- 관리자 전용 페이지 (관리자 권한의 ID만 접근 가능하다)
  - 강사 스케줄 조정이 가능하다
- 강사전용 페이지 (강사 권한의 ID만 접근 가능하다)
  - 강사 스케줄 조정이 가능하다  - 

## .예약관리

- timeslot 형태로 데이타 구성중(supabase내 timeslot)
- lambda+fast api로 일괄 타임슬롯생성 API 구성(nextjs에서 호출)
- eventbridge+lambda 통해서 주기적으로 timeslot 연장해주는 event 구성(하루1회 작동)

## 로그인/OAuth 관련

- AUTH 관련된 사항은 Supabase 기반으로 구성
- 공식 문서는 [여기](https://supabase.com/docs/guides/auth)를 참조할 것 
- 지원하는 OAuth는 네이버, 카카오, 구글이며 카카오와 구글은 Supabase에서 기본적으로 지원한다. 네이버의 경우는 개발자 센터에서 key 발급하여 직접 구현이 필요하다.
- middleware 기반으로 client, master, expert가 구분되어 role 구성
- supabase 내에 profiles 테이블에 보면 role 기능이 구성되어있으니 참고 요망

# 결제 프로세스

결제는 타임슬롯(time_slot) 단위로 처리된다. 

예를 들어 `스쿠버다이빙 초급반`수업의 타임슬롯이 `2025년 1월 1일 오후 1시` 날짜에 존재한다면 수강 희망자는 이 타임슬롯에 예약할 수 있다.

각 타임슬롯에는 최대 수강 인원이 있으며 이 최대 수강 인원 이상인 경우 수강신청이 불가능하다

타임슬롯 선택 이후 checkout 페이지로 이동한다. 이동하기 전 uuid로 랜덤한 고유의 문자열을 생성하는데 이는 토스페이먼츠의 paymentId로 사용된다

checkout 페이지는 토스페이먼트의 결제창이다.

결제 이후 `결제가 완료되었다`는 안내 페이지로 이동한다.

결제완료와 동시에 DB의 reservation 테이블에 결제정보를 담은 row가 추가된다. 또한 해당 타임슬롯의 current_participants 숫자는 수강인원 숫자 만큼 증가된다.

즉 결제 프로세스에서 중요 역할을 하는 DB테이블은 reservation과 timeslot 테이블이다. 결제 과정에서 임시적으로 사용되는 테이블은 `pending_session`이다.

## DB 테이블 설명

- bye : 탈퇴한 유저 정보를 담고 있다
- instructor : 강사들의 정보를 담고 있다
- notification : 공지사항 정보를 담고 있다. 어드민 페이지에서 추가 가능하다
- order 테이블 : 사용하지 않는 테이블로 추정됨
- pending_session : 결제 도중에 사용되는 정보를 담고 있다. 결제 도중에만 사용된다
- profiles : 모든 회원 정보를 담고 있다. 어드민, 강사, 일반회원 등 모든 로그인 정보를 담고 있다.
- request : 강사들의 강사신청 정보를 보관한다
- requestInstructor : 사용하지 않는 테이블로 추정됨
- reservation : 결제 정보를 담고 있다. 토스페이먼트 처리 과정이 완료된 이후 결제성공 또는 결제대기 상태에 해당 추가된다
  - 강사 페이지에서 timeslot 정보를 수정하면 timeslot 테이블이 업데이트됨과 동시에 reservation테이블의 status 칼럼값 또한 수정된다 (status 정보가 "예약불가"로 변경되는 경우를 참조할 것)
- resort : 여행 정보를 담고 있다. 어드민 페이지에서 추가 가능
- timeslot : 예약할 수 있는 상세 날짜 정보를 담고 있다.
  - time_slot_id는 시간에 따라서 리니어하게 설정되어 있다. 예를 들어 특정 날짜의 오전 10시의 time_slot_id가 400000이라면 같은 날짜의 오전 11시 time_slot_id는 400001이다
- tour 페이지 : 여행 정보를 담고 있다. 어드민 페이지에서 추가 가능
- tour_input : 사용하지 않는 테이블로 추정됨

---

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