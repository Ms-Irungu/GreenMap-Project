// Predefined date ranges for filters
import {MapPosition} from '@/interfaces';

// Default map position centered on Nairobi
export const DEFAULT_MAP_POSITION: MapPosition = {
  lat: -1.286389,
  lng: 36.817223,
  zoom: 12,
};

export const DATE_RANGE_PRESETS = [
  { label: 'Last 30 Days', value: 'last30Days' },
  { label: 'Last 3 Months', value: 'last3Months' },
  { label: 'Last 6 Months', value: 'last6Months' },
  { label: 'Year to Date', value: 'yearToDate' },
  { label: 'Last Year', value: 'lastYear' },
  { label: 'Custom Range', value: 'custom' },
];

// Map tile layers
export const MAP_TILE_LAYERS = {
  openStreetMap: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  satellite: {
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps',
  },
};