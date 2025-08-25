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
        <Link className="icon_img" href="/admin">
          <img className="" src="/images/icons/admin.png" alt="My Icon" />
        </Link>
      </div>
      <div className="icon_con">
        <Link className="icon_img" href="/user">
          <img className="" src="/images/icons/user.png" alt="My Icon" />
        </Link>
      </div>
      
    
    </nav>
  );
};

export default NavBar;