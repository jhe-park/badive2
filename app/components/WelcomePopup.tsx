'use client';
import { Z_INDEX } from '@/constants/constants';
import { Button, Checkbox } from '@heroui/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  // const [user, setUser] = useState(null);

  const tabs = {
    tab1: {
      name: 'OPEN 이벤트',
      banners: [
        {
          id: 1,
          title: 'OPEN 이벤트',
          link: 'http://event.badive.co.kr/event',
          image: '/popup/new/popup1.webp',
        },
      ],
    },
    tab2: {
      name: '전국 강습 가능',
      banners: [
        {
          id: 2,
          title: '전국 강습 가능',
          link: '/community/notification/58',
          image: '/popup/new/popup2.webp',
        },
      ],
    },
    tab3: {
      name: '무료클래스',
      banners: [
        {
          id: 3,
          title: '무료클래스',
          link: '/community/notification/52',
          image: '/popup/new/popup3.webp',
        },
      ],
    },
    tab4: {
      name: '다이빙 투어',
      banners: [
        {
          id: 4,
          title: '다이빙 투어',
          link: '/divingtours/18',
          image: '/popup/new/popup4.webp',
        },
      ],
    },
    tab5: {
      name: '네이버카페 오픈',
      banners: [
        {
          id: 5,
          title: '네이버카페 오픈',
          link: 'https://cafe.naver.com/babive?iframe_url=/ArticleList.nhn%3Fsearch.clubid=31436952%26search.boardtype=L',
          image: '/popup/new/popup5.webp',
        },
      ],
    },
    // https://cafe.naver.com/babive?iframe_url=/ArticleList.nhn%3Fsearch.clubid=31436952%26search.boardtype=L
    tab6: {
      name: '강사모집',
      banners: [
        {
          id: 6,
          title: '강사모집',
          link: '/instructors/request',
          image: '/popup/new/popup6.webp',
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
    <div
      style={{
        zIndex: Z_INDEX.WELCOME_POPUP,
      }}
      // z-[1000]
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="flex h-auto w-[80vw] flex-col overflow-hidden rounded-lg bg-white shadow-lg md:w-[60vw] xl:w-[25vw]">
        {/* 배너 영역 - 460x600 비율 유지 */}
        <div className="w-full" style={{ aspectRatio: '460/600' }}>
          {tabs[activeTab].banners.map(banner => (
            <div key={banner.id} className="h-full w-full">
              <img
                loading="lazy"
                src={banner.image}
                alt={banner.title}
                className="h-full w-full cursor-pointer object-cover"
                onClick={() => handleBannerClick(banner.link)}
              />
            </div>
          ))}
        </div>

        {/* 탭 영역 - 3x2 배열 */}
        <div className="grid w-full grid-cols-3 grid-rows-2 gap-0.5 border-t border-gray-200">
          {Object.entries(tabs).map(([tabId, tabData]) => (
            <Button
              key={tabId}
              className={`cursor-pointer rounded-none px-2 py-1.5 text-center font-freesentation text-[12px] transition-all duration-300 sm:text-sm ${activeTab === tabId ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
              onPress={() => setActiveTab(tabId)}
              style={{ wordWrap: 'break-word', whiteSpace: 'normal', minHeight: '40px' }}
            >
              {tabData.name}
            </Button>
          ))}
        </div>

        {/* 하단 컨트롤 */}
        <div className="flex w-full items-center justify-between border-t border-gray-200 px-2.5 py-2">
          <Checkbox type="checkbox" className="m-0" onChange={e => handleClose(e.target.checked)}>
            <span className="text-xs sm:text-sm">하루 동안 보지 않기</span>
          </Checkbox>
          <Button className="rounded bg-blue-500 px-3 py-1.5 text-xs text-white hover:bg-blue-600 sm:text-sm" onPress={() => handleClose(false)}>
            닫기
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
