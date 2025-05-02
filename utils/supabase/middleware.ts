import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const data = await supabase.auth.getUser();
    
    if (data && (request.nextUrl.pathname.startsWith("/inquiries") || request.nextUrl.pathname.startsWith("/divingtours"))) {
      // 사용자 프로필 정보 조회
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("snsRegister, name, gender, birth, phone")
        .eq("id", data.data.user.id)
        .single();
      
      // SNS 가입자이면서 필수 정보가 하나라도 없는 경우 리다이렉트
      if (profileData?.snsRegister === true && 
          (!profileData.name || !profileData.gender || !profileData.birth || !profileData.phone)) {
        console.log("SNS 사용자 필수 정보 누락: 추가 정보 등록 페이지로 리다이렉트");
        return NextResponse.redirect(new URL("/register/sns", request.url));
      }
    }


    // divingtours 경로에 대한 리디렉션 처리 추가
    if (
      request.nextUrl.pathname.startsWith("/divingtours/reservation") &&
      data.error
    ) {
      const returnUrl = request.nextUrl.pathname + request.nextUrl.search;
      return NextResponse.redirect(
        new URL(
          `/login?returnUrl=${encodeURIComponent(returnUrl)}`,
          request.url
        )
      );
    }

    // instructors 경로에 대한 리디렉션 처리 추가
    if (
      request.nextUrl.pathname.startsWith("/instructors/request") &&
      data.error
    ) {
      const returnUrl = request.nextUrl.pathname + request.nextUrl.search;
      return NextResponse.redirect(
        new URL(
          `/login?returnUrl=${encodeURIComponent(returnUrl)}`,
          request.url
        )
      );
    }

    // 추가된 코드: /mypage 경로에 대한 리디렉션 처리
    if (request.nextUrl.pathname.startsWith("/mypage") && data.error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 로그인 페이지에서 사용자가 이미 로그인되어 있는 경우 루트로 리디렉션
    if (request.nextUrl.pathname === "/login" && !data.error) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextUrl.pathname !== "/admin/login"
    ) {
      if (data.error) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.data.user.id)
        .single();
      if (!profile || profile.role !== "master") {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }

    if (
      request.nextUrl.pathname.startsWith("/expert") &&
      request.nextUrl.pathname !== "/expert/login"
    ) {
      if (data.error) {
        return NextResponse.redirect(new URL("/expert/login", request.url));
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.data.user.id)
        .single();
      if (!profile || profile.role !== "expert") {
        return NextResponse.redirect(new URL("/expert/login", request.url));
      }
    }
    

    // admin/login 페이지에서 이미 로그인되어 있고 master인 경우 /admin/main으로 리디렉션
    if (request.nextUrl.pathname === "/admin/login" && !data.error) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.data.user.id)
        .single();
      
      if (profile && profile.role === "master") {
        return NextResponse.redirect(new URL("/admin/main", request.url));
      }
    }

    // expert/login 페이지에서 이미 로그인되어 있고 expert인 경우 /expert/main으로 리디렉션
    if (request.nextUrl.pathname === "/expert/login" && !data.error) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.data.user.id)
        .single();
      
      if (profile && profile.role === "expert") {
        return NextResponse.redirect(new URL("/expert/main", request.url));
      }
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
