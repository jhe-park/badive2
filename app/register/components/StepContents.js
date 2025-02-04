'use client'
import React from "react";
import Agreement from "./Agreement";
import useStep from "@/app/store/useStep";
import Information from "./Information";
import Complete from "./Complete";

export default function StepContents() {
  const { step, setStep } = useStep();

  return (
    <div className="flex w-[90%] md:w-2/3 flex-col gap-4 rounded-large bg-content1 md:px-8">
      {step === 0 && <Agreement></Agreement>}
      {step === 1 && <Information></Information>}
      {step === 2 && <Complete></Complete>}
    </div>
  );
}
