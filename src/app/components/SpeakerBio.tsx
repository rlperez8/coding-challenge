'use client'

import React from "react"

import { useConferences } from "@/context/Conference"

const SpeakerBio: React.FC = () => {
    const {selectedConference} = useConferences()
    if(!selectedConference) return null
    return(
      <div className="flex-1 p-4 rounded shadow">
                    <div className="text-lg font-semibold mb-2">Event Details</div>
                    <div className="text-gray-700">{selectedConference.description}</div>
                  </div>

    )
}

export default SpeakerBio