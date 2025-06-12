import React, { useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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
                        opacity={0.7}
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
                    <LayerControls
                        layerVisibility={layerVisibility}
                        onLayerToggle={handleLayerToggle}
                        mapType={mapType}
                        onMapTypeChange={handleMapTypeChange}
                    />
                </div>

                <div className="absolute bottom-4 right-4 z-[1000]">
                    <LocationButton />
                </div>


                {/* Legend based on active layers */}
                {layerVisibility.ndvi && (
                    <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow z-[1000] text-xs">
                        <strong>NDVI Legend</strong><br />
                        <span className="legend-square-red">■</span> Low <br />
                        <span className="legend-square-green">■</span> High
                    </div>
                )}

                {layerVisibility.uhi && (
                    <div className="absolute bottom-24 left-4 bg-white p-2 rounded shadow z-[1000] text-xs">
                        <strong>LST Legend</strong><br />
                        <span className="legend-square-blue">■</span> Cool <br />
                        <span className="legend-square-red">■</span> Hot
                    </div>
                )}

            </LeafletMap>
        </div>
    );

}

export default MapContainer;