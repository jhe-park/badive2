'use client'
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { Input, Button } from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Reset() {
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const router = useRouter();
    const supabase = createClient();
    const searchParams = useSearchParams();


    const handlePasswordChange = async () => {
        console.log('searchParams:', searchParams)
        if (searchParams.code) {
            const { error } = await supabase.auth.exchangeCodeForSession(
                searchParams.code
            );

            if (error) {
                return router.push("/reset?message=Unable to reset Password. Link expired");
            }
        }

        const { error } = await supabase.auth.updateUser({
            password,
        });

        if (error) {
            return router.push("/reset?message=Unable to reset Password. Try again!");
        }
        router.push('/');
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex h-full  w-full flex-col items-center justify-center gap-y-10 my-32">
                <div className="flex flex-col items-center gap-y-5">
                    <div>
                        <p className="font-bold text-5xl">BDN DIVE</p>
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
                            isInvalid={password !== passwordCheck}
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
                            isInvalid={password !== passwordCheck}
                        />
                        {password !== passwordCheck && <p className="text-small text-default-500 text-[14px]">비밀번호가 일치하지 않습니다.</p>}
                        <Button isDisabled={password !== passwordCheck} className="w-full" color="primary" type="submit" onPress={handlePasswordChange}>
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
        </Suspense>
    );
}