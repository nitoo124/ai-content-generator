import ClientWrapper from './_component/ClientWrapper'
import { Toaster } from 'sonner'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen'>
      <ClientWrapper>
        {children}
        <Toaster position="top-right" richColors />
      </ClientWrapper>
    </div>
  )
}

export default Layout