"use client";
import React from 'react';

import { useConferences } from "@/context/Conference";
// import Conference_Speaker from '@/app/conference/components/Conference_Speaker';
const Speakers_List = () => {
    const {speakers, setConferences} = useConferences()

    return (
        <div className="edit_speaker_layout"> 
            {speakers.map((speaker, index) => (   
                <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 p-4 bg-gray-100">
          <div className="conference_speaker_image_con">

                    <div className="conference_speaker_image_con">
                        <img
                        src={`/${speaker.avatar_url}`} 
                        className="event_detail_img"
                        />
                    </div>
                    
                    <div className="conference_speaker_bio_con">
                        <div className="conference_speaker_detail_con">
                        <div className="conference_speaker_left">Name:</div>
                        <div className="conference_speaker_right">{speaker.avatar_url}</div>
                        </div>
                        <div className="conference_speaker_detail_con">
                        <div className="conference_speaker_left">Title:</div>
                        <div className="conference_speaker_right">{speaker.title}</div>
                        </div>
                        <div className="conference_speaker_detail_con">
                        <div className="conference_speaker_left">Company:</div>
                        <div className="conference_speaker_right">{speaker.company}</div>
                        </div>
                        <div className="conference_speaker_bio_">
                        <div className="conference_speaker_left">Bio:</div>
                        <div className="conference_speaker_right">{speaker.bio}</div>
                        </div>
                    </div>

                    <div className='edit_options'>
                      <div onClick={()=>{}} className='delete_button_con'>Delete</div>
                      <div className='delete_button_con'>Edit</div>
                  </div>
                    
                </div>    </div>
                
            ))}
        </div>
    );
};

export default Speakers_List;
