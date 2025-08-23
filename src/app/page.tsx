"use client";
import { useEffect } from "react";
import { useConferences } from "@/context/Conference";
import { mockConferences } from "@/data/mockConference";
import Link from "next/link";
import NavBar from "./components/NavBar";

export default function HomePage() {

 const { conferences, setConferences, setSelectedConference } = useConferences();

  useEffect(() => {
    setConferences(mockConferences);
  }, [setConferences]);

  return (
    <div className="main">

      <div className="main_inner">
      <NavBar/>
    
      <div className="main2">

        <div className='event_list_header grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b'>
          <div className="block1">
            <div className="event_list">Event List</div>
            <div className="items_listed">{conferences.length} items</div>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 pt-4"> 
          {conferences.map((conf) => (
             <Link href={`/events/${conf.id}`} onClick={() => setSelectedConference(conf)}>
            <div key={conf.id} className="conference_tag">
                <div className="conference_tag_image">
                  <img 
                  src={conf.imageUrl} 
                  alt={conf.name} 
                  className="conference_image" 
                />
                </div>
                <div className="conference_tag_status">
                  <div className={new Date(conf.date) < new Date() || conf.currentAttendees === conf.maxAttendees ? 'status_closed' : 'status_open'}>
                    {
                      new Date(conf.date) < new Date() ? 'Closed' : conf.currentAttendees === conf.maxAttendees ? 'Sold Out' : 'Open'
                    }
                  </div>
                </div>
                <div className="conference_tag_name">{conf.category}</div>
                <div className="conference_tag_date">
                  {new Date(conf.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })} &middot; {conf.maxAttendees - conf.currentAttendees} of {conf.maxAttendees} remaining.
                </div>
                <div className="conference_tag_location">{conf.location}</div>
            </div>
              </Link>
            
          ))}

        </div>
      </div>
      
   </div>
      
    </div>
  );
}