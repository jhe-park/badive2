'use client';
import React, { useState, useEffect } from 'react';
import IntroductionCarousel from './IntroductionCarousel';
import { useRouter, usePathname } from 'next/navigation';
import useInstructor from '@/app/store/useInstructor';

export default function TabContents() {
  const [activeTab, setActiveTab] = useState(0);
  const { instructor, setInstructor } = useInstructor();
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: 0, label: 'BADIVE 강사', path: '/instructors/bdn' },
    { id: 1, label: 'BADIVE 수중촬영감독', path: '/instructors/director' },
    { id: 2, label: 'BADIVE 협력강사', path: '/instructors/partner' },
  ];

  useEffect(() => {
    const currentTab = tabs.find(tab => tab.path === pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
      switch (currentTab.id) {
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
    <div className="flex h-full w-full flex-col items-center justify-start py-14">
      <div className="flex h-12 w-[95%] items-center justify-center gap-4 md:h-full md:w-[736px] md:gap-16">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`h-8 w-full rounded-2xl text-xs md:h-[50px] md:w-[200px] md:text-lg ${
              activeTab === tab.id ? 'bg-[#42A5F5] font-bold text-white underline' : 'bg-white'
            }`}
            onClick={() => {
              setActiveTab(tab.id);
              router.push(tab.path);
              switch (tab.id) {
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
      <div className="flex w-full flex-col items-center justify-center gap-y-2 py-6 md:gap-y-6 md:py-12">
        <div className="text-2xl md:text-[30px]">Instructor</div>
        <div className="text-4xl font-bold md:text-[50px]">강사소개</div>
      </div>
      <IntroductionCarousel />
    </div>
  );
}
