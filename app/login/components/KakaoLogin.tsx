'use client';

import Image from 'next/image';

import useLoginStatusStore from '@/app/store/useLoginStatusStore';
import { createTypedSupabaseClient } from '@/utils/supabase/client';

const KakaoLoginComponent = ({ domainWithProtocol, returnUrl }: { domainWithProtocol: string; returnUrl: string }) => {
  // const router = useRouter();
  const supabase = createTypedSupabaseClient();
  const { loginStatus, setLoginStatus } = useLoginStatusStore();

  const handleKakaoLogin = async () => {
    setLoginStatus('LOGIN_WORK_IN_PROGRESS');
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${domainWithProtocol}/auth/callback?returnUrl=${returnUrl}`,
        },
      });

      // 🚫 주의 : 성공적으로 로그인되면 아래 코드로 진입하지 않고 리다이렉트 된다
      setLoginStatus('LOGIN_COMPLETED');

      if (error) {
        console.error('카카오 로그인 에러:', error.message);
        setLoginStatus('LOGIN_ERROR');
        return;
      }
    } catch (error) {
      console.error('로그인 처리 중 에러 발생:', error.message);
      setLoginStatus('LOGIN_ERROR');
    }
  };

  return (
    <button onClick={handleKakaoLogin} className="w-15 h-15 bg-white transition-all duration-300 hover:scale-110">
      <Image src="/logo/kakao.png" alt="kakao" width={60} height={60} />
    </button>
  );
};

export default KakaoLoginComponent;
