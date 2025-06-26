import React, {useState} from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer';
import DateRangePicker from '@/components/common/DateRangePicker';
import useMapOverlay from '@/hooks/useMapOverlay';

// Dynamically import MapContainer with SSR disabled
const MapContainer = dynamic(() => import('@/components/map/MapContainer'), { ssr: false })

const MapPage = () => {
    const [selected, setSelected] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
    const { isLoading, ndvi, lst, precipitation, error, fetchOverlay } = useMapOverlay();

    const handleFetch = () => {
        fetchOverlay(selected.year, selected.month);
    };
   
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='flex items-center justify-between bg-gray-100 px-4 py-2 border-b border-gray-200'>
                <h1 className="text-md md:text-2xl font-semibold text-gray-800">
                    Green Spaces Map
                </h1>

                <div className="flex gap-2 items-center">
                    <DateRangePicker value={selected} onChange={setSelected} />
                    <button
                        className="ml-2 px-4 py-2 bg-emerald-600 text-white rounded"
                        onClick={handleFetch}
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Fetch Map"}
                    </button>
                </div>
                   
            
            </div>

            <main className='flex-1 animate-fade-in bg-white p-4 sm:p-6 lg:p-8'>
                <div className='h-[500px] bg-gray-200 shadow-md flex items-center justify-center relative z-0'>
                    <MapContainer ndvi={ndvi} lst={lst} precipitation={precipitation} isLoading={isLoading} />
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </main>
            <Footer />
        </div>
    )
}

export default MapPage;

