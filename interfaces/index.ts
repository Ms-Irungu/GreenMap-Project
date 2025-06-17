export interface ReportFormState {
  type: 'degradation' | 'potential' | 'existing';
  location: string;
  description: string;
  latitude: string;
  longitude: string;
  images: File[];
}

export // Define the Report type
interface Report {
    type: string;
    location: string;
    description: string;
    latitude: number;
    longitude: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DateRangePickerProps {
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
}


// Map and GEE Data Types
export interface MapPosition {
  lat: number;
  lng: number;
  zoom: number;
}

export interface MapContainerProps {
  dateRange: DateRange;
}

export interface LayerVisibility {
  ndvi: boolean;
  uhi: boolean;
  reports: boolean;
}

export type LayerType = 'ndvi' | 'uhi' | 'reports';


export interface LayerControlsProps {
  layerVisibility: LayerVisibility;
  onLayerToggle: (layer: keyof LayerVisibility) => void;
  mapType: 'openStreetMap' | 'satellite';
  onMapTypeChange: (type: 'openStreetMap' | 'satellite') => void;
}

export interface Ward {
  id?: string;
  ward_name: string;
}

export interface WardSelectorProps {
 selectedWard : string;
 onWardChange : (ward: string) => void;
 wardData: Ward[];
}

export interface WardStatistics {
  vegetationCoverChange: number; // percentage
  avgVegetationCover: number;
  avgUrbanHeatIndex: number;
  reportCount: {
    degraded: number;
    potential: number;
    encroached: number;
    total: number;
  };
}
export interface StatisticsPanelProps {
  statistics: WardStatistics;
}