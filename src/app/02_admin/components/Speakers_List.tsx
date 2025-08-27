"use client";
import React from 'react';
import Link from 'next/link';
import { useConferences } from "@/context/Conference";
import Image from 'next/image';
const Speakers_List = () => {
    const {speakers} = useConferences()


    return (
        <div className="edit_speaker_layout"> 
          <div className='inner_speaker_layout'>

            
            <div className='test_fix'>


             <Link  href="/02_admin/speaker_create">
                <div className={'create_button_con'}>Create</div>
            </Link>
            </div>
            {speakers.map((speaker, index) => (   
              <div key={index} className='conference_speakers_con'> 

              <div className="conference_speakers_inner">

                  <div className="conference_speaker_image_con">
                    <Image src={speaker.avatar_url || "Speaker Avatar"} 
                      alt={speaker.name || "Speaker Avatar"} 
                      fill 
                      className="object-cover rounded-full"
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
                    <Link className='delete_button_con' key={index}  href={`/02_admin/speaker_edit/${speaker.id}`}>
                        Edit
                    </Link>
                    
                  </div>

              </div>    

              </div>     
            ))} 

          </div>
        </div>
    );
};

export default Speakers_List;
