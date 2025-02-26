"use client";
import React, { useState } from "react";
import Contents1 from "./Contents1";
import Contents2 from "./Contents2";
import Contents3 from "./Contents3";
import Contents4 from "./Contents4";
import Contents5 from "./Contents5";
import Contents6 from "./Contents6";
import Frame from "./Frame";

export default function TabContents() {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    "베이직 프리다이버",
    "프리다이버",
    "어드밴스드 프리다이버",
    "마스터 프리다이버",
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <Frame />;
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
        <div className="min-w-max h-12 md:h-24 flex items-center bg-[#F8F8F8]">
          {tabs.map((tab, index) => (
            <React.Fragment key={index}>
              <div
                className="flex-1 h-full flex items-center justify-center cursor-pointer relative px-4 whitespace-nowrap"
                onClick={() => setSelectedTab(index)}
              >
                <span
                  className={`${
                    selectedTab === index
                      ? 'text-[#003049] text-sm md:text-[32px] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#003049]'
                      : "text-gray-500 text-sm md:text-[32px]"
                  }`}
                >
                  {tab}
                </span>
              </div>
              {index < tabs.length - 1 && (
                <div className="w-px h-16 bg-gray-300 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <>{renderContent()}</>
    </>
  );
}
