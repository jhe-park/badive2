'use client';

import { signInAction } from '@/app/actions';
import { Button, Form, Input } from '@heroui/react';
import React from 'react';

export default function Component() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [returnUrl, setReturnUrl] = React.useState('/admin/main');
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = event => {
    event.preventDefault();
    console.log('handleSubmit');
  };
  const origin = '/admin/login';

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
        <p className="pb-4 text-center text-3xl font-semibold">
          관리자 로그인
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
