"use client";

import { useConferences } from "@/context/Conference";
import Link from "next/link";
import Conference_Tag from "./Conference_Tag";
import { Conference } from "@/context/Conference";

import { usePathname } from "next/navigation";
import { useNavHeader } from "./NavBarProvider";
import { useEffect, useState } from "react";
import path from "path";

export default function Conference_List() {

    const {conferences, setConferences, setSelectedConference, filteredConferences, setFilteredConferences} = useConferences();
    const pathname = usePathname();
    const { selectedFilter, setSelectedFilter, buttonClicked, setButtonClicked } = useNavHeader();

    const handle_delete_event = async (conf_id: string) => {
      try {
        console.log("Deleting conference with ID:", conf_id);

        const res = await fetch("/api", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: conf_id }),
        });

        const response = await res.json();

        if (selectedFilter === 'Sold') {
          const filtered = response.data
            .filter((c: Conference) => c.current_attendees === c.max_attendees)
            .sort((a: Conference, b: Conference) => a.name.localeCompare(b.name));
            setFilteredConferences(filtered);
        }
        if (selectedFilter === 'Open') {
          const filtered = response.data
            .filter(
              (c: Conference) =>
                new Date(c.date) >= new Date() && c.current_attendees < c.max_attendees
            )
            .sort((a: Conference, b: Conference) => a.name.localeCompare(b.name));

          setFilteredConferences(filtered);
        }
        if (selectedFilter === 'Closed') {
          const filtered = response.data
            .filter((c: Conference) => new Date(c.date) < new Date())
            .sort((a: Conference, b: Conference) => a.name.localeCompare(b.name));

          setFilteredConferences(filtered);
        }
        if (selectedFilter === 'All') {
          const filtered = response.data
            .sort((a: Conference, b: Conference) => a.name.localeCompare(b.name));

            setFilteredConferences(filtered);
        }
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete conference");
      }
    };
    
    const [currentData, setCurrentData] = useState<Conference[]>(conferences);

    useEffect(() => {
      let filtered = [...filteredConferences];

      if (selectedFilter === "Sold") {
        filtered = filtered
          .filter((c: Conference) => c.current_attendees === c.max_attendees)
          .sort((a, b) => a.name.localeCompare(b.name));
      }
      if (selectedFilter === "Open") {
        filtered = filtered
          .filter(
            (c: Conference) =>
              new Date(c.date) >= new Date() &&
              c.current_attendees < c.max_attendees
          )
          .sort((a, b) => a.name.localeCompare(b.name));
      }
      if (selectedFilter === "Closed") {
        filtered = filtered
          .filter((c: Conference) => new Date(c.date) < new Date())
          .sort((a, b) => a.name.localeCompare(b.name));
      }
      if (selectedFilter === "All") {
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
      }

      setCurrentData(filtered);
    }, [selectedFilter, conferences]);

    return (
  
        <>

        {
          currentData.length !== 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 m-4 gap-4">

            {/* Create Button */}
            {pathname === "/02_admin" && (
            <Link className={'conf_create'} href="/02_admin/conference_create">
              <div className="create_con_button">Create</div>
            </Link> )}

            {/* Data */}
            {currentData?.map((conf: Conference, index: number) => (
              <div className={'con_'} key={index}>

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
                  
                  {/* Delete Edit Options */}
                  {pathname === "/02_admin" && (
                  <div className='edit_options'>

                      <div onClick={()=>{handle_delete_event(conf.id)}} className='delete_button_con'>Delete</div>

                      <Link className='delete_button_con' key={index}  href={`/02_admin/conference_edit/${conf.id}`}>
                          Edit
                      </Link>
                      
                    </div>)}

              </div>
              
            ))}


        </div>) : <div className="no_conference_found">
          No Conferences.
        </div>
        }
        
     </>
    );
  }