'use client';

import { createClient } from '@/utils/supabase/client';
import React, { useState } from 'react';
import SearchTable from './components/SearchTable';

export default function SubmitListPage() {
  const supabase = createClient();
  const [submitList, setSubmitList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedSort, setSelectedSort] = useState('name');

  return (
    <div className="flex h-full w-full flex-col gap-y-6">
      <SearchTable></SearchTable>
    </div>
  );
}
