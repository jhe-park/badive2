import Image from "next/image";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";

export default function NavbarComponent() {
  return (
    <Navbar
      maxWidth="full"
      classNames={{ wrapper: "bg-black" }}
      shouldHideOnScroll
    >
      <NavbarBrand>
        <Image src="/logo/logo.png" alt="logo" width={100} height={50} />
      </NavbarBrand>
      <div className="flex flex-col">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem className="hidden lg:flex w-[100px]">
            <Link className="text-white text-[12px]" color="foreground" href="#">
              로그인
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex w-[100px]">
            <Link className="text-white text-[12px]" aria-current="page" href="#">
              회원가입
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex w-[100px]">
            <Link className="text-white text-[12px]" color="foreground" href="#">
              MYPAGE
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className=" justify-end">
          <NavbarItem className="hidden lg:flex">
            <Link
              href="/about"
              className="text-white hover:text-blue-600 transition-colors"
            >
              회사소개
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link
              href="/instructors"
              className="text-white hover:text-blue-600 transition-colors"
            >
              소속강사
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link
              href="/programs"
              className="text-white hover:text-blue-600 transition-colors"
            >
              강습프로그램
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link
              href="/inquiries"
              className="text-white hover:text-blue-600 transition-colors"
            >
              예약/문의
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link
              href="/community"
              className="text-white hover:text-blue-600 transition-colors"
            >
              커뮤니티
            </Link>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link
              href="/diving-tours"
              className="text-white hover:text-blue-600 transition-colors"
            >
              다이빙투어
            </Link>
          </NavbarItem>
          <NavbarItem></NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
