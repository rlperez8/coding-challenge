'use client';

import React from 'react'
import { useConferences } from '@/context/Conference';

const RegistrationForm: React.FC = () => {

    const {selectedConference} = useConferences()
    if (!selectedConference) return null; // handle no selection

    return(
            <div className="w-full bg-white shadow-lg rounded-2xl p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Event Registration</h2>
                  
                  <form className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Tickets */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Tickets
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        defaultValue={1}
                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                      </label>
                      <textarea
                        placeholder="Anything we should know?"
                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        rows={3}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Register
                    </button>
                  </form>
                </div>
    )
}

export default RegistrationForm;
