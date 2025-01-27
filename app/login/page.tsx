import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button, Input, Checkbox, Divider, Form } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const handleSubmit = () => {
    console.log("submit");
  };
  const toggleVisibility = () => {
    console.log("toggle");
  };
  return (
    <div className="flex h-full  w-full flex-col items-center justify-center gap-y-10 my-32">
      <div className="flex flex-col items-center gap-y-5">
        <div>
          <p className="font-bold text-5xl">BDN DIVE</p>
        </div>
        <div>
          <p className="text-small text-default-500 text-[24px]">로그인</p>
        </div>
      </div>
      <div className="mt-2 flex w-[90%] md:w-1/3 flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <Form className="flex flex-col gap-3" validationBehavior="native">
          <Input
            isRequired
            label="아이디"
            name="email"
            placeholder="이메일을 입력해주세요"
            type="email"
            variant="bordered"
          />

          <Input
            isRequired
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            variant="bordered"
          />

          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              자동 로그인
            </Checkbox>
            <div className="flex items-center gap-2">
              <Link className="text-xs text-default-500" href="#">
                아이디 찾기
              </Link>
              <span className="text-xs text-default-500">|</span>
              <Link className="text-xs text-default-500" href="#">
                비밀번호 찾기
              </Link>
            </div>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Log In
          </Button>
        </Form>
        <div className="flex items-center gap-4">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex justify-center items-center gap-5">
          <button  className="w-15 h-15 bg-white">
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
