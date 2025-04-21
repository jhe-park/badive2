'use client';

import { useState } from 'react';

type TPasswordChangeStatus = 'PASSWORD_CHANGE_READY' | 'PASSWORD_CHANGE_WORK_IN_PROGRESS' | 'PASSWORD_CHANGE_COMPLETED' | 'PASSWORD_CHANGE_ERROR';

export function usePasswordChangeStatus() {
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<TPasswordChangeStatus>('PASSWORD_CHANGE_READY');

  const changePasswordChangeStatus = ({ status }: { status: TPasswordChangeStatus }) => {
    setPasswordChangeStatus(status);
  };

  return {
    passwordChangeStatus,
    changePasswordChangeStatus,
  };
}
