import React, { useState } from 'react';
import { MapPin, Send, X, Plus } from 'lucide-react';
import { ReportFormState } from '@/interfaces';
import Image from 'next/image';
import Header from '../../components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import Firestore Functions and db
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";


const ReportForm: React.FC = () => {
    const [formState, setFormState] = useState<ReportFormState>({
        type: 'degradation',
        location: '',
        description: '',
        latitude: '',
        longitude: '',
        images: [],
    });

    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newImages = Array.from(e.target.files);
            setFormState(prev => ({
                ...prev,
                images: [...prev.images, ...newImages], /*Allows users to select and add multiple images, not just replace the previous ones */
            }));

            // Create preview URLs
            const newPreviewUrls = newImages.map(file => URL.createObjectURL(file));
            setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
        }
    };

    const removeImage = (index: number) => {
        setFormState(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));

        // Revoke the object URL to avoid memory leaks
        URL.revokeObjectURL(imagePreviewUrls[index]);
        setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Upload images to Firebase Storage and get URLs
            const imageUrls: string[] = [];
            for (const file of formState.images) {
                const storageRef = ref(storage, `reports/${Date.now()}-${file.name}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                imageUrls.push(url);
            }
            // Save to Firestore (images will be empty array unless you implement upload)
            await addDoc(collection(db, "reports"), {
                ...formState,
                createdAt: new Date().toISOString(),
            });

            alert("Thank You for your report! It has been submitted successfully.");

            // Reset form
            setFormState({
                type: 'degradation',
                location: '',
                description: '',
                latitude: '',
                longitude: '',
                images: [],
            });

            imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
            setImagePreviewUrls([]);
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
                                    <option value="degradation">Degraded Green Space</option>
                                    <option value="potential">Potential Green Space</option>
                                    <option value="existing">Existing Green Space</option>
                                </select>
                            </div>

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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Images
                                </label>

                                <div className="flex flex-wrap gap-4 mb-4">
                                    {imagePreviewUrls.map((url, index) => (
                                        <div key={index} className="relative w-24 h-24">
                                            <Image
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                fill
                                                sizes="(max-width: 96px) 100vw, 96px"
                                                className="w-full h-full object-cover rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                                title={`Remove image ${index + 1}`}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}

                                    <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                                        <Plus className="w-8 h-8 text-gray-400" />
                                        <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            multiple
                                        />
                                    </label>
                                </div>

                                <p className="text-xs text-gray-500">
                                    Upload images to help us better understand the space (optional). You can upload multiple images.
                                </p>
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