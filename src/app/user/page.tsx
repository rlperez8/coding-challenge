import react from 'react'

import NavBar from "../components/NavBar";
import EventSummary from "../components/EventSummary";
import RegistrationForm from "../components/RegistrationForm";
import EventDetials from "@/app/components/EventDetails";
import SpeakerBio from "@/app/components/SpeakerBio";
import Header from "@/app/components/Header"
import Link from "next/link";
import Head from "next/head";

const User: React.FC = () => {


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


          </div>

        </div>

      </div>
    </>
  );
}

export default User;