import Image from 'next/image';
import TourCards from './components/TourCards';

export default function page() {
  return (
    <div className="mt-[100px] flex h-full w-full flex-col items-center justify-center">
      <div className="relative flex aspect-[1920/600] h-[40vh] w-full items-center justify-center md:h-auto">
        <Image src={'/divingtour/divingtour.png'} alt="scuberdiving" fill className="object-cover" />
        <div className="absolute bottom-[40%] left-[30%] flex flex-col gap-y-2"></div>
      </div>
      <div className="flex h-full w-[90%] flex-col items-center justify-center gap-y-5 md:max-w-[1280px]">
        <TourCards></TourCards>
      </div>
    </div>
  );
}
