"use client"
import { Button } from '@/components/ui/button';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Copy } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Props {
  aiOutput: string;
  loading?: boolean;
}

function OutputSection({ aiOutput, loading }: Props) {
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(loading ? "Generating content..." : aiOutput || "Your Result will appear here!");
    }
  }, [aiOutput, loading]);

  const handleCopy = () => {
    if (editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown();
      navigator.clipboard.writeText(content);
    }
  };

  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='font-bold text-lg'>Your Result</h2>
        <Button className='p-3 flex gap-2 active:bg-green-800 duration-75' onClick={handleCopy}>
          <Copy size={16} /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue={loading ? "Generating content..." : aiOutput || "Your Result will appear here!"}
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
    </div>
  )
}

export default OutputSection