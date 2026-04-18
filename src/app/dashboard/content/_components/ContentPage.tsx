"use client"

import { Template } from "@/app/(data)/Templates"
import FormSection from "../_components/FormSection"
import OutputSection from "../_components/OutputSection"
import { Button } from "@/components/ui/button"
import { ArrowBigLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useSearchParams } from "next/navigation" // Add this import

type ClientPageProps = {
  templateSlug: string
}

export default function ContentPage({ templateSlug }: ClientPageProps) {
  const [loading, setLoading] = useState(false)
  const [aioutput, setAiOutput] = useState("")
  
  // Get search params if needed
  const searchParams = useSearchParams()
  // You can access query params like this:
  // const someParam = searchParams.get('paramName')

  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY

  const selectedTemplate = Template?.find((item) => item.slug === templateSlug)

  const GenerateNewContent = async (formData: any) => {
    setLoading(true)
    try {
      const selectedPrompt = selectedTemplate?.aiPrompt
      const finalAiPrompt = `${JSON.stringify(formData)} ${selectedPrompt}`

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "AI Content Generator"
        },
        body: JSON.stringify({
          model: "openrouter/auto",
          messages: [
            {
              role: "user",
              content: finalAiPrompt
            }
          ]
        })
      })

      const data = await response.json()

      const text = data?.choices?.[0]?.message?.content || "No response"

      // Save to DB
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
          <ArrowBigLeft /> Back
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