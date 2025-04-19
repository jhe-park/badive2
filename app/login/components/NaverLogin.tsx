'use client';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage({ returnUrl }: { returnUrl: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch('/api/auth/supabase-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email }),
          });

          // 🚫 주의 : 성공적으로 로그인되면 아래 코드로 진입하지 않고 리다이렉트 된다

          if (!res.ok) {
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

          // router.push(data.redirect);
        } catch (error) {
          console.error('로그인 처리 중 오류 발생:', error);
        }
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className="flex justify-center items-center ">
      <button className="w-15 h-15 bg-white hover:scale-110 transition-all duration-300" onClick={() => signIn('naver')}>
        <Image src="/logo/naver.png" alt="naver" width={60} height={60} />
      </button>
    </div>
  );
}
