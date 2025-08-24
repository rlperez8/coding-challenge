'use client'

import React from "react"

import { useConferences } from "@/context/Conference"

const Header: React.FC = () => {
    const {conferences} = useConferences()
    if(!conferences) return null
    return(
      <div className='event_list_header grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-b'>
          <div className="block1">
            <div className="event_list">Event List</div>
            <div className="items_listed">{conferences.length} items</div>
          </div>
        </div>

    )
}

export default Header