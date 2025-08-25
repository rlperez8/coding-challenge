"use client";
import React from 'react';
import Link from "next/link";
import { useConferences } from "@/context/Conference";

const Conferences = () => {
    const {conferences, setConferences} = useConferences()

    const handle_delete_event = async (conf_id: string) => {
    try {
      console.log('Deleting conference with ID:', conf_id);

      const res = await fetch("/api", {  
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: conf_id }),
      });

      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        // alert("Conference deleted!");
        // Remove deleted conference from state
        setConferences(prev => prev.filter(c => c.id !== conf_id));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete conference");
    }
  };
    return (
        <div className="edit_conferences_container"> 
            {conferences.map((conf, index) => (
                <div className='admin_single_event_container'>
                
                <div className='tag'>
                    <Link key={index}  href={`/events/${conf.id}`}>
                    <div className="admin_conference_tag">
                        <div className="conference_tag_image">
                        <img 
                        src={conf.imageurl} 
                        alt={conf.name} 
                        className="conference_image" 
                        />
                        </div>
                        <div className="conference_tag_status">
                        <div className={new Date(conf.date) < new Date() || conf.current_attendees === conf.max_attendees ? 'status_closed' : 'status_open'}>
                            {
                            new Date(conf.date) < new Date() ? 'Closed' : conf.current_attendees === conf.max_attendees ? 'Sold Out' : 'Open'
                            }
                        </div>
                        </div>
                        <div className="conference_tag_name">{conf.category}</div>
                        <div className="conference_tag_date">
                        {new Date(conf.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })} &middot; {conf.max_attendees - conf.current_attendees} of {conf.max_attendees} remaining.
                        </div>
                        <div className="conference_tag_location">{conf.location}</div>
                    </div>
                </Link>
                </div>
                
                

                <div className='edit_options'>
                    <div onClick={()=>{handle_delete_event(conf.id)}} className='delete_button_con'>Delete</div>
                    <div className='delete_button_con'>Edit</div>
                </div>

                
                </div>
            ))}
        </div>
    );
};

export default Conferences;
