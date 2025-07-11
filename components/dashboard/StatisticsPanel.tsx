import React from 'react';
import { Activity, Thermometer, MessageSquare, CloudHail } from 'lucide-react';
import { StatisticsPanelProps } from '@/interfaces';
import { useReportsCount } from '@/hooks/useReportsCount';


const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
    meanNdvi,
    meanLst,
    meanPrecipitation,
    isLoading
}) => {

    // Fetch reports count
    const { reportCount, isLoading: reportsLoading } = useReportsCount();

    return (
        <div className='bg-white rounded-lg shadow p-4'>
            <h2 className='text-lg font-medium text-gray-800 mb-4'>
                Key Statistics
            </h2>

            <div className='space-y-4'>

                        {/* Average NDVI */}    
                <div className='p-3 bg-emerald-50 rounded-lg'>
                    <div className='flex items-start'>
                        <div className='bg-emerald-100 p-2 rounded-lg mr-3'>
                            <Activity className='h-5 w-5 text-green-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Average Vegetation Cover</p>
                            <p className={`text-xl font-semibold ${typeof meanNdvi === 'number' && meanNdvi >= 0
                                ? 'text-green-600'
                                : 'text-red-600'
                                } 
                            `}>
                                {isLoading
                                    ? '...'
                                    : (meanNdvi !== 'N/A' && meanNdvi !== undefined && meanNdvi !== null)
                                        ? `${typeof meanNdvi === 'number'
                                            ? (meanNdvi >= 0 ? '+' : '') + meanNdvi.toFixed(3)
                                            : meanNdvi}`
                                        : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                            {/* Average LST */}
                <div className='p-3 bg-orange-50 rounded-lg'>
                    <div className='flex items-start'>
                        <div className='bg-orange-100 p-2 rounded-lg mr-3'>
                            <Thermometer className='h-5 w-5 text-orange-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Average Urban Heat</p>
                            <p className={`text-xl font-semibold ${typeof meanLst === 'number'
                                ? 'text-orange-600'
                                : 'text-gray-500'
                                }`}>
                                {isLoading
                                    ? '...'
                                    : (meanLst !== 'N/A' && meanLst !== undefined && meanLst !== null)
                                        ? `${typeof meanLst === 'number'
                                            ? meanLst.toFixed(2) + '°C'
                                            : meanLst}`
                                        : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                            {/* Average Rainfall */}
                <div className='p-3 bg-blue-50 rounded-lg'>
                    <div className='flex items-start'>
                        <div className='bg-blue-300 p-2 rounded-lg mr-3'>
                            <CloudHail className='h-5 w-5 text-white' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Average Rainfall</p>
                            <p className={`text-xl font-semibold ${typeof meanPrecipitation === 'number' && meanPrecipitation >= 0
                                ? 'text-blue-600'
                                : 'text-red-600'
                                } 
                            `}>
                                {isLoading
                                    ? '...'
                                    : (meanPrecipitation !== 'N/A' && meanPrecipitation !== undefined && meanPrecipitation !== null)
                                        ? `${typeof meanPrecipitation === 'number'
                                            ? meanPrecipitation.toFixed(3) + ' mm'
                                            : meanPrecipitation}`
                                        : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
                                    
                            {/* Community Reports */}
                <div className='p-3 bg-purple-50 rounded-lg'>
                    <div className='flex items-start'>
                        <div className='bg-purple-100 p-2 rounded-lg mr-3'>
                            <MessageSquare className='h-5 w-5 text-purple-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Submitted Community Reports</p>
                            <p className='text-xl font-semibold text-purple-600'>
                                {reportsLoading ? '...' : reportCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )

}

export default StatisticsPanel;