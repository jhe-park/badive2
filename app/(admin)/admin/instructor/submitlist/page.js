"use client";
import React from "react";
import { Input, Button, Select, SelectItem } from "@heroui/react";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
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
