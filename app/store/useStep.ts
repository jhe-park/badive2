import { create } from 'zustand';

// 스텝 상태를 위한 인터페이스 정의
interface StepState {
  step: number;
  setStep: (step: number) => void;
}

const useStep = create<StepState>(set => ({
  step: 0,
  setStep: (step: number) => set({ step }),
}));

export default useStep;
