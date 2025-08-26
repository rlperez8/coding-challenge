"use client";
import Conference_List from "../04_components/Conference_List";
export default function User_Page() {

  
  return (
    <div className="all_conferences">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"> 
        <Conference_List/>
      </div>
    </div>
  );
}