"use client";
import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

const Create_Edit = () => {
  const pathname = usePathname();
  
    const getSelected = () => {
      if (pathname === "/") return "Home";
      if (pathname === "/admin") return "Conference";
      if (pathname === "/admin/create") return "Conference";
      if (pathname === "/user") return "User";
      return "";
    };
  
    const selected = getSelected();
  
  return (
    <div className='create_edit_container'>
      <Link className={selected === 'Conference' ? 'admin_create_con_selected' : 'admin_create_con'} href="/admin">
        Conferences
      </Link>
      <Link href="/admin" className='admin_create_con'>
        Speaker
      </Link>
    </div>
  );
};

export default Create_Edit;
