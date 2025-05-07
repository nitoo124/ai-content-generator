import Image from "next/image"
import { TEMPLATE } from "./TemplatesSection"
import Link from "next/link"

function TemplateCard(item: TEMPLATE) {
  return (
   <Link href={`/dashboard/content/${item.slug}`}>
     <div className="p-5 shadow-md border bg-white flex flex-col gap-3 cursor-pointer
     rounded-md hover:scale-105 transition-all h-full">
      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className="font-medium text-lg">{item.name}</h2>
      <p className="text-gray-500 line-clamp-3 min-h-[72px]">{item.description}</p>
    </div>
   </Link>
  )
}

export default TemplateCard
