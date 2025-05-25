import React from 'react'
import ClientWrapper from './_component/ClientWrapper'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen'>
      <ClientWrapper>{children}</ClientWrapper>
    </div>
  )
}

export default Layout
