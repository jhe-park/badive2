'use client';
import { Button, Checkbox } from '@heroui/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [user, setUser] = useState(null);

  // 탭 데이터
  const tabs = {
    tab1: {
      name: '인천수영장오픈안내',
      banners: [
        {
          id: 1,
          title: '인천수영장오픈안내',
          link: 'https://www.badive.co.kr/community/notification/49',
          image: '/popup/popup1.avif',
        },
      ],
    },
    tab2: {
      name: '인천수영장 개인연습',
      banners: [
        {
          id: 2,
          title: '인천수영장 개인연습',
          link: 'https://www.badive.co.kr/community/notification/50',
          image: '/popup/popup2.avif',
        },
      ],
    },
    tab3: {
      name: '바다이브 OPEN 이벤트',
      banners: [
        {
          id: 3,
          title: '바다이브 OPEN 이벤트',
          link: 'https://www.badive.co.kr/community/notification/51',
          image: '/popup/popup3.avif',
        },
      ],
    },
    tab4: {
      name: '바다이브 무료클래스',
      banners: [
        {
          id: 4,
          title: '바다이브 무료클래스',
          link: 'https://www.badive.co.kr/community/notification/52',
          image: '/popup/popup4.avif',
        },
      ],
    },
    tab5: {
      name: '바다이브 다이빙투어',
      banners: [
        {
          id: 5,
          title: '바다이브 다이빙투어',
          link: 'https://www.badive.co.kr/divingtours',
          // image: "/popup/popup5.png",
          image: '/popup/popup5.avif',
        },
      ],
    },
    tab6: {
      name: '바다이브 강사모집',
      banners: [
        {
          id: 6,
          title: '바다이브 강사모집',
          link: '/instructors/request',
          image: '/popup/popup6.avif',
          // image: "/popup/popup6.png",
        },
      ],
    },
  };

  // 탭 자동 전환을 위한 useEffect 수정
  useEffect(() => {
    if (isOpen) {
      const tabIds = Object.keys(tabs);
      const interval = setInterval(() => {
        setActiveTab(current => {
          const currentIndex = tabIds.indexOf(current);
          const nextIndex = (currentIndex + 1) % tabIds.length;
          return tabIds[nextIndex];
        });
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    const hideUntil = localStorage.getItem('hidePopupUntil');
    const currentTime = new Date().getTime();

    if (!hideUntil || currentTime > parseInt(hideUntil)) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = dontShow => {
    if (dontShow) {
      const dayFromNow = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
      localStorage.setItem('hidePopupUntil', dayFromNow.toString());
    }
    setIsOpen(false);
  };

  const handleBannerClick = link => {
    window.location.href = link;
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white rounded-lg shadow-lg xl:w-[25vw] md:w-[60vw] w-[80vw] h-auto overflow-hidden flex flex-col">
        {/* 배너 영역 - 460x600 비율 유지 */}
        <div className="w-full" style={{ aspectRatio: '460/600' }}>
          {tabs[activeTab].banners.map(banner => (
            <div key={banner.id} className="h-full w-full">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover cursor-pointer" onClick={() => handleBannerClick(banner.link)} />
            </div>
          ))}
        </div>

        {/* 탭 영역 - 3x2 배열 */}
        <div className="grid grid-cols-3 grid-rows-2 gap-0.5 border-t border-gray-200 w-full">
          {Object.entries(tabs).map(([tabId, tabData]) => (
            <Button
              key={tabId}
              className={`py-1.5 px-2 text-[12px] sm:text-sm text-center cursor-pointer transition-all duration-300 rounded-none
                ${activeTab === tabId ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
              onPress={() => setActiveTab(tabId)}
              style={{ wordWrap: 'break-word', whiteSpace: 'normal', minHeight: '40px' }}
            >
              {tabData.name}
            </Button>
          ))}
        </div>

        {/* 하단 컨트롤 */}
        <div className="flex justify-between items-center px-2.5 py-2 w-full border-t border-gray-200">
          <Checkbox type="checkbox" className="m-0" onChange={e => handleClose(e.target.checked)}>
            <span className="text-xs sm:text-sm">하루 동안 보지 않기</span>
          </Checkbox>
          <Button className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm" onPress={() => handleClose(false)}>
            닫기
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
