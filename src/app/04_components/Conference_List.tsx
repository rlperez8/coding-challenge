"use client";

import { useConferences } from "@/context/Conference";
import Link from "next/link";
import Conference_Tag from "./Conference_Tag";
import { Conference } from "@/context/Conference";

import { usePathname } from "next/navigation";
export default function Conference_List() {

    const {setConferences, setSelectedConference, filteredConferences} = useConferences();
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
 
        setConferences(prev => prev.filter(c => c.id !== conf_id));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete conference");
    }
    };


    // useEffect(() => {
    //   if (pathname === "/03_user") {
    //     const filtered = conferences
    //     .filter(c => c.registerd === Boolean(c.registerd))
    //     .slice(0, 500); 
    //     setFilteredConferences(filtered);
    //     console.log(filtered);
    //   } else {
    //     setFilteredConferences(conferences.slice(0, 500)); // limit if needed
    //   }
    // }, [pathname, conferences]);

    // console.log(pathname);

     
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