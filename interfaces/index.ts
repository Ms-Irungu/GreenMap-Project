// Report Form Types
export interface ReportFormState {
  type: 'illegal_tree_cutting' | 'encroachment' | 'pollution' |'potential' | 'existing';
  location: string;
  description: string;
  latitude: string;
  longitude: string;
  spaceType?: string;
  condition?: string;
  urgency?: 'low' | 'moderate' | 'high' | 'critical';
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
  NAME_3: string; // Ward name
}

export interface WardSelectorProps {
 selectedWard : string;
 onWardChange : (ward: string) => void;
 wardData: Ward[];
}

export interface StatisticsPanelProps {
  ward: string;
  meanNdvi: number | string;
  meanLst: number | string;
  isLoading: boolean;
}

export interface MonthYear {
  month: number;
  year: number;
}

export interface DateRangePickerProps {
  value?: MonthYear;
  onChange?: (value: MonthYear) => void;
}

export interface DashboardContainerProps {
  selectedDate: MonthYear;
}

export interface ChartSectionProps {
  data: { ward: string; ndvi: number; lst: number }[];
  selectedYear: number;
  selectedMonth: number;
  isLoading: boolean;
}