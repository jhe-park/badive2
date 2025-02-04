import { create } from "zustand"

const useMarketingAgreement = create((set) => ({
  marketingAgreement: false,
  setMarketingAgreement: (marketingAgreement) => set({ marketingAgreement }),
}))

export default useMarketingAgreement