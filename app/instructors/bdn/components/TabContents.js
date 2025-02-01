'use client'
import React, { useState, useEffect } from 'react'
import IntroductionCarousel from './IntroductionCarousel'
import { useRouter, usePathname } from 'next/navigation'
import useInstructor from '@/app/store/useInstructor'

export default function TabContents() {
  const [activeTab, setActiveTab] = useState(0);
  const { instructor, setInstructor } = useInstructor();
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
      switch(currentTab.id) {
        case 0:
          setInstructor('정은지 강사');
          break;
        case 1:
          setInstructor('노정훈 촬영감독');
          break;
        case 2:
          setInstructor('김규리 강사');
          break;
      }
    }
  }, [pathname]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start py-14">
      <div className="w-[95%] md:w-2/5 flex h-12 md:h-full justify-center items-center gap-4 md:gap-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`text-xs md:text-lg w-full h-8 md:w-[200px] md:h-[50px] rounded-2xl 
              ${activeTab === tab.id 
                ? 'bg-[#42A5F5] text-white underline font-bold' 
                : 'bg-white'}`}
            onClick={() => {
              setActiveTab(tab.id);
              router.push(tab.path);
              switch(tab.id) {
                case 0:
                  setInstructor('정은지 강사');
                  break;
                case 1:
                  setInstructor('노정훈 수중촬영감독');
                  break;
                case 2:
                  setInstructor('김규리 강사');
                  break;
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-col items-center justify-center py-6 md:py-12 gap-y-2 md:gap-y-6">
         <div className="text-2xl md:text-[30px] ">Instructor</div>
         <div className="text-4xl md:text-[50px] font-bold">강사소개</div>
      </div>
      <IntroductionCarousel />
    </div>
  )
}

