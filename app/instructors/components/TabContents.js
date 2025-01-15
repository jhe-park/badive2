'use client'
import React, { useState } from 'react'
import IntroductionCarousel from './IntroductionCarousel'

export default function TabContents() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'BDN 강사' },
    { id: 1, label: 'BDN 수중촬영감독' },
    { id: 2, label: 'BDN 협력강사' },
  ];

  return (
    <div className="w-full h-[1810px] flex flex-col items-center justify-start py-14">
      <div className="w-2/5 flex justify-center items-center gap-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`text-lg w-[200px] h-[50px] rounded-2xl 
              ${activeTab === tab.id 
                ? 'bg-[#42A5F5] text-white underline font-bold' 
                : 'bg-white'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-center py-12">
         <p className="text-[30px] ">Instructor</p>
         <p className="text-[50px] font-bold">강사소개</p>
      </div>
      <IntroductionCarousel />
    </div>
  )
}

