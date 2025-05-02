'use client';
import React, { useState } from 'react';
import Contents1 from './Contents1';
import Contents2 from './Contents2';
import Contents3 from './Contents3';
import Contents4 from './Contents4';
import Contents5 from './Contents5';
import Contents6 from './Contents6';

export default function TabContents() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ['베이직 언더워터 댄스(D1)', '어드밴스드 언더워터 댄스(D2)', '마스터 언더워터 댄스(D3)', '언더워터 댄스 강사'];

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <Contents1 />;
      case 1:
        return <Contents2 />;
      case 2:
        return <Contents3 />;
      case 3:
        return <Contents4 />;
      case 4:
        return <Contents5 />;
      case 5:
        return <Contents6 />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-[90vw] overflow-x-auto scrollbar-hide">
        <div className="flex h-12 min-w-max items-center bg-[#F8F8F8] md:h-24">
          {tabs.map((tab, index) => (
            <React.Fragment key={index}>
              <div
                className="relative flex h-full flex-1 cursor-pointer items-center justify-center whitespace-nowrap px-4"
                onClick={() => setSelectedTab(index)}
              >
                <span
                  className={`${
                    selectedTab === index
                      ? 'text-sm font-bold text-[#003049] after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-[#003049] after:content-[""] md:text-[25px]'
                      : 'text-sm text-gray-500 md:text-[25px]'
                  }`}
                >
                  {tab}
                </span>
              </div>
              {index < tabs.length - 1 && <div className="h-16 w-px flex-shrink-0 bg-gray-300" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <>{renderContent()}</>
    </>
  );
}
