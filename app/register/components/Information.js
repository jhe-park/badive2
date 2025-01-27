import React from "react";
import { Divider } from "@heroui/react";
import {
  RadioGroup,
  Radio,
  Input,
  Button,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
} from "@heroui/react";
import useStep from "@/app/store/useStep";
import { useRouter } from "next/navigation";
export default function Information() {
  const router = useRouter();
  const { step, setStep } = useStep();
  const handleNext = () => {
  setStep(step + 1);
};
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <div className="flex flex-col gap-2">
        <p className="text-black text-5xl font-bold">필수입력 정보</p>
        <p className="text-black text-md">
          필수 항목이므로 반드시 입력해 주시기 바랍니다.
        </p>
      </div>
      <Divider className="w-full h-0.5 bg-black" />
      <div className="flex flex-col gap-2 w-[50vw]">
        <div className="flex flex-col items-start justify-start w-full">
          <div>아이디</div>
          <div className="flex flex-row items-start justify-start w-full gap-x-4">
            <Input className="w-full" placeholder="아이디를 입력해 주세요." />
            <Button className="w-[10%]">중복확인</Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>패스워드</div>
          <div className="flex flex-col items-start justify-start w-full">
            <Input className="w-full" placeholder="패스워드를 입력해 주세요." />
            <p>
              ※ 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합하여
              설정해주세요 (8~16자)
            </p>
            <p>
              ※ 아이디와 4자리 이상 동일하거나, 4자리 이상 반복되는 문자와
              숫자는 사용이 불가합니다.
            </p>
            <p>
              ※ 사용 가능 특수 문자: !, ", #, $, %, (), *, +, ,, -, ., /, :,
              &apos;, &lt;, =, &gt;, ?, @, ^, `, {}, [], ~
            </p>
          </div>
        </div>
        <div>
          <div>패스워드 확인</div>
          <div>
            <Input
              placeholder="패스워드를 입력해 주세요."
              labelPlacement="outside"
            />
          </div>
        </div>
        <div>
          <div>이름</div>
          <div>
            <Input
              placeholder="이름을 입력해 주세요."
              labelPlacement="outside"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-full">
          <div>휴대폰번호</div>
          <div className="flex flex-row gap-2 justify-start items-end w-full">
            <Input placeholder="010-1234-5678" />
            
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-full">
          <div>생년월일</div>
          <div className="flex flex-row gap-2 justify-start items-end w-full">
            <Input placeholder="1980-01-01" />
            
          </div>
          <div></div>
        </div>

        <div className="flex flex-col gap-2 justify-start items-start w-full">
          <div>보유한 라이센스</div>
          <div className="flex flex-row gap-2 justify-start items-end w-full">
            <Input placeholder="" labelPlacement="outside" className="w-full" />
          </div>
        </div>
        <div>
          <div>희망하는 강습</div>
          <div className="flex flex-col gap-2 justify-start items-end w-full">
            <div className="flex flex-row gap-2 justify-start items-center w-full">
              <span>01.</span>
              <Select>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </Select>
            </div>
            <div className="flex flex-row gap-2 justify-start items-center w-full">
              <span>02.</span>
              <Select>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </Select>
            </div>
            <div className="flex flex-row gap-2 justify-start items-center w-full">
              <span>03.</span>
              <Select>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </Select>
            </div>
            <div className="flex w-full justify-start">
              *한가지 이상 필수록 선택해주시기 바랍니다.
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start items-start w-full">
            <div>성별</div>
            <div>
              <RadioGroup orientation="horizontal">
                <Radio value="male">남성</Radio>
                <Radio value="female">여성</Radio>
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start items-start w-full">
            <div>광고 및 마케팅 수신 동의(선택)</div>
            <div>
              <CheckboxGroup
                color="primary"
                defaultValue={["email"]}
                orientation="horizontal"
              >
                <Checkbox value="sms">문자 승인</Checkbox>
                <Checkbox value="email">이메일 승인</Checkbox>
              </CheckboxGroup>
              <div className="flex w-full justify-start text-xs">
                *수신 동의 시 BDN 소식을 빠르게 받아보실 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-black text-5xl font-bold">선택정보 입력</p>
      </div>
      <Divider className="w-full h-1 bg-black" />
      <div className="flex flex-col gap-2 w-[50vw]">
        <div className="flex flex-col items-start justify-start w-full">
          <div>이메일</div>
          <div className="flex flex-row items-center justify-start w-full gap-x-4">
            <Input className="w-full" placeholder="이메일을 입력해 주세요." />
            <div>@</div>
            <Input className="w-full" placeholder="이메일을 입력해 주세요." />
            <Select>
              <SelectItem value="naver.com">naver.com</SelectItem>
              <SelectItem value="gmail.com">gmail.com</SelectItem>
              <SelectItem value="daum.net">daum.net</SelectItem>
              <SelectItem value="manual">직접입력</SelectItem>
            </Select>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full">
          <div>주소</div>
          <div className="flex flex-col items-center justify-start w-full gap-x-4 gap-y-2">
            <div className="flex flex-row items-center justify-start w-full gap-x-4">
              <Input className="w-full" placeholder="" />
              <Button>주소 검색</Button>
            </div>

            <Input className="w-full" placeholder="" />
            <Input className="w-full" placeholder="" />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 w-full">
        <Button  className="w-1/4" color="" variant="bordered" type="button">
          취소
        </Button>
        <Button
          onPress={handleNext}
          className="w-1/4"
          color="primary"
          type="button"
        >
          가입하기
        </Button>
      </div>
    </div>
  );
}
