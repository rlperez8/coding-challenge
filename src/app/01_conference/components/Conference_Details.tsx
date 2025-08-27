"use client";
import React from "react";
import { useConferences } from "@/context/Conference";


const EventSummary: React.FC = () => {
  const { selectedConference } = useConferences();

  if (!selectedConference) return null; // handle no selection
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
    <div className="event_details_minor">
      <div className={event_header.trim()}>{selectedConference.category}</div>
      <div className="event_details_date_con">
        <div className="event_deails_date_icon">
          <img src="/images/icons/calender.png" alt="My Icon" />
        </div>
        <div className={event_name_css}>
          {new Date(selectedConference.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
      <div className="event_details_date_con">
        <div className="event_deails_date_icon">
          <img src="/images/icons/location.png" alt="My Icon" />
        </div>
        <div className={event_name_css}>{selectedConference.location}</div>
      </div>
      <div className="event_details_date_con">
        <div className="event_deails_date_icon">
          <img src="/images/icons/dollar.png" alt="My Icon" />
        </div>
        <div className={event_name_css}>{selectedConference.price}</div>
      </div>
      <div className="event_details_date_con">
        <div className="event_deails_date_icon">
          <img src="/images/icons/people.png" alt="My Icon" />
        </div>
        <div className={event_name_css}>
          {selectedConference.current_attendees} of {selectedConference.max_attendees}
        </div>
      </div>
    </div>
  );
};

export default EventSummary;
