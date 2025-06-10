import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-emerald-800 text-white py-6 mt-6">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h3 className='text-xl font-bold mb-4'>GreenMap</h3>
                    <p className='text-emerald-400 mb-4 font-semibold italic'>Mapping Green Spaces & Heat Stress in Real Time</p>
                    <p className="text-sm text-emerald-400">&copy; {new Date().getFullYear()} GreenMap. All rights reserved.</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
                    <ul>
                        <li className="mb-2">
                            <Link href="/" className="text-emerald-50 hover:text-emerald-400 hover:underline">Home</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/map" className="text-emerald-50 hover:text-emerald-400 hover:underline">Explore the Map</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/report" className="text-emerald-50 hover:text-emerald-400 hover:underline">Report a Green Space</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/about" className="text-emerald-50 hover:text-emerald-400 hover:underline">About Us</Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/contact" className="text-emerald-50 hover:text-emerald-400 hover:underline">Contact</Link>
                        </li>
                    </ul>
                </div>

                <div className=" flex flex-col">
                    <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                    <div className="flex space-x-4 ">
                        <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400">
                            <FaLinkedin size={20} />
                        </Link>
                        <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400">
                            <FaTwitter size={20} />
                        </Link>
                        <Link href="https://www.github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400">
                            <FaGithub size={20} />
                        </Link>
                    </div>

                </div>
            </div>

        </footer>
    );
};

export default Footer;