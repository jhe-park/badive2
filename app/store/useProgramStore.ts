import { create } from 'zustand';

// 프로그램 인터페이스 정의 (실제 프로그램 항목의 구조에 맞게 수정 필요)
interface Program {
  [key: string]: any; // 임시로 모든 속성을 허용 (실제 구현 시 구체적인 타입으로 변경 권장)
}

// 프로그램 스토어 상태 인터페이스 정의
interface ProgramStoreState {
  programStore: Program[];
  setProgramStore: (programStore: Program[]) => void;
}

export const useProgramStore = create<ProgramStoreState>(set => ({
  programStore: [],
  setProgramStore: (programStore: Program[]) => set({ programStore }),
}));
