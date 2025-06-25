import React, { useState } from 'react';
import { MapPin, Send } from 'lucide-react';
import { ReportFormState } from '@/interfaces';
import Header from '../../components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import Firestore Functions and db
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const ReportForm: React.FC = () => {
    const [formState, setFormState] = useState<ReportFormState>({
        type: 'illegal_tree_cutting',
        location: '',
        description: '',
        latitude: '',
        longitude: '',
        spaceType: '',
        condition: '',
        urgency: 'low',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        console.log("Submitting to Firestore:", {
            ...formState,
            createdAt: new Date().toISOString(),
        });

        try {
            // Save to Firestore 
            await addDoc(collection(db, `reports`), {
                ...formState,
                createdAt: new Date().toISOString(),
            });

            alert("Thank You for your report! It has been submitted successfully.");

            // Reset form
            setFormState({
                type: 'illegal_tree_cutting',
                location: '',
                description: ``,
                latitude: '',
                longitude: '',
                spaceType: '',
                condition: '',
                urgency: 'low',
            });
        } catch (error) {
            alert("Failed to submit report. Please try again.");
            console.error('Error submitting report:', error);
        }

        setLoading(false);
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormState(prev => ({
                        ...prev,
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                    }));
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to get your location. Please enter coordinates manually.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser. Please enter coordinates manually.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-emerald-700 px-6 py-4">
                        <h1 className="text-xl font-bold text-white">Report a Green Space</h1>
                        <p className="text-emerald-100 mt-1">
                            Help us map and monitor green spaces in Nairobi
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-6">

                            {/* Report Type */}
                            <div>
                                <label htmlFor='report-type' className="block text-sm font-medium text-gray-700 mb-1">
                                    Report Type
                                </label>
                                <select
                                    id="report-type"
                                    name="type"
                                    value={formState.type}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="illegal_tree_cutting">Illegal Tree Cutting</option>
                                    <option value="encroachment">Encroachment / Construction</option>
                                    <option value="pollution">Pollution / Dumping</option>
                                    <option value="potential">Potential Green Space</option>
                                    <option value="existing">Existing Green Space</option>
                                </select>
                            </div>

                            {/* Location Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location Name
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formState.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Uhuru Park, Nairobi"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    required
                                />
                            </div>
                            {/* Green Space Type */}

                            <div>
                                <label htmlFor='green-space-type' className="block text-sm font-medium text-gray-700 mb-1">
                                    Green Space Type
                                </label>
                                <select
                                    id="green-space-type"
                                    name="spaceType"
                                    value={formState.spaceType}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">Select green space type</option>
                                    <option value="Public Park">Public Park</option>
                                    <option value="Urban Forest">Urban Forest</option>
                                    <option value="Idle Plot">Idle Plot</option>
                                    <option value="Roadside Tree Belt">Roadside Tree Belt</option>
                                    <option value="School Playground">School Playground</option>
                                    <option value="Riverside / Wetland">Riverside / Wetland</option>
                                    <option value="Rooftop / Vertical Garden">Rooftop / Vertical Garden</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Show condition only for degradation reports */}
                            {['illegal_tree_cutting', 'encroachment', 'pollution'].includes(formState.type) && (
                                <div>
                                    <label htmlFor='conditions' className="block text-sm font-medium text-gray-700 mb-1">
                                        Condition
                                    </label>
                                    <select
                                        id="conditions"
                                        name="condition"
                                        value={formState.condition}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value="">Select condition</option>
                                        <option value="Overgrown/Unmaintained">Overgrown / Unmaintained</option>
                                        <option value="Polluted / Littered">Polluted / Littered</option>
                                        <option value="Encroached / Constructed">Encroached / Constructed</option>
                                        <option value="Tree Cutting / Logging">Tree Cutting / Logging</option>
                                        <option value="Fire / Vandalism">Fire / Vandalism</option>
                                        <option value="Drought / Drying Vegetation">Drought / Drying Vegetation</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            )}

                            {/* Urgency Level */}
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-1">
                                    Urgency / Severity
                                </label>
                                <div className="flex gap-15 mt-2">
                                    {[
                                        { value: 'low', label: 'Low', color: 'bg-green-400' },
                                        { value: 'moderate', label: 'Moderate', color: 'bg-yellow-400' },
                                        { value: 'high', label: 'High', color: 'bg-orange-400' },
                                        { value: 'critical', label: 'Critical', color: 'bg-red-500' },
                                    ].map(opt => (
                                        <label key={opt.value} className="flex flex-col items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                name="urgency"
                                                value={opt.value}
                                                checked={formState.urgency === opt.value}
                                                onChange={handleChange}
                                                className="sr-only"
                                            />
                                            <span
                                                className={`
            w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center
            ${formState.urgency === opt.value ? opt.color + ' border-emerald-600' : 'bg-white'}
            transition-colors
          `}
                                            >
                                                {formState.urgency === opt.value && (
                                                    <span className="w-3 h-3 rounded-full bg-white border border-gray-200"></span>
                                                )}
                                            </span>
                                            <span className="text-xs mt-1">{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formState.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe the current state, issues, or potential of this space..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        name="latitude"
                                        value={formState.latitude}
                                        onChange={handleChange}
                                        placeholder="e.g. -1.2921"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        name="longitude"
                                        value={formState.longitude}
                                        onChange={handleChange}
                                        placeholder="e.g. 36.8219"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    <MapPin className="w-5 h-5" />
                                    <span>Use My Current Location</span>
                                </button>
                            </div>

                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <Send className="w-5 h-5" />
                                <span>{loading ? "Submitting..." : "Submit Report"}</span>
                            </button>
                        </div>

                        <p className="text-xs text-center text-gray-500 mt-4">
                            By submitting this report, you agree to our terms of service and privacy policy.
                            Your contribution helps improve urban green spaces in Nairobi.
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </div>


    );
};


export default ReportForm;