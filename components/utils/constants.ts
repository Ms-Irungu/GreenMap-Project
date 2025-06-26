// Predefined date ranges for filters
import {MapPosition} from '@/interfaces';

// Default map position centered on Nairobi
export const DEFAULT_MAP_POSITION: MapPosition = {
  lat: -1.286389,
  lng: 36.817223,
  zoom: 12,
};


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


export const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
