"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  avatar_url?: string;
}

export interface Conference {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  price: number;
  category: string;
  imageurl?: string;
  speaker: string;
  max_attendees: number;
  current_attendees: number;
  isFeatured: boolean;
  registerd: boolean;
}
interface ConferenceContextType {
  conferences: Conference[];
  setConferences: React.Dispatch<React.SetStateAction<Conference[]>>;
  filteredConferences: Conference[];
  setFilteredConferences: React.Dispatch<React.SetStateAction<Conference[]>>;
  selectedConference: Conference | null;
  setSelectedConference: React.Dispatch<React.SetStateAction<Conference | null>>;
  speakers: Speaker[];
  setSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
}

const ConferenceContext = createContext<ConferenceContextType | undefined>(undefined);

let fetchedOnce = false;
let cachedConferences: Conference[] = [];
let cachedSpeakers: Speaker[] = [];

export const ConferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conferences, setConferences] = useState<Conference[]>(cachedConferences);
  const [filteredConferences, setFilteredConferences] = useState<Conference[]>(cachedConferences);
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>(cachedSpeakers);

  useEffect(() => {
    if (!fetchedOnce) {
      async function fetchData() {
        try {
          const res = await fetch("/api");
          const data = await res.json();

          setConferences(data.conferences);
          setFilteredConferences(data.conferences); // initial filter = all
          setSpeakers(data.speakers);

          cachedConferences = data.conferences;
          cachedSpeakers = data.speakers;
          fetchedOnce = true;
        } catch (err) {
          console.error("Failed to fetch data:", err);
        }
      }
      fetchData();
    }
  }, []);

  return (
    <ConferenceContext.Provider
      value={{
        conferences,
        setConferences,
        filteredConferences,
        setFilteredConferences,
        selectedConference,
        setSelectedConference,
        speakers,
        setSpeakers,
      }}
    >
      {children}
    </ConferenceContext.Provider>
  );
};

export const useConferences = () => {
  const context = useContext(ConferenceContext);
  if (!context) throw new Error("useConferences must be used within a ConferenceProvider");
  return context;
};