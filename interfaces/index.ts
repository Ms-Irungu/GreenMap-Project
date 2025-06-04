export interface ReportFormState {
  type: 'degradation' | 'potential' | 'existing';
  location: string;
  description: string;
  latitude: string;
  longitude: string;
  images: File[];
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
}