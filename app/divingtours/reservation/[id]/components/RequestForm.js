"use client";

import React from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { cn } from "@heroui/react";
import { ScrollShadow } from "@heroui/react";
import { Divider } from "@heroui/react";
import companyTypes from "./company-types";
import states from "./states";
import companyIndustries from "./company-industries";
import { RadioGroup, Radio } from "@heroui/react";
import { Button } from "@heroui/react";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { createClient } from "@/utils/supabase/client";
import axios from "axios";

export default function RequestForm({ className, tourData, user, ...props }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const supabase = createClient();

  const formRef = React.useRef(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [birth, setBirth] = useState("");
  const [region, setRegion] = useState("");
  const [license, setLicense] = useState("");
  const [callTime, setCallTime] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);


  const inputProps = {
    labelPlacement: "outside",
    classNames: {
      label:
        "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
    },
  };
  console.log('user22:',user)


  const handleSubmit = () => {
    if (name === "") {
      toast.error("이름을 입력해주세요");
      return;
    }

    if (phone === "") {
      toast.error("연락처를 입력해주세요");
      return;
    }

    if (birth === "") {
      toast.error("생년월일을 입력해주세요");
      return;
    }

    if (region === "") {
      toast.error("지역을 입력해주세요");
      return;
    }

    if (license === "") {
      toast.error("보유한 라이센스를 입력해주세요");
      return;
    }

    if (callTime === "") {
      toast.error("통화가능시간을 입력해주세요");
      return;
    }
    if (email === "") {
      toast.error("이메일을 입력해주세요");
      return;
    }

    if (agree) {
      const handleRequest = async () => {
        const { data, error } = await supabase.from("request").insert({
          name,
          phone,
          gender,
          birth,
          region,
          license,
          callTime,
          email,
          user_id:user?.user?.id,
          tour_id:tourData.id,
          status:"예약완료"
          
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
            date: new Date().toISOString().split('T')[0]
          };

          const headers = {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          };

          const emailResponse = await axios.post(
            'https://krlq3wpvv4lwwotsnrztvemeye0tuohg.lambda-url.ap-northeast-2.on.aws/send-email',
            null,
            {
              params: params,
              headers: headers
            }
          );

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
            current_participants: tourData.current_participants + 1 
          })
          .eq('id', tourData.id);

        if (requestError) {
          toast.error(requestError.message);
          return;
        }

          

        console.log('신청완료');
        router.push(`/divingtours/reservation/complete`);
      };
      handleRequest();
    } else {
      onOpen();
    }
  };

  return (
    <div className="w-[90vw] md:w-[60vw] flex flex-col items-center justify-center gap-y-12">
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
      <div className="text-4xl font-bold leading-9 text-default-foreground">
        {tourData.title} 신청하기
      </div>

      <div className="py-4 text-default-500 bg-gray-100 rounded-lg p-6 w-full">
        <p>※ 필리핀 코론 수중 프로필 촬영 다이빙 투어 신청서 작성 안내</p>
        <p>이 신청서를 작성하신 분들만 다이빙 투어를 참가하실 수 있으십니다.</p>
        <p>
          참석확정 여부는 00월 00일까지 카카오톡 or 문자로 연락드리도록
          하겠습니다.
        </p>
        <p>
          <span className="text-red-500">*</span>는 필수항목 입니다.
        </p>
      </div>

      <div
        className={cn(
          "flex grid grid-cols-12 flex-col gap-4 py-8 w-full",
          className
        )}
        {...props}
      >
        <Input
          variant="bordered"
          className="col-span-12 md:col-span-6"
          label="신청자"
          name="company-name"
          placeholder="이름을 입력해주세요"
          isRequired
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          variant="bordered"
          className="col-span-12 md:col-span-6"
          label="연락처"
          name="contact"
          placeholder="01000000000"
          isRequired
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Select
          classNames={{
            base: "col-span-12 md:col-span-6 ",
          }}
          variant="bordered"
          label="성별"
          name="gender"
          placeholder="성별을 선택해주세요"
          labelPlacement="inside"
          isRequired
          selectedKeys={[gender]}
          onChange={(e) => setGender(e.target.value)}
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
          onChange={(e) => setBirth(e.target.value)}
        />

        <Input
          className="col-span-12 md:col-span-6"
          variant="bordered"
          label="지역(서울,경기,대전 등)"
          name="location"
          placeholder="지역을 입력해주세요"
          isRequired
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />

        <Input
          className="col-span-12 md:col-span-6"
          variant="bordered"
          label="보유한 라이센스(보유한 라이센스가 없으신분들은 '없음'이라고 적어주시면 됩니다."
          name="license"
          placeholder="보유한 라이센스를 입력해주세요"
          isRequired
          value={license}
          onChange={(e) => setLicense(e.target.value)}
        />

        <Input
          className="col-span-12 md:col-span-6"
          variant="bordered"
          label="통화가능시간"
          name="call-time"
          placeholder="통화가능시간을 입력해주세요"
          isRequired
          value={callTime}
          onChange={(e) => setCallTime(e.target.value)}
        />
        <Input
          className="col-span-12 md:col-span-6"
          variant="bordered"
          label="이메일(투어 관련 정보 수신용)"
          name="email"
          placeholder="이메일을 입력해주세요"
          isRequired
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center gap-y-4">
        <div className="text-3xl font-bold">개인정보 수집 · 이용 동의서</div>

        <Divider className="w-full" />
        <ScrollShadow hideScrollBar className="w-full max-h-[50vh]">
          <PrivacyContent />
        </ScrollShadow>
        <RadioGroup
          orientation="horizontal"
          onChange={(e) => setAgree(e.target.value)}
        >
          <Radio value="agree">동의함</Radio>
          <Radio value="disagree">동의하지 않음</Radio>
        </RadioGroup>
      </div>

      <div className="w-full flex flex-col items-center justify-end gap-y-4 my-4">
        <Button color="primary" className="w-full" onPress={handleSubmit}>
          신청하기
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
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
    <p>
      ○다이빙 투어 신청자는 개인정보의 수집 ·이용에 대한 동의를 거부할 권리가
      있으나 동의하지 않을 경우 다이빙 투어 신청 접수가 거부될 수 있습니다.
    </p>
    <br />
    <p>
      본인은 BDN 필리핀 코론 수중 프로필 촬영 다이빙 투어를 신청함에 있어 상기
      내용에 대하여 충분히 인지 하였으며, 기관의 개인정보 수집 및 이용, 준수사항
      및 동의서 일체에 동의 합니다.
    </p>
    <br />
    <br />
    <p>위 내용에 모두 동의하시겠습니까?</p>
  </div>
);
