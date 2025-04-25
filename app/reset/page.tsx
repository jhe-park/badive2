'use client';

import Link from 'next/link';

import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { Button, Input } from '@heroui/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { usePasswordChangeStatus } from '@/hooks/usePasswordChangeStatus';

export default function Reset(searchParams) {
  const { changePasswordChangeStatus, passwordChangeStatus } = usePasswordChangeStatus();
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const supabase = createTypedSupabaseClient();

  const resetPassword = async () => {
    debugger;
    let isInvalid = false;
    if (password.length < 8 || password.length > 16) {
      toast.error('비밀번호는 8자 이상 16자 이하로 설정해주세요.');
      isInvalid = true;
    }

    if (password !== passwordCheck) {
      toast.error('비밀번호가 일치하지 않습니다.');
      isInvalid = true;
    }

    if (isInvalid) {
      return;
    }

    changePasswordChangeStatus({ status: 'PASSWORD_CHANGE_WORK_IN_PROGRESS' });

    const { data: dataForSession, error: errorForSession } = await supabase.auth.getSession();

    if (errorForSession) {
      console.error('error:', errorForSession);
      toast.error('세션을 가져오는 중 오류가 발생했습니다.', { autoClose: false });
      toast.error(JSON.stringify(errorForSession), { autoClose: false });
      changePasswordChangeStatus({ status: 'PASSWORD_CHANGE_ERROR' });
      return;
    }

    const { data: updatedUser, error: userUpdateError } = await supabase.auth.updateUser({
      password: password,
    });

    if (userUpdateError) {
      console.error('userError:', userUpdateError);
      toast.error('유저 데이터를 업데이트 하는 중 오류가 발생했습니다.', { autoClose: false });
      toast.error(JSON.stringify(userUpdateError), { autoClose: false });
      changePasswordChangeStatus({ status: 'PASSWORD_CHANGE_ERROR' });
      return;
    }

    console.error('userError:', userUpdateError);
    changePasswordChangeStatus({ status: 'PASSWORD_CHANGE_COMPLETED' });

    toast.success('비밀번호가 성공적으로 변경 되었습니다.');

    setTimeout(() => {
      redirect('/?message=success to change password');
    }, 1300);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="my-32 flex h-full w-full flex-col items-center justify-center gap-y-10">
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
              label="비밀번호"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              type="password"
              variant="bordered"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Input
              type="password"
              isRequired
              label="비밀번호 확인"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              variant="bordered"
              value={passwordCheck}
              onChange={e => setPasswordCheck(e.target.value)}
            />

            <Button
              isDisabled={passwordChangeStatus === 'PASSWORD_CHANGE_WORK_IN_PROGRESS' || passwordChangeStatus === 'PASSWORD_CHANGE_COMPLETED'}
              className="w-full"
              color="primary"
              type="button"
              onPress={resetPassword}
            >
              비밀번호 변경
            </Button>
            <Link href="/login" className="w-full">
              <Button variant="bordered" className="w-full" color="primary" type="button">
                로그인으로 이동
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
