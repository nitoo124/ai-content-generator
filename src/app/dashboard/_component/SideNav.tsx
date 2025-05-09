"use client"
import { FileClock, Home, Settings, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

function SideNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  const menuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard"
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history"
    },
    {
      name: "Setting",
      icon: Settings,
      path: "/dashboard/settings"
    },
  ]

  const path = usePathname()

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    
    handleResize() // Check initial size
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Mobile Menu Button (only shows on mobile) */}
      {isMobileView && (
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#7B19D8] text-white md:hidden"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Sidebar - Shows normally on desktop, as overlay on mobile when open */}
      <div className={`
        fixed md:relative h-screen p-5 shadow-sm border bg-white
        ${isMobileView ? 
          `w-64 transform transition-all duration-300 ease-in-out z-40
           ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}` 
          : 'w-full'}
      `}>

        {/* Logo */}
        <div className='flex justify-center mb-5'>
          <Image src={"/logo.svg"} alt='logo' width={100} height={100}/>
        </div>
        
        <hr className='my-7 border-b'/>
        
        {/* Menu Items */}
        <div className='mt-5'>
          {menuList.map((item, index) => (
            <Link 
              key={index}
              href={item.path} 
              onClick={() => isMobileView && setIsMobileMenuOpen(false)}
              className={`
                flex gap-2 mb-2 p-3 hover:bg-[#7B19D8] hover:text-white 
                rounded-2xl cursor-pointer items-center
                ${path === item.path ? "bg-[#7B19D8] text-white" : ""}
              `}
            >
              <item.icon className='w-6 h-6'/>
              <h2 className='text-xl font-semibold'>{item.name}</h2>
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay for mobile (click to close menu) */}
      {isMobileView && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default SideNav