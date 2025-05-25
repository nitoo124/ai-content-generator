'use client'
import { UserButton } from '@clerk/nextjs'
import { Search, Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface HeaderProps {
  onMenuClick: () => void
}

function Header({ onMenuClick }: HeaderProps) {
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className='p-5 shadow-sm border-b-2 flex justify-center sm:justify-between items-center'>
      {/* Left section */}
      <div className='flex items-center gap-3'>
        {isMobileView && (
          <button
            onClick={onMenuClick}
            className='p-2 rounded-md bg-[#7B19D8] text-white md:hidden'
          >
            <Menu className='w-6 h-6' />
          </button>
        )}

        {/* Searchbar */}
        <div className='flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white'>
          <Search />
          <input type="text" placeholder='Search...' className='outline-none' />
        </div>
      </div>

      {/* Right section */}
      <div className='flex gap-3 items-center ml-2'>
        <UserButton />
      </div>
    </header>
  )
}

export default Header
