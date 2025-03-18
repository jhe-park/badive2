import React from "react";

export default function Phone() {
  return (
    <div className="w-full xl:aspect-[1280/1400] md:aspect-[768/1032] aspect-[375/530]  flex flex-col items-center justify-center bg-[#BAEBFF]">
      <img 
        className="xl:w-[46.875%] lg:w-[60%] md:w-[84.1%] w-[92%] xl:aspect-[832/1200] md:aspect-[530/1032] aspect-[375/530] object-contain" 
        src="/programnew/phone.png" 
        alt="phone" 
      />
    </div>
  );
}
