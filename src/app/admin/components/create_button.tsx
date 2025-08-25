"use client";
import React from 'react';
import Link from "next/link";

const Create_Button = () => {
  return (
 
       <Link  className='create_button_con' href="/admin/create">
        Create
        </Link>

  );
};

export default Create_Button;
