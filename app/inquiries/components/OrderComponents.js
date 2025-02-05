'use client'
import React, { useState } from 'react'
import CalendarComponent from './CalendarComponent'
import SelectComponent from './SelectComponent'

export default function OrderComponents({ userReservations }) {
  const [isSelectProgram, setIsSelectProgram] = useState(false);
  const [isSelectInstructor, setIsSelectInstructor] = useState(false);

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-y-6 gap-x-12">
      <CalendarComponent userReservations={userReservations} isSelectProgram={isSelectProgram} setIsSelectProgram={setIsSelectProgram} isSelectInstructor={isSelectInstructor} setIsSelectInstructor={setIsSelectInstructor} />


      <SelectComponent isSelectProgram={isSelectProgram} setIsSelectProgram={setIsSelectProgram} isSelectInstructor={isSelectInstructor} setIsSelectInstructor={setIsSelectInstructor} />
    </div>
  )
}
