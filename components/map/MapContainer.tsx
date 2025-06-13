import React, { useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers } from 'lucide-react';
import { MapPosition, MapContainerProps, LayerVisibility } from '@/interfaces';
import { DEFAULT_MAP_POSITION, MAP_TILE_LAYERS, EE_TILE_LAYERS } from '@/components/utils/constants';
import LayerControls from './LayerControls';
import LocationButton from './LocationButton';

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

const MapContainer: React.FC<MapContainerProps> = () => {
    const [position] = useState<MapPosition>(DEFAULT_MAP_POSITION);
    const [mapType, setMapType] = useState<'openStreetMap' | 'satellite'>('openStreetMap');
    const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
        ndvi: true,
        uhi: false,
        reports: true,
    });

    const [controlsOpen, setControlsOpen] = useState(false);

    const handleLayerToggle = (layer: keyof LayerVisibility) => {
        setLayerVisibility(prev => ({
            ...prev,
            [layer]: !prev[layer],
        }));
    };

    const handleMapTypeChange = (type: 'openStreetMap' | 'satellite') => {
        setMapType(type);
    };

    return (
        <div className="relative h-full w-full">
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

                {/* Data Layers */}
                {/* Earth Engine NDVI Layer */}
                {layerVisibility.ndvi && (
                    <TileLayer
                        url={EE_TILE_LAYERS.ndvi.url}
                        attribution={EE_TILE_LAYERS.ndvi.attribution}
                        opacity={0.6}
                    />
                )}

                {/* Earth Engine LST (UHI) Layer */}
                {layerVisibility.uhi && (
                    <TileLayer
                        url={EE_TILE_LAYERS.uhi.url}
                        attribution={EE_TILE_LAYERS.uhi.attribution}
                        opacity={0.6}
                    />
                )}


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
                                <LayerControls
                                    layerVisibility={layerVisibility}
                                    onLayerToggle={handleLayerToggle}
                                    mapType={mapType}
                                    onMapTypeChange={handleMapTypeChange}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 z-[1000]">
                    <LocationButton />
                </div>


                {/* Legend based on active layers */}
                {layerVisibility.ndvi && (
                    <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow z-[1000] text-xs">
                        <strong>NDVI Legend</strong><br />
                        <span className="legend-square-red">■</span> Low (0.0 – 0.2): Bare/urban land <br />
                        <span className="legend-square-yellow">■</span> Moderate (0.2 – 0.4): Sparse vegetation <br />
                        <span className="legend-square-green">■</span> High (0.4 – 0.8): Dense vegetation
                    </div>
                )}

                {layerVisibility.uhi && (
                    <div className="absolute bottom-27 left-4 bg-white p-2 rounded shadow z-[1000] text-xs">
                        <strong>LST (°C) Legend</strong><br />
                        <span className="legend-square-blue">■</span> Cool (25 – 30°C) <br />
                        <span className="legend-square-yellow">■</span> Warm (30 – 38°C) <br />
                        <span className="legend-square-red">■</span> Hot (38 – 45°C)
                    </div>
                )}

            </LeafletMap>
        </div>
    );

}

export default MapContainer;