import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

// 이 경로는 오직 네이버 로그인만을 처리한다
export async function POST(request) {
  const supabase = await createClient();
  const { email } = await request.json();
  const password = `defaultPassword`; // 강제 비밀번호 설정

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log('로그인 에러 발생:');
    console.error(error.message);

    return NextResponse.json(
      {
        redirect: '/register/sns',
      },
      { status: 400 },
    );
  }

  // 로그인 성공

  // 사용자 프로필 정보 확인
  const { data: profileData, error: profileError } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();

  if (profileError) {
    console.log('프로필 조회 에러:', profileError.message);
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  // snsRegister가 true이고 필수 정보(name, gender, phone, birth)가 비어있는지 확인
  if (profileData.snsRegister === true && (!profileData.name || !profileData.gender || !profileData.phone || !profileData.birth)) {
    // SNS 사용자의 필수 정보 미입력. 추가 정보 입력 페이지로 이동
    return NextResponse.json(
      {
        redirect: '/register/sns',
      },
      { status: 200 },
    );
  }

  // redirect('/');

  return NextResponse.json(
    {
      redirect: '/',
    },
    { status: 200 },
  );
}
