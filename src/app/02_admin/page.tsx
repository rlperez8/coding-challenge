"use client";
import Conference_List from "../04_components/Conference_List";

import Speakers_List from "./components/Speakers_List";
import { useNavHeader } from "../04_components/NavBarProvider";
const AdminPage: React.FC = () => {

   const { buttonClicked } = useNavHeader();

   console.log('buttonClicked',buttonClicked)

  return (
    
    <div className="layout_special">
    <div className={buttonClicked === 'Conference' ? "" : ''}>
      
      {buttonClicked === 'Conference' && <Conference_List/>}
      {buttonClicked === 'Speaker' && <Speakers_List/>}
    </div>

  </div>
  );
}

export default AdminPage;