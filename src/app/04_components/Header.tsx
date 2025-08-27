'use client'

import React from "react"

import { useConferences } from "@/context/Conference"
import { usePathname } from "next/navigation";
import Link from "next/link";
const Header: React.FC = () => {

    const {conferences} = useConferences()
    const pathname = usePathname();
    const isConferenceDetail = /^\/01_conference\/[^/]+$/.test(pathname);
  
    if(!conferences) return null
    return(
        <div className='header'>
            

            {pathname === '/' && 'Conferences' && <div className="page_header">Conference</div>}
        
            {pathname === '/02_admin' && 'Admin' && 
            <div className="admin_header">
                <div className="page_header"> Admin</div>
            </div>
            }

            {pathname === '/03_user' && 'User' && <div className="page_header">User Upcoming Confernces</div>}

            {isConferenceDetail && <div className="page_header">Conference Details</div>}

    
      

  
        </div>

    )
}

export default Header