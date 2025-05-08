import Link from "next/link";
import Image from "next/image";

export default function SimpleFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-300 py-8 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center mb-6">
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            width={120} 
            height={40}
            className="h-8 w-auto mb-4"
          />
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} AI Content Generator
          </p>
        </div>

      
        </div>
    </footer>
  );
}