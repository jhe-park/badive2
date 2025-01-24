// app/store/useModalOpen.js

import { create } from 'zustand';

// 모달의 열림 여부를 관리하는 상태 정의
const useModalOpen = create((set) => ({
    isOpen: false, // 모달의 초기 상태를 false로 설정
    setIsOpen: (isOpen) => set({ isOpen }), // 모달 상태를 직접 설정하는 함수
}));

export default useModalOpen;