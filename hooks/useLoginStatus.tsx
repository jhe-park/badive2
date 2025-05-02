'use client';

import { useState } from 'react';

type TLoginStatus = 'LOGIN_READY' | 'LOGIN_WORK_IN_PROGRESS' | 'LOGIN_COMPLETED';

export function useLoginStatus() {
  const [loginStatus, setLoginStatus] = useState<'LOGIN_READY' | 'LOGIN_WORK_IN_PROGRESS' | 'LOGIN_COMPLETED'>('LOGIN_READY');

  const changeLoginStatus = ({ status }: { status: TLoginStatus }) => {
    setLoginStatus(status);
  };

  return {
    loginStatus,
    changeLoginStatus,
  };
}
