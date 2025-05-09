'use client';

import { createTypedSupabaseClient } from '@/utils/supabase/client';
import { Button, cn, ScrollShadow, Spacer } from '@heroui/react';
import { Icon } from '@iconify/react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import useExpertStore from '../store/useExpertStore';
import Sidebar from './sidebar';
import { sectionItemsWithTeams } from './sidebar-items';

export default function Component({ children, user }) {
  const [isHidden, setIsHidden] = React.useState(false);
  const { expertInformation, setExpertInformation } = useExpertStore();
  const supabase = createTypedSupabaseClient();
  const router = useRouter();

  const [pageTitle, setPageTitle] = React.useState('');
  const pathname = usePathname();
  const getPageTitle = () => {
    if (pathname.includes('/expert/profile')) return '프로필';
    if (pathname.includes('/expert/schedule')) return '스케쥴';
    if (pathname.includes('/expert/sales')) return '매출현황';
    if (pathname.includes('/expert/member')) return '회원관리';
    if (pathname.includes('/expert/login')) return '강사페이지';
    return '';
  };
  useEffect(() => {
    setPageTitle(getPageTitle());
  }, [pathname]);

  const handleSignOut = async () => {
    supabase.auth.signOut();
    await signOut();
    router.push('/expert/login');
  };

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      const { data: instructorData, error: instructorError } = await supabase.from('instructor').select('*').eq('email', data?.session?.user?.email).single();
      setExpertInformation(instructorData);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <div className="flex h-screen w-full">
      <div
        className={cn(
          'relative flex h-screen w-72 max-w-[288px] flex-col !border-r-small border-divider p-6 transition-[transform,opacity,margin] duration-250 ease-in-out',
          '-ml-72 -translate-x-72',
          isHidden && 'lg:-ml-72 lg:-translate-x-72',
          !isHidden && 'lg:-ml-0 lg:-translate-x-0',
        )}
      >
        <div className="flex items-center gap-2 px-2">
          <Link href="/admin/main">
            <span className="text-2xl font-bold uppercase">BADIVE</span>
          </Link>
        </div>
        <Spacer y={8} />
        <div className="flex items-center gap-3 px-3">
          <div className="flex flex-row items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              {expertInformation?.profile_image && <Image src={expertInformation.profile_image} alt="profile" fill className="object-cover" />}
            </div>
            <div>
              <p className="text-center text-lg font-bold text-default-600">{expertInformation?.name}</p>
              <p className="text-center text-sm text-default-600">{user?.email}</p>
            </div>
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
