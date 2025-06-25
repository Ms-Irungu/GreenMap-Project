import React from 'react';
import { Layers } from 'lucide-react';

interface MiniMapLayerControlsProps {
    mapType: 'openStreetMap' | 'satellite';
    onMapTypeChange: (type: 'openStreetMap' | 'satellite') => void;
}

const MiniMapLayerControls: React.FC<MiniMapLayerControlsProps> = ({ mapType, onMapTypeChange }) => (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
        <div className="flex items-center mb-3">
            <Layers className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="font-medium text-gray-800">Map Layers</h3>
        </div>

        {/* Base Map Selection */}
        <div className="border-b pb-2">
            <p className="text-xs text-gray-500 mb-2">Base Map</p>
            <div className="flex gap-2">
                <button
                    onClick={() => onMapTypeChange('openStreetMap')}
                    className={`flex-1 py-1 px-2 text-xs rounded ${mapType === 'openStreetMap'
                        ? 'bg-green-100 text-green-800 font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    OpenStreetMap
                </button>
                <button
                    onClick={() => onMapTypeChange('satellite')}
                    className={`flex-1 py-1 px-2 text-xs rounded ${mapType === 'satellite'
                        ? 'bg-green-100 text-green-800 font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Google Hybrid
                </button>
            </div>
        </div>
    </div>
);

export default MiniMapLayerControls;