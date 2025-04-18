'use client'

import { createClient } from "@/utils/supabase/client";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Login(props) {
    const router = useRouter();
    const supabase = createClient();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [findEmail, setFindEmail] = useState("");
    const [findPhone, setFindPhone] = useState("");
    const [id, setId] = useState("");

    const handleFindId = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('email')
                .eq('phone', phone)
                .single();
            console.log("data:", data);
            if (error) {
                console.log('에러 발생:', error);
                toast.error('존재하지 않는 이메일 또는 연락처입니다.');
                setFindEmail('');
                return;
            }

            if (data) {
                setFindEmail(data.email);
                // toast.success(data.email);
            } else {
                setFindEmail('');
            }

        } catch (error) {
            console.error('에러 발생:', error);
        }
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
                    <p className="font-bold text-5xl">BADIVE</p>
                </div>
                <div>
                    <p className="text-small text-default-500 text-[24px]">로그인</p>
                </div>
            </div>
            <div className="mt-2 flex w-[90%] md:w-1/3 flex-col gap-4 rounded-large bg-content1 px-8 py-6 border-2 border-gray-300">
                <div className="flex flex-col gap-3">
                    {/* <Input
                        isRequired
                        label="아이디"
                        name="email"
                        placeholder="이메일을 입력해주세요"
                        type="email"
                        variant="bordered"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> */}


                    <Input
                        type="text"
                        isRequired
                        label="연락처"
                        name="phone"
                        placeholder="010-0000-0000"
                        variant="bordered"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}


                    />
                    {findEmail && (
                        <div className="flex flex-col gap-3 w-full text-center border-2 border-gray-300 rounded-large p-4">
                            <p className="text-small text-default-500 text-[24px]">찾은 아이디</p>
                            <p className="text-small text-default-500 text-[24px]">
                                {maskEmail(findEmail)}
                            </p>
                        </div>
                    )}

                    <Button className="w-full" color="primary" type="button" onClick={handleFindId}>
                        아이디 찾기

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