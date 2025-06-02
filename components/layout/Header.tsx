import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf } from "lucide-react";


const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-emerald-800 text-white shadow-md">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    <div className='flex items-center flex-shrink-0'>
                        <Leaf className='w-8 h-8 mr-2 text-emerald-400' />
                        <span className='text-lg sm:text-xl lg:text-2xl font-bold'>GreenMap</span>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className='lg:hidden block text-white focus:outline-none focus-visible:outline'
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu" >
                        <svg
                            className='w-6 h-6'
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />

                        </svg>
                    </button>

                    <nav className={`${menuOpen ? 'block' : 'hidden'
                        } fixed top-0 right-0 w-50 z-50 transition-transform duration-300 transform bg-emerald-800 lg:bg-transparent lg:static lg:flex lg:items-center lg:w-auto`}>
                        <ul className="flex flex-col items-center justify-center lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-20 p-4 lg:p-0 text-base lg:text-lg">
                            <li className='hover:underline'>
                                <Link href='/'>Home</Link>
                            </li>
                            <li className='hover:underline'>
                                <Link href='/map'>Map</Link>
                            </li>
                            <li className='hover:underline'>
                                <Link href='/dashboard'>Dashboard</Link>
                            </li>
                            <li className='hover:underline'>
                                <Link href='/report'>Report</Link>
                            </li>
                            <li className='hover:underline'>
                                <Link href='/about'>About</Link>
                            </li>
                            <li className="mt-auto w-full flex justify-center">
                                <button
                                    className='block text-white focus:outline-none focus-visible:outline lg:hidden'
                                    onClick={() => setMenuOpen(false)}
                                    aria-label="Close Menu"
                                >
                                    <svg
                                        className='w-6 h-6'
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header