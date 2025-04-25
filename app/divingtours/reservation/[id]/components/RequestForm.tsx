'use client';

import { checkIsValidEmail } from '@/utils/checkIsValidEmail';
import { createClient } from '@/utils/supabase/client';
import {
  Button,
  cn,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  ScrollShadow,
  Select,
  SelectItem,
  useDisclosure,
} from '@heroui/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function RequestForm({ className, tourData, user, ...props }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('male');
  const [birth, setBirth] = useState('');
  const [region, setRegion] = useState('');
  const [license, setLicense] = useState('');
  const [callTime, setCallTime] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState<null | 'agree' | 'disagree'>(null);

  const handleSubmit = () => {
    if (agree !== 'agree') {
      toast.error('개인정보 수집 및 이용 동의서를 확인 후 동의 해주세요');
      return;
    }

    let isInvalidForm = false;

    const nameTrimmed = name.trim();

    if (nameTrimmed === '') {
      toast.error('이름을 입력해주세요');
      isInvalidForm = true;
    } else if (nameTrimmed.length < 2) {
      toast.error('이름은 2자 이상 입력해주세요');
      isInvalidForm = true;
    }

    const formPhoneRefined = phone.replace(/[^0-9]/g, '');

    if (!formPhoneRefined || formPhoneRefined.length === 0) {
      toast.error('휴대폰번호를 입력해주세요.');
      isInvalidForm = true;
    } else if (formPhoneRefined.length !== 11) {
      toast.error('휴대폰번호는 11자리 숫자여야 합니다.');
      isInvalidForm = true;
    }

    const formBirthRefined = birth.replace(/[^0-9]/g, '');

    if (formBirthRefined == null || formBirthRefined.length === 0) {
      toast.error('생년월일을 입력해주세요.');
      isInvalidForm = true;
    } else if (formBirthRefined.length !== 8) {
      toast.error('생년월일은 8자리 숫자여야 합니다.');
      isInvalidForm = true;
    }

    if (gender !== 'male' && gender !== 'female') {
      toast.error('성별을 선택해주세요');
      isInvalidForm = true;
    }

    const regionTrimmed = region.trim();
    if (regionTrimmed === '') {
      toast.error('지역을 입력해주세요');
      isInvalidForm = true;
    } else if (regionTrimmed.length < 2) {
      toast.error('지역은 2자 이상 입력해주세요');
      isInvalidForm = true;
    }

    const licenseTrimmed = license.trim();
    if (licenseTrimmed === '') {
      toast.error('보유한 라이센스를 입력해주세요');
      isInvalidForm = true;
    }

    const callTimeTrimmed = callTime.trim();
    if (callTimeTrimmed === '') {
      toast.error('통화가능시간을 입력해주세요');
      isInvalidForm = true;
    }

    if (email === '') {
      toast.error('이메일을 입력해주세요');
      isInvalidForm = true;
    } else if (checkIsValidEmail(email) === false) {
      toast.error('이메일 형식이 올바르지 않습니다');
      isInvalidForm = true;
    }

    if (isInvalidForm) {
      return;
    }

    if (agree) {
      const handleRequest = async () => {
        const { data, error } = await supabase.from('request').insert({
          name: nameTrimmed,
          phone: formPhoneRefined,
          gender,
          birth: formBirthRefined,
          region: regionTrimmed,
          license: licenseTrimmed,
          callTime: callTimeTrimmed,
          email,
          user_id: user?.user?.id,
          tour_id: tourData.id,
          status: '예약완료',
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        try {
          const params = {
            receiver: email,
            name: name,
            title: tourData.title,
            date: new Date().toISOString().split('T')[0],
          };

          const headers = {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          };

          const emailResponse = await axios.post('https://krlq3wpvv4lwwotsnrztvemeye0tuohg.lambda-url.ap-northeast-2.on.aws/send-email', null, {
            params: params,
            headers: headers,
          });

          if (emailResponse.status !== 200) {
            throw new Error('이메일 전송 실패');
          }
        } catch (error) {
          toast.error('이메일 전송 중 오류가 발생했습니다');
          return;
        }

        const { data: requestData, error: requestError } = await supabase
          .from('tour')
          .update({
            current_participants: tourData.current_participants + 1,
          })
          .eq('id', tourData.id);

        if (requestError) {
          toast.error(requestError.message);
          return;
        }

        router.push(`/divingtours/reservation/complete`);
      };
      handleRequest();
    } else {
      onOpen();
    }
  };

  return (
    <div className="flex w-[90vw] flex-col items-center justify-center gap-y-12 md:w-[60vw]">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="text-4xl font-bold leading-9 text-default-foreground">{tourData.title} 신청하기</div>

      <div className="w-full rounded-lg bg-gray-100 p-6 py-4 text-default-500">
        <p>이 신청서를 작성하신 분들만 다이빙 투어를 참가하실 수 있으십니다.</p>
        <p>참석확정 여부는 00월 00일까지 카카오톡 or 문자로 연락드리도록 하겠습니다.</p>
        <p>
          <span className="text-red-500">*</span>는 필수항목 입니다.
        </p>
        <p className="py-1 font-bold text-red-500">보유한 라이센스가 없으신 분들은 투어 신청이 불가능합니다 </p>
      </div>

      <div className={cn('flex grid w-full grid-cols-12 flex-col gap-4 py-8', className)} {...props}>
        <Input
          variant="bordered"
          className="col-span-12 md:col-span-6"
          label="신청자"
          name="company-name"
          placeholder="이름을 입력해주세요"
          isRequired
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          variant="bordered"
          className="col-span-12 md:col-span-6"
          label="연락처"
          name="contact"
          placeholder="01000000000"
          isRequired
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />

        <Select
          classNames={{
            base: 'col-span-12 md:col-span-6 ',
          }}
          variant="bordered"
          label="성별"
          name="gender"
          placeholder="성별을 선택해주세요"
          labelPlacement="inside"
          isRequired
          selectedKeys={[gender]}
          onChange={e => setGender(e.target.value)}
        >
          <SelectItem key="male" value="male">
            남
          </SelectItem>
          <SelectItem key="female" value="female">
            여
          </SelectItem>
        </Select>
        <Input
          className="col-span-12 md:col-span-6"
          variant="bordered"
          label="생년월일"
          name="age"
          placeholder="19880101"
          isRequired
          value={birth}
          onChange={e => setBirth(e.target.value)}
        />
        <Input
          className="col-span-12 md:col-span-6"
          variant="bordered"
          label="지역(서울,경기,대전 등)"
          name="location"
          placeholder="지역을 입력해주세요"
          isRequired
          value={region}
          onChange={e => setRegion(e.target.value)}
        />
        <Input
          className="col-span-12 md:col-span-6"
          variant="bordered"
          label="보유한 라이센스"
          name="license"
          placeholder="보유한 라이센스를 입력해주세요"
          isRequired
          value={license}
          onChange={e => setLicense(e.target.value)}
        />
        <Input
          className="col-span-12 md:col-span-6"
          variant="bordered"
          label="통화가능시간"
          name="call-time"
          placeholder="통화가능시간을 입력해주세요"
          isRequired
          value={callTime}
          onChange={e => setCallTime(e.target.value)}
        />
        <Input
          className="col-span-12 md:col-span-6"
          variant="bordered"
          label="이메일(투어 관련 정보 수신용)"
          name="email"
          placeholder="이메일을 입력해주세요"
          isRequired
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-y-4">
        <div className="text-3xl font-bold">개인정보 수집 · 이용 동의서</div>

        <Divider className="w-full" />
        <ScrollShadow hideScrollBar className="max-h-[50vh] w-full">
          <PrivacyContent />
        </ScrollShadow>
        <RadioGroup orientation="horizontal" onChange={e => setAgree(e.target.value as any)}>
          <Radio value="agree">동의함</Radio>
          <Radio value="disagree">동의하지 않음</Radio>
        </RadioGroup>
      </div>

      <div className="my-4 flex w-full flex-col items-center justify-end gap-y-4">
        <Button color="primary" className="w-full" onPress={handleSubmit}>
          신청하기
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">알람</ModalHeader>
              <ModalBody>
                <p>개인 정보 수집 및 이용 동의서를 확인 후 동의 해주세요</p>
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

const PrivacyContent = () => (
  <div>
    <p>□개인정보의 수집 ·이용에 관한 일반사항</p>
    <p>○ 수집 ·이용 목적: 이용 대상자 확인 및 자격여부 확인</p>
    <p>○ 수집 ·이용 할 개인정보의 항목 : 성명, 생년월일, 휴대폰 번호 등</p>
    <p>○ 개인정보의 보유 및 이용기간 : 1년</p>
    <br />
    <p>□동의하지 않을 권리 및 미동의시 불이익</p>
    <p>○다이빙 투어 신청자는 개인정보의 수집 ·이용에 대한 동의를 거부할 권리가 있으나 동의하지 않을 경우 다이빙 투어 신청 접수가 거부될 수 있습니다.</p>
    <br />
    <p>
      본인은 BADIVE 다이빙투어를 신청함에 있어 상기 내용에 대하여 충분히 인지 하였으며, 기관의 개인정보 수집 및 이용, 준수사항 및 동의서 일체에 동의 합니다.
    </p>
    <br />
    <br />
    <p>위 내용에 모두 동의하시겠습니까?</p>
  </div>
);
