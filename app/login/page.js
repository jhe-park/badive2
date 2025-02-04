import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button, Input, Checkbox, Divider, Form } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Toast from "@/components/Toast";
import TwoFactor from "./components/TwoFactor";
export default async function Login(props) {
  const searchParams = await props.searchParams;
  console.log('searchParams', searchParams)
  // URLSearchParams를 사용하여 문자열을 파싱합니다.
  const params = new URLSearchParams(searchParams.error);
  console.log('params', params)
  const email = params.get('email');
  
  console.log('Email:', email);
  console.log('searchParams', searchParams.error);
  return (
    <div className="flex h-full  w-full flex-col items-center justify-center gap-y-10 my-32">
      <Toast searchParams={searchParams} />
      <div className="flex flex-col items-center gap-y-5">
        <div>
          <p className="font-bold text-5xl">BDN DIVE</p>
        </div>
        <div>
          <p className="text-small text-default-500 text-[24px]">로그인</p>
        </div>
      </div>
      <div className="mt-2 flex w-[90%] md:w-1/3 flex-col gap-4 rounded-large bg-content1 px-8 py-6 border-2 border-gray-300">
        <Form className="flex flex-col gap-3" validationBehavior="native">
          <Input
            isRequired
            label="아이디"
            name="email"
            placeholder="이메일을 입력해주세요"
            type="email"
            variant="bordered"
            defaultValue={email || ""}
          />

          <Input
            type="password"
            isRequired
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            variant="bordered"
          />
          <TwoFactor searchParams={searchParams}></TwoFactor>

          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              자동 로그인
            </Checkbox>
            <div className="flex items-center gap-2">
              <Link className="text-xs text-default-500" href="/findId">
                아이디 찾기
              </Link>
              <span className="text-xs text-default-500">|</span>
              <Link className="text-xs text-default-500" href="/findPassword">
                비밀번호 찾기
              </Link>
            </div>
          </div>
          <SubmitButton className="w-full" color="primary" type="submit" formAction={signInAction}>
            로그인
          </SubmitButton>
          <Link href="/register" className="w-full">
            <Button variant="bordered" className="w-full" color="primary" type="button">
              회원가입
            </Button>
          </Link>
        </Form>
        <div className="flex items-center gap-4">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex justify-center items-center gap-5">
          <button className="w-15 h-15 bg-white">
            <Image src="/logo/google.png" alt="google" width={60} height={60} />
          </button>
          <button className="w-15 h-15 bg-white">
            <Image src="/logo/naver.png" alt="naver" width={60} height={60} />
          </button>
          <button className="w-15 h-15 bg-white">
            <Image src="/logo/kakao.png" alt="kakao" width={60} height={60} />
          </button>
          <button className="w-15 h-15 bg-white">
            <Image src="/logo/apple.png" alt="apple" width={60} height={60} />
          </button>
          <button className="w-15 h-15 bg-white">
            <Image src="/logo/facebook.png" alt="facebook" width={60} height={60} />
          </button>
        </div>
      </div>
    </div>
  );
}
