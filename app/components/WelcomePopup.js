"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button, Checkbox } from "@heroui/react";
export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");

  // 탭 데이터
  const tabs = {
    tab1: {
      name: "BDN 다이빙투어",
      banners: [
        {
          id: 1,
          title: "봄 세일",
          link: "http://www.badive.co.kr/divingtours",
          image: "/popup/banner1.png",
        },
      ],
    },
    tab2: {
      name: "BDN 강사모집",
      banners: [
        {
          id: 3,
          title: "서비스 업데이트",
          link: "http://www.badive.co.kr/instructors/request",
          image: "/popup/banner2.png",
        },
      ],
    },
  };

  // 탭 자동 전환을 위한 useEffect 수정
  useEffect(() => {
    if (isOpen) {
      const tabIds = Object.keys(tabs);
      const interval = setInterval(() => {
        setActiveTab((current) => {
          const currentIndex = tabIds.indexOf(current);
          const nextIndex = (currentIndex + 1) % tabIds.length;
          return tabIds[nextIndex];
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    const hideUntil = localStorage.getItem("hidePopupUntil");
    const currentTime = new Date().getTime();

    if (!hideUntil || currentTime > parseInt(hideUntil)) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = (dontShow) => {
    if (dontShow) {
      const weekFromNow = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem("hidePopupUntil", weekFromNow.toString());
    }
    setIsOpen(false);
  };

  const handleBannerClick = (link) => {
    window.location.href = link;
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-lg shadow-lg w-[800px] h-[600px] max-w-[90vw] max-h-[90vh]">
        <div className="flex flex-col-reverse md:flex-row w-full h-full rounded-lg overflow-hidden">
          {/* 배너 영역 */}
          <div className="flex-1 flex flex-col h-full order-2 md:order-1">
            {tabs[activeTab].banners.map((banner) => (
              <div key={banner.id} className="h-[90%] aspect-square mx-auto">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleBannerClick(banner.link)}
                />
              </div>
            ))}

            {/* 하단 컨트롤 */}
            <div className="h-[10%] flex justify-between items-center px-2.5 text-medium">
              <Checkbox
                type="checkbox"
                className="m-0"
                onChange={(e) => handleClose(e.target.checked)}
              >
                <span>일주일 동안 보지 않기</span>
              </Checkbox>
              <Button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-medium"
                onPress={() => handleClose(false)}
              >
                닫기
              </Button>
            </div>
          </div>

          {/* 탭 영역 - 모바일에서는 가로로, PC에서는 세로로 */}
          <div className="w-full md:w-[20%] h-[60px] md:h-full flex flex-row md:flex-col font-bold order-1 md:order-2">
            {Object.entries(tabs).map(([tabId, tabData]) => (
              <Button
                key={tabId}
                className={`flex-1 py-2 md:py-4 px-4 h-full text-center md:text-left cursor-pointer transition-all duration-300 bg-white rounded-none
                  ${activeTab === tabId ? "bg-blue-500 text-white" : "hover:bg-gray-50"}`}
                onPress={() => setActiveTab(tabId)}
              >
                {tabData.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
