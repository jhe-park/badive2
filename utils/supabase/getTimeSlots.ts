import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { TypeDBinstructor } from './dbTableTypes';
import dayjs from 'dayjs';

export async function getTimeSlots({ supabase, date, instructor }: { supabase: SupabaseClient<Database>; instructor: TypeDBinstructor; date: Date }) {
  const {
    count,
    data: timeSlots,
    error,
  } = await supabase
    .from('timeslot')
    .select('start_time,max_participants,current_participants, program_id,time_slot_id:id')
    .eq('instructor_id', instructor.id)
    .eq('date', dayjs(date).format('YYYY-MM-DD'))
    .eq('available', true);

  return { count, timeSlots, error };
}
