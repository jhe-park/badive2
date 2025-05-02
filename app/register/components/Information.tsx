'use client';

import useMarketingAgreement from '@/app/store/useMarketingAgreement';
import useStep from '@/app/store/useStep';
import { checkIsValidEmail } from '@/utils/checkIsValidEmail';
import { createClient } from '@/utils/supabase/client';
import { Button, Checkbox, Divider, Input, Radio, RadioGroup, Select, SelectItem } from '@heroui/react';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { toast, ToastContainer } from 'react-toastify';
import { programlist } from './programlist';
import { cn } from '@/lib/utils';
import { Z_INDEX } from '@/constants/constants';

export default function Information() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [license, setLicense] = useState('');
  const [classWant1, setClassWant1] = useState('');
  const [classWant2, setClassWant2] = useState('');
  const [classWant3, setClassWant3] = useState('');
  const [gender, setGender] = useState('');
  const [marketingSms, setMarketingSms] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [firstAddress, setFirstAddress] = useState('');
  const [secondAddress, setSecondAddress] = useState('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const { marketingAgreement, setMarketingAgreement } = useMarketingAgreement();
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const supabase = createClient();
  const [isSubmitBtnClicked, setIsSubmitBtnClicked] = useState(false);
  const { step, setStep } = useStep();

  const handleNext = async () => {
    setIsSubmitBtnClicked(true);

    let isInvalidForm = false;

    if (!checkIsValidEmail(email)) {
      toast.error('이메일 형식이 올바르지 않습니다.');
      isInvalidForm = true;
    }

    if (!isEmailChecked) {
      toast.error('이메일 중복확인을 해주세요.');
      isInvalidForm = true;
    }

    if (!isPasswordMatch) {
      toast.error('패스워드가 일치하지 않습니다.');
      isInvalidForm = true;
    } else if (password.length < 8 || password.length > 16) {
      toast.error('패스워드는 8~16자 사이로 입력해주세요.');
      isInvalidForm = true;
    }

    const nameTrimmed = name.trim();
    if (!nameTrimmed || nameTrimmed.length < 1) {
      toast.error('이름을 입력해주세요.');
      isInvalidForm = true;
    }

    const formPhoneRefined = phone.replace(/[^0-9]/g, '');

    if (!formPhoneRefined) {
      toast.error('휴대폰번호를 입력해주세요.');
      isInvalidForm = true;
    } else if (formPhoneRefined.length !== 11) {
      toast.error('휴대폰번호는 11자리 숫자여야 합니다.');
      isInvalidForm = true;
    }

    const formBirthRefined = birth.replace(/[^0-9]/g, '');

    if (!formBirthRefined) {
      toast.error('생년월일을 입력해주세요.');
      isInvalidForm = true;
    } else if (formBirthRefined.length !== 8) {
      toast.error('생년월일은 8자리 숫자여야 합니다.');
      isInvalidForm = true;
    }

    if (!gender) {
      toast.error('성별을 선택해주세요.');
      isInvalidForm = true;
    } else if (gender !== 'male' && gender !== 'female') {
      toast.error('성별 입력값이 올바르지 않습니다.');
      isInvalidForm = true;
    }

    if (isInvalidForm) {
      return;
    }

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (signUpError) {
        toast.error('회원가입 중 오류가 발생했습니다.');
        console.error(signUpError);
        return;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          email: email,
          name: nameTrimmed,
          phone: formPhoneRefined,
          birth: formBirthRefined,
          license: license,
          classWant1: classWant1,
          classWant2: classWant2,
          classWant3: classWant3,
          gender: gender,
          marketingSms: marketingSms,
          marketingEmail: marketingEmail,
          postCode: postcode,
          firstAddress: firstAddress,
          secondAddress: secondAddress,
          marketingAgreement: marketingAgreement,
          role: 'client',
        })
        .eq('id', signUpData.user.id);

      if (profileError) {
        toast.error('프로필 생성 중 오류가 발생했습니다.');
        console.error(profileError);
        return;
      }

      toast.success('회원가입이 완료되었습니다!');
      window.scrollTo(0, 0);
      setStep(step + 1);
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  useEffect(() => {
    if (password && passwordCheck) {
      setIsPasswordMatch(password === passwordCheck);
    }
  }, [password, passwordCheck]);

  const handleCheckEmail = async () => {
    if (!checkIsValidEmail(email)) {
      toast.error('이메일 형식이 올바르지 않습니다.');
      return;
    }

    // 현재 사용자 테이블 체크
    const { data: profileData, error: profileError } = await supabase.from('profiles').select('email').eq('email', email);

    // 탈퇴 사용자 테이블 체크
    const { data: byeData, error: byeError } = await supabase.from('bye').select('email, created_at').eq('email', email);

    if (profileError || byeError) {
      console.error(profileError || byeError);
    } else if (byeData && byeData.length > 0) {
      // created_at 시간을 확인하여 일주일이 지났는지 확인
      const createdAt = new Date(byeData[0].created_at);
      const currentDate = new Date();
      const diffTime = Math.abs((currentDate as any) - (createdAt as any));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 7) {
        toast.success('사용가능한 이메일입니다.');
        setIsEmailChecked(true);
      } else {
        toast.error('탈퇴 후 일주일이 지나야 다시 가입 가능합니다.');
        setIsEmailChecked(false);
      }
    } else if (profileData && profileData.length > 0) {
      toast.error('이미 사용중인 이메일입니다.');
      setIsEmailChecked(false);
    } else {
      toast.success('사용가능한 이메일입니다.');
      setIsEmailChecked(true);
    }
  };

  const handleComplete = data => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setPostcode(data.zonecode);
    setFirstAddress(fullAddress);
    setIsPostcodeOpen(false);
    onClose();
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setIsPasswordMatch(e.target.value === passwordCheck);
  };

  const handlePasswordCheckChange = e => {
    setPasswordCheck(e.target.value);
    setIsPasswordMatch(password === e.target.value);
  };

  return (
    <div style={{ fontFamily: 'Freesentation-9Black' }} className="flex w-full flex-col items-center justify-center gap-4">
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
      <div className="flex flex-col gap-2">
        <p className="text-5xl font-bold text-black">필수입력 정보</p>
        <p className="text-md text-black">필수 항목이므로 반드시 입력해 주시기 바랍니다.</p>
      </div>
      <Divider className="h-0.5 w-full bg-black" />
      <div className="flex w-[90%] flex-col gap-2 gap-y-4 md:w-[50vw]">
        <div className="flex w-full flex-col items-start justify-start">
          <div>이메일</div>
          <div className="flex w-full flex-row items-start justify-start gap-x-4">
            <Input
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                setIsEmailChecked(false);
              }}
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              isRequired
              variant="bordered"
              className="w-full"
              placeholder="이메일을 입력해 주세요."
            />
            <Button onPress={handleCheckEmail} className="w-[10%]">
              중복확인
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>패스워드</div>
          <div className="flex w-full flex-col items-start justify-start">
            <Input
              type="password"
              autoComplete="new-password"
              variant="bordered"
              // isInvalid={!isPasswordMatch && passwordCheck.length > 0}
              // className={`w-full ${isPasswordMatch ? 'border-red-500' : ''}`}
              placeholder="패스워드를 입력해 주세요."
              value={password}
              onChange={handlePasswordChange}
            />
            {/* <p className={`text-[#F31260] ${passwordCheck.length === 0 || isPasswordMatch ? 'hidden' : ''}`}>패스워드가 일치하지 않습니다.</p> */}
            <p className="pt-2">※ 8~16자 사이의 비밀번호를 입력해주세요</p>
            {/* <p>※ 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합하여 설정해주세요 (8~16자)</p> */}
            {/* <p>※ 아이디와 4자리 이상 동일하거나, 4자리 이상 반복되는 문자와 숫자는 사용이 불가합니다.</p> */}
            {/* <p>※ 사용 가능 특수 문자: !, ", #, $, %, (), *, +, ,, -, ., /, :, &apos;, &lt;, =, &gt;, ?, @, ^, `, {}, [], ~</p> */}
          </div>
        </div>
        <div>
          <div>패스워드 확인</div>
          <div>
            <Input
              type="password"
              variant="bordered"
              isInvalid={isSubmitBtnClicked && !isPasswordMatch && passwordCheck.length > 0}
              className={`w-full`}
              placeholder="패스워드를 입력해 주세요."
              value={passwordCheck}
              labelPlacement="outside"
              onChange={handlePasswordCheckChange}
            />
          </div>
          <p className={cn(`text-[#F31260]`, (isSubmitBtnClicked === false || passwordCheck.length === 0 || isPasswordMatch) && 'hidden')}>
            패스워드가 일치하지 않습니다.
          </p>
        </div>
        <div>
          <div>이름</div>
          <div>
            <Input variant="bordered" placeholder="이름을 입력해 주세요." labelPlacement="outside" value={name} onChange={e => setName(e.target.value)} />
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <div>휴대폰번호</div>
          <div className="flex w-full flex-row items-end justify-start gap-2">
            <Input variant="bordered" placeholder="예) 01012345678" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div className="pt-0 text-[14px] text-red-600">강습 일정을 위해 강사님이 직접 연락드립니다. 꼭 본인과 연락 가능한 전화번호를 입력해주세요.</div>
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <div>생년월일</div>
          <div className="flex w-full flex-row items-end justify-start gap-2">
            <Input variant="bordered" placeholder="예) 19800101" value={birth} onChange={e => setBirth(e.target.value)} />
          </div>
          <div></div>
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <div>성별</div>
          <div>
            <RadioGroup
              orientation="horizontal"
              // selectedKeys={[gender] as any}
              onChange={e => setGender(e.target.value)}
            >
              <Radio key="male" value="male">
                남성
              </Radio>
              <Radio key="female" value="female">
                여성
              </Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="mt-12 text-5xl font-bold text-black">선택정보 입력</p>
      </div>
      <Divider className="h-1 w-full bg-black" />

      <div className="flex w-[90%] flex-col gap-2 gap-y-4 md:w-[50vw]">
        <div className="flex w-full flex-col items-start justify-start gap-2">
          <div>보유한 라이센스</div>
          <div className="flex w-full flex-row items-end justify-start gap-2">
            <Input
              variant="bordered"
              placeholder="보유한 라이센스 입력"
              labelPlacement="outside"
              className="w-full"
              value={license}
              onChange={e => setLicense(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>희망하는 강습</div>
          <div className="flex w-full flex-col items-end justify-start gap-2">
            <div className="flex w-full flex-row items-center justify-start gap-2">
              <span>01.</span>
              <Select variant="bordered" selectedKeys={[classWant1]} onChange={e => setClassWant1(e.target.value)}>
                {programlist.map((item, index) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex w-full flex-row items-center justify-start gap-2">
              <span>02.</span>
              <Select variant="bordered" selectedKeys={[classWant2]} onChange={e => setClassWant2(e.target.value)}>
                {programlist.map((item, index) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex w-full flex-row items-center justify-start gap-2">
              <span>03.</span>
              <Select variant="bordered" selectedKeys={[classWant3]} onChange={e => setClassWant3(e.target.value)}>
                {programlist.map((item, index) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
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
        <div className="flex w-full flex-col items-start justify-start">
          <div>주소</div>
          <div className="flex w-full flex-col items-center justify-start gap-x-4 gap-y-2">
            <div className="flex w-full flex-row items-center justify-start gap-x-4">
              <Input variant="bordered" className="w-full" placeholder="우편번호" value={postcode} readOnly onChange={e => setPostcode(e.target.value)} />
              <Button onPress={onOpen}>주소 검색</Button>
            </div>

            <Input variant="bordered" className="w-full" placeholder="주소" value={firstAddress} readOnly onChange={e => setFirstAddress(e.target.value)} />
            <Input variant="bordered" className="w-full" placeholder="상세주소" value={secondAddress} onChange={e => setSecondAddress(e.target.value)} />
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              <ModalHeader>주소 검색</ModalHeader>
              <ModalBody>
                <DaumPostcode onComplete={handleComplete} autoClose={true} style={{ width: '100%', height: '400px' }} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-5">
        <Button className="w-1/4" color={'' as any} variant="bordered" type="button" onPress={() => setStep(step - 1)}>
          뒤로
        </Button>
        <Button onPress={handleNext} className="w-1/4" color="primary" type="button">
          가입하기
        </Button>
      </div>
    </div>
  );
}
