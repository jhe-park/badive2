"use client"

import { useState } from "react"

const YearMonthPicker = ({ label, initialYear, initialMonth, onChange }) => {
  const [year, setYear] = useState(initialYear)
  const [month, setMonth] = useState(initialMonth)
  const [isOpen, setIsOpen] = useState(false)

  const years = Array.from({ length: 10 }, (_, i) => initialYear + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  const handleYearChange = (e) => {
    const newYear = Number.parseInt(e.target.value)
    setYear(newYear)
    onChange(newYear, month)
  }

  const handleMonthChange = (e) => {
    const newMonth = Number.parseInt(e.target.value)
    setMonth(newMonth)
    onChange(year, newMonth)
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <div
        className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-md cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {year}/{month.toString().padStart(2, "0")}
        </span>
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-2 flex gap-2">
            <select
              value={year}
              onChange={handleYearChange}
              className="w-1/2 p-2 bg-gray-50 border border-gray-100 rounded-md focus:outline-none"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </select>
            <select
              value={month}
              onChange={handleMonthChange}
              className="w-1/2 p-2 bg-gray-50 border border-gray-100 rounded-md focus:outline-none"
            >
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}월
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default function YearMonthPickers() {
  const [startDate, setStartDate] = useState({ year: 2024, month: 8 })
  const [endDate, setEndDate] = useState({ year: 2024, month: 8 })

  return (
    <div className="space-y-4 p-4">
      <YearMonthPicker
        label="시작 날짜"
        initialYear={startDate.year}
        initialMonth={startDate.month}
        onChange={(year, month) => setStartDate({ year, month })}
      />
      <YearMonthPicker
        label="종료 날짜"
        initialYear={endDate.year}
        initialMonth={endDate.month}
        onChange={(year, month) => setEndDate({ year, month })}
      />
    </div>
  )
}

