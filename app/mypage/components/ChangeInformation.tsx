import { programlist } from '@/app/register/components/programlist';
import { Z_INDEX } from '@/constants/constants';
import { createClient } from '@/utils/supabase/client';
import { TypeDBprofile } from '@/utils/supabase/dbTableTypes';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { Button, Checkbox, Divider, Input, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import { ToastContainer, toast } from 'react-toastify';

export default function App({ profile }: { profile: PostgrestSingleResponse<TypeDBprofile> }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [action, setAction] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [birth, setBirth] = React.useState('');
  const [license, setLicense] = React.useState('');
  const [classWant1, setClassWant1] = React.useState('');
  const [classWant2, setClassWant2] = React.useState('');
  const [classWant3, setClassWant3] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [postCode, setPostCode] = React.useState('');
  const [firstAddress, setFirstAddress] = React.useState('');
  const [secondAddress, setSecondAddress] = React.useState('');
  const [marketingSms, setMarketingSms] = React.useState(false);
  const [marketingEmail, setMarketingEmail] = React.useState(false);
  // const [email, setEmail] = React.useState('');
  const router = useRouter();

  const supabase = createClient();
  const handleChangePassword = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('비밀번호가 변경되었습니다.');
    }
  };

  const handleComplete = data => {
    // 주소 검색 완료 시 처리 로직
    setPostCode(data.zonecode); // 우편번호 설정
    setFirstAddress(data.address); // 기본주소 설정
    onOpenChange(); // 모달 닫기
  };

  React.useEffect(() => {
    if (!profile) {
      console.log('프로필 정보가 없습니다.');
      return;
    }
    setName(profile?.data.name || '');
    setPhone(profile?.data.phone || '');
    setBirth(profile?.data.birth || '');
    setLicense(profile?.data.license || '');
    setClassWant1(profile?.data.classWant1 || '');
    setClassWant2(profile?.data.classWant2 || '');

    setClassWant3(profile?.data.classWant3 || '');
    setGender(profile?.data.gender || '');
    setPostCode(profile?.data.postCode || '');
    setFirstAddress(profile?.data.firstAddress || '');
    setSecondAddress(profile?.data.secondAddress || '');
    setMarketingSms(profile?.data.marketingSms || false);
    setMarketingEmail(profile?.data.marketingEmail || false);
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
          secondAddress: secondAddress,
          marketingSms: marketingSms,
          marketingEmail: marketingEmail,
        })
        .eq('email', profile?.data.email);

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
    <div className="flex w-full flex-col gap-4 md:p-5">
      <ToastContainer
        style={{
          zIndex: Z_INDEX.TOAST,
        }}
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
      <div className="w-full items-center justify-center text-center text-2xl font-bold">비밀번호 수정</div>
      <Divider className="h-0.5 w-full bg-black"></Divider>
      <div className="grid w-full grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
        <div className="flex flex-col">
          {/* <div>비밀번호</div> */}
          <Input
            label="비밀번호"
            name="username"
            placeholder="비밀번호"
            variant="bordered"
            type="password"
            className="col-span-1 w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
            className="col-span-1 w-full"
            value={passwordCheck}
            onChange={e => setPasswordCheck(e.target.value)}
            isInvalid={password !== passwordCheck}
          />
        </div>
      </div>
      {password !== passwordCheck && <div className="text-sm text-red-500">비밀번호가 일치하지 않습니다.</div>}
      <div className="flex w-full gap-2">
        <Button type="reset" variant="flat" className="w-full">
          취소
        </Button>
        <Button onPress={handleChangePassword} isDisabled={password !== passwordCheck} color="primary" type="submit" className="w-full">
          확인
        </Button>
      </div>

      <div className="w-full items-center justify-center text-center text-2xl font-bold">내 정보 수정</div>
      <Divider className="h-0.5 w-full bg-black"></Divider>
      <div className="grid w-full grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
        <div className="flex flex-col">
          {/* <div>이름</div> */}

          <Input
            label="이메일"
            name="username"
            placeholder="abcd1234@naver.com"
            type="text"
            variant="bordered"
            className="col-span-1 w-full"
            value={profile?.data?.email}
            isDisabled={true}
          />
        </div>
        <div className="flex flex-col">
          {/* <div>이름</div> */}

          <Input
            label="이름"
            name="username"
            placeholder="홍길동동"
            type="text"
            variant="bordered"
            className="col-span-1 w-full"
            value={name}
            onChange={e => setName(e.target.value)}
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
            className="col-span-1 w-full"
            value={phone}
            onChange={e => setPhone(e.target.value)}
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
            className="col-span-1 w-full"
            value={birth}
            onChange={e => setBirth(e.target.value)}
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
            className="col-span-1 w-full"
            value={license}
            onChange={e => setLicense(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          {/* <div>희망하는 강습</div> */}
          <div className="flex w-full flex-row items-center justify-start gap-2">
            {/* <span>01.</span> */}
            <Select onChange={e => setClassWant1(e.target.value)} label="희망하는 강습1" variant="bordered" selectedKeys={[classWant1]}>
              {programlist.map(program => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex w-full flex-row items-center justify-start gap-2">
            {/* <span>02.</span> */}
            <Select onChange={e => setClassWant2(e.target.value)} label="희망하는 강습2" variant="bordered" selectedKeys={[classWant2]}>
              {programlist.map(program => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex w-full flex-row items-center justify-start gap-2">
            {/* <span>03.</span> */}
            <Select onChange={e => setClassWant3(e.target.value)} label="희망하는 강습3" variant="bordered" selectedKeys={[classWant3]}>
              {programlist.map(program => (
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
            className="w-full rounded-xl border-2 border-gray-200 p-4"
            value={gender}
            onChange={e => setGender(e.target.value)}
          >
            <Radio key="male" value="male">
              남
            </Radio>
            <Radio key="female" value="female">
              여
            </Radio>
          </RadioGroup>
        </div>

        <div className="flex flex-col gap-y-5">
          {/* <div>주소</div> */}
          <div className="flex w-full flex-row items-center justify-start gap-2">
            <Input
              name="address"
              label="우편번호"
              placeholder="10265"
              type="text"
              variant="bordered"
              className="col-span-1 w-full"
              value={postCode}
              onChange={e => setPostCode(e.target.value)}
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
              className="col-span-1 w-full"
              value={firstAddress}
              onChange={e => setFirstAddress(e.target.value)}
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
              className="col-span-1 w-full"
              value={secondAddress}
              onChange={e => setSecondAddress(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div>광고 및 마케팅 수신 동의(선택)</div>
            <div className="flex w-full flex-row items-start justify-start gap-4">
              <Checkbox onChange={e => setMarketingSms(e.target.checked)} isSelected={marketingSms} key="sms">
                문자 승인
              </Checkbox>
              <Checkbox onChange={e => setMarketingEmail(e.target.checked)} isSelected={marketingEmail} key="email">
                이메일 승인
              </Checkbox>
            </div>
            <div className="flex w-full justify-start text-xs">*수신 동의 시 BADIVE 소식을 빠르게 받아보실 수 있습니다.</div>
          </div>
        </div>
      </div>

      <div className="flex w-full gap-2">
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
            <Button onPress={() => onOpenChange()}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
