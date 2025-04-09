import { TypeDBprofile } from '@/utils/supabase/dbTableTypes';
import { create } from 'zustand';
import { TSelectedResult } from './useSelectedResult';
import { User } from '@supabase/supabase-js';

type TPendingSession = {
  uuid: string;
  selected_data: TSelectedResult;
  user_data: User;
  profile: TypeDBprofile;
};

// export const pendingSessionInitializedValue = {
//   uuid: uuid,
//   selected_data: selectedResult as any,
//   user_data: userData as any,
//   profile: profile,
// };

export const usePendingSession = create<{ pendingSession: TPendingSession | undefined; setGlobalPendingSession: (result: TPendingSession) => void }>(set => ({
  pendingSession: undefined,
  setGlobalPendingSession: result => set({ pendingSession: result }),
}));

// export default useInstructor

// export const useSelectedResult = create<{
//   selectedResult: TSelectedResult;
//   setSelectedResult: (result: TSelectedResult) => void;
// }>(set => ({
//   selectedResult: {
//     ...selectedResultInitializedValue,
//   },
//   setSelectedResult: result => set({ selectedResult: result }),
// }));
