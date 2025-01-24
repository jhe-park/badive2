'use client'
import React, { useState, useEffect } from 'react'
import IntroductionCarousel from './IntroductionCarousel'
import { useRouter, usePathname } from 'next/navigation'

export default function TabContents() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  console.log('params:', pathname);

  const tabs = [
    { id: 0, label: 'BDN 강사', path: '/instructors/bdn' },
    { id: 1, label: 'BDN 수중촬영감독', path: '/instructors/director' },
    { id: 2, label: 'BDN 협력강사', path: '/instructors/partner' },
  ];

  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [pathname]);

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
            onClick={() => {
              setActiveTab(tab.id);
              router.push(tab.path);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-center py-12">
         <p className="text-[30px] ">Director of photography</p>
         <p className="text-[50px] font-bold">수중촬영감독소개</p>
      </div>
      <IntroductionCarousel />
    </div>
  )
}

