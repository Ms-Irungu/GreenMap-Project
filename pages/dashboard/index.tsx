import React from 'react'
import Header from '@/components/layout/Header'

const DashboardPage :React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header />
        <div className="bg-gray-100 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-center mt-10">Dashboard</h1>
        <p className="text-center text-gray-600 mt-4">This is the dashboard page.</p>
        {/* Add your dashboard components here */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
            <p className="text-gray-700">Here you can view various statistics and insights.</p>
        </div>
    </div>
    </div>
  )
}

export default DashboardPage;