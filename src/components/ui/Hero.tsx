import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, FileText, Globe, Zap, Clock } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gray-50 h-full md:h-screen text-[#7B19D8] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main Heading with Icon */}
          <div className="flex justify-center items-center mb-4">
            <Sparkles className="h-10 w-10 mr-3" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              AI Content Generator
            </h1>
          </div>
          
          {/* Subheading */}
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto mb-10 text-gray-700">
            Create high-quality content in seconds with our powerful AI tools. Perfect for blogs, 
            social media, and marketing materials.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center mb-16">
            <Link href="/dashboard">
              <Button className="bg-[#7B19D8] hover:bg-[#6a14c0] text-white px-8 py-6 text-lg font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-[#7B19D8]/30">
                <Sparkles className="mr-2 h-5 w-5" />
                Get Started - It's Free
              </Button>
            </Link>
          </div>
          
          {/* Stats/Features with Icons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto ">
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center">
                <div className="bg-[#7B19D8]/10 p-3 rounded-full mb-3">
                  <FileText className="h-8 w-8 text-[#7B19D8]" />
                </div>
                <h3 className="text-2xl font-bold mb-1 text-[#7B19D8]">10+</h3>
                <p className="text-sm text-[#7B19D8]">Templates</p>
              </div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center">
                <div className="bg-[#7B19D8]/10 p-3 rounded-full mb-3">
                  <Globe className="h-8 w-8 text-[#7B19D8]" />
                </div>
                <h3 className="text-2xl font-bold mb-1 text-[#7B19D8]">10+</h3>
                <p className="text-sm text-[#7B19D8]">Languages</p>
              </div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center">
                <div className="bg-[#7B19D8]/10 p-3 rounded-full mb-3">
                  <Zap className="h-8 w-8 text-[#7B19D8]" />
                </div>
                <h3 className="text-2xl font-bold mb-1 text-[#7B19D8]">10x</h3>
                <p className="text-sm text-[#7B19D8]">Faster Creation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-20 w-60 h-60 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-50 h-50 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  );
}