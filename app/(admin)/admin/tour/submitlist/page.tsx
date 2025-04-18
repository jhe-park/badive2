"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";
import SearchTable from "./components/SearchTable";

export default function SubmitListPage() {
  const supabase = createClient();
  const [submitList, setSubmitList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState("name");

  return (
    <div className="flex flex-col w-full h-full gap-y-6">
      
      <SearchTable></SearchTable>
    </div>
  );
}
