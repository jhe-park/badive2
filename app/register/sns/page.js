"use client";

import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Button,
  Input,
  Checkbox,
  Divider,
  Form,
  Radio,
  RadioGroup,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { contents } from "./contents";
export default function Login() {
  // URLSearchParams를 사용하여 문자열을 파싱합니다.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
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
  const handleAllConsent = (isSelected) => {
    setAllConsent(isSelected);
    setTermsConsent(isSelected);
    setPrivacyConsent(isSelected);
    setMarketingConsent(isSelected);
    setEmailConsent(isSelected);
    setSmsConsent(isSelected);
  };

  // 개별 체크박스 상태 변경 시 전체동의 체크박스 상태 업데이트
  useEffect(() => {
    if (
      termsConsent &&
      privacyConsent &&
      marketingConsent &&
      emailConsent &&
      smsConsent
    ) {
      setAllConsent(true);
    } else {
      setAllConsent(false);
    }
  }, [
    termsConsent,
    privacyConsent,
    marketingConsent,
    emailConsent,
    smsConsent,
  ]);

  // 마케팅 동의 체크박스 핸들러
  const handleMarketingConsent = (isSelected) => {
    setMarketingConsent(isSelected);
    if (!isSelected) {
      setEmailConsent(false);
      setSmsConsent(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "Freesentation-9Black" }}
      className="flex h-full  w-full flex-col items-center justify-center my-32"
    >
      <div className="flex flex-col items-center gap-y-5">
        <div>
          <p className="font-bold text-5xl">SNS 간편가입</p>
        </div>
      </div>
      <Divider className="w-[90%] md:w-full md:max-w-[654px] bg-black my-6 h-1"></Divider>
      <div className=" flex w-[90%] md:w-full md:max-w-[654px] flex-col gap-4 rounded-large bg-content1 ">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-start justify-start w-full">
            <div>이름</div>
            <div className="flex flex-row items-start justify-start w-full gap-x-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                isRequired
                variant="bordered"
                className="w-full"
                placeholder="이름 입력해 주세요."
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <div>휴대폰번호</div>
            <div className="flex flex-row items-start justify-start w-full gap-x-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="tel"
                isRequired
                variant="bordered"
                className="w-full"
                placeholder="01000000000"
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <div>생년월일</div>
            <div className="flex flex-row items-start justify-start w-full gap-x-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="tel"
                isRequired
                variant="bordered"
                className="w-full"
                placeholder="19880101"
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <div>성별</div>
            <div className="flex flex-row items-start justify-start w-full gap-x-4">
              <RadioGroup orientation="horizontal" isRequired>
                <Radio value="male">남자</Radio>
                <Radio value="female">여자</Radio>
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full my-6 gap-y-4">
            <div className="flex flex-row items-center justify-center w-full">
              <Checkbox
                isSelected={isOver14}
                onValueChange={setIsOver14}
              ></Checkbox>
              <div className="text-[20px] ">
                14세이상입니다.
                <span className="text-red-500">(필수)</span>
              </div>
            </div>
            <div className="text-[15px] text-center">
              ＊회원가입에 필요한 최소한의 정보만 입력 받음으로써 개인정보
              수집을 최소화하고 편리한 회원가입을 제공합니다.
            </div>
          </div>
          <div className="w-full md:max-w-[654px] ">
            <div className="border-2 border-gray-200 shadow-sm rounded-lg p-6 space-y-4">
              {/* Main consent checkbox */}
              <div className="flex items-center">
                <Checkbox
                  isSelected={allConsent}
                  onValueChange={handleAllConsent}
                />
                <span className="ml-2">전체동의</span>
              </div>

              {/* First consent group */}
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center">
                  <Checkbox
                    isSelected={termsConsent}
                    onValueChange={setTermsConsent}
                    
                  />
                  <span className="ml-2">
                    이용약관 동의<span className="text-danger-500">(필수)</span>
                  </span>
                </div>
                <button className="text-default-500 text-sm hover:underline" onClick={() => { setSelectedContents('rule'); onOpen(); }}>
                  내용보기
                </button>
              </div>

              {/* Second consent group */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    isSelected={privacyConsent}
                    onValueChange={setPrivacyConsent}
                  />
                  <span className="ml-2">
                    개인정보 수집 및 이용동의
                    <span className="text-danger-500">(필수)</span>
                  </span>
                </div>
                <button className="text-default-500 text-sm hover:underline" onClick={() => { setSelectedContents('privacy'); onOpen(); }}>
                  내용보기
                </button>
              </div>

              {/* Marketing consent group */}
              <div className="flex flex-col space-y-2 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      isSelected={marketingConsent}
                      onValueChange={handleMarketingConsent}
                    />
                    <span className="ml-2">
                      마케팅 목적의 개인정보 수집 및 이용 동의
                      <span className="text-sm">(선택)</span>
                    </span>
                  </div>
                  <button className="text-default-500 text-sm hover:underline" onClick={() => { setSelectedContents('marketing'); onOpen(); }}>
                    내용보기
                  </button>
                </div>

                {/* Sub-checkboxes */}
                <div className="ml-8 flex items-center space-x-4">
                  <div className="flex items-center">
                    <Checkbox
                      isSelected={emailConsent}
                      onValueChange={setEmailConsent}
                      isDisabled={!marketingConsent}
                    />
                    <span className="ml-2 text-medium">이메일</span>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      isSelected={smsConsent}
                      onValueChange={setSmsConsent}
                      isDisabled={!marketingConsent}
                    />
                    <span className="ml-2 text-medium">SMS</span>
                  </div>
                </div>
              </div>

              {/* Notice text */}
              <div className="text-default-400 text-sm space-y-1 pt-2">
                <p className="text-center">
                  ※마케팅 수신 동의 시, 바다이브와 관련된 소식을 받아보실 수
                  있으십니다.
                </p>
                <p className="text-center">단, 상품 구매 정보는 수신동의 여부 관계없이 발송됩니다.</p>
              </div>
            </div>
          </div>
          <SubmitButton
            className="w-full my-6 text-[30px] font-bold text-white h-20"
            color="primary"
            type="submit"
            // formAction={async (formData) => {
            //   'use server';
            //   await signInAction(formData, returnUrl);
            // }}
          >
            동의하고 가입완료
          </SubmitButton>
        </div>
      </div>
      <Modal size='2xl'  style={{ fontFamily: "Freesentation-9Black" }} isOpen={isOpen} onOpenChange={onOpenChange} className="h-[70vh] overflow-y-auto">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {contents[selectedContents].title}
              </ModalHeader>
              <ModalBody>
                <div dangerouslySetInnerHTML={{ __html: contents[selectedContents].content }}>

                </div>
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
