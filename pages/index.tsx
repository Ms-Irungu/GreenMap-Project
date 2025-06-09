import React from 'react'
import Header from '../components/layout/Header'
import { ArrowRight, Leaf, MapPin, BarChart3, FileEdit, Sun, Users } from 'lucide-react';
import Link from 'next/link';

const Home = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <main className='animate-fade-in flex-1 bg-gray-100 p-4 sm:p-6 lg:p-8'>

        {/* Hero Section */}
        <section className='relative bg-gradient-to-br from-green-800 to-green-900 text-white'>
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg')] bg-cover bg-center"></div>
          <div className='container mx-auto px-4 py-20 md:py-32 relative'>
            <div className='max-w-3xl'>
              <h1 className='text-4xl md:text-5xl font-bold mb-6 leading-tight '>
                Mapping Nairobi&apos;s Green Future
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
              GreenMap empowers communities to monitor, preserve, and expand urban green spaces for a climate-resilient city.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/map" className="btn bg-white text-green-700 hover:bg-gray-100 px-6 py-3 ">
                Explore the Map
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/report" className="btn border border-white text-white hover:bg-white/10 px-6 py-3 flex items-center">
                Report a Green Space
              </Link>
            </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How GreenMap Works</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Our platform combines satellite data with community insights to monitor and protect Nairobi&apos;s valuable green spaces.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card">
            <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Leaf className="text-green-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Vegetation Monitoring</h3>
            <p className="text-gray-600">
              Using Sentinel-2 satellite data and NDVI analysis to track urban vegetation health and identify areas of green cover reduction.
            </p>
          </div>
          
          <div className="card">
            <div className="rounded-full bg-red-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Sun className="text-red-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Urban Heat Mapping</h3>
            <p className="text-gray-600">
              Utilizing MODIS Land Surface Temperature data to visualize urban heat islands and their correlation with green cover.
            </p>
          </div>
          
          <div className="card">
            <div className="rounded-full bg-orange-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <FileEdit className="text-orange-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Crowdsourced Reports</h3>
            <p className="text-gray-600">
              Enabling community members to geotag green spaces, report degradation, and suggest potential areas for regreening.
            </p>
          </div>
          
          <div className="card">
            <div className="rounded-full bg-emerald-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="text-emerald-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Maps</h3>
            <p className="text-gray-600">
              Explore dynamic maps showing green space density, urban heat zones, and community contributions using Leaflet.js and OpenStreetMap.
            </p>
          </div>
          
          <div className="card">
            <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BarChart3 className="text-green-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
            <p className="text-gray-600">
              Comprehensive dashboards providing ward-level analytics to support informed decision-making for urban planning.
            </p>
          </div>
          
          <div className="card">
            <div className="rounded-full bg-yellow-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="text-yellow-600 h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborative Action</h3>
            <p className="text-gray-600">
              Connecting environmental stakeholders, planners, and community members to drive collective climate action initiatives.
            </p>
          </div>
        </div>
      </section>

       {/* Call To Action Section */}
      <section className="bg-emerald-50 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Green Movement</h2>
                <p className="text-gray-600 mb-6">
                  Help us map, monitor and preserve Nairobi&apos;s green spaces. Your contributions make a difference in creating a more sustainable and climate-resilient city.
                </p>
                <Link href="/report" className="btn btn-primary">
                  Submit a Report
                </Link>
              </div>
              <div className="md:w-1/2 bg-[url('https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg')] bg-cover bg-center min-h-[300px]"></div>
            </div>
          </div>
        </div>
      </section>

       {/* Impact Stats */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Through community engagement and data-driven monitoring, we&apos;re making tangible progress in preserving Nairobi&apos;s green spaces.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="card text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">0</div>
            <p className="text-sm md:text-base text-gray-600">Green Spaces Mapped</p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">0</div>
            <p className="text-sm md:text-base text-gray-600">Community Reports</p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">0</div>
            <p className="text-sm md:text-base text-gray-600">Wards Covered</p>
          </div>
          
          <div className="card text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-700 mb-2">0</div>
            <p className="text-sm md:text-base text-gray-600">Partner Organizations</p>
          </div>
        </div>
      </section>

      </main>

    </div>
  )
}

export default Home;