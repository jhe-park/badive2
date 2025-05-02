'use server';

import { createClient } from '@/utils/supabase/client';

export async function handlePasswordChange(code, password) {
  const supabase = createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log('error:', error);

    if (error) {
      return 'Unable to reset Password. Link expired';
    }
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return 'Unable to reset Password. Try again!';
  }
  return null; // 성공 시 에러 메시지 없음
}
