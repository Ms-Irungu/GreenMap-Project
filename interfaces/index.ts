// Report Form Types
export interface ReportFormState {
  type: 'degradation' | 'potential' | 'existing';
  location: string;
  description: string;
  latitude: string;
  longitude: string;
}

// getInvolved Form Types
export interface GetInvolvedFormState {
  fullName: string;
  email: string;
  organization ?: string;
  role: "student" | "community_leader" | "ngo_initiative" | "sponsor";
  engagement: "sponsor_feature" | "share_ideas" | "volunteer_efforts" | "collaborate_research";
  message?: string;
}

// Map and GEE Data Types
export interface MapPosition {
  lat: number;
  lng: number;
  zoom: number;
}

export interface LayerVisibility {
  ndvi: boolean;
  uhi: boolean;
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

export interface MonthYear {
  month: number;
  year: number;
}

export interface DateRangePickerProps {
  value?: MonthYear;
  onChange?: (value: MonthYear) => void;
}