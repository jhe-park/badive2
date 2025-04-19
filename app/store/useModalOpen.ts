import { create } from 'zustand';

// 모달 상태를 위한 인터페이스 정의
interface ModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

// 모달의 열림 여부를 관리하는 상태 정의
const useModalOpen = create<ModalState>(set => ({
  isOpen: false, // 모달의 초기 상태를 false로 설정
  setIsOpen: (isOpen: boolean) => set({ isOpen }), // 모달 상태를 직접 설정하는 함수
}));

export default useModalOpen;

// import { create } from 'zustand';

// // 모달의 열림 여부를 관리하는 상태 정의
// const useModalOpen = create(set => ({
//   isOpen: false, // 모달의 초기 상태를 false로 설정
//   setIsOpen: isOpen => set({ isOpen }), // 모달 상태를 직접 설정하는 함수
// }));

// export default useModalOpen;
