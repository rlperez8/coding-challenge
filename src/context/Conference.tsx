"use client";
import React, {createContext, useState, useContext} from 'react';

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
  category: string[];
  imageUrl?: string;
  speakers: Speaker[];
  maxAttendees: number;
  currentAttendees: number;
  isFeatured: boolean;

}
interface ConferenceContextType {
    conferences: Conference[];
    setConferences: React.Dispatch<React.SetStateAction<Conference[]>>;
}

// Create Context
const ConferenceContext = createContext<ConferenceContextType | undefined>(undefined);

// Create Provider
export const ConferenceProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [conferences, setConferences] = useState<Conference[]>([]);

    return (
        <ConferenceContext.Provider value={{ conferences, setConferences }}>
            {children}
        </ConferenceContext.Provider>
  );
}

// Custom Hook
export const useConferences = () => {
  const context = useContext(ConferenceContext);
  if (!context) throw new Error("useConferences must be used within a ConferenceProvider");
  return context;
};