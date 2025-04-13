"use client"

import { Input } from "@nextui-org/react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DateEdit = ({ date, setDate }) => {
  const [showCalendar, setShowCalendar] = useState(false)

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar)
  }

  const selectDate = (selectedDate) => {
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
    const day = String(selectedDate.getDate()).padStart(2, "0")
    setDate(`${year}${month}${day}`)
    setShowCalendar(false)
  }

  const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <button
          key={i}
          onClick={() => selectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
        >
          {i}
        </button>,
      )
    }

    return (
      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaChevronLeft />
          </button>
          <div className="text-gray-700">
            {currentMonth.toLocaleString("ko-KR", { year: "numeric", month: "long" })}
          </div>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaChevronRight/>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div key={day} className="text-center font-medium text-gray-600 text-sm mb-2">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex flex-col gap-1">
        <div className="relative">
          <Input
            label="투어날짜"
            type="text"
            value={date}
            onChange={handleDateChange}
            placeholder="투어날짜를 입력해주세요(ex.20250101)"
            className=""
          />
          <button
            onClick={toggleCalendar}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            📅
          </button>
        </div>
      </div>
      {showCalendar && (
        <div className="absolute top-full right-0 mt-1 z-50">
          <Calendar />
        </div>
      )}
    </div>
  )
}

export default DateEdit

