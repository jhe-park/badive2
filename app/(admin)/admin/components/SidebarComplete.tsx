'use client';

import React from 'react';
import { Avatar, Button, ScrollShadow, Spacer } from '@heroui/react';
import { Icon } from '@iconify/react';
import { cn } from '@heroui/react';
import { sectionItemsWithTeams } from './sidebar-items';
import Sidebar from './sidebar';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import { signOut } from 'next-auth/react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { User } from '@supabase/supabase-js';

export default function SidebarComplete({ children, user }: { children: React.ReactNode; user: User }) {

  const supabase = createClient();
  const router = useRouter();

  const [isHidden, setIsHidden] = useState(false);

  // React.useEffect(() => {
  //   const handleResize = () => {
  //     setIsHidden(typeof window !== 'undefined' ? window.innerWidth < 768 : true);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  const [pageTitle, setPageTitle] = React.useState('');
  const pathname = usePathname();
  const getPageTitle = () => {
    if (pathname.includes('/admin/schedule')) return '스케쥴';
    if (pathname.includes('/admin/sales')) return '매출현황';
    if (pathname.includes('/admin/instructor')) return '강사관리';
    if (pathname.includes('/admin/member')) return '회원관리';
    if (pathname.includes('/admin/program')) return '프로그램';
    if (pathname.includes('/admin/tour')) return '투어관리';
    if (pathname.includes('/admin/main')) return '관리자 홈';
    if (pathname.includes('/admin/notification')) return '공지사항';
    if (pathname.includes('/admin/resort')) return '리조트';
    if (pathname.includes('/admin/faq')) return 'FAQ';
    if (pathname.includes('/admin/login')) return '로그인';
    return '';
  };
  useEffect(() => {
    setPageTitle(getPageTitle());
  }, [pathname]);

  const handleSignOut = async () => {
    supabase.auth.signOut();
    // 클라이언트 측에서 signOut 호출
    await signOut();
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen w-full" id="layout_0088">
      <div
        className={cn(
          'relative flex h-screen w-72 max-w-[288px] flex-col !border-r-small border-divider p-6 transition-[transform,opacity,margin] duration-250 ease-in-out',
          '-ml-72 -translate-x-72',
          isHidden && 'lg:-ml-72 lg:-translate-x-72',
          !isHidden && 'lg:-ml-0 lg:-translate-x-0',
          // {
          //   '-ml-72 -translate-x-72': isHidden,
          // },
        )}
      >
        <div className="flex items-center gap-2 px-2">
          <Link href="/admin/main">
            <span className="text-2xl font-bold uppercase">BADIVE</span>
          </Link>
        </div>
        <Spacer y={8} />
        <div className="flex items-center gap-3 px-3">
          <div className="flex flex-col">
            <p className="text-lg font-medium text-default-600">관리자</p>
            <p className="text-sm font-medium text-default-600">{user?.email}</p>
          </div>
        </div>
        <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
          <Sidebar
            // @ts-ignore
            defaultSelectedKey="home"
            items={sectionItemsWithTeams}
          />
        </ScrollShadow>
        <Spacer y={8} />
        <div className="mt-auto flex flex-col">
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
      </div>
      <div className="w-[95%] md:w-full h-[100vh] flex flex-col gap-y-4 md:mx-4 mx-auto">
        <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4 h-[10vh] w-full mt-4">
          <Button isIconOnly size="sm" variant="light" onPress={() => setIsHidden(!isHidden)}>
            {/* <Icon
              className="text-default-500"
              height={24}
              icon="solar:sidebar-minimalistic-outline"
              width={24}
            /> */}
            <RxHamburgerMenu className="text-black text-xl" />
          </Button>
          <h2 className="text-2xl font-bold text-default-700">{pageTitle}</h2>
        </header>
        <main className="w-full h-full mb-4 overflow-y-auto">
          <div
            style={{ fontFamily: 'Freesentation-9Black' }}
            className="flex h-full w-full flex-col gap-4 rounded-medium border-small border-divider overflow-auto scrollbar-hide p-6"
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
