// DateRangePicker.tsx (or your existing file)
import React, { useState } from "react";
import { months } from "@/components/utils/constants"; 
import { DateRangePickerProps } from "@/interfaces"; 


const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // Last 10 years


const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
  const [selectedMonth, setSelectedMonth] = useState(value?.month ?? new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(value?.year ?? currentYear);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value, 10);
    setSelectedMonth(month);
    onChange?.({ month, year: selectedYear });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value, 10);
    setSelectedYear(year);
    onChange?.({ month: selectedMonth, year });
  };

  return (
    <div className="flex gap-2">
      <label htmlFor="month-select" className="sr-only">Select month</label>
      <select
        id="month-select"
        value={selectedMonth}
        onChange={handleMonthChange}
        className="border rounded px-2 py-1"
        aria-label="Select month"
      >
        {months.map((month, idx) => (
          <option value={idx} key={month}>{month}</option>
        ))}
      </select>
      <label htmlFor="year-select" className="sr-only">Select year</label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={handleYearChange}
        className="border rounded px-2 py-1"
        aria-label="Select year"
      >
        {years.map(year => (
          <option value={year} key={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default DateRangePicker;