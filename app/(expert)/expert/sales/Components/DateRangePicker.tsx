'use client';

import { useState } from 'react';

const YearMonthPicker = ({ label, initialYear, initialMonth, onChange }) => {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [isOpen, setIsOpen] = useState(false);

  const years = Array.from({ length: 10 }, (_, i) => initialYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleYearChange = e => {
    const newYear = Number.parseInt(e.target.value);
    setYear(newYear);
    onChange(newYear, month);
  };

  const handleMonthChange = e => {
    const newMonth = Number.parseInt(e.target.value);
    setMonth(newMonth);
    onChange(year, newMonth);
  };

  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div
        className="flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {year}/{month.toString().padStart(2, '0')}
        </span>
        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="flex gap-2 p-2">
            <select value={year} onChange={handleYearChange} className="w-1/2 rounded-md border border-gray-100 bg-gray-50 p-2 focus:outline-none">
              {years.map(y => (
                <option key={y} value={y}>
                  {y}년
                </option>
              ))}
            </select>
            <select value={month} onChange={handleMonthChange} className="w-1/2 rounded-md border border-gray-100 bg-gray-50 p-2 focus:outline-none">
              {months.map(m => (
                <option key={m} value={m}>
                  {m}월
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default function YearMonthPickers() {
  const [startDate, setStartDate] = useState({ year: 2024, month: 8 });
  const [endDate, setEndDate] = useState({ year: 2024, month: 8 });

  return (
    <div className="space-y-4 p-4">
      <YearMonthPicker
        label="시작 날짜"
        initialYear={startDate.year}
        initialMonth={startDate.month}
        onChange={(year, month) => setStartDate({ year, month })}
      />
      <YearMonthPicker label="종료 날짜" initialYear={endDate.year} initialMonth={endDate.month} onChange={(year, month) => setEndDate({ year, month })} />
    </div>
  );
}
