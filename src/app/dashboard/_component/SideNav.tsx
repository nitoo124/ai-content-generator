'use client'
import { FileClock, Home, Settings, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SideNavProps {
  isOpen: boolean
  onClose: () => void
  isMobileView: boolean
}

function SideNav({ isOpen, onClose, isMobileView }: SideNavProps) {
  const path = usePathname()

  const menuList = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "History", icon: FileClock, path: "/dashboard/history" },
    { name: "Setting", icon: Settings, path: "/dashboard/settings" },
  ]

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed md:relative h-screen p-5 shadow-sm border bg-white
        ${isMobileView ?
          `w-64 transform transition-all duration-300 ease-in-out z-40
           ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
          : 'w-full'}
      `}>
        {/* Close button on mobile */}
        {isMobileView && (
          <button
            onClick={onClose}
            className='absolute top-4 right-4 z-50 p-1 text-gray-700 md:hidden'
          >
            <X className='w-6 h-6' />
          </button>
        )}

        {/* Logo */}
        <Link href="/" className='flex justify-center mb-5'>
          <Image src="/logo.svg" alt="logo" width={100} height={100} />
        </Link>

        <hr className='my-7 border-b' />

        {/* Menu items */}
        <div className='mt-5'>
          {menuList.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => isMobileView && onClose()}
              className={`
                flex gap-2 mb-2 p-3 hover:bg-[#7B19D8] hover:text-white 
                rounded-2xl cursor-pointer items-center
                ${path === item.path ? "bg-[#7B19D8] text-white" : ""}
              `}
            >
              <item.icon className='w-6 h-6' />
              <h2 className='text-xl font-semibold'>{item.name}</h2>
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isMobileView && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  )
}

export default SideNav
