'use client';

import { signInAction } from '@/app/actions';
import { Button, Form, Input } from '@heroui/react';
import React, { use, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Component({ searchParams }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [returnUrl, setReturnUrl] = React.useState('/expert/main');
  const toggleVisibility = () => setIsVisible(!isVisible);
  const searchParamsData = use(searchParams);
  const origin = '/expert/login';

  useEffect(() => {
    if ((searchParamsData as any).error) {
      toast.error((searchParamsData as any).error);
    }
  }, [searchParamsData]);

  const handleSubmit = event => {
    event.preventDefault();
    console.log('handleSubmit');
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
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
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-center text-3xl font-semibold">
          강사 로그인
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <Form
          className="flex flex-col gap-4"
          validationBehavior="native"
          action={async formData => {
            setIsLoading(true);
            await signInAction(formData, returnUrl, origin);
            setIsLoading(false);
          }}
        >
          <Input isRequired label="이메일" labelPlacement="outside" name="email" placeholder="이메일을 입력해주세요" type="email" variant="bordered" />
          <Input
            isRequired
            label="비밀번호"
            labelPlacement="outside"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            type={isVisible ? 'text' : 'password'}
            variant="bordered"
          />

          <Button className="w-full" color="primary" type="submit" isLoading={isLoading}>
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}
