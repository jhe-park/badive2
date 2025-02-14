import React from "react";
import { Input, Button } from "@heroui/react";
import { createClient } from "@/utils/supabase/server";
import { PiCodesandboxLogo } from "react-icons/pi";
import { LuCirclePlus } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import SearchTable from "./components/SearchTable";
export default async function ResortPage() {
  const supabase = await createClient();
  const { data: instructor, error: instructorError } = await supabase
    .from("instructor")
    .select("*");
  const bdnInstructorCount =
    instructor?.filter((item) => item.role === "bdn").length || 0;
  const nonBdnInstructorCount =
    instructor?.filter((item) => item.role !== "bdn").length || 0;
  return (
    <div className="flex flex-col w-full h-full gap-y-6">
      <SearchTable></SearchTable>
    </div>
  );
}
