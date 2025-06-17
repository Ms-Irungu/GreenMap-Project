import React from 'react';
import { Activity, Leaf, Thermometer, MessageSquare} from 'lucide-react';
import { StatisticsPanelProps } from '@/interfaces';


const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ statistics }) => {
    const totalReports = statistics.reportCount.degraded +
        statistics.reportCount.potential +
        statistics.reportCount.encroached;


    return (
        <div className='bg-white rounded-lg shadow p-4'>
            <h2 className='text-lg font-medium text-gray-800 mb-4'>
                Key Statistics
            </h2>

            <div className='space-y-4'>
                <div className='p-3 bg-green-50 rounded-lg'>
                    <div className='flex items-start'>
                        <div className='bg-green-100 p-2 rounded-lg mr-3'>
                            <Leaf className='h-5 w-5 text-green-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Vegetation Cover Change</p>
                            <p className={`text-xl font-semibold ${statistics.vegetationCoverChange >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                } 
                        `}>
                                {statistics.vegetationCoverChange >= 0 ? "+" : ""}
                                {statistics.vegetationCoverChange.toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </div>
                <div className='p-3 bg-emerald-50 rounded-lg'>
                    <div className='flex items-start'>
                        <div className='bg-emerald-100 p-2 rounded-lg mr-3'>
                            <Activity className='h-5 w-5 text-green-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Average Vegetation Cover</p>
                            <p className={`text-xl font-semibold ${statistics.avgVegetationCover >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                } 
                            `}>
                                {statistics.vegetationCoverChange >= 0 ? "+" : ""}
                                {statistics.avgVegetationCover.toFixed(1)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='p-3 bg-orange-50 rounded-lg'>
                    <div className='flex items-start'>
                        <div className='bg-orange-100 p-2 rounded-lg mr-3'>
                            <Thermometer className='h-5 w-5 text-orange-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Average Urban Heat</p>
                            <p className='text-xl font-semibold text-orange-600'>
                                +{statistics.avgUrbanHeatIndex.toFixed(1)}°C
                            </p>
                        </div>
                    </div>
                </div>

                <div className='p-3 bg-blue-50 rounded-lg'>
                    <div className='flex items-start'>
                        <div className='bg-blue-100 p-2 rounded-lg mr-3'>
                            <MessageSquare className='h-5 w-5 text-blue-600' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-600'>Community Reports</p>
                            <p className='text-xl font-semibold text-blue-600'>
                                {totalReports}
                            </p>
                            <div className='flex gap-2 mt-1'>
                                <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800'>
                                    {statistics.reportCount.degraded} Degraded
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    {statistics.reportCount.potential} Potential
                                </span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                    {statistics.reportCount.encroached} Encroached
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >

    )

}

export default StatisticsPanel;