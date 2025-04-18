'use client'
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function RegisterButton() {
  const router = useRouter();
  return (  
    <Button variant="bordered" className="w-full" color="primary" type="button" onPress={() => router.push("/register")}>
      회원가입
    </Button>
  );
}
