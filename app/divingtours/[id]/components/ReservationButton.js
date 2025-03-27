'use client'
import React from 'react';
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
export default function ReservationButton({ tour_id }) {
    const router = useRouter();
    return (
        <Button onPress={() => {
            router.push(`/divingtours/reservation/${tour_id}`);
        }} className="text-medium md:text-2xl font-bold w-full h-full px-2 md:px-6 py-2 md:py-4">
        신청서 작성하기
      </Button> 
    );
};