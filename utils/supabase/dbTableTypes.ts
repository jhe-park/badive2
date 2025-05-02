import { User } from '@supabase/supabase-js';
import { Database } from './database.types';
import { TSelectedResult } from '@/app/store/useSelectedResult';

type DBTable = Database['public']['Tables'];

export type TypeDBbye = DBTable['bye']['Row'];
export type TypeDBfaq = DBTable['faq']['Row'];
export type TypeDBinstructor = DBTable['instructor']['Row'];
export type TypeDBnotification = DBTable['notification']['Row'];
export type TypeDBorder = DBTable['order']['Row'];
export type TypeDBpending_sessions = DBTable['pending_sessions']['Row'];
export type TypeDBpendingSessionsModified = {
  uuid: string;
  selected_data: TSelectedResult;
  user_data: User;
  profile: TypeDBprofile;
};
export type TypeDBprofile = DBTable['profiles']['Row'];
export type TypeDBprogram = DBTable['program']['Row'];
export type TypeDBrequest = DBTable['request']['Row'];
export type TypeDBrequestInstructor = DBTable['requestInstructor']['Row'];
export type TypeDBreservation = DBTable['reservation']['Row'];

export type TypeDBreservationJoinWithTimeslot = Omit<TypeDBreservation, 'time_slot_id'> & {
  time_slot_id: Omit<TypeDBtimeslot, 'program_id' | 'instructor_id'> & {
    program_id: number & TypeDBprogram;
    instructor_id: number & TypeDBinstructor;
  };
};

export type TypeDBresort = DBTable['resort']['Row'];
export type TypeDBtimeslot = DBTable['timeslot']['Row'];
export type TypeDBtour = DBTable['tour']['Row'];
export type TypeDBtour_input = DBTable['tour_input']['Row'];

export type TypeDBTimeSlotJoined = {
  available: boolean | null;
  created_at: string;
  current_participants: number | null;
  date: string | null;
  end_time: string | null;
  id: number;
  instructor_id: number | null;
  max_participants: number | null;
  program_id: number & {
    available: boolean | null;
    category: string | null;
    created_at: string;
    id: number;
    images: string | null;
    instructor_id: number | null;
    participants: number | null;
    price: number | null;
    region: string | null;
    title: string | null;
  };
  start_time: string | null;
  unique_id: string | null;
};
