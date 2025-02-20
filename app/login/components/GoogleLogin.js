'use client'
import React from "react";
import Image from "next/image";

import { useRouter } from 'next/navigation';
import {createClient} from '@/utils/supabase/client'

const GoogleLoginComponent = () => {
  const router = useRouter();
  const supabase = createClient();


  const handleGoogleLogin = async () => {
    try {

      const baseUrl = process.env.NEXT_PUBLIC_NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : 'https://www.badive.co.kr';

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {

          redirectTo: `${baseUrl}/auth/callback`
        }

      });

      if (error) {
        console.error('Google 로그인 에러:', error.message);
        return;
      }

    } catch (error) {
      console.error('로그인 처리 중 에러 발생:', error.message);
    }
  };

  return (
    <button 
      onClick={handleGoogleLogin}
      className="w-15 h-15 bg-white hover:scale-110 transition-all duration-300"
    >
      <Image src="/logo/google.png" alt="google" width={60} height={60} />
    </button>
  );
};

export default GoogleLoginComponent;
