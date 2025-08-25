"use client";

import { useConferences } from "@/context/Conference";
import NavBar from "../../components/NavBar";
import EventSummary from "../../components/EventSummary";
import RegistrationForm from "../../components/RegistrationForm";
import EventDetials from "@/app/components/EventDetails";
import SpeakerBio from "@/app/components/SpeakerBio";
import Header from "@/app/components/Header"
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

            <div className="event_details_img_con">
              <img src={selectedConference.imageUrl} alt={selectedConference.name} className="event_detail_img" />
            </div>
          
            <EventSummary/>
          
            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 p-4 bg-gray-100">
              <div className="event_description_and_speaker bg-white">
                <SpeakerBio/>
                <EventDetials/>
              </div>
              <RegistrationForm/>
            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default EventPage;