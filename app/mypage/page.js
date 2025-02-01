import React from "react";
import Image from "next/image";
import PurchaseTable from "./components/ProgramTable";
import TabContents from "./components/TabContents";
export default function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-4 md:p-16">
      <TabContents />
    </div>
  );
}
