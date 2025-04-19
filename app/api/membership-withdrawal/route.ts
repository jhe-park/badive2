import { createSupabaseServerClientWithAdminPrivilege } from '@/utils/supabase/server';
import { type NextRequest } from 'next/server';
import { z } from 'zod';

const zodSchema = z.object({
  profile: z.object({
    avatar_url: z.string().nullable(),
    birth: z.string().nullable(),
    bye: z.boolean().nullable(),
    classWant1: z.string().nullable(),
    classWant2: z.string().nullable(),
    classWant3: z.string().nullable(),
    email: z.string().nullable(),
    etc: z.string().nullable(),
    failCount: z.number().nullable(),
    firstAddress: z.string().nullable(),
    full_name: z.string().nullable(),
    gender: z.string().nullable(),
    id: z.string(),
    image: z.string().nullable(),
    license: z.string().nullable(),
    marketingAgreement: z.boolean().nullable(),
    marketingEmail: z.boolean().nullable(),
    marketingSms: z.boolean().nullable(),
    name: z.string().nullable(),
    naverLogin: z.boolean().nullable(),
    phone: z.string().nullable(),
    point: z.number().nullable(),
    postCode: z.string().nullable(),
    role: z.string().nullable(),
    secondAddress: z.string().nullable(),
    snsRegister: z.boolean().nullable(),
    updated_at: z.string().nullable(),
    username: z.string().nullable(),
    website: z.string().nullable(),
  }),
});

type TypeDBprofile = z.infer<typeof zodSchema>;

export async function POST(request: NextRequest) {
  const reqJson = await request.json();
  const parsedResult = zodSchema.safeParse(reqJson);
  if (parsedResult.error) {
    return Response.json({ status: 'FAILED', error: parsedResult.error });
  }
  const { profile } = parsedResult.data;

  const supabaseAdmin = await createSupabaseServerClientWithAdminPrivilege();

  try {
    // ADMIN 권한으로 프로필 삭제
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(profile.id);

    console.log('data');
    console.log(data);

    if (error) {
      throw error;
    }

    // bye 테이블에 탈퇴 정보 저장
    const { error: byeError } = await supabaseAdmin.from('bye').insert([
      {
        email: profile.email,
        uuid: profile.id,
        SNS: profile.snsRegister,
      },
    ]);

    console.log('byeError');
    console.log(byeError);

    if (byeError) {
      throw byeError;
    }
  } catch (error) {
    // setError(error.message);
    return Response.json({ status: 'FAILED', error });
  } finally {
    // setIsLoading(false);
    // router.push('/');
  }

  supabaseAdmin.auth.signOut();

  return Response.json({ status: 'SUCCESS' });
}
