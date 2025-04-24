'use client';

import { createClient } from '@/utils/supabase/client';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
export default function Login(props) {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');

  const handleFindPassword = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}`,
    });
    if (error) {
      console.error('에러 발생:', error);
    }

    toast.success('비밀번호 재설정 링크가 입력하신 이메일 주소로 전송되었습니다. 이메일을 확인해주세요.', {
      autoClose: 10000,
    });
  };

  return (
    <div className="my-32 flex h-full w-full flex-col items-center justify-center gap-y-10">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        <div className="flex flex-col gap-3">
          <Input
            isRequired
            label="아이디"
            name="email"
            placeholder="이메일을 입력해주세요"
            type="email"
            variant="bordered"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Button className="w-full" color="primary" type="button" onClick={handleFindPassword}>
            비밀번호 찾기
          </Button>
          <Button variant="bordered" className="w-full" color="primary" type="button" onPress={() => router.push('/login')}>
            로그인으로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}

function maskEmail(email) {
  const [localPart, domain] = email.split('@');
  if (localPart.length > 2) {
    return `${localPart.slice(0, -2)}**@${domain}`;
  }
  return email;
}
