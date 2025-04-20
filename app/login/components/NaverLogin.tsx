'use client';

import { Loading } from '@/app/components/Loading';
import useLoginStatusStore from '@/app/store/useLoginStatusStore';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage({ returnUrl }: { returnUrl: string }) {
  console.log('in NaverLogin component');

  const [isOAuthWorkInProgress, setIsOAuthWorkInProgress] = useState<boolean>(false);
  const { loginStatus, setLoginStatus } = useLoginStatusStore();
  const { data: session } = useSession();
  const router = useRouter();

  console.log('loginStatus');
  console.log(loginStatus);

  useEffect(() => {
    console.log('in NaverLogin useEffect');
    const fetchData = async () => {
      if (session?.user?.email == null) {
        return;
      }

      setIsOAuthWorkInProgress(true);
      // if (session?.user?.email) {
      try {
        console.log('before fetch');

        const res = await fetch('/api/auth/supabase-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: session.user.email }),
        });

        console.log('after fetch');

        if (!res.ok) {
          setIsOAuthWorkInProgress(false);
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('응답이 JSON 형식이 아닙니다!');
        }

        const data = await res.json();
        console.log('응답 데이터:', data);
        console.log('data.redirect');
        console.log(data.redirect);

        router.push(data.redirect);
      } catch (error) {
        console.error('로그인 처리 중 오류 발생:', error);
        setIsOAuthWorkInProgress(false);
      }
      // }
    };

    fetchData();
  }, [session]);

  console.log('session');
  console.log(session);

  console.log('✅isOAuthWorkInProgress');
  console.log(isOAuthWorkInProgress);

  return (
    <>
      <div className="flex items-center justify-center">
        {isOAuthWorkInProgress && <Loading unconditionalLoading={true} />}
        <button
          className="w-15 h-15 bg-white transition-all duration-300 hover:scale-110"
          onClick={async () => {
            setLoginStatus('LOGIN_WORK_IN_PROGRESS');
            const { error, ok, status, url } = await signIn('naver', { redirect: false });

            // 아래 코드로 진입하지 않음
            setLoginStatus('LOGIN_ERROR');
          }}
        >
          <Image src="/logo/naver.png" alt="naver" width={60} height={60} />
        </button>
      </div>
    </>
  );
}
