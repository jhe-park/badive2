'use client';

import { TSelectedResult } from '@/app/store/useSelectedResult';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// FIXME
export const getMonthlySchedule = async ({
  selectedResult,
  supabase,
  allMonthDays,
}: {
  selectedResult: TSelectedResult;
  supabase: SupabaseClient<Database>;
  allMonthDays: string[];
}) => {
  try {
    console.log('Fetching schedule with:', {
      instructor_id: selectedResult?.instructor_id,
      program_id: selectedResult?.program_id,
    });

    if (!selectedResult?.instructor_id || !selectedResult?.program_id) {
      console.log('필수 ID 값이 없습니다');
      return;
    }

    const { data: timeSlots, error } = await supabase
      .from('timeslot')
      .select('*,program_id(*)')
      .eq('instructor_id', selectedResult.instructor_id)
      .eq('program_id', selectedResult.program_id)
      .eq('available', true)
      // .eq("date", formattedDateString)
      .in('date', allMonthDays)
      .order('date', { ascending: true });

    if (error) {
      console.error('데이터 조회 에러:', error);
      return [];
    }
    console.log('조회된 데이터:', timeSlots);
    return timeSlots;
  } catch (err) {
    console.error('예외 발생:', err);
    return [];
  }
};
