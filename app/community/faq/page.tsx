import Image from 'next/image';
import FAQTable from './components/FAQTable';
export default function page() {
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center gap-y-10">
      <div className="relative flex h-[30vh] w-full items-center justify-center md:h-[600px]">
        <Image src={'/faq/faq.png'} alt="scuberdiving" fill className="object-cover" />
        {/* gap-y-2 */}
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-y-4">
          <div className="text-sm font-medium text-white md:text-[24px]">자주묻는질문</div>
          <div className="w-full text-center text-2xl font-bold text-white md:text-[50px]" style={{ lineHeight: '1.5' }}>
            <p>궁금하신 내용들에 대해서</p>
            <p>빠르고 간편하게 답을 찾아보세요.</p>
          </div>
        </div>
      </div>
      <div className="flex w-[90%] flex-col items-center justify-center gap-y-5 pb-10 md:max-w-[1280px]">
        <FAQTable></FAQTable>
      </div>
    </div>
  );
}
