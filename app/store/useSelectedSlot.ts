import { create } from 'zustand';

// 슬롯 타입 정의 (실제 슬롯 객체의 구조에 맞게 수정 필요)
interface Slot {
  // 슬롯의 필요한 속성들을 여기에 추가
  // 예: id: string;
  // time: string;
  // 등등...
  [key: string]: any; // 임시로 모든 속성을 허용 (실제 구현 시 구체적인 타입으로 변경 권장)
}

// 선택된 슬롯 상태를 위한 인터페이스 정의
interface SelectedSlotState {
  selectedSlot: Slot | null;
  setSelectedSlot: (slot: Slot | null) => void;
}

export const useSelectedSlot = create<SelectedSlotState>(set => ({
  selectedSlot: null,
  setSelectedSlot: (slot: Slot | null) => set({ selectedSlot: slot }),
}));

// import { create } from 'zustand';

// export const useSelectedSlot = create((set) => ({
//   selectedSlot: null,
//   setSelectedSlot: (slot) => set({ selectedSlot: slot }),
// }));
