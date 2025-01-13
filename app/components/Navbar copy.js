import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black h-24">
      <div className="w-full mx-auto px-4 flex">
        {/* 좌측 로고 영역 */}
        <div className="flex items-center justify-center flex-col">
          <Link href="/">
            <Image src="/logo/logo.png" alt="Logo" width={100} height={50} />
          </Link>
        </div>

        {/* 우측 메뉴 영역 */}
        <div className="flex flex-col flex-1 items-end justify-center gap-4">
          {/* 상단 행: 로그인/회원가입/마이페이지 */}
          <div className="flex gap-4">
            <Link 
              href="/login"
              className="px-4 py-2 text-white hover:text-blue-600 transition-colors"
            >
              로그인
            </Link>
            <Link 
              href="/signup"
              className="px-4 py-2 text-white hover:text-blue-600 transition-colors"
            >
              회원가입
            </Link>
            <Link 
              href="/mypage"
              className="px-4 py-2 text-white hover:text-blue-600 transition-colors"
            >
              마이페이지
            </Link>
          </div>

          {/* 하단 행: 메인 메뉴 */}
          <div className="flex gap-6">
            <Link href="/about" className="text-white hover:text-blue-600 transition-colors">회사소개</Link>
            <Link href="/instructors" className="text-white hover:text-blue-600 transition-colors">소속강사</Link>
            <Link href="/programs" className="text-white hover:text-blue-600 transition-colors">강습프로그램</Link>
            <Link href="/inquiries" className="text-white hover:text-blue-600 transition-colors">예약/문의</Link>
            <Link href="/community" className="text-white hover:text-blue-600 transition-colors">커뮤니티</Link>
            <Link href="/diving-tours" className="text-white hover:text-blue-600 transition-colors">다이빙투어</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
