'use client';

import { createClient, createTypedSupabaseClient } from '@/utils/supabase/client';
import { Button, cn, ScrollShadow, Spacer } from '@heroui/react';
import { Icon } from '@iconify/react';
import { User } from '@supabase/supabase-js';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import Sidebar from './sidebar';
import { sectionItemsWithTeams } from './sidebar-items';

export default function SidebarComplete({ children, user }: { children: React.ReactNode; user: User }) {
  const supabase = createTypedSupabaseClient();
  const router = useRouter();

  const [isHidden, setIsHidden] = useState(false);

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
        )}
      >
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
      <div className="mx-auto flex h-[100vh] w-[95%] flex-col gap-y-4 md:mx-4 md:w-full">
        <header className="mt-4 flex h-[10vh] w-full items-center gap-3 rounded-medium border-small border-divider p-4">
          <Button isIconOnly size="sm" variant="light" onPress={() => setIsHidden(!isHidden)}>
            <RxHamburgerMenu className="text-xl text-black" />
          </Button>
          <h2 className="text-2xl font-bold text-default-700">{pageTitle}</h2>
        </header>
        <main className="mb-4 h-full w-full overflow-y-auto">
          <div
            style={{ fontFamily: 'Freesentation-9Black' }}
            className="flex h-full w-full flex-col gap-4 overflow-auto rounded-medium border-small border-divider p-6 scrollbar-hide"
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
