import { create } from 'zustand';

type TLoginStatus = 'LOGIN_READY' | 'LOGIN_WORK_IN_PROGRESS' | 'LOGIN_COMPLETED' | 'LOGIN_ERROR';

const useLoginStatusStore = create<{
  loginStatus: TLoginStatus;
  setLoginStatus: (arg: TLoginStatus) => void;
}>(set => ({
  loginStatus: 'LOGIN_READY',
  setLoginStatus: (info: TLoginStatus) => {
    return set({ loginStatus: info });
  },
}));

export default useLoginStatusStore;
