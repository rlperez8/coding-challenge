"use client";

import { useConferences } from "@/context/Conference";
import NavBar from "../../components/NavBar";
import Link from "next/link";
import Head from "next/head";
const EventPage: React.FC = () => {
  const { selectedConference } = useConferences();

  if (!selectedConference) {
    return (
      <div className="main">
        <div className="main_inner">
          <NavBar />
          <div className="main2">
            <p>No conference selected.</p>
            <Link href="/">Go back to event list</Link>
          </div>
        </div>
      </div>
    );
  }

  const event_name_css = `
    text-[15px]      /* default for mobile */
    sm:text-[15px]   /* ≥640px */
    md:text-[20px]   /* ≥768px */
    lg:text-[20px]   /* ≥1024px */
    xl:text-[20px]   /* ≥1280px */
    2xl:text-[20px]  /* ≥1536px */

    font-normal



    pl-2
    sm:pl-3
    md:pl-4
    lg:pl-6
 
    `;

  const event_header = `
    text-[20px]      /* default for mobile */
    sm:text-[25px]   /* ≥640px */
    md:text-[30px]   /* ≥768px */
    lg:text-[40px]   /* ≥1024px */
    xl:text-[50px]   /* ≥1280px */
    2xl:text-[60px]  /* ≥1536px */

    font-normal
    sm:font-semibold
    xl:font-bold

    pl-2
    sm:pl-3
    md:pl-4
    lg:pl-6
  `;

  return (
    <>
    
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

   
    <div className="main">
      
      <div className="main_inner">
        <NavBar />
        <div className="main_event_details">

        

            <div className="event_details_img_con">
              <img src={selectedConference.imageUrl} alt={selectedConference.name} className="event_detail_img" />
            </div>
            <div className="event_details_minor">
              
            {/* Name */}
            <div className={event_header.trim()}>
              {selectedConference.category}
            </div>

            {/* Date */}
            <div className="event_details_date_con">
              <div className="event_deails_date_icon">
                <img className="" src="/images/icons/calender.png" alt="My Icon" />
              </div>
            
            <div className={event_name_css}>{new Date(selectedConference.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}</div>
              
            </div>

            {/* Location */}
            <div className="event_details_date_con">
              <div className="event_deails_date_icon">
                <img className="" src="/images/icons/location.png" alt="My Icon" />
              </div>
            
              <div className={event_name_css}>{selectedConference.location}</div>
              
            </div>

            {/* Price */}
            <div className="event_details_date_con">
              <div className="event_deails_date_icon">
                <img className="" src="/images/icons/dollar.png" alt="My Icon" />
              </div>
            
                <div className={event_name_css}>{selectedConference.price}</div>
                      
            </div>

            {/* Attendees */}
            <div className="event_details_date_con">
    
          <div className="event_deails_date_icon">
            <img className="" src="/images/icons/people.png" alt="My Icon" />
          </div>
          <div className={event_name_css}>{selectedConference.currentAttendees} of {selectedConference.maxAttendees} </div>
         
              </div>
        
           </div>

          {/* Details */}
          <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 p-4 bg-gray-100">
            
            {/* Event Description */}
            <div className="flex-1 bg-white p-4 rounded shadow">
              <div className="text-lg font-semibold mb-2">Event Details</div>
              <div className="text-gray-700">{selectedConference.description}</div>
            </div>

            {/* Speaker Info */}
            <div className="flex-1 bg-white p-4 rounded shadow">
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
            
          </div>




         
        </div>
      </div>
    </div>
     </>
  );
};

export default EventPage;