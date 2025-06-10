import React from 'react';
import Header from '@/components/layout/Header';
import { useState, useEffect } from 'react';
import { Satellite, Users, TrendingUp } from 'lucide-react';
import Footer from '@/components/layout/Footer';


const AboutPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000); // Delay of 1 second

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    return (
        <div className='flex flex-col h-screen'>
            <Header />

            <main className="animate-fade-in flex-1 bg-gray-100 p-4 sm:p-6 lg:p-8">

                {/* Hero Section */}
                <section className='relative overflow-hidden bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white rounded-sm shadow-lg'>
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg')] bg-cover bg-center"></div>
                    <div className="relative h-20 mb-6 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-slide-text whitespace-nowrap">
                                <span className="text-2xl md:text-3xl font-medium text-emerald-100 mx-8">
                                    Mapping Green Spaces & Heat Stress in Real Time
                                </span>
                                <span className="text-2xl md:text-3xl font-medium text-emerald-100 mx-8">
                                    Mapping Green Spaces & Heat Stress in Real Time
                                </span>
                                <span className="text-2xl md:text-3xl font-medium text-emerald-100 mx-8">
                                    Mapping Green Spaces & Heat Stress in Real Time
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Description Card */}
                    <div className={`max-w-5xl mx-auto p-4 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                            <p className="text-xl leading-relaxed text-emerald-50">
                                GreenMap is a web-based platform that empowers communities, planners, and environmental actors to map, monitor, and protect urban green spaces in Nairobi. It combines satellite data (Sentinel-2 and MODIS) with citizen input to support evidence-based greening initiatives, climate adaptation, and urban resilience.
                            </p>
                        </div>
                    </div>
                </section >

                <div className="text-center m-10">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">About GreenMap</h2>
                    <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
                </div>

                {/* Mission Section */}
                <section className="mb-20">
                    <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">🌍 Our Mission</h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Our mission is to empower Nairobi&apos;s communities, planners, and environmental advocates with accessible,
                            real-time geospatial intelligence to monitor, protect, and restore urban green spaces. By combining
                            satellite data with local reporting, GreenMap supports strategic tree planting, urban heat mitigation,
                            and inclusive climate action — building a greener, healthier, and more resilient city for all.
                        </p>
                    </div>
                </section>

                {/* Vision Section */}
                <section className="mb-20">
                    <div className="bg-emerald-50 rounded-3xl shadow-xl p-8 md:p-12 border border-emerald-100 hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">🔥 Our Vision</h3>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            A greener, cooler, more resilient city, powered by data and community action.
                        </p>
                    </div>
                </section>

                {/* Solution Section */}
                <section className="mb-20">
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">💡 Our Solution</h3>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            We combine Earth Observation data and community reports to:
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center group">
                                <div className="bg-emerald-50 p-6 rounded-2xl mb-4 group-hover:bg-emerald-100 transition-colors duration-200">
                                    <Satellite className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Track Vegetation</h4>
                                    <p className="text-gray-600">Using Sentinel-2 NDVI analysis</p>
                                </div>
                            </div>

                            <div className="text-center group">
                                <div className="bg-red-50 p-6 rounded-2xl mb-4 group-hover:bg-red-100 transition-colors duration-200">
                                    <TrendingUp className="h-12 w-12 text-red-600 mx-auto mb-4" />
                                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Map Urban Heat</h4>
                                    <p className="text-gray-600">Using MODIS LST data</p>
                                </div>
                            </div>

                            <div className="text-center group">
                                <div className="bg-blue-50 p-6 rounded-2xl mb-4 group-hover:bg-blue-100 transition-colors duration-200">
                                    <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Citizen Reports</h4>
                                    <p className="text-gray-600">Report green or degraded spaces</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SDG Alignment Section */}
                <section className="mb-16">
                    <div className="rounded-3xl shadow-xl p-8 md:p-12 border border-emerald-50 hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">🌱 SDG Alignment</h3>

                        <div className="grid md:grid-cols-2 gap-8">
                            <a
                                href="https://sdgs.un.org/goals/goal11"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 block"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="bg-orange-100 p-3 rounded-full mr-4">
                                        <span className="text-2xl">🏙️</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">SDG 11</h4>
                                        <p className="text-gray-600">Sustainable Cities & Communities</p>
                                    </div>
                                </div>
                            </a>

                            <a
                                href="https://sdgs.un.org/goals/goal13"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 block"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="bg-green-100 p-3 rounded-full mr-4">
                                        <span className="text-2xl">🌍</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">SDG 13</h4>
                                        <p className="text-gray-600">Climate Action</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
            </main >
            <Footer />
        </div >

    )
};

export default AboutPage;