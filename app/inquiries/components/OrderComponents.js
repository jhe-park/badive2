import React from 'react'
import CalendarComponent from './CalendarComponent'
import SelectComponent from './SelectComponent'
export default function OrderComponents() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-y-6">
      <CalendarComponent />
      <SelectComponent />
    </div>
  )
}
