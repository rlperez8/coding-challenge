"use client";
import { useEffect } from "react";
import { useConferences } from "@/context/Conference";
import { mockConferences } from "@/data/mockConference";
import Link from "next/link";
import NavBar from "./components/NavBar";
import Header from "./components/Header"
import ConferenceList from "./components/ConferenceList";

export default function HomePage() {

 const { conferences, setConferences, setSelectedConference } = useConferences();

  // Event Generator  
  // useEffect(() => {setConferences(mockConferences);}, [setConferences]);

  // Fetch Conferences On Load
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
          <ConferenceList/>
  
        </div>
      </div>
    </div>
  );
}