'use client';

import { useState } from 'react';

type TPaymentStatus = 'PAYMENT_READY' | 'PAYMENT_WORK_IN_PROGRESS' | 'PAYMENT_COMPLETED';
export function usePaymentStatus() {
  const [paymentStatus, setPaymentStatus] = useState<'PAYMENT_READY' | 'PAYMENT_WORK_IN_PROGRESS' | 'PAYMENT_COMPLETED'>('PAYMENT_READY');

  const changePaymentStatus = ({ status }: { status: TPaymentStatus }) => {
    setPaymentStatus(status);
  };

  return {
    paymentStatus,
    changePaymentStatus,
  };
}
