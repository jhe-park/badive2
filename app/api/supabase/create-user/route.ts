import { createSupabaseServerClientWithAdminPrivilege } from '@/utils/supabase/server';
import { type NextRequest } from 'next/server';
import z from 'zod';

export async function POST(request: NextRequest) {
  const reqJson = await request.json();
  const { email, password } = reqJson;

  const supabaseAdmin = await createSupabaseServerClientWithAdminPrivilege();

  try {
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) {
      throw createError;
    }

    return Response.json({ status: 'SUCCESS', data: newUser });
  } catch (error) {
    return Response.json({ status: 'FAILED', error });
  }
}
