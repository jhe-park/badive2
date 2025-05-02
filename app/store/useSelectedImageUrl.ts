import { create } from 'zustand';

// 선택된 이미지 URL 상태를 위한 인터페이스 정의
interface SelectedImageUrlState {
  selectedImageUrl: string;
  setSelectedImageUrl: (selectedImageUrl: string) => void;
}

const useSelectedImageUrl = create<SelectedImageUrlState>(set => ({
  selectedImageUrl: '',
  setSelectedImageUrl: (selectedImageUrl: string) => set({ selectedImageUrl }),
}));

export default useSelectedImageUrl;
