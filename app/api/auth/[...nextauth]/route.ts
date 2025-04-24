import { createSupabaseServerClientWithAdminPrivilege } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';

// const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '';

// const supabaseAdmin = createSupabaseClient(supabaseURL, supabaseKey, {
//   auth: {
//     autoRefreshToken: false,
//     persistSession: false,
//   },
// });

// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? '',
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? '',
      // clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ?? '',
      // clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const supabaseAdmin = await createSupabaseServerClientWithAdminPrivilege();

      // user, account, profile 중 하나라도 값이 있는지 확인
      console.log('in nextauth callbacks');
      if (!user && !account && !profile) {
        console.log('인증 정보가 없습니다');
        return false;
      }

      const { email } = user;
      // profiles 테이블에서 사용자 조회
      const { data, error } = await supabaseAdmin.from('profiles').select('*').eq('email', email).single();

      // let userId;
      console.log('테이블 조회결과:', data);
      console.log('가입할 이메일:', email);

      if (!error) {
        // const password = `defaultPassword`; // 강제 비밀번호 설정
        // const { data, error } = await supabase.auth.signInWithPassword({
        //   email,
        //   password,
        // });
        return true;
      }

      console.log('error');
      console.log(error);

      // if (error) {
      // 사용자가 없는 경우, 새로운 사용자 생성
      console.log('사용자가 없는 경우, 새로운 사용자 생성');

      const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: 'defaultPassword',
        email_confirm: true,
      });

      if (createUserError) {
        // createError.__isAuthError
        // 이미 가입된 사용자가 있는 경우 (이메일 중복)
        if (createUserError.code === 'email_exists') {
          console.log('이미 가입된 이메일입니다:', email);
          // 이미 가입된 이메일인데 profile 테이블에 해당 row가 없음

          

          // 참고 : https://stackoverflow.com/questions/68334303/supabase-how-to-query-users-by-email
          const { data: userDataArr, error } = await supabaseAdmin.rpc('get_user_id_by_email', {
            email,
          });

          const userData = userDataArr.at(0);
          if (userData == null) {
            console.error('사용자 정보 조회 실패:', error);
            return false;
          }

          if (userData.id == null) {
            console.error('user 데이터에 id 정보가 없습니다:');
            return false;
          }

          console.log('userData:', userData);
          console.log(userData);

          const { error: profileError } = await supabaseAdmin.from('profiles').upsert(
            {
              id: userData.id,
              email: email,
              snsRegister: true,
              role: 'client',
            },
            {
              onConflict: 'id',
            },
          );

          return true;

          // 기존 사용자 정보 가져오기
          // const { data: profileData, error: errorForProfile } = await supabaseAdmin.from('profiles').select('*').eq('email', email).single();

          // if (errorForProfile) {
          //   console.error('기존 사용자 정보 조회 실패:', errorForProfile);
          //   return false;
          // }

          // const userId = profileData.id;
          // console.log('기존 사용자 ID:', profileData.id);

          // // 프로필 테이블에 사용자 정보가 없는 경우 추가
          // const { error: profileError } = await supabaseAdmin
          //   .from('profiles')
          //   .update({
          //     // email,
          //     snsRegister: true,
          //     role: 'client',
          //   })
          //   .eq('id', profileData.id);

          // upsert(
          //   { id: userId, email: email, snsRegister: true },
          //   {
          //     onConflict: 'id',
          //   },
          // );

          // if (profileError) {
          //   console.error('기존 사용자 프로필 업데이트 오류:', profileError);
          // }
        } else {
          console.error('사용자 생성 오류:', createUserError);
          return false;
        }
      } else {
        // supabaseAdmin.auth.admin.createUser 호출결과 에러가 없음
        const userId = newUser.user.id;
        console.log('새로운 사용자 생성:', userId);
        // profiles 테이블 업데이트
        const { error: profileError } = await supabaseAdmin.from('profiles').upsert(
          {
            id: userId,
            email: email,
            snsRegister: true,
            role: 'client',
          },
          {
            onConflict: 'id',
          },
        );

        if (profileError) {
          console.error('프로필 업데이트 오류:', profileError);
          return false;
        }
        return true;
      }

      // return true;

      // }
      // else {
      //   userId = data.id;
      // }

      // return true;
    },
  },
});

export { handler as GET, handler as POST };
