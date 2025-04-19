import Image from 'next/image';
import NotificationTable from './components/NotificationTable';

export default function page() {
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div className="relative flex h-[40vh] w-full flex-col items-center justify-center lg:aspect-[1920/600] lg:h-auto">
        <Image src={'/notification/notification.png'} alt="scuberdiving" fill className="object-cover" />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-y-4">
          <div className="w-full text-center text-[14px] font-medium text-white md:text-[24px]">공지사항</div>
          <div className="w-full text-center text-[24px] font-bold text-white md:text-left md:text-[50px]" style={{ lineHeight: '1.5' }}>
            <p className="w-full md:text-center">다양한 BADIVE 정보와</p>
            <p className="w-full md:text-center">새로운 소식을 만나보세요.</p>
          </div>
        </div>
      </div>
      <div className="flex h-full w-[90%] flex-col items-center justify-start gap-y-5 md:h-full md:max-w-[1280px]">
        <NotificationTable></NotificationTable>
      </div>
    </div>
  );
}
