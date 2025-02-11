"use client";
 
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";
 

 
export default function AuthSession({ session, children }) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}