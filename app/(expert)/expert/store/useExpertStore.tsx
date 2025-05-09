import { create } from 'zustand';

// 전문가 정보 인터페이스 정의 (실제 데이터 구조에 맞게 수정 필요)
interface ExpertInfo {
  [key: string]: any; // 임시로 모든 속성을 허용 (실제 구현 시 구체적인 타입으로 변경 권장)
}

// 전문가 스토어 상태 인터페이스 정의
interface ExpertStoreState {
  expertInformation: ExpertInfo | null;
  setExpertInformation: (info: ExpertInfo | null) => void;
}

const useExpertStore = create<ExpertStoreState>(set => ({
  expertInformation: null,
  setExpertInformation: (info: ExpertInfo | null) => set({ expertInformation: info }),
}));

export default useExpertStore;
