"use client";
import { useEffect, useState } from "react";
import { useConferences } from "@/context/Conference";
import Link from "next/link";
import Conference_Tag from "./Conference_Tag";
import { Conference } from "@/context/Conference";

import { usePathname } from "next/navigation";
export default function Conference_List() {

    const {conferences, setConferences, setSpeakers, setSelectedConference, selectedConference} = useConferences();
    const pathname = usePathname();
    const handle_delete_event = async (conf_id: string) => {
    try {
      console.log('Deleting conference with ID:', conf_id);

      const res = await fetch("/api", {  
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: conf_id }),
      });

      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        // alert("Conference deleted!");
        // Remove deleted conference from state
        setConferences(prev => prev.filter(c => c.id !== conf_id));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete conference");
    }
    };

    const [filteredConferences, setFilteredConferences] = useState<Conference[]>([]);

    useEffect(() => {
      if (pathname === "/03_user") {
        setFilteredConferences(conferences.filter(c => c.registerd === true));
      } else {
        setFilteredConferences(conferences);
      }
    }, [pathname, conferences]); // rerun if route or data changes

    return (
  
        <>
          {filteredConferences.map((conf: Conference, index: number) => (
            <>
            <Link key={index}  href={`/01_conference/${conf.id}`} onClick={() => setSelectedConference(conf)}>
              <Conference_Tag
                key={conf.id}
                conf={{
                  ...conf,
                  imageurl: conf.imageurl || "/default.png",
                  name: conf.name || "Unknown",
                }}
                onClick={() => setSelectedConference(conf)}
              />
            
            </Link>
          
          {pathname === "/02_admin" ? (
          <div className='edit_options'>
            <div onClick={()=>{handle_delete_event(conf.id)}} className='delete_button_con'>Delete</div>
             <Link className='delete_button_con' key={index}  href={`/02_admin/conference_edit/${conf.id}`}>
                 Edit
            </Link>
        </div>
        ) : (
  ''
        )}
          </>
            
          ))}

        
        
  </>
    );
  }