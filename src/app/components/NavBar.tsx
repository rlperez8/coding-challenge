"use client";
import React from "react";
import Link from "next/link";
const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="icon_con">
        <Link className="icon_img" href="/">
          <img className="" src="/images/icons/event_list.png" alt="My Icon" />
        </Link>
      </div>
      <div className="icon_con">
   
      </div>
      <div className="icon_con"></div>
      <div className="icon_con"></div>
      <div className="icon_con"></div>
    
    </nav>
  );
};

export default NavBar;