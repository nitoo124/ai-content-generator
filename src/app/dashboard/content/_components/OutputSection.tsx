"use client"
import { Button } from '@/components/ui/button';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Check, Copy } from "lucide-react";
import { Editor } from '@toast-ui/react-editor';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface Props {
  aiOutput: string;
  loading?: boolean;
}

function OutputSection({ aiOutput, loading }: Props) {
  const [copied, setCopied] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const sectionId = "output-section"; // Unique ID for this section

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(loading ? "Generating content..." : aiOutput || "Your Result will appear here!");
    }
  }, [aiOutput, loading]);

  const handleCopy = async () => {
    try {
      // Get the current content from the editor
      const content = editorRef.current?.getInstance().getMarkdown() || aiOutput;
      
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("Copied to clipboard ✅");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy ❌");
    }
  };

  return (
    <div className='bg-white shadow-lg border rounded-lg overflow-hidden'>
      <div className='flex justify-between items-center p-5 border-b bg-gradient-to-r from-purple-50 to-white'>
        <h2 className='font-bold text-lg text-gray-800'>Your Result</h2>
        <Button 
          className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md'
          onClick={handleCopy}
        >
          {copied ? <Check size={16} className="animate-in fade-in duration-200" /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <div className="p-0">
        <Editor
          ref={editorRef}
          initialValue={loading ? "Generating content..." : aiOutput || "Your Result will appear here!"}
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
      </div>
    </div>
  )
}

export default OutputSection