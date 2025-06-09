import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import { DateRange } from '@/interfaces';
import DateRangePicker from '@/components/common/DateRangePicker';
import { getDateRangeFromPreset } from '@/components/utils/dateUtils';

// Dynamically import MapContainer with SSR disabled
const MapContainer = dynamic(() => import('@/components/map/MapContainer'), { ssr: false })

const MapPage = () => {
    const [dateRange, setDateRange] = useState<DateRange>(
        getDateRangeFromPreset('last30Days')
    );

    const handleDateRangeChange = (newDateRange: DateRange) => {
        setDateRange(newDateRange);
    };


    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='flex items-center justify-between bg-gray-100 px-4 py-2 border-b border-gray-200'>
                <h1 className="text-md md:text-2xl font-semibold text-gray-800">
                    Green Spaces Map
                </h1>

                <DateRangePicker
                    dateRange={dateRange}
                    onDateRangeChange={handleDateRangeChange}
                />
            </div>

            <main className='flex-1 bg-white p-4 sm:p-6 lg:p-8'>
                {/* Map component will go here */}
                <div className='h-[500px] bg-gray-200 rounded-lg shadow-md flex items-center justify-center relative z-0'>
                    <MapContainer dateRange={dateRange} />
                </div>
            </main>



        </div>

    )
}

export default MapPage;

