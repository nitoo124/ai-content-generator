"use client"
import { FileClock, Home, Settings, Wallet, WalletCards } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function SideNav() {

    const menuList = [
        {
        name:"Home",
        icon:Home,
        path:"/dashboard"

    },
    {
        name:"History",
        icon:FileClock,
        path:"/dashboard/history"

    },
 
    {
        name:"Setting",
        icon:Settings,
        path:"/dashboard/settings"

    },
]

const path = usePathname();
useEffect(()=>{
  console.log(path)
},[])
  return (
    <div className=' relative h-screen p-5 shadow-sm border bg-white'>

      {/* logo */}
      <div className=' flex justify-center'>
      <Image src={"/logo.svg"} alt='logo' 
        width={100} height={100}/>
      </div>
      {/* navbar */}
      <hr className='my-7 border-b'/>
      <div className=' mt-5'>
        {menuList.map((item)=>{
            return <Link href={item.path} className={`flex gap-2 mb-2 p-3 
            hover:bg-[#7B19D8] hover:text-white rounded-2xl cursor-pointer
            items-center
            ${path ==item.path&&" bg-[#7B19D8] text-white"}
            `}>
                <item.icon className=' w-6 h-6'/>
                <h2 className='text-xl font-semibold'>{item.name}</h2>
            </Link>
        })}
      </div>

    </div>
  )
}

export default SideNav
