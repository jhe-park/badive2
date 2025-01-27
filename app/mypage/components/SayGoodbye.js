import React from "react";
import { Button } from "@nextui-org/react";
export default function SayGoodbye() {
  return (
    <div className="flex flex-col gap-2 w-full justify-center items-center">
      <h1 className="text-2xl font-bold">회원탈퇴</h1>
      <p>가입된 회원정보가 모두 삭제됩니다.</p>
      <p>
        같은 SNS 계정으로 재가입 시 한달 후에 가능하며, BDN 회원가입으로
        재가입시에는 동일 아이디는 사용하실 수 없습니다.
      </p>
      <p>
        예약하신 모든 프로그램들은 삭제되며 동일 계정으로 재가입을 해도 정보는
        복구되지 않습니다.
      </p>
      <p>회원탈퇴를 진행하시겠습니까?</p>

      <div className="flex gap-2 w-full">
        
        <Button type="reset" variant="flat" className="w-full">
          취소
        </Button>
        <Button color="primary" type="submit" className="w-full">
          탈퇴하기
        </Button>
      </div>
    </div>
  );
}
