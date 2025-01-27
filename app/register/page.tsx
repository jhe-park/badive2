import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button, Input, Checkbox, Divider, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Stepper from "./components/Stepper";
import Agreement from "./components/Agreement";
import StepContents from "./components/StepContents";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const handleSubmit = () => {
    console.log("submit");
  };
  const toggleVisibility = () => {
    console.log("toggle");
  };
  return (
    <div className="flex h-full  w-full flex-col items-center justify-center gap-y-10 my-32">
      <div>
        <p className="font-bold text-5xl">회원가입</p>
      </div>
      <Stepper></Stepper>
      
      <StepContents></StepContents>
      
    </div>
  );
}
