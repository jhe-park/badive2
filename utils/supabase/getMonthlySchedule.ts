"use client";

import dayjs from "dayjs";
import {
  TSelectedResult,
  useSelectedResult,
} from "@/app/store/useSelectedResult";
import { Database } from "./database.types";
import { SupabaseClient } from "@supabase/supabase-js";

// FIXME
export const getMonthlySchedule = async ({
  selectedResult,
  supabase,
  allMonthDays,
}: {
  selectedResult: TSelectedResult;
  supabase: SupabaseClient<Database>;
  allMonthDays: string[];
}): Promise<Array<Database["public"]["Tables"]["timeslot"]["Row"]>> => {
  try {
    console.log("Fetching schedule with:", {
      instructor_id: selectedResult?.instructor_id,
      program_id: selectedResult?.program_id,
    });

    if (!selectedResult?.instructor_id || !selectedResult?.program_id) {
      console.log("필수 ID 값이 없습니다");
      return;
    }

    // debugger;

    // const formattedDateString = dayjs(selectedResult.date.at(0)).format(
    //   "YYYY-MM-DD"
    // );
    // console.log("formattedDateString");
    // console.log(formattedDateString);

    const { data: timeSlots, error } = await supabase
      .from("timeslot")
      .select("*,program_id(*)")
      .eq("instructor_id", selectedResult.instructor_id)
      .eq("program_id", selectedResult.program_id)
      // .eq("date", formattedDateString)
      .in("date", allMonthDays)
      .order("date", { ascending: true });

    // debugger;
    // if (timeSlots.length > 0) {
    //   alert(`data.length : ${timeSlots.length}`);
    //   console.log("data");
    //   console.log();
    // }

    if (error) {
      console.error("데이터 조회 에러:", error);
      return [];
    }
    console.log("조회된 데이터:", timeSlots);
    return timeSlots;
  } catch (err) {
    console.error("예외 발생:", err);
    return [];
  }
  // return [];
};
