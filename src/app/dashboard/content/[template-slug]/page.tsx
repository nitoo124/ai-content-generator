"use client"
import { Template } from "@/app/(data)/Templates"
import { TEMPLATE } from "../../_component/TemplatesSection"
import FormSection from "../_components/FormSection"
import OutputSection from "../_components/OutputSection"
import { Button } from "@/components/ui/button"
import { ArrowBigLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

interface PageProps {
  params: {
    "template-slug": string
  }
}

export default function Page({ params }: PageProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [aioutput, setAiOutput] = useState<string>("")
  
  // Initialize Google Generative AI
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")
  
  const GenerateNewContent = async (formData: any) => {
    setLoading(true)
    try {
      const selectedPrompt = selectedTemplate?.aiPrompt
      const finalAiPrompt = JSON.stringify(formData) + " " + selectedPrompt
      
      // Get the generative model
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      
      // Generate content
      const result = await model.generateContent(finalAiPrompt)
      const response = await result.response
      const text = response.text()
      
      // Send to MongoDB
      await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          formData,
          aiOutput: text,
          templateSlug: params["template-slug"]
        })
      });
      
      console.log(text) 
      setAiOutput(text) 
    } catch (error) {
      console.error("Error generating content:", error)
      setAiOutput("Error generating content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const selectedTemplate: TEMPLATE | undefined = Template?.find((item) => item.slug == params["template-slug"])
  
  return (
    <div className="p-5">
      <Link href={"/dashboard"}>
        <Button className="bg-[#7B19D8] text-white font-semibold text-xl">
          <ArrowBigLeft className="font-semibold text-xl" />Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5">
        {/* Form-section */}
        <FormSection 
          selectedTemplate={selectedTemplate}
          useFormInput={GenerateNewContent} 
          loading={loading}
        />

        {/* Output-section */}
        <div className="col-span-2">
          <OutputSection aiOutput={aioutput}  />
        </div>
      </div>
    </div>
  )
}