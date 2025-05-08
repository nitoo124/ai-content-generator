import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 p-2 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with better sizing */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.svg" 
              alt="AI Content Generator Logo" 
              width={120} 
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Enhanced Get Started Button */}
          <Link href="/dashboard">
            <Button className="bg-[#7B19D8] hover:bg-[#6a14c0] text-white px-6 py-2 rounded-md transition-all hover:scale-[1.02] shadow">
              <Rocket className="mr-2 h-4 w-4" />
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}