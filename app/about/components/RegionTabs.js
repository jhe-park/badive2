'use client'
import { useState } from 'react';
import React from 'react';
import Image from 'next/image';

function RegionTabs() {
  const [selectedTab, setSelectedTab] = useState('전체');
  
  const regions = ['전체', '서울', '경기', '인천', '대전', '대구', '부산', '경남'];
  
  // 위치 데이터 구조화
  const locations = [
    { id: 1, name: '잠실스킨스쿠버다이빙', image: '/about/location1.png', region: '서울' },
    { id: 2, name: '딥스테이션', image: '/about/location2.png', region: '서울' },
    { id: 3, name: '알프스 다이빙', image: '/about/location3.png', region: '경기' },
    { id: 4, name: '스쿠버월드 두류다이빙 풀', image: '/about/location4.png', region: '대구' },
    { id: 5, name: '문학박태환수영장', image: '/about/location5.png', region: '인천' },
    { id: 6, name: 'DIT서면풀장', image: '/about/location6.png', region: '부산' },
    { id: 7, name: '북항마리나', image: '/about/location7.png', region: '부산' },
    { id: 8, name: '송도해양레포츠', image: '/about/location8.png', region: '경남' },
  ];

  // 선택된 지역에 따라 위치 필터링
  const filteredLocations = selectedTab === '전체' 
    ? locations 
    : locations.filter(location => location.region === selectedTab);

  return (
    <div className="flex flex-col items-center justify-center">
    <div className="w-[80vw] h-12 md:h-20 bg-gray-300 flex my-4 text-sm md:text-xl">
      {regions.map((region, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex-1 justify-center items-center flex cursor-pointer hover:bg-gray-200 transition-colors ${
              selectedTab === region ? 'text-blue-500 font-bold' : ''
            }`}
            onClick={() => setSelectedTab(region)}
          >
            {region}
          </div>
          {index < regions.length - 1 && (
            <div className="h-8 my-auto w-[1px] bg-gray-400" />
          )}
        </React.Fragment>
      ))}
    </div>
    <div className="w-[70vw] h-full grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-4  md:mt-6">
      {filteredLocations.map((location,index) => (
        <div key={index} className="flex flex-col items-center md:p-4 rounded-lg">
          <div className="w-full h-36 md:h-full relative">
            <Image
              src={location.image} 
              alt={location.name} 
              fill
              className="object-cover rounded-lg" 
            />
          </div>
          <p className="mt-2 text-medium md:text-3xl font-medium">{location.name}</p>
        </div>
      ))}
    </div>

    </div>
  );
}

export default RegionTabs;