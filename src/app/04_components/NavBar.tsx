"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useConferences } from "@/context/Conference";
import { useState } from "react";
import { useNavHeader } from "./NavBarProvider";

const NavBar: React.FC = () => {
  const pathname = usePathname();

   const { selectedFilter, setSelectedFilter, buttonClicked, setButtonClicked } = useNavHeader();
   const { conferences, setFilteredConferences} = useConferences(); 
   const [selected_filter, set_selected_fitler] = useState('All')

  const getSelected = () => {
    if (pathname === "/") return "Home";
    if (pathname === "/02_admin") return "Admin";
    if (pathname === "/03_user") return "User";
    return "";
  };
    const handle_sold = () => {
      const filtered = conferences
      .filter((c) => c.current_attendees === c.max_attendees)
      .sort((a,b) => a.name.localeCompare(b.name))
      setFilteredConferences(filtered)
      console.log(filtered)
      setSelectedFilter('Sold')
    }

    const handle_closed = () => {
      const filtered = conferences
        .filter(c => new Date(c.date) < new Date())
        .sort((a, b) => a.name.localeCompare(b.name));

      setFilteredConferences(filtered);
      console.log(filtered);
      setSelectedFilter('Closed')
    };

    const handle_open = () => {
      const filtered = conferences
      .filter((c) => new Date(c.date) >= new Date() && c.current_attendees < c.max_attendees)
      .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredConferences(filtered);
      console.log(filtered);
      setSelectedFilter('Open')
    };
    const handle_all = () => {
      
      const filtered = conferences
      .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredConferences(filtered);
      console.log(conferences);
      setSelectedFilter('All')
    };
    
    
    
  console.log(pathname)

  const selected = getSelected();

  return (
    <nav className="navigation_bar">

        <Link className={selected === "Home" ? "filter_opt_active" : "filter_opt"} href="/">
          <img className='icon_img' src="/images/icons/event_list.png" alt="Home Icon" />
        </Link>
  
        <Link className={selected === "Admin" ? "filter_opt_active" : "filter_opt"} href="/02_admin">
          <img className='icon_img' src="/images/icons/admin.png" alt="Admin Icon" />
        </Link>

        <Link className={selected === "User" ? "filter_opt_active" : "filter_opt"} href="/03_user">
          <img className='icon_img' src="/images/icons/user.png" alt="User Icon" />
        </Link>


        <div className="filter_options">
          <div className={selected_filter === 'All' ? "filter_opt_active" : 'filter_opt'} onClick={() => {handle_all();set_selected_fitler('All')}}>All</div>
          <div className={selected_filter === 'Closed' ? "filter_opt_active" : 'filter_opt'} onClick={() => {handle_closed();set_selected_fitler('Closed')}}>Closed</div>
  
          <div className={selected_filter === 'Open' ? "filter_opt_active" : 'filter_opt'} onClick={() => {handle_open();set_selected_fitler('Open')}}>Open</div>
          <div className={selected_filter === 'Sold Out' ? "filter_opt_active" : 'filter_opt'} onClick={() => {handle_sold();set_selected_fitler('Sold Out')}}>Sold Out</div>
        </div>

    
  
  
  
    </nav>
  );
};

export default NavBar;
