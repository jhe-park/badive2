'use client';
import useStep from '@/app/store/useStep';
import Agreement from './Agreement';
import Complete from './Complete';
import Information from './Information';

export default function StepContents() {
  const { step, setStep } = useStep();

  return (
    <div className="flex w-[90%] flex-col gap-4 rounded-large bg-content1 md:w-2/3 md:px-8">
      {step === 0 && <Agreement></Agreement>}
      {step === 1 && <Information></Information>}
      {step === 2 && <Complete></Complete>}
    </div>
  );
}
