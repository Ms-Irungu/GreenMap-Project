export interface ReportFormState {
  type: 'degradation' | 'potential' | 'existing';
  location: string;
  description: string;
  latitude: string;
  longitude: string;
  images: File[];
}