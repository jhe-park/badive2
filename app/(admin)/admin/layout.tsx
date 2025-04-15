import { createClient } from '@/utils/supabase/server';
import 'react-toastify/dist/ReactToastify.css';
import SidebarAndMainContents from './components/SidebarComplete';
import { SideBarForMobile } from '@/app/components/SideBarForMobile';

export default async function ({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const menuItems = [
    { url: '/admin/schedule', name: '스케쥴' },
    { url: '/admin/sales', name: '매출현황' },
    { url: '/admin/instructor', name: '강사관리' },
    { url: '/admin/member', name: '회원관리' },
    { url: '/admin/program', name: '프로그램' },
    { url: '/admin/tour', name: '투어관리' },
    { url: '/admin/main', name: '홈' },
    { url: '/admin/notification', name: '공지사항' },
    { url: '/admin/resort', name: '리조트' },
    { url: '/admin/faq', name: 'FAQ' },
    { url: '/admin/login', name: '로그인' },
  ];

  return (
    <>
      <div className="block md:hidden">
        <SideBarForMobile type="ADMIN" user={user} menuItems={menuItems} />
        <div className="px-4 pt-8 pb-4">{children}</div>
      </div>
      <div className="hidden md:block">
        <SidebarAndMainContents children={children} user={user} />
      </div>
    </>
  );
}
