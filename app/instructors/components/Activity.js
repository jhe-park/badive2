import React from "react";

export default function Activity() {
  return (
    <div className="w-full h-[1046px] flex relative">
      <div className="absolute top-0 left-0 w-full flex flex-col items-center justify-center">
        <h1 className="text-[30px] text-black">activity</h1>
        <p className="text-[50px] font-bold text-black">강사활동</p>
      </div>
      <div className="w-1/3 h-full bg-black"></div>
      <div className="w-2/3 h-full bg-white"></div>
    </div>
  );
}
