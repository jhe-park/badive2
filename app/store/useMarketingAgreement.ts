import { create } from "zustand"

// 마케팅 동의 상태를 위한 인터페이스 정의
interface MarketingAgreementState {
  marketingAgreement: boolean;
  setMarketingAgreement: (marketingAgreement: boolean) => void;
}

const useMarketingAgreement = create<MarketingAgreementState>((set) => ({
  marketingAgreement: false,
  setMarketingAgreement: (marketingAgreement: boolean) => set({ marketingAgreement }),
}))

export default useMarketingAgreement

// import { create } from "zustand"

// const useMarketingAgreement = create((set) => ({
//   marketingAgreement: false,
//   setMarketingAgreement: (marketingAgreement) => set({ marketingAgreement }),
// }))

// export default useMarketingAgreement