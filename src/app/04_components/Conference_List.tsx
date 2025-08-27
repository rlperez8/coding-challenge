"use client";

import { useConferences } from "@/context/Conference";
import Link from "next/link";
import Conference_Tag from "./Conference_Tag";
import { Conference } from "@/context/Conference";

import { usePathname } from "next/navigation";


export default function Conference_List() {

    const {conferences, setConferences, setSelectedConference, filteredConferences, setFilteredConferences} = useConferences();
    const pathname = usePathname();


    const handle_delete_event = async (conf_id: string) => {
  try {
    console.log("Deleting conference with ID:", conf_id);

    // Send DELETE request to API
    const res = await fetch("/api", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: conf_id }),
    });

    const response = await res.json();
    console.log("Response data:", response.data);

    if (res.ok && Array.isArray(response.data)) {
      // Sort the updated conferences by name (alphabetically)
      const sortedConferences = [...response.data].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      // Update state with sorted data
      setFilteredConferences(sortedConferences);
      console.log("Conferences updated and sorted successfully!");
    } else {
      alert(`Error deleting conference: ${response.error || "Unknown error"}`);
    }
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete conference");
  }
    };






     
    return (
  

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 m-4 gap-4">

            {/* Create Button */}
            {/* {pathname === "/02_admin" && (
          <Link className={'create_button_con'} href="/02_admin/conference_create">
              <div>Create</div>
            </Link> )} */}

            {/* Data */}
            {filteredConferences.map((conf: Conference, index: number) => (
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


        </div>
     
    );
  }