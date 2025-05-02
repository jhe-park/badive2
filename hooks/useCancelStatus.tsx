'use client';

import { useState } from 'react';

type TCANCELStatus = 'CANCEL_READY' | 'CANCEL_WORK_IN_PROGRESS' | 'CANCEL_COMPLETED';

export function useCancelStatus() {
  const [cancelStatus, setCancelStatus] = useState<'CANCEL_READY' | 'CANCEL_WORK_IN_PROGRESS' | 'CANCEL_COMPLETED'>('CANCEL_READY');

  const changeCancelStatus = ({ status }: { status: TCANCELStatus }) => {
    setCancelStatus(status);
  };

  return {
    cancelStatus,
    changeCancelStatus,
  };
}
