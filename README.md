# Project badive

<img src="/public/logo/logo_big.png" width="100%" />

본 프로젝트는 `https://www.badive.co.kr`의 구현체이다

## 개발관련 문서

- [기획서(PDF)](http://naver.me/GfCNuDIo)
- [피그마](https://www.figma.com/design/yo6vVmRLJSGXgWrpm3xTrn/BND-%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80_%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80%2C-%EC%96%B4%EB%93%9C%EB%AF%BC?node-id=0-1&t=dhMoTfKEbXrbEHHB-1)
- [피그마(서브페이지)](https://www.figma.com/design/LBkwOpjAxdEWo14DaAd6Bk/BDN-%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%9C%EB%B8%8C%ED%8E%98%EC%9D%B4%EC%A7%80?node-id=0-1&m=dev&t=davo5JCMO0E72klg-1)
- 개발자료공유(배너영상, 기타 필요한 대용량자료) : http://naver.me/xZVUO0Sz

## 스택

- Next.js App Route (v 15.1.4이며 추후 버전업될 수 있음)
- 상태관리 : Zustand
- Typescript 5.8
- 백엔드 FastAPI
  - DB는 Supabase 구축되었고, 알람톡/예약 기능 일의 경우 fast api + lambda로 api 구축
  - 본 API는 next.js의 Route Handler로 작성하여도 무방하나 이전 작성자가 해당 기능의 구현체를 이미 가지고 있던 상황이라 FastAPI로 작성했다고 함. 본 프로젝트에서 `알람톡/예약 기능`을 관리하고 싶다면 next.js의 Route Handler로 해당 기능을 재작성할 것
- 결제 모듈 : [토스페이먼트 v2](https://docs.tosspayments.com/guides/v2/payment-widget/integration)
- 정적파일 버킷 : AWS S3
- alert 대안 : react-toastify
- 로그인 : next-auth
- 카카오톡 알림 서비스 : [알리고](https://smartsms.aligo.in/)
  - 환불시 해당 알림서비스 호출할 것
- DB : Supabase (Postgresql의 wrapper 서비스이다)
- 배포 플랫폼 : Vercel (서버리스 플랫폼)
- 도메인 : 가비야에서 구매하였음

## 사이트 구성

본 웹사이트는 크게 3가지 기능으로 구분되어 있다

- 일반 웹사이트 및 예약 페이지
  - https://www.badive.co.kr/ 로 접속하면 보이는 페이지이며 핵심 기능은 예약 기능이다.
  - my페이지에서는 `예약취소` 기능을 제공한다
- 관리자 전용 페이지 (관리자 권한의 ID만 접근 가능하다)
  - 강사 스케줄 조정이 가능하다
- 강사전용 페이지 (강사 권한의 ID만 접근 가능하다)
  - 강사 스케줄 조정이 가능하다 -

## 로그인/OAuth 관련

- AUTH 관련된 사항은 Supabase 기반으로 구성
- 공식 문서는 [여기](https://supabase.com/docs/guides/auth)를 참조할 것
- 지원하는 OAuth는 네이버, 카카오, 구글이며 카카오와 구글은 Supabase에서 기본적으로 지원한다. 네이버의 경우는 개발자 센터에서 key 발급하여 직접 구현이 필요하다.
- middleware 기반으로 client, master, expert가 구분되어 role 구성
- supabase 내에 profiles 테이블에 보면 role 기능이 구성되어있으니 참고 요망

## 이미지 포멧에 대하여

본 웹사이트의 모든 이미지는 기존에 png 포멧이었으나 webp 포멧으로 변경되었다.

2025년 4월 4일 시점에서 모든 모던 브라우저는 avif 포멧을 지원하지만 아이폰 7(iOS 15)의 사파리 브라우저는 avif를 지원하지 않는다. 구형 브라우저 미지원 이슈가 남아있으므로 avif가 아닌 webp를 사용한다.

웹 브라우저의 avif 지원 현황은 [여기](https://caniuse.com/avif)를 참조할 것

## 예약기능

- 예약은 timeslot 단위로 관리된다. timeslot 데이터는 supabase의 timeslot 테이블을 참조할 것
- 타임슬롯 일괄 생성 API : 해당 기능은 파이썬 fast api로 구현되어 있고 이는 AMS Lambda에 배포되었다. 해당 기능은 next.js에서 호출된다.
- updateSlot API : 이 함수는 타임슬롯을 연장한다. AWS EventBridge + AMS Lambda기반으로 작성되어 있으며 하루 1회 주기적으로 호출된다. 아래 이미지 참조할 것

![](/public/for_readme/updateSlot.webp)

## 토스페이먼츠의 결제방식

상세는 [여기](https://docs.tosspayments.com/codes/enum-codes#%EA%B2%B0%EC%A0%9C%EC%88%98%EB%8B%A8-%EC%9D%91%EB%8B%B5-%ED%83%80%EC%9E%85)를 참조할 것

아래 목록에서 "계좌이체"로 결제한 경우 즉각적으로 "결제완료"가 되어서는 안되며 반드시 "입금대기" 상태가 되어야 한다

- CARD("카드"),
- TRANSFER("계좌이체")
- MOBILE_PHONE("휴대폰"),
- VIRTUAL_ACCOUNT("가상계좌"),
- CULTURE_GIFT_CERTIFICATE("문화상품권"),
- GAME_GIFT_CERTIFICATE("게임문화상품권"),
- BOOK_GIFT_CERTIFICATE("도서문화상품권"),

## 입금완료시 호출되는 토스페이먼츠의 webhook을 테스트하는 방법

입금완료시 토스페이먼츠의 개발자 페이지에 등록된 webhook으로 입급 정보가 전달된다.

이를 로컬 환경에서 테스트하기 위해서는 `ngrok`를 사용하도록 한다

상세는 [여기](https://dashboard.ngrok.com/get-started/setup/windows)를 참조할 것

## 토스페이먼츠의 가상계좌 사용시 이용자가 입금을 완료하였을 경우

이 경우 토스페이먼츠 측에서 webhook을 호출한다. 해당 웹훅은 POST request를 호출하며 post body에는 입금정보가 포함되어 있다. 데이터 포멧은 아래와 같다

```javascript
{
  createdAt: '2023-05-23T14:42:26.000000',
  secret: 'ps_Z1aOwX7K8mYpalqAGRwj8yQxzvNP',
  orderId: '3f9c765d-60ed-4735-8af5-ab9d1142a3e8',
  status: 'DONE',
  transactionKey: '83B3CD71DF004878066FEDCB7C21E775'
}
```

개발자는 자신의 토스페이먼츠 계정으로 로그인하여 webhook URL을 설정할 수 있다. 개발자는 개발용 URL과 production용 URL을 등록해야 하는데 개발용 URL의 경우는 ngrok를 사용하도록 한다

상세는 토스페이먼츠의 공식 가이드인 [여기](https://docs.tosspayments.com/blog/virtual-account-webhook)를 참조할 것

## 결제 프로세스

결제 프로세스는 `/inquiries` -> `/inquiries/checkout` -> `/inquiries/complete` 페이지의 순으로 이어진다

### `/inquiries` 페이지

결제는 타임슬롯(time_slot) 단위로 처리된다.

예를 들어 `스쿠버다이빙 초급반`수업의 타임슬롯이 `2025년 1월 1일 오후 1시` 날짜에 존재한다면 수강 희망자는 이 타임슬롯에 예약할 수 있다.

각 타임슬롯에는 최대 수강 인원이 있으며 이 최대 수강 인원 이상인 경우 수강신청이 불가능하다

타임슬롯 선택 이후 checkout 페이지로 이동한다. 이동 전 uuid로 랜덤한 고유의 문자열을 생성하는데 이는 토스페이먼츠의 paymentId로 사용된다
또한 기존의 레거시 코드에서는 `/inquiries/checkout` 페이지로 이동 전 DB의
`pending_session` 테이블에 새로운 row를 생성하였지만 이 코드는 현재 제거되었다.

`pending_session` 테이블은 결제 과정에서 임시적으로 사용되는 테이블이었지만
`pending_session` 테이블에 삽입될 데이터는 전역 상태변수로 대체되었으며 `/inquiries/checkout` 페이지에서는 전역 상태변수의 값을 참조한다.

### `/inquiries/checkout` 페이지

해당 페이지는 토스페이먼트에서 제공하는 결제 모듈을 호출한다.

결제 이후 `결제가 완료되었다`는 안내 페이지로 이동한다.

### `/inquiries/complete` 페이지

결제완료와 동시에 DB의 `reservation` 테이블에 결제정보를 담은 row가 추가된다. 또한 해당 타임슬롯의 `current_participants` 숫자는 수강인원 숫자 만큼 증가된다.

정리하면 결제 프로세스에서 중요 역할을 하는 DB테이블은 `reservation`과 `timeslot` 테이블이다.

이 두가지 테이블을 업데이트하는 프로세스는 반드시 트랜젝션 기반으로 수행되어야 하며 레이스 컨디션 방지 기능이 추가되어야 한다.

안타깝게도 supabase api는 쿼리빌더를 사용할 때 트랜잭션 기능을 사용할 수 없다. 하지만 Postgresql의 네이티브 쿼리문을 직접 작성한 후에 이 쿼리문을 Supabase API의 rpc 메소드로 호출하면 트랜잭션 처리가 가능하다. 상세 튜토리얼은 [여기](https://www.youtube.com/watch?v=xUeuy19a-Uw)를 참조할 것

DB 업데이트 이후 결제한 유저의 휴대폰 번호를 확인하여 휴대폰 번호가 존재한다면 알람톡을 보낸다.

## 결제 취소 프로세스

이 과정은 크게 2가지로 나뉜다

1. 토스페이먼츠 측에 취소 요청을 보낸다.
   1. 이 과정은 토스페이먼츠 API를 호출하는 것으로 수행된다
   2. 이 과정은 SECRET_KEY를 필요로 하므로 클라이언트가 아닌 서버사이드에서 수행되어야 한다
2. 위의 과정이 정상 처리되었으면 supabase DB의 테이블 값을 업데이트한다
   1. 업데이트할 테이블은 `reservation`과 `timeslot`이다.
   2. 위의 테이블 업데이트는 트랜젝션으로 처리되어야 한다. 하지만 supabase API는 트랜잭션 기능을 지원하지 않는다
   3. 그러므로 직접 SQL문을 작성하여 supabase에 등록을 해야 한다. 상세는 [여기](https://supabase.com/docs/guides/database/functions)를 참조할 것
   4. 구현되어 있는 함수명은 `cancel_reservation`이며 상세 코드는 다음과 같다

```plpgsql
CREATE OR REPLACE FUNCTION cancel_reservation(reservation_id INT, time_slot_id INT, participants_count INT)
RETURNS INT AS $$
DECLARE
  affected_rows INT;
BEGIN
    -- 예약 상태를 '취소완료'로 업데이트
    UPDATE reservation
    SET status = '취소완료'
    WHERE id = reservation_id;

    GET DIAGNOSTICS affected_rows = ROW_COUNT;
    IF affected_rows = 0 THEN
        RAISE EXCEPTION '해당 예약을 찾을 수 없습니다';
    END IF;

    -- 타임슬롯의 현재 참가자 수 감소 및 available 상태를 항상 TRUE로 설정
    UPDATE timeslot
    SET
        current_participants = current_participants - participants_count,
        available = TRUE
    WHERE id = time_slot_id;

    GET DIAGNOSTICS affected_rows = ROW_COUNT;
    IF affected_rows = 0 THEN
        RAISE EXCEPTION '해당 타임슬롯을 찾을 수 없습니다';
    END IF;

    -- 성공 시 1 반환
    RETURN 1;

EXCEPTION WHEN OTHERS THEN
    -- 실패 시 0 반환하고 예외 메시지 출력
    RAISE NOTICE 'Error: %', SQLERRM;
    RETURN 0;
END;
$$ LANGUAGE plpgsql;
```

코드에는 transaction 처리가 되어있지 않지만 supabase API에서 제공하는 `rpc` 메소드를 사용하면 자동으로 트랜잭션 처리된다.

위에 작성된 함수는 아래와 같이 호출된다

```typescript
await supabase.rpc('cancel_reservation', {
  reservation_id: selectedProgram.id,
  time_slot_id: selectedProgram.time_slot_id.id,
  participants_count: selectedProgram.participants,
});
```

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
