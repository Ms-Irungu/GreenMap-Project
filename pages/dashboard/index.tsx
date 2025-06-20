import React from 'react'
import dynamic from 'next/dynamic';
// Dynamically import components to avoid SSR issues with Leaflet
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer';
import DateRangePicker from '@/components/common/DateRangePicker';

// Dynamically import DashboardContainer with SSR disabled
const DashboardContainer = dynamic(
  () => import('@/components/dashboard/DashboardContainer'),
  { ssr: false }
);

const DashboardPage: React.FC = () => {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex items-center justify-between bg-gray-100 px-4 py-2 border-b border-gray-200'>
        <h1 className="text-md md:text-2xl font-semibold text-gray-800">
          Analytics Dashboard
        </h1>

        <DateRangePicker
         
        />
      </div>
      <main className='h-full overflow-y-auto bg-gray-100 flex-1'>
        <DashboardContainer  />

      </main>
      <Footer />
    </div>
  )
}

export default DashboardPage;