import { DateRangePickerProps } from "@/interfaces";
import React, { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import {getDateRangeFromPreset, formatDateRange} from "@/components/utils/dateUtils";
import { DATE_RANGE_PRESETS } from "@/components/utils/constants";

const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  dateRange, 
  onDateRangeChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('last30Days');

  const handlePresetChange = (preset: string) => {
    const newDateRange = getDateRangeFromPreset(preset);
    setSelectedPreset(preset);
    onDateRangeChange(newDateRange);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-2 md:text-base text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        <Calendar className="h-4 w-4 text-gray-500" />
        <span>{formatDateRange(dateRange)}</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {DATE_RANGE_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handlePresetChange(preset.value)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedPreset === preset.value
                    ? 'bg-primary-100 text-primary-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;