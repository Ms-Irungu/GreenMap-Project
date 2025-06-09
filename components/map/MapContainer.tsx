import React, { useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPosition, MapContainerProps, LayerVisibility } from '@/interfaces';
import { DEFAULT_MAP_POSITION, MAP_TILE_LAYERS } from '@/components/utils/constants';
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

            </LeafletMap>
        </div>
    );

}

export default MapContainer;