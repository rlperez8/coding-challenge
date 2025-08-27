"use client";

import { useConferences } from "@/context/Conference";
import EventSummary from "../components/Conference_Details";
import Conference_Speaker from "../components/Conference_Speaker";

import Conference_Description from "../components/Conference_Description";
const Conference_Details: React.FC = () => {
  const { selectedConference, speakers } = useConferences();
  const speaker_id = selectedConference?.speaker; 
  const speaker = speakers.find(s => s.id === speaker_id);

  console.log(selectedConference)

  return (
   <div className="conference_details">
    
      <div className="event_details_img_con">
<img src={`/${selectedConference?.imageurl}`} alt={selectedConference?.name} className="event_detail_img" />

      </div>

        {selectedConference?.registerd ? <div className="conference_register">You are registered for this conference!</div>
        :
         <div className="conference_register">Register</div>
      }
      
      <EventSummary/>

      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 p-4 bg-gray-100">
        <Conference_Description/> 
       </div>
      

      {speaker && <Conference_Speaker speaker={speaker} />}

     
        </div>

      
  
  );
};

export default Conference_Details;