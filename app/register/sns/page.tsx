'use client';

import { createClient } from '@/utils/supabase/client';
import {
  Button,
  Checkbox,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contents } from './contents';

export default function Login() {
  const router = useRouter();
  const supabase = createClient();

  // 입력 필드 상태 관리
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // 체크박스 상태 관리
  const [isOver14, setIsOver14] = useState(false);
  const [allConsent, setAllConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [selectedContents, setSelectedContents] = useState(null);

  // 전체동의 체크박스 핸들러
  const handleAllConsent = isSelected => {
    setAllConsent(isSelected);
    setTermsConsent(isSelected);
    setPrivacyConsent(isSelected);
    setMarketingConsent(isSelected);
    setEmailConsent(isSelected);
    setSmsConsent(isSelected);
  };

  // 개별 체크박스 상태 변경 시 전체동의 체크박스 상태 업데이트
  useEffect(() => {
    if (termsConsent && privacyConsent && marketingConsent && emailConsent && smsConsent) {
      setAllConsent(true);
    } else {
      setAllConsent(false);
    }
  }, [termsConsent, privacyConsent, marketingConsent, emailConsent, smsConsent]);

  // 마케팅 동의 체크박스 핸들러
  const handleMarketingConsent = isSelected => {
    setMarketingConsent(isSelected);
    if (!isSelected) {
      setEmailConsent(false);
      setSmsConsent(false);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    try {
      setSubmitLoading(true);

      // 필수 입력 필드 검증
      if (!name.trim()) {
        toast.error('이름을 입력해주세요.');
        setSubmitLoading(false);
        return;
      }

      if (!phone.trim()) {
        toast.error('휴대폰번호를 입력해주세요.');
        setSubmitLoading(false);
        return;
      }

      if (!birth.trim()) {
        toast.error('생년월일을 입력해주세요.');
        setSubmitLoading(false);
        return;
      }

      if (!gender) {
        toast.error('성별을 선택해주세요.');
        setSubmitLoading(false);
        return;
      }

      // 필수 체크박스 검증
      if (!isOver14) {
        toast.error('14세 이상 동의가 필요합니다.');
        setSubmitLoading(false);
        return;
      }

      if (!termsConsent) {
        toast.error('이용약관 동의가 필요합니다.');
        setSubmitLoading(false);
        return;
      }

      if (!privacyConsent) {
        toast.error('개인정보 수집 및 이용동의가 필요합니다.');
        setSubmitLoading(false);
        return;
      }

      // 현재 로그인한 사용자 정보 가져오기
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        toast.error('로그인 정보를 가져오는데 실패했습니다.');
        console.error(userError);
        setSubmitLoading(false);
        return;
      }

      if (!userData.user) {
        toast.error('로그인이 필요합니다.');
        setSubmitLoading(false);
        return;
      }

      // Supabase profiles 테이블 업데이트
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name,
          phone,
          birth,
          gender,
          marketingSms: smsConsent,
          marketingEmail: emailConsent,
          marketingAgreement: marketingConsent,
          updated_at: new Date().toISOString(),
          snsRegister: true,
        })
        .eq('id', userData.user.id);

      if (updateError) {
        toast.error('프로필 업데이트에 실패했습니다.');
        console.error(updateError);
        setSubmitLoading(false);
        return;
      }

      toast.success('회원가입이 완료되었습니다!');

      // 잠시 후 메인 페이지로 리다이렉트
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('가입 중 오류 발생:', error);
      toast.error('처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      setSubmitLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Freesentation-9Black' }} className="my-32 flex h-full w-full flex-col items-center justify-center">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col items-center gap-y-5">
        <div>
          <p className="text-5xl font-bold">SNS 간편가입</p>
        </div>
      </div>
      <Divider className="my-6 h-1 w-[90%] bg-black md:w-full md:max-w-[654px]"></Divider>
      <div className="flex w-[90%] flex-col gap-4 rounded-large bg-content1 md:w-full md:max-w-[654px]">
        <div className="flex flex-col gap-3">
          <div className="flex w-full flex-col items-start justify-start">
            <div>이름</div>
            <div className="flex w-full flex-row items-start justify-start gap-x-4">
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                isRequired
                variant="bordered"
                className="w-full"
                placeholder="이름 입력해 주세요."
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <div>휴대폰번호</div>
            <div className="flex w-full flex-row items-start justify-start gap-x-4">
              <Input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                type="tel"
                isRequired
                variant="bordered"
                className="w-full"
                placeholder="01000000000"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <div>생년월일</div>
            <div className="flex w-full flex-row items-start justify-start gap-x-4">
              <Input
                value={birth}
                onChange={e => setBirth(e.target.value)}
                type="tel"
                isRequired
                variant="bordered"
                className="w-full"
                placeholder="19880101"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <div>성별</div>
            <div className="flex w-full flex-row items-start justify-start gap-x-4">
              <RadioGroup orientation="horizontal" isRequired value={gender} onChange={e => setGender(e.target.value)}>
                <Radio value="male">남자</Radio>
                <Radio value="female">여자</Radio>
              </RadioGroup>
            </div>
          </div>
          <div className="my-6 flex w-full flex-col items-start justify-start gap-y-4">
            <div className="flex w-full flex-row items-center justify-center">
              <Checkbox isSelected={isOver14} onValueChange={setIsOver14}></Checkbox>
              <div className="text-[20px]">
                14세이상입니다.
                <span className="text-red-500">(필수)</span>
              </div>
            </div>
            <div className="text-center text-[15px]">
              ＊회원가입에 필요한 최소한의 정보만 입력 받음으로써 개인정보 수집을 최소화하고 편리한 회원가입을 제공합니다.
            </div>
          </div>
          <div className="w-full md:max-w-[654px]">
            <div className="space-y-4 rounded-lg border-2 border-gray-200 p-6 shadow-sm">
              {/* Main consent checkbox */}
              <div className="flex items-center">
                <Checkbox isSelected={allConsent} onValueChange={handleAllConsent} />
                <span className="ml-2">전체동의</span>
              </div>

              {/* First consent group */}
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center">
                  <Checkbox isSelected={termsConsent} onValueChange={setTermsConsent} />
                  <span className="ml-2">
                    이용약관 동의<span className="text-danger-500">(필수)</span>
                  </span>
                </div>
                <button
                  className="text-sm text-default-500 hover:underline"
                  onClick={() => {
                    setSelectedContents('rule');
                    onOpen();
                  }}
                >
                  내용보기
                </button>
              </div>

              {/* Second consent group */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox isSelected={privacyConsent} onValueChange={setPrivacyConsent} />
                  <span className="ml-2">
                    개인정보 수집 및 이용동의
                    <span className="text-danger-500">(필수)</span>
                  </span>
                </div>
                <button
                  className="text-sm text-default-500 hover:underline"
                  onClick={() => {
                    setSelectedContents('privacy');
                    onOpen();
                  }}
                >
                  내용보기
                </button>
              </div>

              {/* Marketing consent group */}
              <div className="flex flex-col space-y-2 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox isSelected={marketingConsent} onValueChange={handleMarketingConsent} />
                    <span className="ml-2">
                      마케팅 목적의 개인정보 수집 및 이용 동의
                      <span className="text-sm">(선택)</span>
                    </span>
                  </div>
                  <button
                    className="text-sm text-default-500 hover:underline"
                    onClick={() => {
                      setSelectedContents('marketing');
                      onOpen();
                    }}
                  >
                    내용보기
                  </button>
                </div>

                {/* Sub-checkboxes */}
                <div className="ml-8 flex items-center space-x-4">
                  <div className="flex items-center">
                    <Checkbox isSelected={emailConsent} onValueChange={setEmailConsent} isDisabled={!marketingConsent} />
                    <span className="ml-2 text-medium">이메일</span>
                  </div>
                  <div className="flex items-center">
                    <Checkbox isSelected={smsConsent} onValueChange={setSmsConsent} isDisabled={!marketingConsent} />
                    <span className="ml-2 text-medium">SMS</span>
                  </div>
                </div>
              </div>

              {/* Notice text */}
              <div className="space-y-1 pt-2 text-sm text-default-400">
                <p className="text-center">※마케팅 수신 동의 시, 바다이브와 관련된 소식을 받아보실 수 있으십니다.</p>
                <p className="text-center">단, 상품 구매 정보는 수신동의 여부 관계없이 발송됩니다.</p>
              </div>
            </div>
          </div>
          <Button
            className="my-6 h-10 w-full text-[20px] font-bold text-white md:h-20 md:text-[30px]"
            color="primary"
            type="button"
            onPress={handleSubmit}
            isLoading={submitLoading}
          >
            동의하고 가입완료
          </Button>
        </div>
      </div>
      <Modal size="2xl" style={{ fontFamily: 'Freesentation-9Black' }} isOpen={isOpen} onOpenChange={onOpenChange} className="h-[70vh] overflow-y-auto">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">{contents[selectedContents]?.title}</ModalHeader>
              <ModalBody>
                <div dangerouslySetInnerHTML={{ __html: contents[selectedContents]?.content }}></div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  확인
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
