import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { TypeDBprofile } from './dbTableTypes';
import { Database } from './database.types';

export const handleGetProgram = async ({
  supabase,
//   profile,
  profileId,
  pageSize = 5,
  currentPage = 1,
  searchFilter = '제목',
  searchValue = '',
}: {
  supabase: SupabaseClient<Database>;
//   profile: PostgrestSingleResponse<TypeDBprofile>;
  profileId: string;
  currentPage?: number;
  pageSize?: number;
  searchValue?: string;
  searchFilter?: string;
}) => {
//   if (!profile?.data.id) {
//     console.error('프로필 정보가 없습니다.');
//     return;
//   }

  let query = supabase
    .from('reservation')
    .select('*,time_slot_id(*, program_id(*), instructor_id(*))', {
      count: 'exact',
    })
    .eq('user_id', profileId)
    .not('time_slot_id', 'is', null)
    .not('time_slot_id.program_id', 'is', null)
    .not('time_slot_id.instructor_id', 'is', null)
    .order('created_at', { ascending: false })
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

  if (searchValue) {
    switch (searchFilter) {
      case '제목':
        query = query.ilike('time_slot_id.program_id.title', `%${searchValue}%`);
        break;
      case '장소':
        query = query.ilike('time_slot_id.program_id.region', `%${searchValue}%`);
        break;
      case '강사':
        query = query.ilike('time_slot_id.instructor_id.name', `%${searchValue}%`);
        break;
      case '상태':
        query = query.ilike('status', `%${searchValue}%`);
        break;
    }
  }

  const { data, count, error } = await query;

  if (error) {
    console.error('Error fetching programs:', error);
    return { status: 'FAILED' as const };
  }
  return { status: 'SUCCESS' as const, data, count };
  //   setRegisteredPrograms(data);
  //   setTotalPage(Math.ceil(count / pageSize));
};
