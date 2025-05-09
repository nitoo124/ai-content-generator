import { Template } from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'

interface Form {
  label: string
  field: string
  name: string
  required?: boolean // optional banana chahenge to ? lagayein
}

export interface TEMPLATE {
  name: string
  description: string
  icon: string
  category: string
  slug: string
  aiPrompt: string
  form?: Form[]
}

function TemplatesSection({searchInput}:any) {

  const [templateList, setTemplateList] = useState(Template)

  useEffect(()=>{

    if (searchInput) {

      const filterData = Template.filter((item)=>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      
      )
      setTemplateList(filterData)
    
      
    }else{
      setTemplateList(Template)
    }


  },[searchInput])
  return (
    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10 bg-gray-50'>
      {templateList.map((item: TEMPLATE) => {
        return (
          <div key={item.slug}>
        <TemplateCard {...item}/>
        </div>
        )
      })}
    </div>
  )
}

export default TemplatesSection
