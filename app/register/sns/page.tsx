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
import { Z_INDEX } from '@/constants/constants';

export default function Login() {
  const router = useRouter();
  const supabase = createClient();

  // 입력 필드 상태 관리
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formBirth, setFormBirth] = useState('');
  const [formGender, setFormGender] = useState('');
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

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
  const handleAllConsent = ({ isSelected, isSwitch }: { isSelected?: boolean; isSwitch?: boolean }) => {
    if (isSwitch) {
      setAllConsent(!allConsent);
      setTermsConsent(!allConsent);
      setPrivacyConsent(!allConsent);
      setMarketingConsent(!allConsent);
      setEmailConsent(!allConsent);
      setSmsConsent(!allConsent);
    } else if (typeof isSelected === 'boolean') {
      setAllConsent(isSelected);
      setTermsConsent(isSelected);
      setPrivacyConsent(isSelected);
      setMarketingConsent(isSelected);
      setEmailConsent(isSelected);
      setSmsConsent(isSelected);
    }
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
      setFormSubmitLoading(true);

      let isInvalidForm = false;

      // 필수 입력 필드 검증

      const formNameTrimmed = formName.trim();
      if (formNameTrimmed == null || formNameTrimmed.length === 0) {
        toast.error('이름을 입력해주세요.');
        isInvalidForm = true;
      }

      if (formNameTrimmed.length > 10) {
        toast.error('이름은 10자 이내로 입력해주세요.');
        isInvalidForm = true;
      }

      const formPhoneRefined = formPhone.replace(/[^0-9]/g, '');
      if (!formPhoneRefined || formPhoneRefined.length === 0) {
        toast.error('휴대폰번호를 입력해주세요.');
        isInvalidForm = true;
      } else if (formPhoneRefined.length !== 11) {
        toast.error('휴대폰번호는 11자리 숫자여야 합니다.');
        isInvalidForm = true;
      }

      const formBirthRefined = formBirth.replace(/[^0-9]/g, '');

      if (formBirthRefined == null || formBirthRefined.length === 0) {
        toast.error('생년월일을 입력해주세요.');
        isInvalidForm = true;
      } else if (formBirthRefined.length !== 8) {
        toast.error('생년월일은 8자리 숫자여야 합니다.');
        isInvalidForm = true;
      }

      if (!formGender) {
        toast.error('성별을 선택해주세요.');
        isInvalidForm = true;
      } else if (formGender !== 'male' && formGender !== 'female') {
        toast.error('성별 입력값이 올바르지 않습니다.');
        isInvalidForm = true;
      }

      // 필수 체크박스 검증
      if (!isOver14) {
        toast.error('14세 이상 동의가 필요합니다.');
        isInvalidForm = true;
      }

      if (!termsConsent) {
        toast.error('이용약관 동의가 필요합니다.');
        isInvalidForm = true;
      }

      if (!privacyConsent) {
        toast.error('개인정보 수집 및 이용동의가 필요합니다.');
        isInvalidForm = true;
      }

      if (isInvalidForm) {
        setFormSubmitLoading(false);
        return;
      }

      // 현재 로그인한 사용자 정보 가져오기
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        toast.error('로그인 정보를 가져오는데 실패했습니다.');
        console.error(userError);
        setFormSubmitLoading(false);
        return;
      }

      if (!userData.user) {
        toast.error('로그인이 필요합니다.');
        setFormSubmitLoading(false);
        return;
      }

      // Supabase profiles 테이블 업데이트
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name: formNameTrimmed,
          phone: formPhoneRefined,
          birth: formBirthRefined,
          gender: formGender,
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
        setFormSubmitLoading(false);
        return;
      }

      toast.success('회원가입이 완료되었습니다!');

      // 잠시 후 메인 페이지로 리다이렉트
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('가입 중 오류 발생:', error);
      toast.error('처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      setFormSubmitLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Freesentation-9Black' }} className="my-32 flex h-full w-full flex-col items-center justify-center">
      <ToastContainer
        style={{
          zIndex: Z_INDEX.TOAST,
        }}
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
                value={formName}
                onChange={e => setFormName(e.target.value)}
                type="text"
                isRequired
                variant="bordered"
                className="w-full"
                placeholder="이름을 입력해 주세요."
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <div>휴대폰번호</div>
            <div className="flex w-full flex-row items-start justify-start gap-x-4">
              <Input
                value={formPhone}
                onChange={e => setFormPhone(e.target.value)}
                type="tel"
                isRequired
                variant="bordered"
                className="w-full"
                placeholder="예) 01000000000"
              />
            </div>
            <div className="pt-2 text-[14px] text-red-600">강습 일정을 위해 강사님이 직접 연락드립니다. 꼭 본인과 연락 가능한 전화번호를 입력해주세요.</div>
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <div>생년월일</div>
            <div className="flex w-full flex-row items-start justify-start gap-x-4">
              <Input
                value={formBirth}
                onChange={e => setFormBirth(e.target.value)}
                type="tel"
                isRequired
                variant="bordered"
                className="w-full"
                placeholder="예) 19880101"
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <div>성별</div>
            <div className="flex w-full flex-row items-start justify-start gap-x-4">
              <RadioGroup orientation="horizontal" isRequired value={formGender} onChange={e => setFormGender(e.target.value)}>
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
                <Checkbox isSelected={allConsent} onValueChange={e => handleAllConsent({ isSelected: e })} />
                <span onClick={() => handleAllConsent({ isSwitch: true })} className="ml-2 cursor-pointer">
                  전체동의
                </span>
              </div>

              {/* First consent group */}
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center">
                  <Checkbox isSelected={termsConsent} onValueChange={setTermsConsent} />
                  <span className="ml-2 cursor-pointer" onClick={() => setTermsConsent(!termsConsent)}>
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
                  <span className="ml-2 cursor-pointer" onClick={() => setPrivacyConsent(!privacyConsent)}>
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
                    <span className="ml-2 cursor-pointer" onClick={() => handleMarketingConsent(!marketingConsent)}>
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

                    <span
                      className="ml-2 cursor-pointer text-medium"
                      onClick={() => {
                        if (!marketingConsent) return;
                        setEmailConsent(!emailConsent);
                      }}
                    >
                      이메일
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Checkbox isSelected={smsConsent} onValueChange={setSmsConsent} isDisabled={!marketingConsent} />
                    <span
                      className="ml-2 cursor-pointer text-medium"
                      onClick={() => {
                        if (!marketingConsent) return;
                        setSmsConsent(!smsConsent);
                      }}
                    >
                      SMS
                    </span>
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
            isLoading={formSubmitLoading}
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
