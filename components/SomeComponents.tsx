"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type TProps = Record<string, unknown>;

export const ComponentForTest : React.FC<TProps> = ({}) => {
  const router = useRouter();
  return <div className="">ComponentForTest</div>;
}