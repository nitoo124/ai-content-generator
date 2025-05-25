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
    <div className="p-4 md:p-5">
      <Link href="/dashboard">
        <Button className="bg-[#7B19D8] text-white font-semibold text-sm md:text-xl mb-4 md:mb-0">
          <ArrowBigLeft className="font-semibold text-sm md:text-xl mr-1" />
          Back
        </Button>
      </Link>
      <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10 p-0 md:p-5">
        <div className="lg:col-span-1">
          <FormSection
            selectedTemplate={selectedTemplate}
            useFormInput={GenerateNewContent}
            loading={loading}
          />
        </div>
        <div className="lg:col-span-2">
          <OutputSection aiOutput={aioutput} />
        </div>
      </div>
    </div>
  )
}