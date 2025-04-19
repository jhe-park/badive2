import React from 'react';
import Calendar from './components/Calendar';
import { createClient } from '@/utils/supabase/server';

export default function SchedulePage() {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <Calendar />
    </div>
  );
}
