'use server';

import { createClient } from '@/utils/supabase/server';
import { encodedRedirect } from '@/utils/utils';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');

  if (!email || !password) {
    return encodedRedirect('error', '/sign-up', 'Email and password are required');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return encodedRedirect('error', '/sign-up', error.message);
  } else {
    return encodedRedirect('success', '/sign-up', 'Thanks for signing up! Please check your email for a verification link.');
  }
};

export const signInAction = async (formData: FormData, returnUrl: string, origin: string) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  // const { data: profile } = await supabase.from('profiles').select('failCount').eq('email', email).single();

  // if (profile?.failCount >= 6) {
  //   return encodedRedirect('error', '/login', 'You cannot login more than 6 times');
  // }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log('error', error);

  if (error?.code === 'invalid_credentials') {
    const errorMessage = encodeURIComponent('이메일 또는 비밀번호가 일치하지 않습니다.');
    if (origin === '/expert/login') {
      return redirect(`/expert/login?error=${errorMessage}`);
    } else if (origin === '/admin/login') {
      return redirect(`/admin/login?error=${errorMessage}`);
    } else {
      return redirect(`/login?error=${errorMessage}`);
    }
  }

  // invalid_credentials외에 다른 에러 발생시 FAIL COUNT를 증가시킨다
  if (error) {
    // const newFailCount = (profile?.failCount || 0) + 1;

    // const response = await supabase.from('profiles').update({ failCount: newFailCount }).eq('email', email).select();
    // console.log('response', response);
    const params = new URLSearchParams({
      error: error.message,
      email: email,
    });
    return encodedRedirect('error', '/login', params.toString());
  }

  // const response = await supabase.from('profiles').update({ failCount: 0 }).eq('email', email).select();

  // 로그인 성공시 FAIL COUNT를 0으로 초기화한다
  // supabase.from('profiles').update({ failCount: 0 }).eq('email', email).select();

  console.log('returnUrl');
  console.log(returnUrl);

  if (returnUrl) {
    return redirect(returnUrl);
  }
  return redirect('/?message=success to login');
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect('error', '/forgot-password', 'Could not reset password');
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect('success', '/forgot-password', 'Check your email for a link to reset your password.');
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect('error', '/protected/reset-password', 'Password and confirm password are required');
  }

  if (password !== confirmPassword) {
    encodedRedirect('error', '/protected/reset-password', 'Passwords do not match');
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect('error', '/protected/reset-password', 'Password update failed');
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated');
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/login');
};
