import { AlertCircle, RotateCw } from "lucide-react";

export default function ErrorDisplay({ 
  error, 
  onRetry 
}: { 
  error: string; 
  onRetry: () => void 
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 my-10 bg-white min-h-screen flex flex-col items-center justify-center">
      <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
      <p className="text-lg text-red-500 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#7B19D8] hover:bg-[#5E0FB5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B19D8] transition-colors"
      >
        <RotateCw className="mr-2 h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}