import React from 'react';

export default function Phone() {
  return (
    <div className="flex aspect-[375/530] w-full flex-col items-center justify-center bg-[#BAEBFF] md:aspect-[768/1032] xl:aspect-[1280/1400]">
      <img
        loading="lazy"
        className="aspect-[375/530] w-[92%] object-contain md:aspect-[530/1032] md:w-[84.1%] xl:aspect-[832/1200] xl:w-[46.875%] lg:w-[60%]"
        src="/programnew/phone.png"
        alt="phone"
      />
    </div>
  );
}
