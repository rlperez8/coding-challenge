"use client";

import { useConferences } from "@/context/Conference";
import EventSummary from "../components/Conference_Details";
import Conference_Speaker from "../components/Conference_Speaker";
import Conference_Description from "../components/Conference_Description";

const Conference_Details: React.FC = () => {

  const { selectedConference, speakers, setSelectedConference } = useConferences();
  const speaker_id = selectedConference?.speaker; 
  const speaker = speakers.find(s => s.id === speaker_id);

  const handle_registation = async () => {

    console.log(selectedConference)

    try{
      const res = await fetch('/api/register', {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: selectedConference?.id,
          current_attendees: selectedConference?.current_attendees,
          isRegisterd: !selectedConference?.registerd

        }),
      })
      
      const response = await res.json();
      console.log(response)
      setSelectedConference(response)

    }catch (err){
      console.log(err)
    }

  }

  

  return (
   <div className="conference_details">

      {/* Conference Photo */}
      <div className="event_details_img_con">
        <img src={`/${selectedConference?.imageurl}`} alt={selectedConference?.name} className="event_detail_img" />
      </div>

      {/* Register Button */}
      {selectedConference?.registerd === true && <div className="conference_unregistered" onClick={()=>{handle_registation()}}>Un-Register</div>}
      {selectedConference?.registerd === false && <div className="conference_registered" onClick={()=>{handle_registation()}}>Register</div>}
      
   
      
      <EventSummary/>

      <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 p-4 bg-gray-100">
        <Conference_Description/> 
       </div>
      

      {speaker && <Conference_Speaker speaker={speaker} />}

     
        </div>

      
  
  );
};

export default Conference_Details;