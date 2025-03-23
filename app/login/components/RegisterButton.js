'use client'
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

export default function RegisterButton() {
  const router = useRouter();
  return (  
    <Button variant="bordered" className="w-full" color="primary" type="button" onPress={() => router.push("/register")}>
      회원가입
    </Button>
  );
}
