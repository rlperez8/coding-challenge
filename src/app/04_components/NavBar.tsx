"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useConferences } from "@/context/Conference";
import { use, useEffect, useState } from "react";
import { useNavHeader } from "./NavBarProvider";

const NavBar: React.FC = () => {
    
    const { selectedFilter, setSelectedFilter, buttonClicked, setButtonClicked } = useNavHeader();
    const { conferences, setFilteredConferences} = useConferences(); 

    const pathname = usePathname();
    const getSelected = () => {
      if (pathname === "/") return "Home";
      if (pathname === "/02_admin") return "Admin";
      if (pathname === "/03_user") return "User";
      return "";
    };
    const selected = getSelected();

  return (
    <nav className="navigation_bar">

        <Link className={selected === "Home" ? "filter_opt_active" : "filter_opt"} href="/" 
           onClick={()=>{
            setFilteredConferences(conferences)
          }}
        >
        
          <img className='icon_img' src="/images/icons/event_list.png" alt="Home Icon" />
        </Link>
  
        <Link className={selected === "Admin" ? "filter_opt_active" : "filter_opt"} href="/02_admin"
          onClick={()=>{
            setFilteredConferences(conferences)
          }}
        >
          <img className='icon_img' src="/images/icons/admin.png" alt="Admin Icon" />
        </Link>

        <Link className={selected === "User" ? "filter_opt_active" : "filter_opt"} href="/03_user" 
        onClick={()=>{
          console.log(conferences.filter(c=> c.registerd===true))
            setFilteredConferences(conferences.filter(c=> c.registerd===true))
          }}>
          <img className='icon_img' src="/images/icons/user.png" alt="User Icon" />
        </Link>


        <div className="filter_options">
          <div className={selectedFilter === 'All' ? "filter_opt_active" : 'filter_opt'} onClick={() => {setSelectedFilter('All')}}>All</div>
          <div className={selectedFilter === 'Closed' ? "filter_opt_active" : 'filter_opt'} onClick={() => {setSelectedFilter('Closed')}}>Closed</div>
  
          <div className={selectedFilter === 'Open' ? "filter_opt_active" : 'filter_opt'} onClick={() => {setSelectedFilter('Open')}}>Open</div>
          <div className={selectedFilter === 'Sold' ? "filter_opt_active" : 'filter_opt'} onClick={() => {setSelectedFilter('Sold')}}>Sold Out</div>
        </div>

    
  
  
  
    </nav>
  );
};

export default NavBar;
