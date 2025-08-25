"use client";
import { useEffect } from "react";
import { useConferences } from "@/context/Conference";
import { mockConferences } from "@/data/mockConference";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Header from "./components/Header"

export default function HomePage() {

 const { conferences, setConferences, setSelectedConference } = useConferences();

  // useEffect(() => {setConferences(mockConferences);}, [setConferences]);

   useEffect(() => {
    async function fetchConferences() {
      try {
        const res = await fetch("/api"); 
        const data = await res.json();
        console.log(data)
        setConferences(data.conferences); 
      } catch (err) {
        console.error("Failed to fetch conferences:", err);
      }
    }

    fetchConferences();
  }, []);

  return (
    <div className="main">

      <div className="main_inner">
      <NavBar/>
    
      <div className="main2">

        <Header/>
   

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 pt-4"> 
          {conferences.map((conf, index) => (
             <Link key={index}  href={`/events/${conf.id}`} onClick={() => setSelectedConference(conf)}>
            <div className="conference_tag">
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