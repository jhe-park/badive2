import { TypeDBprofile } from '@/utils/supabase/dbTableTypes';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { TSelectedResult } from './useSelectedResult';

type TPendingSession = {
  uuid: string;
  selected_data: TSelectedResult;
  user_data: User;
  profile: TypeDBprofile;
};

export const usePendingSession = create<{ pendingSession: TPendingSession | undefined; setGlobalPendingSession: (result: TPendingSession) => void }>(set => ({
  pendingSession: undefined,
  setGlobalPendingSession: result => set({ pendingSession: result }),
}));
