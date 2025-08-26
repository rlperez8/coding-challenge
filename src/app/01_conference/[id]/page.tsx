"use client";

import { useConferences } from "@/context/Conference";
import EventSummary from "../components/Conference_Details";

import Conference_Description from "../components/Conference_Description";
const Conference_Details: React.FC = () => {
  const { selectedConference, speakers } = useConferences();
  const speaker_id = selectedConference?.speaker; 
  const speaker = speakers.find(s => s.id === speaker_id);

  return (
   <div className="conference_details">
    
      <div className="event_details_img_con">
        <img src={selectedConference?.imageurl} alt={selectedConference?.name} className="event_detail_img" />
      </div>
    
      <EventSummary/>

      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 p-4 bg-gray-100">
        <Conference_Description/> 
       </div>
    
      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 p-4 bg-gray-100">
          <div className="conference_speaker_image_con">
            <img
              src={`/${speaker?.avatar_url}`} 
              className="avatar_url"
            />
          </div>
          <div className="conference_speaker_bio_con">
            <div className="conference_speaker_detail_con">
              <div className="conference_speaker_left">Name:</div>
              <div className="conference_speaker_right">{speaker?.name}</div>
            </div>
            <div className="conference_speaker_detail_con">
              <div className="conference_speaker_left">Title:</div>
              <div className="conference_speaker_right">{speaker?.title}</div>
            </div>
            <div className="conference_speaker_detail_con">
              <div className="conference_speaker_left">Company:</div>
              <div className="conference_speaker_right">{speaker?.company}</div>
            </div>
            <div className="conference_speaker_bio_">
              <div className="conference_speaker_left">Bio:</div>
              <div className="conference_speaker_right">{speaker?.bio}</div>
            </div>
          </div>
      </div>
       
       <div className="conference_register">Register</div>
        </div>

      
  
  );
};

export default Conference_Details;