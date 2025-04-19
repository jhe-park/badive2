'use client';

import Image from 'next/image';

import { createClient, createTypedSupabaseClient } from '@/utils/supabase/client';

const KakaoLoginComponent = ({ domainWithProtocol, returnUrl }: { domainWithProtocol: string; returnUrl: string }) => {
  // const router = useRouter();
  const supabase = createTypedSupabaseClient();

  const handleKakaoLogin = async () => {
    try {
      // const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.badive.co.kr';

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${domainWithProtocol}/auth/callback?returnUrl=${returnUrl}`,
        },
      });

      // 🚫 주의 : 성공적으로 로그인되면 아래 코드로 진입하지 않고 리다이렉트 된다

      if (error) {
        console.error('카카오 로그인 에러:', error.message);
        return;
      }
    } catch (error) {
      console.error('로그인 처리 중 에러 발생:', error.message);
    }
  };

  return (
    <button onClick={handleKakaoLogin} className="w-15 h-15 bg-white hover:scale-110 transition-all duration-300">
      <Image src="/logo/kakao.png" alt="kakao" width={60} height={60} />
    </button>
  );
};

export default KakaoLoginComponent;
