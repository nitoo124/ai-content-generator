import { RotateCw } from "lucide-react";

export default function LoadingSpinner({ fullScreen = false }: { fullScreen?: boolean }) {
  return (
    <div className={`${fullScreen ? 'flex justify-center items-center min-h-screen' : 'max-w-7xl mx-auto px-4 py-8 my-10 bg-white min-h-screen flex justify-center items-center'}`}>
      <RotateCw className="animate-spin h-10 w-10 text-[#7B19D8]" />
    </div>
  );
}