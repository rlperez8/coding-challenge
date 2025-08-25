"use client";
import React, { createContext, useState, useContext } from 'react';

// Define Data Types
export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  avatarUrl?: string;
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
  speakers: Speaker[];
  max_attendees: number;
  current_attendees: number;
  isFeatured: boolean;
}

interface ConferenceContextType {
  conferences: Conference[];
  setConferences: React.Dispatch<React.SetStateAction<Conference[]>>;
  selectedConference: Conference | null;
  setSelectedConference: (conf: Conference) => void;
}

// Create Context
const ConferenceContext = createContext<ConferenceContextType | undefined>(undefined);

// Create Provider
export const ConferenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);

  return (
    <ConferenceContext.Provider value={{ 
      conferences, 
      setConferences, 
      selectedConference, 
      setSelectedConference 
    }}>
      {children}
    </ConferenceContext.Provider>
  );
};

// Custom Hook
export const useConferences = () => {
  const context = useContext(ConferenceContext);
  if (!context) throw new Error("useConferences must be used within a ConferenceProvider");
  return context;
};
