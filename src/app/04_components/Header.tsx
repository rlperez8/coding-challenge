'use client'

import React from "react"

import { useConferences } from "@/context/Conference"

const Header: React.FC = () => {
    const {conferences} = useConferences()
    if(!conferences) return null
    return(
        <div className='header'>
            <div className="">Event List</div>
            <div className="">{conferences.length} items</div>
        </div>

    )
}

export default Header