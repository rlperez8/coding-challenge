"use client";


import react from 'react'

import NavBar from "../components/NavBar";
import EventSummary from "../components/EventSummary";
import RegistrationForm from "../components/RegistrationForm";
import EventDetials from "@/app/components/EventDetails";
import SpeakerBio from "@/app/components/SpeakerBio";
import Header from "@/app/components/Header"
import Link from "next/link";
import Head from "next/head";
import { useConferences } from "@/context/Conference";



const AdminPage: React.FC = () => {

  const {conferences, setConferences} = useConferences()

  const handle_delete_event = async (conf_id: string) => {
    try {
      console.log('Deleting conference with ID:', conf_id);

      const res = await fetch("/api", {  // make sure route matches your API
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
  <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="main">
        
        <div className="main_inner">

          <NavBar />

          <div className="main_event_details">

            <Header/>

            <div className="admin_container">
              
           

              <div className='admin_container_inner'>
                  <h1 className="text-2xl font-bold mb-4">Delete Conference</h1>

                  <div className="admin_events"> 
                    {conferences.map((conf, index) => (
                      <div className='admin_single_event_container'>
                        
                        <div className='tag'>
                          <Link key={index}  href={`/events/${conf.id}`}>
                          <div className="admin_conference_tag">
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
                        </div>
                        
                        

                        <div className='edit_options'>
                          <div onClick={()=>{handle_delete_event(conf.id)}} className='delete_button_con'>Delete</div>
                          <div className='delete_button_con'>Edit</div>
                        </div>

                      
                      </div>
                    ))}
                  </div>
              </div>

            </div>


          </div>

        </div>

      </div>
    </>
  );
}

export default AdminPage;