'use client';
import { TypeDBprofile } from '@/utils/supabase/dbTableTypes';
import { Button, Divider } from '@nextui-org/react';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SayGoodbye({ profile }: { profile: PostgrestSingleResponse<TypeDBprofile> }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const res = await fetch('/api/membership-withdrawal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: profile.data }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const resJson = await res.json();

      if (resJson.status === 'FAILED') {
        throw new Error(resJson.error);
      }

      setIsLoading(false);

      toast.success('회원탈퇴가 완료되었습니다.');

      setTimeout(() => {
        router.push('/');
      }, 2000);

      return;
    } catch (error) {
      toast.success('회원탈퇴 도중 오류가 발생하였습니다.');
      console.error(error);
      setError(error.message);
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 gap-y-5">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <h1 className="text-2xl font-bold">회원탈퇴</h1>
        <p>가입된 회원정보가 모두 삭제됩니다.</p>
      </div>
      <Divider className="h-0.5 w-full bg-black"></Divider>
      <div className="flex flex-col gap-y-2 rounded-xl bg-gray-100 p-6">
        <p>같은 SNS 계정으로 재가입 시 한달 후에 가능하며, BADIVE 회원가입으로 재가입시에는 동일 아이디는 사용하실 수 없습니다.</p>
        <p>예약하신 모든 프로그램들은 삭제되며 동일 계정으로 재가입을 해도 정보는 복구되지 않습니다.</p>
        <p>회원탈퇴를 진행하시겠습니까?</p>
      </div>
      <div className="flex w-full gap-2">
        <Button type="reset" variant="flat" className="w-full">
          취소
        </Button>
        <Button isLoading={isLoading} onPress={handleSubmit} color="primary" type="submit" className="w-full">
          탈퇴하기
        </Button>
      </div>
      {error && (
        <div className="">
          <div className="">에러가 발생하였습니다</div>
          <div className="">{error}</div>
        </div>
      )}
    </div>
  );
}
