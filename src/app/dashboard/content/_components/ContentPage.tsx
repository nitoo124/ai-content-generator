"use client"

import { Template } from "@/app/(data)/Templates"
import FormSection from "../_components/FormSection"
import OutputSection from "../_components/OutputSection"
import { Button } from "@/components/ui/button"
import { ArrowBigLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

type ClientPageProps = {
  templateSlug: string
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function ContentPage({ templateSlug }: ClientPageProps) {
  const [loading, setLoading] = useState(false)
  const [aioutput, setAiOutput] = useState("")

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable")
  }
  const genAI = new GoogleGenerativeAI(apiKey)

  const selectedTemplate = Template?.find((item) => item.slug === templateSlug)

  const GenerateNewContent = async (formData: any) => {
    setLoading(true)
    try {
      const selectedPrompt = selectedTemplate?.aiPrompt
      const finalAiPrompt = `${JSON.stringify(formData)} ${selectedPrompt}`

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
      const result = await model.generateContent(finalAiPrompt)
      const response = await result.response
      const text = response.text()

      await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          formData,
          aiOutput: text,
          templateSlug
        })
      })

      setAiOutput(text)
    } catch (error) {
      console.error("Error generating content:", error)
      setAiOutput("Error generating content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5">
      <Link href="/dashboard">
        <Button className="bg-[#7B19D8] text-white font-semibold text-xl">
          <ArrowBigLeft className="font-semibold text-xl" />Back
        </Button>
      </Link>
     <div className="flex flex-col lg:flex-row gap-6 p-5">
        <div className="w-full lg:w-1/3">
          <FormSection
            selectedTemplate={selectedTemplate}
            useFormInput={GenerateNewContent}
            loading={loading}
          />
        </div>
        
        <div className="w-full lg:w-2/3">
          <OutputSection aiOutput={aioutput} />
        </div>
      </div>
    </div>
  )
}
