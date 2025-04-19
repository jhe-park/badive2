import { create } from 'zustand';

// 주민등록번호/보안번호 상태를 위한 인터페이스 정의
interface SecurityNumberState {
  securityNumber: string;
  setSecurityNumber: (securityNumber: string) => void;
}

const useSecurityNumber = create<SecurityNumberState>(set => ({
  securityNumber: '',
  setSecurityNumber: (securityNumber: string) => set({ securityNumber }),
}));

export default useSecurityNumber;

// import { create } from "zustand"

// const useSecurityNumber = create((set) => ({
//   securityNumber: "",
//   setSecurityNumber: (securityNumber) => set({ securityNumber }),
// }))

// export default useSecurityNumber
