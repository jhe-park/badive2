import { create } from 'zustand';

const useExpertStore = create((set) => ({
    expertInformation: null,
    setExpertInformation: (info) => set({ expertInformation: info }),
}));

export default useExpertStore;
