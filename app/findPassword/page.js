'use client'
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Input, Checkbox, Divider, Form } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Toast from "@/components/Toast";
import { toast, ToastContainer } from "react-toastify";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
export default function Login(props) {
    const router = useRouter();
    const supabase = createClient();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [findEmail, setFindEmail] = useState("");
    const [findPhone, setFindPhone] = useState("");
    const [id, setId] = useState("");

    const handleFindPassword = async () => {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}`
        });
        if (error) {
            console.error('에러 발생:', error);
        }
        toast.success('비밀번호 찾기 이메일을 확인해주세요.');

    };



    return (
        <div className="flex h-full  w-full flex-col items-center justify-center gap-y-10 my-32">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
                        label="아이디"
                        name="email"
                        placeholder="이메일을 입력해주세요"
                        type="email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button className="w-full" color="primary" type="button" onClick={handleFindPassword}>
                        비밀번호 찾기


                    </Button>
                    <Button variant="bordered" className="w-full" color="primary" type="button" onPress={() => router.push('/login')}>
                        로그인으로 이동


                    </Button>


                </div>
            </div>
        </div>
    );
}


function maskEmail(email) {
    const [localPart, domain] = email.split('@');
    if (localPart.length > 2) {
        return `${localPart.slice(0, -2)}**@${domain}`;
    }
    return email;
}