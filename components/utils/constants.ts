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

export const EE_TILE_LAYERS = {
  ndvi: {
    url: 'https://earthengine.googleapis.com/v1/projects/simple-map-project-367803/maps/5970dbf1d9dd2a4079043eaa17e2f1e6-46ed956fdbc8d867a108772ee20af49f/tiles/{z}/{x}/{y}',
    attribution: 'NDVI Layer © Google Earth Engine'
  },
  uhi: {
    url: 'https://earthengine.googleapis.com/v1/projects/simple-map-project-367803/maps/f3b36f79d6af19fc23401f67fc18d6b1-a20e5db8e297dde5982029f9f1f319d1/tiles/{z}/{x}/{y}',
    attribution: 'LST Layer © Google Earth Engine'
  }
};

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
