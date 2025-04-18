'use client'
import useSecurityNumber from "@/app/store/useSecurityNumber";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TwoFactor({ searchParams }) {
    const { securityNumber, setSecurityNumber } = useSecurityNumber();
    const [securityCode, setSecurityCode] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const [failCount, setFailCount] = useState(0);
    const supabase = createClient();
    const onChangeSecurityCode = (e) => {
        setSecurityCode(e.target.value);
    }

    useEffect(() => {
        console.log('failCount')
        const email = new URLSearchParams(searchParams.error).get('email');
        console.log('email', email)
        if (email) {
            const fetchFailCount = async () => {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('failCount')
                    .eq('email', email)
                    .single();
                console.log('profile', profile)
                if (profile) {
                    setFailCount(profile.failCount);
                    if (profile.failCount >= 4) {
                        setIsVisible(true);
                        setSecurityNumber((generateRandomSixDigitNumber() as any));
                    }
                }
            };
            fetchFailCount();
        }
    }, []);






    return (
        <>
            {isVisible && (
                <>
                    <Input isRequired label='보안문자 입력' variant="bordered" value={securityCode} onChange={onChangeSecurityCode}></Input>
                    <Input readOnly label="보안문자" value={securityNumber} />
                </>
            )}
        </>
    )
}

function generateRandomSixDigitNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}