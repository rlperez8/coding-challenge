'use client'

import React from "react"

import { useConferences } from "@/context/Conference"

const EventDetials: React.FC = () => {
    const {selectedConference} = useConferences()
    if(!selectedConference) return null
    return(
        <div className="flex-1 p-4 rounded shadow">
            <div className="text-lg font-semibold mb-2">Speaker</div>
            

            <div className="space-y-4">

                {selectedConference.speakers?.map((speaker) => (

                <div key={speaker.id} className="border p-2 rounded">
                    
                    <div className="flex justify-between mb-1">
                    <div className="font-semibold">Name:</div>
                    <div>{speaker.name}</div>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                    <div className="font-semibold">Company:</div>
                    <div>{speaker.company}</div>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                    <div className="font-semibold">Title:</div>
                    
                    
                <div>{speaker.title}</div>
                    </div>

                    <div className="flex flex-col">
                    <div className="font-semibold">Bio:</div>
                    <div>{speaker.bio}</div>
                    </div>
                    
                </div>
                ))}
            </div>
            
        </div>

    )
}

export default EventDetials