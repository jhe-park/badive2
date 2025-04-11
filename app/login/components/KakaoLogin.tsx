'use client';

import Image from 'next/image';

import { createClient, createTypedSupabaseClient } from '@/utils/supabase/client';

const KakaoLoginComponent = ({ domainWithProtocol }: { domainWithProtocol: string }) => {
  // const router = useRouter();
  const supabase = createTypedSupabaseClient();

  const handleKakaoLogin = async () => {
    try {
      // const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.badive.co.kr';

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${domainWithProtocol}/auth/callback`,
        },
      });

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
