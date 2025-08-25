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
import Create_Edit from './components/create_edit';
import Conferences from './components/conferences';
import Create_Button from './components/create_button';
const AdminPage: React.FC = () => {

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
      <div className="main">
        <div className="main_inner">

          <NavBar />

          <div className="main2">

            <Header/>
            <div className="main3">

              <Create_Edit/>
              <Conferences/>
              <Create_Button/>
              
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default AdminPage;