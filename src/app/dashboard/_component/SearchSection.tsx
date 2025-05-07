import { Search } from 'lucide-react'
import React from 'react'

function SearchSection({onSearchInput}:any) {

  const handleChange=(e:any)=>{
    onSearchInput(e.target.value)

  }
  return (
    <div className=' p-10 bg-gradient-to-br from-purple-400 via-[#7B19D8] to-blue-600
    flex flex-col justify-center items-center '>
        <h2 className=' text-3xl text-white font-bold'>Browse All Templates</h2>
        <p className='text-white'>What would you like tto create today?</p>

        <div className=' w-full flex justify-center items-center'>
            <div className=' flex gap-3 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
                <Search className='text-gray-700 '/>
                <input onChange={handleChange} type="text" placeholder='Search'
                className=' bg-transparent w-full outline-none text-black  ' />
            </div>

        </div>
        
      
    </div>
  )
}

export default SearchSection
