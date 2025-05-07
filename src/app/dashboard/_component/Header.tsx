import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
   <header className='p-5 shadow-sm border-b-2 flex justify-between items-center'>
    {/* searchbar */}
    <div className=' flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white'>
    <Search/>
    <input type="text" placeholder='Search...'
    className=' outline-none  ' />
    </div>
    <div className=' flex gap-3 items-center'>
        <UserButton/>
    </div>


   </header>
  )
}

export default Header
