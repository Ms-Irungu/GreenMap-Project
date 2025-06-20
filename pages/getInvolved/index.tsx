import React, { useState } from 'react'
import {Send} from 'lucide-react';
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer';
import { GetInvolvedFormState } from '@/interfaces';

// Import Firestore Functions and db
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const GetInvolved: React.FC = () => {
  const [formState, setFormState] = useState<GetInvolvedFormState>({
    fullName: '',
    email: '',
    organization: '',
    role: 'student',
    engagement: 'sponsor_feature',
    message: '',
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
      await addDoc(collection(db, `getInvolved`), {
        ...formState,
        createdAt: new Date().toISOString(),
      });
      alert("Thank you for your interest! Your submission has been received.");

      // Reset form
      setFormState({
        fullName: '',
        email: '',
        organization: '',
        role: 'student',
        engagement: 'sponsor_feature',
        message: '',
      });
    } catch (error) {
      alert("Failed to submit. Please try again.");
      console.error('Error submitting form:', error);
    }

    setLoading(false);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='bg-emerald-700 px-6 py-4'>
            <h1 className="text-xl font-bold text-white">Join the Green Movement</h1>
            <p className="text-emerald-100 mt-1">
              Whether you&apos;re here to contribute ideas, offer support, or spark collaborations - your role matters. Join us in making Nairobi greener and smarter!
            </p>
          </div>
          <form className='p-6' onSubmit={handleSubmit}>
            <div className='space-y-6'>
              <div>
                <label htmlFor='full-name' className='block text-sm font-medium text-gray-700'>Full Name</label>
                <input
                  id='full-name'
                  type='text'
                  name='fullName'
                  value={formState.fullName}
                  onChange={handleChange}
                  required
                  className='block w-full border border-gray-300 mt-2 py-2 px-2 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500'
                />
              </div>

              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                <input
                  id='email'
                  type='email'
                  name='email'
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className='block w-full border border-gray-300 mt-2 py-2 px-2 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500'
                />
              </div>

              <div>
                <label htmlFor='organization' className='block text-sm font-medium text-gray-700'>Organization (optional)</label>
                <input
                  id='organization'
                  type='text'
                  name='organization'
                  value={formState.organization}
                  onChange={handleChange}
                  className='block w-full border border-gray-300 mt-2 py-2 px-2 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500'
                />
              </div>

              <div>
                <label htmlFor='role' className='block text-sm font-medium text-gray-700'>Your Role</label>
                <select
                  id='role'
                  name='role'
                  value={formState.role}
                  onChange={handleChange}
                  className='block w-full border border-gray-300 mt-2 py-2 px-2 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500'
                >
                  <option value='student'>Student</option>
                  <option value='community_leader'>Community Leader</option>
                  <option value='ngo_initiative'>NGO/Initiative</option>
                  <option value='sponsor'>Sponsor</option>
                </select>
              </div>

              <div>
                <label htmlFor='engagement' className='block text-sm font-medium text-gray-700'>How would you like to engage?</label>
                <select
                  id='engagement'
                  name='engagement'
                  value={formState.engagement}
                  onChange={handleChange}
                  className='block w-full border border-gray-300 mt-2 py-2 px-2 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500'
                >
                  <option value='sponsor_feature'>Sponsor a Feature</option>
                  <option value='share_ideas'>Share Ideas</option>
                  <option value='volunteer_efforts'>Volunteer Efforts</option>
                  <option value='collaborate_research'>Collaborate on Research</option>
                </select>
              </div>

              <div>
                <label htmlFor='message' className='block text-sm font-medium text-gray-700'>Message (optional)</label>
                <textarea
                  id='message'
                  name='message'
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className='block w-full border border-gray-300 mt-2 py-2 px-2 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500'
                  placeholder='Share any additional thoughts or ideas...'
                />
              </div>

              <div>
                <button
                  type='submit'
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  <span>{loading ? "Submitting..." : "Submit Report"}</span>
                </button>
              </div>

            </div>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default GetInvolved;