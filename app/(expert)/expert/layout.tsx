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
    { url: '/expert/profile', name: '프로필' },
    { url: '/expert/schedule', name: '스케쥴' },
    { url: '/expert/sales', name: '매출현황' },
    { url: '/expert/member', name: '회원관리' },
    { url: '/expert/login', name: '강사페이지' },
  ];

  return (
    <>
      <div className="block md:hidden">
        <SideBarForMobile type="EXPERT" user={user} menuItems={menuItems} />
        <div className="px-4 pb-4 pt-8">{children}</div>
      </div>
      <div className="hidden md:block">
        <SidebarAndMainContents children={children} user={user} />
      </div>
    </>
  );
}
