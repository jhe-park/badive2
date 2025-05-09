import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs

  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;

  const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString();
  const returnUrl = requestUrl.searchParams.get('returnUrl')?.toString();

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // 사용자 세션 정보 가져오기
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const userId = session.user.id;
      const userEmail = session.user.email;

      // profiles 테이블에서 해당 사용자 정보 확인
      const { data: profileData, error: profileError } = await supabase.from('profiles').select('*').eq('id', userId).single();

      if (profileError && profileError.code === 'PGRST116') {
        const { data: insertData, error: insertError } = await supabase.from('profiles').insert([
          {
            id: userId,
            email: userEmail,
            snsRegister: true,
            updated_at: new Date().toISOString(),
          },
        ]);

        if (insertError) {
          console.error('프로필 생성 에러:', insertError.message);
        }

        // 새로 생성된 프로필은 필수 정보가 없으므로 /register/sns로 리다이렉트
        return NextResponse.redirect(`${origin}/register/sns`);
      } else if (!profileError) {
        // 사용자 정보가 있는 경우 snsRegister 필드만 업데이트
        const { data: updateData, error: updateError } = await supabase
          .from('profiles')
          .update({
            snsRegister: true,
            updated_at: new Date().toISOString(),
            email: userEmail,
          })
          .eq('id', userId);

        if (updateError) {
          console.error('프로필 업데이트 에러:', updateError.message);
        }

        // snsRegister가 true인데 필수 정보(name, gender, phone, birth) 중 하나라도 없으면 /register/sns로 리다이렉트
        if (!profileData.name || !profileData.gender || !profileData.phone || !profileData.birth) {
          console.log('필수 정보 누락: SNS 추가 정보 등록 페이지로 리다이렉트');
          return NextResponse.redirect(`${origin}/register/sns`);
        }
      }
    }
  }

  if (redirectTo) {
    const targetUrl = typeof returnUrl === 'string' ? `${origin}${redirectTo}?returnUrl=${returnUrl}` : `${origin}${redirectTo}`;

    return NextResponse.redirect(targetUrl);
  }

  const targetUrl = typeof returnUrl === 'string' ? `${origin}/?returnUrl=${returnUrl}` : `${origin}/`;

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(targetUrl);
}
