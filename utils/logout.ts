'use client'

import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './supabase/database.types';
import { signOut } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const logoutInClientSide = async ({ supabase, router }: { router: AppRouterInstance; supabase: SupabaseClient<Database> }) => {
  supabase.auth.signOut();
  // 클라이언트 측에서 signOut 호출
  await signOut();
  router.push('/admin/login');
};
