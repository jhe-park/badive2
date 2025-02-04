'use client'

import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
export default function Toast({ searchParams }) {
    const router = useRouter();
    console.log('searchParams11', searchParams)
    useEffect(() => {       
        console.log('1234')
        if (searchParams?.error?.includes("Invalid+login+credentials")) {            
            toast.error("비밀번호 혹은 아이디가 올바르지 않습니다");                    
        }
        if (searchParams?.error?.includes("You cannot login")) {
            toast.error("로그인 실패가 5회 초과하여 로그인이 불가합니다. 비밀번호를 변경해주세요.");                    
        }
        if (searchParams?.message?.includes("success to change")) {
            toast.success("비밀번호 변경이 완료되었습니다.");                    
        }



    }, []);
    return (
        <>
            {/* <Button onPress={() => toast.error("비밀번호 혹은 아이디가 올바르지 않습니다")} /> */}
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
        </>
    );
}