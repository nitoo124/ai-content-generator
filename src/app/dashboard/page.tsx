"use client"
import React, { useState } from 'react'
import SearchSection from './_component/SearchSection'
import TemplatesSection from './_component/TemplatesSection'

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>()
  return (
    <div>
       {/* Search section */}

       <SearchSection onSearchInput={(val:string)=>{setUserSearchInput(val)}}   />

       {/* Template section */}

       <TemplatesSection searchInput={userSearchInput}/>
     
      
    </div>
  )
}

export default Dashboard
