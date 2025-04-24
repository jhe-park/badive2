import { createSupabaseServerClientWithAdminPrivilege } from '@/utils/supabase/server';
import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';

const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID ?? '',
      clientSecret: process.env.NAVER_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const supabaseAdmin = await createSupabaseServerClientWithAdminPrivilege();

      if (!user && !account && !profile) {
        console.error('인증 정보가 없습니다');
        return false;
      }

      const { email } = user;
      const { data, error } = await supabaseAdmin.from('profiles').select('*').eq('email', email).single();

      if (!error) {
        return true;
      }

      // 사용자가 없는 경우, 새로운 사용자 생성
      const { data: newUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: 'defaultPassword',
        email_confirm: true,
      });

      if (createUserError) {
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
        } else {
          console.error('사용자 생성 오류:', createUserError);
          return false;
        }
      } else {
        const userId = newUser.user.id;
        // 새로운 사용자 생성
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
    },
  },
});

export { handler as GET, handler as POST };
