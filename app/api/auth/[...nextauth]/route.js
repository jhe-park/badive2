import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import { createClient } from '@supabase/supabase-js';
import { createClient as createSupabaseClient } from "@supabase/supabase-js";


const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || '';

// Initialize Supabase client with service_role key
const supabaseAdmin = createSupabaseClient(supabaseURL, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const handler = NextAuth({
    providers: [
        NaverProvider({
            clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID ?? "",
            clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET ?? "",
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            // user, account, profile 중 하나라도 값이 있는지 확인
            console.log("123444")
            if (!user && !account && !profile) {
                console.log('인증 정보가 없습니다');
                return false;
            }

            const { email } = user;
            // profiles 테이블에서 사용자 조회
            const { data, error } = await supabaseAdmin
                .from('profiles')
                .select('*')
                .eq('email', email)
                .single();

            let userId;

            if (error) {
                // 사용자가 없는 경우, 새로운 사용자 생성
                console.log('사용자가 없는 경우, 새로운 사용자 생성')
                const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
                    email,
                    password: 'defaultPassword',
                    email_confirm: true,
                });

                if (createError) {
                    console.error('Error creating user:', createError);
                    return false;
                }

                userId = newUser.user.id;
                console.log('새로운 사용자 생성:', userId)
                // profiles 테이블 업데이트
                const { error: profileError } = await supabaseAdmin
                    .from('profiles')
                    .upsert({ id: userId, email: email, snsRegister: true }, {
                        onConflict: 'id'
                    });


                if (profileError) {
                    console.error('Error updating profile:', profileError);
                }
            } else {
                userId = data.id;
            }
            console.log("로긴시도!")

            return true;
        }
    }
});

export { handler as GET, handler as POST };