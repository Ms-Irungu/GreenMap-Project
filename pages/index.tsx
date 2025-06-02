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
                Mapping Nairobi's Green Future
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
              GreenMap empowers communities to monitor, preserve, and expand urban green spaces for a climate-resilient city.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/map" className="btn rounded-lg bg-white text-green-700 hover:bg-gray-100 px-6 py-3 flex items-center">
                Explore the Map
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/report" className="btn border rounded-lg border-white text-white hover:bg-white/10 px-6 py-3 flex items-center">
                Report a Green Space
              </Link>
            </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default Home;