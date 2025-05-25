'use client'
import React, { useState, useEffect } from 'react'
import SideNav from './SideNav'
import Header from './Header'

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    <>
      {/* Sidebar */}
      <div className='md:w-64 fixed hidden md:block'>
        <SideNav isOpen={true} isMobileView={false} onClose={() => {}} />
      </div>

      {/* Mobile Sidebar */}
      {isMobileView && (
        <SideNav
          isOpen={isMenuOpen}
          isMobileView={true}
          onClose={() => setIsMenuOpen(false)}
        />
      )}

      {/* Right Section */}
      <div className={`md:ml-64`}>
        <Header onMenuClick={() => setIsMenuOpen(true)} />
        {children}
      </div>
    </>
  )
}

export default ClientWrapper
