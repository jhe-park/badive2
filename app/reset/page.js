'use client'
import Link from "next/link";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Input, Button } from "@heroui/react";
import { useState } from "react";

export default function Reset(
    searchParams,
) {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const supabase = createClient();
    console.log('password:',password)
    

    const resetPassword = async () => {
        const { data, error } = await supabase.auth.getSession();
        console.log('session:',data)
        const { data: userData, error: userError } = await supabase.auth.updateUser({
            password: password
        });
        console.log('userError:',userError)
        if (error) {
            console.log('error:',error)
        }

        if (!error && !userError) {
            return redirect('/?message=success to change password')
        }
    }



    return (
        <div className="flex h-full  w-full flex-col items-center justify-center gap-y-10 my-32">
      <div className="flex flex-col items-center gap-y-5">
        <div>
          <p className="font-bold text-5xl">BADIVE</p>
        </div>
        <div>
          <p className="text-small text-default-500 text-[24px]">로그인</p>
        </div>
      </div>
      <div className="mt-2 flex w-[90%] md:w-1/3 flex-col gap-4 rounded-large bg-content1 px-8 py-6 border-2 border-gray-300">
        <div className="flex flex-col gap-3">
          <Input
            isRequired
            label="비밀번호"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            variant="bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />

          <Input
            type="password"
            isRequired
            label="비밀번호 확인"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            variant="bordered"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />



          
          <Button className="w-full" color="primary" type="button" onPress={resetPassword}>
            비밀번호 변경
          </Button>
          <Link href="/login" className="w-full">

            <Button variant="bordered" className="w-full" color="primary" type="button">
              로그인으로 이동
            </Button>
          </Link>
        </div>


      </div>
    </div>
    );
}