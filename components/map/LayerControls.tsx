import React from 'react';
import { Layers } from 'lucide-react';
import { LayerVisibility } from '@/interfaces';

interface LayerControlsProps {
    layerVisibility: LayerVisibility;
    onLayerToggle: (layer: keyof LayerVisibility) => void;
    mapType: 'openStreetMap' | 'satellite';
    onMapTypeChange: (type: 'openStreetMap' | 'satellite') => void;
}

const LayerControls: React.FC<LayerControlsProps> = ({
    layerVisibility,
    onLayerToggle,
    mapType,
    onMapTypeChange,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-3 md:w-[240px] sm:w-[180px] sm:p-2 sm:text-sm animate-fade-in">
            <div className="flex items-center mb-3">
                <Layers className="h-5 w-5 text-primary-600 mr-2" />
                <h3 className="font-medium text-gray-800">Map Layers</h3>
            </div>

            <div className="space-y-3">
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

                {/* Data Layers */}
                <div>
                    <p className="text-xs text-gray-500 mb-2">Data Layers</p>
                    <div className="space-y-2">
                        <div
                            className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-100"
                            onClick={() => onLayerToggle('ndvi')}
                        >
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-green-700 mr-2"></div>
                                <span className="text-sm">Vegetation (NDVI)</span>
                            </div>
                            <div className={`w-8 h-4 rounded-full relative ${layerVisibility.ndvi ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <div
                                    className={`absolute w-3 h-3 rounded-full bg-white top-0.5 transition-all ${layerVisibility.ndvi ? 'right-0.5' : 'left-0.5'
                                        }`}
                                ></div>
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-100"
                            onClick={() => onLayerToggle('uhi')}
                        >
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-300 to-red-700 mr-2"></div>
                                <span className="text-sm">Urban Heat</span>
                            </div>
                            <div className={`w-8 h-4 rounded-full relative ${layerVisibility.uhi ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <div
                                    className={`absolute w-3 h-3 rounded-full bg-white top-0.5 transition-all ${layerVisibility.uhi ? 'right-0.5' : 'left-0.5'
                                        }`}
                                ></div>
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-gray-100"
                            onClick={() => onLayerToggle('precipitation')}
                        >
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-200 to-blue-700 mr-2"></div>
                                <span className="text-sm">Rainfall</span>
                            </div>
                            <div className={`w-8 h-4 rounded-full relative ${layerVisibility.precipitation ? 'bg-green-500' : 'bg-gray-300'}`}>
                                <div
                                    className={`absolute w-3 h-3 rounded-full bg-white top-0.5 transition-all ${layerVisibility.uhi ? 'right-0.5' : 'left-0.5'
                                        }`}
                                ></div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>

            <div className="mt-3 pt-2 border-t">
                <p className="text-xs text-gray-500">Data updated daily</p>
            </div>
        </div>
    );
};

export default LayerControls;