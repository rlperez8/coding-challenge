"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import { usePathname } from "next/navigation";

interface NavHeaderContextType {
  buttonClicked: "Conference" | "Speaker";
  setButtonClicked: (value: "Conference" | "Speaker") => void;
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
}

const NavHeaderContext = createContext<NavHeaderContextType | undefined>(undefined);

interface NavHeaderProviderProps {
  children: ReactNode;
}

export const NavHeaderProvider: React.FC<NavHeaderProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const [buttonClicked, setButtonClicked] = useState<"Conference" | "Speaker">("Conference");
  
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  return (
    <NavHeaderContext.Provider
      value={{
        buttonClicked,
        setButtonClicked,
        selectedFilter,    
        setSelectedFilter,
      }}
    >
      <div className="pagelayout_outer">
        <div className="pagelayout_inner">
          <NavBar />
          <div className="displayed_page">
            <Header />
            <div className="conference_speaker_options_static">
              <div className={pathname === "/02_admin" ? 'conference_speaker_options_active' : 'conference_speaker_options'}>
                <div
                  className={buttonClicked === "Conference" ? "admin_create_con_selected" : "admin_create_con"}
                  onClick={() => setButtonClicked("Conference")}
                >
                  Conferences
                </div>
                <div
                  className={buttonClicked === "Speaker" ? "admin_create_con_selected" : "admin_create_con"}
                  onClick={() => setButtonClicked("Speaker")}
                >
                  Speaker
                </div>
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </NavHeaderContext.Provider>
  );
};

export const useNavHeader = () => {
  const context = useContext(NavHeaderContext);
  if (!context) throw new Error("useNavHeader must be used within NavHeaderProvider");
  return context;
};
