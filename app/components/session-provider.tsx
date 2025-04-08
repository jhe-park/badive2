'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
// import { ReactNode } from "react";
// import { Session } from "next-auth";

export default function AuthSession({ session, children }: { session?: Session; children: React.ReactNode }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
