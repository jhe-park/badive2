"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button, Checkbox } from "@heroui/react";
import { createClient } from "@/utils/supabase/client";
export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [user, setUser] = useState(null);



  // 탭 데이터
  const tabs = {
    tab1: {
      name: "인천수영장오픈안내내",
      banners: [
        {
          id: 1,
          title: "인천수영장오픈안내",
          link: "",
          image: "/popup/popup1.png",
        },
      ],
    },
    tab2: {
      name: "인천수영장 개인연습",
      banners: [
        {
          id: 2,
          title: "인천수영장 개인연습",
          link: "",
          image: "/popup/popup2.png",
        },
      ],
    },
    tab3: {
      name: "바다이브 OPEN 이벤트",
      banners: [
        {
          id: 3,
          title: "바다이브 OPEN 이벤트",
          link: "",
          image: "/popup/popup3.png",
        },
      ],
    },
    tab4: {
      name: "바다이브 무료클래스",
      banners: [
        {
          id: 4,
          title: "바다이브 무료클래스",
          link: "",
          image: "/popup/popup4.png",
        },
      ],
    },
    tab5: {
      name: "바다이스 세부 다이빙투어",
      banners: [
        {
          id: 5,
          title: "바다이스 세부 다이빙투어",
          link: "",
          image: "/popup/popup5.png",
        },
      ],
    },
    tab6: {
      name: "바다이브 강사모집",
      banners: [
        {
          id: 6,
          title: "바다이브 강사모집",
          link: "/instructors/request",
          image: "/popup/popup6.png",
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
      }, 8000);

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
      const dayFromNow = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
      localStorage.setItem("hidePopupUntil", dayFromNow.toString());
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
      <div className="bg-white rounded-lg shadow-lg w-[460px] max-w-[90vw] max-h-[90vh]">
        <div className="flex flex-col w-full h-full rounded-lg overflow-hidden">
          {/* 배너 영역 */}
          <div className="h-[60vh] md:h-[600px] w-full">
            {tabs[activeTab].banners.map((banner) => (
              <div key={banner.id} className="h-full w-full">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-fill cursor-pointer "
                  onClick={() => handleBannerClick(banner.link)}
                />
              </div>
            ))}
          </div>

          {/* 탭 영역 - 3x2 배열 */}
          <div className="grid grid-cols-3 grid-rows-2 gap-1 ">
            {Object.entries(tabs).map(([tabId, tabData]) => (
              <Button
                key={tabId}
                className={`flex-1 py-2 px-4 text-center cursor-pointer transition-all duration-300 bg-white rounded-none
                  ${activeTab === tabId ? "bg-blue-500 text-white" : "hover:bg-gray-50"}`}
                onPress={() => setActiveTab(tabId)}
                style={{ wordWrap: "break-word", whiteSpace: "normal", minHeight: "50px" }}
              >
                {tabData.name}
              </Button>
            ))}
          </div>

          {/* 하단 컨트롤 */}
          <div className="flex justify-between items-center px-2.5 text-medium py-2">
            <Checkbox
              type="checkbox"
              className="m-0"
              onChange={(e) => handleClose(e.target.checked)}
            >
              <span>하루 동안 보지 않기</span>
            </Checkbox>
            <Button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-medium"
              onPress={() => handleClose(false)}
            >
              닫기
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
