'use client';
import Image from 'next/image';

import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { usePathname, useRouter } from 'next/navigation';

const GoogleLoginComponent = ({ returnUrl, domainWithProtocol }: { domainWithProtocol: string; returnUrl: string }) => {
  const router = useRouter();
  const supabase = createTypedSupabaseClient();
  const pathName = usePathname();

  const handleGoogleLogin = async () => {
    try {
      // const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.badive.co.kr';

      // console.log('✅ baseUrl');
      // console.log(baseUrl);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            returnUrl: returnUrl,
          },
          redirectTo: `${domainWithProtocol}/auth/callback?returnUrl=${returnUrl}`,
        },
      });

      // 🚫 주의 : 성공적으로 로그인되면 아래 코드로 진입하지 않고 리다이렉트 된다

      if (error) {
        console.error('Google 로그인 에러:', error.message);
        return;
      }
    } catch (error) {
      console.error('로그인 처리 중 에러 발생:', error.message);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="w-15 h-15 bg-white transition-all duration-300 hover:scale-110">
      <Image src="/logo/google.png" alt="google" width={60} height={60} />
    </button>
  );
};

export default GoogleLoginComponent;
