import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function POST(request) {
    const supabase = await createClient();
    const { email } = await request.json();
    const password = `defaultPassword`; // 강제 비밀번호 설정
    console.log("로긴하자")
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.log("슈파베이스 로그인 이상무!")

    return NextResponse.json({ 
        redirect: '/'
    }, { status: 200 });
}
