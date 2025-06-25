import React, { useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers } from 'lucide-react';
import { MapPosition } from '@/interfaces';
import { DEFAULT_MAP_POSITION, MAP_TILE_LAYERS } from '@/components/utils/constants';
import MiniMapLayerControls from '@/components/dashboard/MiniMapLayerControls';

// Fix for Leaflet marker icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Work around for Leaflet icon issue
const DefaultIcon = L.icon({
    iconUrl: (typeof icon === 'string' ? icon : icon.src),
    shadowUrl: (typeof iconShadow === 'string' ? iconShadow : iconShadow.src),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;


const MiniMap: React.FC = () => {
    const [position] = useState<MapPosition>(DEFAULT_MAP_POSITION);
    const [mapType, setMapType] = useState<'openStreetMap' | 'satellite'>('openStreetMap');
    const [controlsOpen, setControlsOpen] = useState(false);

    const handleMapTypeChange = (type: 'openStreetMap' | 'satellite') => {
        setMapType(type);
    };
    return (
        <div className='bg-white rounded-lg shadow overflow-hidden'>
            <div className='p-4 border-b'>
                <h2 className='text-lg font-medium text-gray-800'>
                    Area Overview
                </h2>
            </div>

            <div className='h-[400px] w-full'>
                <LeafletMap
                    center={[position.lat, position.lng]}
                    zoom={position.zoom}
                    zoomControl={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        url={MAP_TILE_LAYERS[mapType].url}
                        attribution={MAP_TILE_LAYERS[mapType].attribution}
                    />

                    <ZoomControl position="topleft" />


                    {/* Controls */}
                    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-4">
                        {/* Toogle Button (Show when closed) */}
                        {!controlsOpen && (
                            <button
                                className='bg-white rounded-full shadow p-2 border border-gray-200'
                                onClick={() => setControlsOpen(true)}
                                aria-label='Show Layer Controls'
                            >
                                <Layers className='h-6 w-6  text-emerald-700' />

                            </button>
                        )}

                        {/* Layer Controls (Show when open) */}
                        <div
                            className={`transition-transform duration-300 ease-in-out ${controlsOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-o pointer-events-none'}`}
                        >
                            {controlsOpen && (
                                <div className='relative'>
                                    {/* Close Button (Layers Icon) */}
                                    <button
                                        className='absolute right-4 top-2 bg-white rounded-full shadow p-2 border border-gray-200'
                                        onClick={() => setControlsOpen(false)}
                                        aria-label='Hide Layer Controls'
                                    >
                                        <Layers className='h-5 w-5 text-emerald-700' />
                                    </button>
                                    <MiniMapLayerControls
                                        mapType={mapType}
                                        onMapTypeChange={handleMapTypeChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>


                </LeafletMap>
            </div>
        </div>
    );
}

export default MiniMap;