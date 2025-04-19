import { signInAction } from '@/app/actions';
import { SubmitButton } from '@/components/submit-button';
import Toast from '@/components/Toast';
import { Checkbox, Divider, Input } from '@nextui-org/react';
import Link from 'next/link';
import GoogleLoginComponent from './components/GoogleLogin';
import KakaoLoginComponent from './components/KakaoLogin';
import NaverLoginComponent from './components/NaverLogin';
import RegisterButton from './components/RegisterButton';
import TwoFactor from './components/TwoFactor';
import { getDomain } from '@/utils/getDomain';

export default async function Login(props) {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams(searchParams.error);

  const email = params.get('email');
  const returnUrl = searchParams.returnUrl || '/'; // returnUrl이 없으면 기본값으로 '/' 설정

  const origin = '/login';

  const { domainWithProtocol } = await getDomain();

  return (
    <div className="my-32 flex h-full w-full flex-col items-center justify-center gap-y-10">
      <Toast searchParams={searchParams} />
      <div className="flex flex-col items-center gap-y-5">
        <div>
          <p className="text-5xl font-bold">BADIVE</p>
        </div>
        <div>
          {/* text-small */}
          <p className="text-[24px] text-default-500">로그인</p>
        </div>
      </div>
      <div className="mt-2 flex w-[90%] flex-col gap-4 rounded-large border-2 border-gray-300 bg-content1 px-8 py-6 md:w-1/3">
        <form
          className="flex flex-col gap-3"
          action={async formData => {
            'use server';
            await signInAction(formData, returnUrl, origin);
          }}
        >
          <Input isRequired label="아이디" name="email" placeholder="이메일을 입력해주세요" type="email" variant="bordered" defaultValue={email || ''} />

          <Input type="password" isRequired label="비밀번호" name="password" placeholder="비밀번호를 입력해주세요" variant="bordered" />
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
          <SubmitButton className="w-full" color="primary" type="submit">
            로그인
          </SubmitButton>
          <RegisterButton />
        </form>
        <div className="flex items-center gap-4">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex items-center justify-center gap-5">
          <GoogleLoginComponent returnUrl={returnUrl} domainWithProtocol={domainWithProtocol} />
          <KakaoLoginComponent returnUrl={returnUrl} domainWithProtocol={domainWithProtocol} />
          <NaverLoginComponent returnUrl={returnUrl} />
        </div>
      </div>
    </div>
  );
}
