import { createClient } from '@/utils/supabase/server';
import 'react-toastify/dist/ReactToastify.css';
import SidebarComplete from './components/SidebarComplete';

export default async function ({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <SidebarComplete children={children} user={user} />;
}
