'use client'
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [externalWindow, setExternalWindow] = useState(null);
  const [activeTab, setActiveTab] = useState('tab1');

  // 탭 데이터
  const tabs = {
    tab1: {
      name: 'BDN 다이빙투어',
      banners: [
        { id: 1, title: '봄 세일', link: 'http://www.badive.co.kr/divingtours', image: '/popup/banner1.png' },
        
      ]
    },
    tab2: {
      name: 'BDN 강사모집',
      banners: [
        { id: 3, title: '서비스 업데이트', link: 'http://www.badive.co.kr/instructors/request', image: '/popup/banner2.png' },
        



      ]
    }
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
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    const hideUntil = localStorage.getItem('hidePopupUntil');
    const currentTime = new Date().getTime();
    
    if (!hideUntil || currentTime > parseInt(hideUntil)) {
      const width = 500;
      const height = 400;
      const left = 20;
      const top = 20;
      
      let newWindow;
      try {
        newWindow = window.open(
          '',
          'WelcomePopup',
          `width=${width},height=${height},left=${left},top=${top}`
        );
        
        // 팝업이 차단되었거나 null인 경우 처리
        if (!newWindow || !newWindow.document) {
          console.log('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.');
          return;
        }

        // CSS 스타일 추가
        const styleSheet = newWindow.document.createElement('style');
        styleSheet.textContent = `
          .popup-container {
            display: flex;
            width: 100%;
            height: 100%;
          }
          .sidebar {
            width: 30%;
            background-color: white;
            padding: 0;
            border-right: 1px solid #ddd;
            display: flex;
            flex-direction: column;
            font-weight: bold;
          }
          .tab-button {
            width: 100%;
            padding: 15px;
            margin: 0;
            border: none;
            text-align: left;
            cursor: pointer;
            background-color: white;
            transition: all 0.3s;
            border-bottom: 1px solid #ddd;
          }
          .tab-button:hover {
            background-color: #f8f9fa;
          }
          .tab-button.active {
            background-color: #3b82f6;
            color: white;
          }
          .content-area {
            flex: 1;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          .banner-container {
            height: 90%;
            margin: 0;
            padding: 0;
            line-height: 0;
          }
          .banner-image {
            width: 100%;
            height: 100%;
            object-fit: fill;
            cursor: pointer;
            transition: transform 0.3s;
            display: block;
          }
          
          .controls {
            height: 10%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            background-color: #f8f9fa;
            font-size: 12px;
          }
          .checkbox-label {
            display: flex;
            align-items: center;
            gap: 4px;
          }
          input[type="checkbox"] {
            margin: 0;
            vertical-align: middle;
          }
          .close-button {
            padding: 8px 16px;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          }
          .close-button:hover {
            background-color: #2563eb;
          }
        `;
        newWindow.document.head.appendChild(styleSheet);
        
        newWindow.document.body.style.margin = '0';
        newWindow.document.body.style.backgroundColor = 'white';
        newWindow.document.title = '환영합니다';
        
        const container = newWindow.document.createElement('div');
        newWindow.document.body.appendChild(container);
        
        setExternalWindow({ window: newWindow, container });
        setIsOpen(true);
      } catch (error) {
        console.log('팝업 창을 열 수 없습니다:', error);
        return;
      }
    }
    
    // 컴포넌트 언마운트 시 창 닫기
    return () => {
      if (externalWindow?.window) {
        externalWindow.window.close();
      }
    };
  }, []);

  const handleClose = (dontShow) => {
    if (dontShow) {
      const weekFromNow = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
      localStorage.setItem('hidePopupUntil', weekFromNow.toString());
    }
    if (externalWindow?.window) {
      externalWindow.window.close();
    }
    setIsOpen(false);
  };

  const handleBannerClick = (link) => {
    if (externalWindow?.window) {
      window.location.href = link;
      externalWindow.window.close();
      setIsOpen(false);
    }
  };

  if (!isOpen || !externalWindow) return null;

  return createPortal(
    <div className="popup-container">
      {/* 사이드바 */}
      <div className="sidebar">
        {Object.entries(tabs).map(([tabId, tabData]) => (
          <button
            key={tabId}
            className={`tab-button ${activeTab === tabId ? 'active' : ''}`}
            onClick={() => setActiveTab(tabId)}
          >
            {tabData.name}
          </button>
        ))}
      </div>

      {/* 배너 영역 */}
      <div className="content-area">
        {tabs[activeTab].banners.map((banner) => (
          <div key={banner.id} className="banner-container">
            <img 
              src={banner.image} 
              alt={banner.title}
              className="banner-image"
              onClick={() => handleBannerClick(banner.link)}
            />
          </div>
        ))}

        {/* 하단 컨트롤 */}
        <div className="controls">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              onChange={(e) => handleClose(e.target.checked)}
            /> 
            <span>일주일 동안 보지 않기</span>
          </label>
          <button 
            className="close-button"
            onClick={() => handleClose(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>,
    externalWindow.container
  );
}