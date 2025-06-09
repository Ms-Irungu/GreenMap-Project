import React from 'react';
import { useMap } from 'react-leaflet';
import { Navigation } from 'lucide-react';

const LocationButton: React.FC = () => {
  const map = useMap();
  
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.flyTo([latitude, longitude], 15);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };
  
  return (
    <button
      onClick={handleLocationClick}
      className="bg-white text-primary-700 p-3 rounded-full shadow-md hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
      title="Use my location"
    >
      <Navigation className="h-5 w-5" />
    </button>
  );
};

export default LocationButton;