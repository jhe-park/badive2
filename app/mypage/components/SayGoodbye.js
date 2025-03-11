'use client'
import React from "react";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { useState,useEffect } from "react";

export default function SayGoodbye({profile}) {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || "";
  const supabaseAdmin = createSupabaseClient(supabaseURL, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  

  const handleSubmit = async () => {
    
    setIsLoading(true);
    try {
      // 사용자 삭제
      const { data, error } = await supabaseAdmin.auth.admin.deleteUser(profile.data.id);
      
      if (error) throw error;

      // bye 테이블에 탈퇴 정보 저장
      const { error: byeError } = await supabase
        .from('bye')
        .insert([
          {
            email: profile.data.email,
            uuid: profile.data.id,
            SNS: profile.data.snsRegister,
          }
        ]);

      if (byeError) throw byeError;

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      supabase.auth.signOut();
      router.push('/');
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full justify-center items-center gap-y-5">
      <div className="flex flex-col gap-y-2 justify-center items-center">
        <h1 className="text-2xl font-bold">회원탈퇴</h1>
        <p>가입된 회원정보가 모두 삭제됩니다.</p>
      </div>
      <Divider className="w-full bg-black h-0.5"></Divider>
      <div className="flex flex-col gap-y-2 bg-gray-100 rounded-xl p-6">
        <p>
          같은 SNS 계정으로 재가입 시 한달 후에 가능하며, BDN 회원가입으로
          재가입시에는 동일 아이디는 사용하실 수 없습니다.
        </p>
        <p>
          예약하신 모든 프로그램들은 삭제되며 동일 계정으로 재가입을 해도 정보는
          복구되지 않습니다.
        </p>
        <p>회원탈퇴를 진행하시겠습니까?</p>
      </div>



      <div className="flex gap-2 w-full">

        <Button type="reset" variant="flat" className="w-full">
          취소
        </Button>
        <Button loading={isLoading} onPress={handleSubmit} color="primary" type="submit" className="w-full">
          탈퇴하기
        </Button>
      </div>
    </div>
  );
}
