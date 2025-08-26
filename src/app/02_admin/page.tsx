"use client";
import { useConferences } from "@/context/Conference";
import Conference_List from "../04_components/Conference_List";
import Speakers_List from "./components/Speakers_List";
import { useAdmin } from "./context";
const AdminPage: React.FC = () => {

  const {setConferences} = useConferences()
   const { buttonClicked } = useAdmin();

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


  return (
    <> 

      {buttonClicked === 'Conference' && 

  
        <Conference_List/>
 
        
     }
      {buttonClicked === 'Speaker' && <Speakers_List/>}
    </>

     

   
  );
}

export default AdminPage;