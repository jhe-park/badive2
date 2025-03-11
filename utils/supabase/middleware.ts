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
    const user = await supabase.auth.getUser();

    // protected routes
    if (request.nextUrl.pathname.startsWith("/protected") && user.error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (request.nextUrl.pathname === "/" && !user.error) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }

    // divingtours 경로에 대한 리디렉션 처리 추가
    if (
      request.nextUrl.pathname.startsWith("/divingtours/reservation") &&
      user.error
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
      user.error
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
    if (request.nextUrl.pathname.startsWith("/mypage") && user.error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 로그인 페이지에서 사용자가 이미 로그인되어 있는 경우 루트로 리디렉션
    if (request.nextUrl.pathname === "/login" && !user.error) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextUrl.pathname !== "/admin/login"
    ) {
      if (user.error) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.data.user.id)
        .single();
      if (!profile || profile.role !== "master") {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }

    if (
      request.nextUrl.pathname.startsWith("/expert") &&
      request.nextUrl.pathname !== "/expert/login"
    ) {
      if (user.error) {
        return NextResponse.redirect(new URL("/expert/login", request.url));
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.data.user.id)
        .single();
      if (!profile || profile.role !== "expert") {
        return NextResponse.redirect(new URL("/expert/login", request.url));
      }
    }

    // admin/login 페이지에서 이미 로그인되어 있고 master인 경우 /admin/main으로 리디렉션
    if (request.nextUrl.pathname === "/admin/login" && !user.error) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.data.user.id)
        .single();
      
      if (profile && profile.role === "master") {
        return NextResponse.redirect(new URL("/admin/main", request.url));
      }
    }

    // expert/login 페이지에서 이미 로그인되어 있고 expert인 경우 /expert/main으로 리디렉션
    if (request.nextUrl.pathname === "/expert/login" && !user.error) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.data.user.id)
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
