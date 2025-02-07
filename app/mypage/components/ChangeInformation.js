import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  SelectItem,
  Radio,
  RadioGroup,
  Divider,
} from "@nextui-org/react";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { programList } from "@/app/register/components/programlist";
import { programlist } from "@/app/register/components/programlist";
import DaumPostcode from 'react-daum-postcode';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";
export default function App({ profile }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [action, setAction] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birth, setBirth] = React.useState("");
  const [license, setLicense] = React.useState("");
  const [classWant1, setClassWant1] = React.useState("");
  const [classWant2, setClassWant2] = React.useState("");
  const [classWant3, setClassWant3] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [postCode, setPostCode] = React.useState("");
  const [firstAddress, setFirstAddress] = React.useState("");
  const [secondAddress, setSecondAddress] = React.useState("");
  const router = useRouter();
  

  const supabase = createClient();
  const handleChangePassword = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    console.log(data, error);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("비밀번호가 변경되었습니다.");
    }
  };

  const handleComplete = (data) => {
    // 주소 검색 완료 시 처리 로직
    console.log(data);
    setPostCode(data.zonecode); // 우편번호 설정
    setFirstAddress(data.address); // 기본주소 설정
    onOpenChange(false); // 모달 닫기
  };


  React.useEffect(() => {
    if (!profile) {
      console.log("프로필 정보가 없습니다.");
      return;
    }
    setName(profile?.name||"");
    setPhone(profile?.phone||"");
    setBirth(profile?.birth||"");
    setLicense(profile?.license||"");
    setClassWant1(profile?.classWant1||"");
    setClassWant2(profile?.classWant2||"");

    setClassWant3(profile?.classWant3||"");
    setGender(profile?.gender||"");
    setPostCode(profile?.postCode||"");
    setFirstAddress(profile?.firstAddress||"");
    setSecondAddress(profile?.secondAddress||"");



  }, [profile]);

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          name: name,
          phone: phone, 
          birth: birth,
          license: license,
          classWant1: classWant1,
          classWant2: classWant2,
          classWant3: classWant3,
          gender: gender,
          postCode: postCode,
          firstAddress: firstAddress,
          secondAddress: secondAddress
        })
        .eq('email', profile.email);

      if (error) {
        toast.error('정보 수정에 실패했습니다.');
        console.error(error);
        return;
      }

      toast.success('정보가 성공적으로 수정되었습니다.');
      router.refresh();
      
    } catch (error) {
      toast.error('오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:p-5 w-full">
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
      <div className="text-2xl font-bold w-full justify-center items-center text-center">
        비밀번호 수정
      </div>
      <Divider className="w-full bg-black h-0.5"></Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 w-full gap-y-5">
        <div className="flex flex-col">
          {/* <div>비밀번호</div> */}
          <Input
            label="비밀번호"
            name="username"
            placeholder="비밀번호"
            variant="bordered"
            type="password"
            className="w-full col-span-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={password !== passwordCheck}
          />
        </div>
        <div className="flex flex-col">
          {/* <div>비밀번호 확인</div> */}
          <Input
            label="비밀번호 확인"
            name="username"
            placeholder="비밀번호 확인"
            variant="bordered"
            type="password"
            className="w-full col-span-1"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            isInvalid={password !== passwordCheck}
          />
        </div>
      </div>
      {password !== passwordCheck && (
        <div className="text-red-500 text-sm">
          비밀번호가 일치하지 않습니다.
        </div>
      )}
      <div className="flex gap-2 w-full">
        <Button type="reset" variant="flat" className="w-full">
          취소
        </Button>
        <Button
          onPress={handleChangePassword}
          isDisabled={password !== passwordCheck}
          color="primary"
          type="submit"
          className="w-full"
        >
          확인
        </Button>
      </div>

      <div className="text-2xl font-bold w-full justify-center items-center text-center">
        내 정보 수정
      </div>
      <Divider className="w-full bg-black h-0.5"></Divider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 w-full gap-y-5">
        <div className="flex flex-col">
          {/* <div>이름</div> */}

          <Input
            label="이름"
            name="username"
            placeholder="홍길동동"
            type="text"
            variant="bordered"
            className="w-full col-span-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          {/* <div>휴대폰번호</div> */}
          <Input
            label="휴대폰번호"
            name="username"
            placeholder="010-1234-5678"
            type="text"
            variant="bordered"
            className="w-full col-span-1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />


        </div>
        <div className="flex flex-col">
          {/* <div>생년월일</div> */}
          <Input
            label="생년월일"
            name="username"
            placeholder="1980-01-01"
            type="text"
            variant="bordered"
            className="w-full col-span-1"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />

        </div>
        <div className="flex flex-col">
          {/* <div>보유한 라이센스</div> */}
          <Input
            label="보유한 라이센스"
            name="username"
            placeholder=""
            type="text"
            variant="bordered"
            className="w-full col-span-1"
            value={license}
            onChange={(e) => setLicense(e.target.value)}
          />

        </div>

        <div className="flex flex-col gap-2">
          {/* <div>희망하는 강습</div> */}
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            {/* <span>01.</span> */}
            <Select onChange={(e) => setClassWant1(e.target.value)} label="희망하는 강습1" variant="bordered" selectedKeys={[classWant1]}>
              {programlist.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}


            </Select>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center w-full">

            {/* <span>02.</span> */}
            <Select onChange={(e) => setClassWant2(e.target.value)} label="희망하는 강습2" variant="bordered" selectedKeys={[classWant2]}>



              {programlist.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </Select>

          </div>
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            {/* <span>03.</span> */}
            <Select onChange={(e) => setClassWant3(e.target.value)} label="희망하는 강습3" variant="bordered" selectedKeys={[classWant3]}>


              {programlist.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}

            </Select>
          </div>
        </div>
        <div className="flex flex-col">
          {/* <div>성별</div> */}
          <RadioGroup
            label="성별"
            orientation="horizontal"
            className="w-full border-2 border-gray-200 rounded-xl p-4"
            value={gender}
            onChange={(e) => setGender(e.target.value)}



          >
            <Radio key="male" value="male">남</Radio>
            <Radio key="female" value="female">여</Radio>
          </RadioGroup>
        </div>

        {/* <div className="flex flex-col">
          <Input
            label="이메일"
            name="email"
            placeholder="abcd1234@naver.com"
            type="text"
            variant="bordered"
            className="w-full col-span-1"
          />
        </div> */}
        <div className="flex flex-col gap-y-5">
          {/* <div>주소</div> */}
          <div className="flex flex-row gap-2 justify-start items-center w-full">
            <Input
              name="address"
              label="우편번호"
              placeholder="10265"
              type="text"
              variant="bordered"
              className="w-full col-span-1"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}

            />
            <Button onPress={onOpenChange}>주소검색</Button>
          </div>

          <div>
            {/* <div>상세주소</div> */}
            <Input
              name="detailAddress"
              placeholder="서울특별시 강남구 개포로로"
              label="기본주소"
              type="text"
              variant="bordered"
              className="w-full col-span-1"
              value={firstAddress}
              onChange={(e) => setFirstAddress(e.target.value)}


            />
          </div>
          <div>
            {/* <div>상세주소</div> */}
            <Input
              name="detailAddress"
              placeholder="상세주소"
              label="개포동동"
              type="text"
              variant="bordered"
              className="w-full col-span-1"
              value={secondAddress}
              onChange={(e) => setSecondAddress(e.target.value)}
            />

          </div>
        </div>


      </div>

      <div className="flex gap-2 w-full">
        <Button type="reset" variant="flat" className="w-full">
          취소
        </Button>
        <Button onPress={handleSubmit} color="primary" type="submit" className="w-full">
          확인
        </Button>
      </div>

      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>주소 검색</ModalHeader>
          <ModalBody>
            <DaumPostcode onComplete={handleComplete} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => onOpenChange(false)}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
