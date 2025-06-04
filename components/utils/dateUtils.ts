import {DateRange} from "@/interfaces";
import { subDays, subMonths, startOfYear, endOfDay, startOfDay, format } from 'date-fns';

// Get date range for preset filters
export const getDateRangeFromPreset = (preset: string): DateRange => {
  const today = new Date();
  const endDate = endOfDay(today);
  
  switch (preset) {
    case 'last30Days':
      return {
        startDate: startOfDay(subDays(today, 30)),
        endDate
      };
    case 'last3Months':
      return {
        startDate: startOfDay(subMonths(today, 3)),
        endDate
      };
    case 'last6Months':
      return {
        startDate: startOfDay(subMonths(today, 6)),
        endDate
      };
    case 'yearToDate':
      return {
        startDate: startOfDay(startOfYear(today)),
        endDate
      };
    case 'lastYear':
      return {
        startDate: startOfDay(subMonths(today, 12)),
        endDate
      };
    default:
      // Default to last 30 days
      return {
        startDate: startOfDay(subDays(today, 30)),
        endDate
      };
  }
};

// Format date range for display
export const formatDateRange = (dateRange: DateRange): string => {
  return `${format(dateRange.startDate, 'MMM d, yyyy')} - ${format(dateRange.endDate, 'MMM d, yyyy')}`;
};

// Format a single date
export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};