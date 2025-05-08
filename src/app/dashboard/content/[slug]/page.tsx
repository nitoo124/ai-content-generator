"use client"
import { Template } from "@/app/(data)/Templates"
import FormSection from "../_components/FormSection"
import OutputSection from "../_components/OutputSection"
import { Button } from "@/components/ui/button"
import { ArrowBigLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Solution 1: Use this if you want to keep strict types
type PageProps = {
  params: { slug: string } & { then?: never, catch?: never, finally?: never }
  searchParams?: { [key: string]: string | string[] | undefined }
}

// Solution 2: Or use this simpler version that also works
// type PageProps = {
//   params: { "template-slug": string }
//   searchParams?: { [key: string]: string | string[] | undefined }
// }

export default function ContentPage({ params }: PageProps) {
  const [loading, setLoading] = useState(false)
  const [aioutput, setAiOutput] = useState("")

  // Initialize Google Generative AI
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable")
  }
  const genAI = new GoogleGenerativeAI(apiKey)

  const selectedTemplate = Template?.find((item) => item.slug === params["slug"])

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
          templateSlug: params["slug"]
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          useFormInput={GenerateNewContent}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aioutput} />
        </div>
      </div>
    </div>
  )
}