'use client'
import React from "react";
import  useStep from "@/app/store/useStep";
import HorizontalSteps from "./horizontal-steps";
import { FaRegCalendarCheck } from "react-icons/fa";
import { PiNotePencil } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6";

export default function Component() {
  const { step, setStep } = useStep();
  console.log('step:',step)
  return (
    <HorizontalSteps
      defaultStep={step}
      currentStep={step}
      steps={[
        {
          title: "STEP01",
          description: "약관동의",
          icon: <FaRegCalendarCheck className="text-2xl " />
        },
        {
          title: "STEP02",
          description: "정보입력",
          icon: <PiNotePencil className="text-2xl " />
        },
        {
          title: "STEP03",
          description: "가입완료",
          icon: <FaRegCircleCheck className="text-2xl " />
        }
      ]}
    />
  );
}
