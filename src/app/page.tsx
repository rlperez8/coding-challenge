"use client";
import { useEffect, useState } from "react";
import { useConferences } from "@/context/Conference";

export default function Home() {

  const { conferences, setConferences } = useConferences();

  return (
    <div className="">
    
    </div>
  );
}
