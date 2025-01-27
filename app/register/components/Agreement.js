import { Checkbox, Link, Button, ScrollShadow } from "@heroui/react";
import { useRouter } from "next/navigation";
import useStep from "@/app/store/useStep";

export default function Agreement() {
  const router = useRouter();
    const { step, setStep } = useStep();
    const handleNext = () => {
    setStep(step + 1);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="text-5xl font-bold">약관동의</div>
      <Checkbox>
        이용약관 동의<span className="text-red-500 font-bold">(필수)</span>
      </Checkbox>

      <div className="w-full h-[20vh] border-1 border-black rounded-lg p-6 overflow-y-auto scrollbar-hide">
        <p>이용약관</p>
        <p>제1조 목적</p>
        <p>
          본 이용약관은 “BDN DIVE”(이하 "BDN DIVE")의 서비스의 이용조건과 운영에
          관한 제반 사항 규정을 목적으로 합니다.
        </p>

        <p>제2조 용어의 정의</p>
        <p>본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.</p>
      </div>
      <Checkbox>
        개인정보 수집 및 이용 동의
        <span className="text-red-500 font-bold">(필수)</span>
      </Checkbox>
      <div className="w-full h-[30vh] border-1 border-black rounded-lg p-6 overflow-y-auto scrollbar-hide">
        <p>개인정보 수집 및 이용동의</p>

        <p>1. 개인정보 수집목적 및 이용목적</p>

        <p>
          (1) 홈페이지 회원 가입 및 관리
          <br />
          회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증,
          회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스
          부정 이용 방지, 만 14세 미만 아동의 개인정보 처리시 법정대리인의 동의
          여부 확인, 각종 고지․통지, 고충 처리 등의 목적
        </p>

        <p>
          (2) 재화 또는 서비스 제공
          <br />
          물품 배송, 서비스 제공, 계약서․청구서 발송, 콘텐츠 제공, 맞춤 서비스
          제공, 본인인증, 연령인증, 요금 결제 및 정산, 채권추심 등의 목적
        </p>
      </div>
      <Checkbox>이용약관, 개인정보 수집 및 이용에 모두 동의합니다.</Checkbox>
      <Checkbox>
        만 14세 이상입니다.
        <span className="text-red-500 font-bold">(필수)</span>
      </Checkbox>
      <div className="flex justify-center items-center gap-5 w-full">
        <Button className="w-1/4" color="" variant='bordered' type="button">
          취소
        </Button>
        <Button onPress={handleNext} className="w-1/4" color="primary" type="button">
          가입하기
        </Button>
      </div>
    </div>
  );
}
