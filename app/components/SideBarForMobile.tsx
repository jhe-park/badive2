'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { FaArrowLeft } from 'react-icons/fa';
import { Button, Spacer } from '@heroui/react';
import { User } from '@supabase/supabase-js';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { signOut } from 'next-auth/react';
import useExpertStore from '../(expert)/expert/store/useExpertStore';
import { Z_INDEX } from '@/constants/constants';

interface SidebarProps {
  type: 'ADMIN' | 'EXPERT';
  menuItems: { name: string; url: string }[];
  user: User;
}

export const SideBarForMobile: React.FC<SidebarProps> = ({ type, user, menuItems }) => {
  const supabase = createTypedSupabaseClient();

  const { expertInformation, setExpertInformation } = useExpertStore();

  const [isOpen, setIsOpen] = useState(false);

  const [sidebarWidth, setSidebarWidth] = useState('200px');
  const router = useRouter();

  const toggleSidebar: React.MouseEventHandler<HTMLButtonElement> = e => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      // 화면 너비의 50%와 200px 중 큰 값을 선택
      const width = Math.max(window.innerWidth * 0.5, 200);
      setSidebarWidth(`${width}px`);
    };

    // 초기 실행
    handleResize();

    // 화면 크기 변경 시 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSignOut = async () => {
    supabase.auth.signOut();
    // 클라이언트 측에서 signOut 호출
    await signOut();
    router.push('/admin/login');
  };

  return (
    <div className="relative">
      <button
        style={{
          zIndex: Z_INDEX.SIDE_BAR_MOBILE_TOGGLE_BUTTON,
        }}
        className="fixed right-3 top-3 rounded-full bg-white bg-opacity-90 p-2.5 shadow-md transition-colors hover:bg-gray-100"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar menu"
      >
        <Menu className="text-gray-700" size={24} />
      </button>
      <div
        className={`fixed top-0 h-screen overflow-y-auto bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'left-0' : '-left-full'}`}
        style={{
          zIndex: Z_INDEX.SIDE_BAR_MOBILE,
          width: sidebarWidth,
        }}
      >
        {/* <div className="flex justify-end p-5 border-b border-gray-200">
          <button className="p-1.5 hover:bg-gray-100 rounded transition-colors" onClick={toggleSidebar} aria-label="Close sidebar menu">
            <Menu className="text-gray-700" size={24} />
          </button>
        </div> */}
        <nav className="flex h-full flex-col justify-between gap-12">
          <ul className="m-0 list-none p-0 pl-4 pt-6">
            <div className="flex items-center gap-2 px-2">
              <Link href="/admin/main">
                <span className="text-2xl font-bold uppercase">BADIVE</span>
              </Link>
            </div>
            <Spacer y={8} />
            <div className="flex items-center gap-3 px-3">
              <div className="flex flex-col">
                {type === 'EXPERT' && (
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      {expertInformation?.profile_image && <Image src={expertInformation.profile_image} alt="profile" fill className="object-cover" />}
                    </div>
                    <p className="text-lg font-medium text-default-600">{expertInformation?.name}</p>
                  </div>
                )}
                {type === 'ADMIN' && <p className="text-lg font-medium text-default-600">관리자</p>}
                <div className="pt-3 text-sm font-medium text-default-600">{user?.email}</div>
              </div>
            </div>
            <div className="pt-4">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {/* hover:bg-gray-50 */}
                  <a href={item.url} className="block cursor-pointer border-b border-gray-200 px-5 py-4 text-gray-700 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </div>
          </ul>
          <div className="mt-auto flex flex-col pb-6">
            <Button
              className="justify-start text-default-500 data-[hover=true]:text-foreground"
              startContent={<Icon className="rotate-180 text-default-500" icon="solar:minus-circle-line-duotone" width={24} />}
              variant="light"
              onPress={handleSignOut}
            >
              Log Out
            </Button>
            <Button
              className="justify-start text-default-500 data-[hover=true]:text-foreground"
              startContent={<FaArrowLeft className="text-default-500" />}
              variant="light"
              onPress={() => router.push('/')}
            >
              메인으로 이동
            </Button>
          </div>
        </nav>
      </div>

      {/* 사이드바가 열렸을 때 뒷 배경 오버레이 */}
      {/* {isOpen && <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-[9998]" onClick={toggleSidebar} />} */}
    </div>
  );
};
