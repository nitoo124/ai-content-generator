"use client"
import { useState } from "react";
import { Clipboard, Check, Edit, Save, X, Trash } from "lucide-react";
import { ContentItem } from "../../../../type";


export default function HistoryTable({
  contentHistory,
  setContentHistory,
  setError
}: {
  contentHistory: ContentItem[];
  setContentHistory: (items: ContentItem[]) => void;
  setError: (error: string | null) => void;
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const formatTemplateName = (slug: string) => {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const startEditing = (id: string, content: string) => {
    setEditingId(id);
    setEditedContent(content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedContent("");
  };

  const saveEditedContent = async (id: string) => {
    try {
      const response = await fetch(`/api/save-content`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          aiOutput: editedContent
        }),
      });

      if (!response.ok) throw new Error("Failed to update content");

      setContentHistory(contentHistory.map(item => 
        item._id === id ? { ...item, aiOutput: editedContent } : item
      ));
      setEditingId(null);
    } catch (err) {
      console.error("Error updating content:", err);
      setError("Failed to update content. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this content?")) return;

    try {
      const response = await fetch(`/api/save-content`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete content");

      setContentHistory(contentHistory.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting content:", err);
      setError("Failed to delete content. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#7B19D8]">
            <tr>
              <TableHeader>No.</TableHeader>
              <TableHeader>Template</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Output</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contentHistory.map((item, index) => (
              <TableRow 
                key={item._id}
                item={item}
                index={index}
                formatTemplateName={formatTemplateName}
                editingId={editingId}
                editedContent={editedContent}
                setEditedContent={setEditedContent}
                copiedId={copiedId}
                startEditing={startEditing}
                saveEditedContent={saveEditedContent}
                cancelEditing={cancelEditing}
                handleCopy={handleCopy}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <th scope="col" className="px-6 py-3 text-center text-xl font-bold text-white uppercase tracking-wider">
      {children}
    </th>
  );
}

function TableRow({
  item,
  index,
  formatTemplateName,
  editingId,
  editedContent,
  setEditedContent,
  copiedId,
  startEditing,
  saveEditedContent,
  cancelEditing,
  handleCopy,
  handleDelete
}: {
  item: ContentItem;
  index: number;
  formatTemplateName: (slug: string) => string;
  editingId: string | null;
  editedContent: string;
  setEditedContent: (content: string) => void;
  copiedId: string | null;
  startEditing: (id: string, content: string) => void;
  saveEditedContent: (id: string) => void;
  cancelEditing: () => void;
  handleCopy: (text: string, id: string) => void;
  handleDelete: (id: string) => void;
}) {
  return (
    <tr className="hover:bg-purple-50 ">
      <TableCell>{index + 1}</TableCell>
      <TableCell>{formatTemplateName(item.templateSlug)}</TableCell>
      <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
      <TableCell>
        {editingId === item._id ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-40 p-2 border border-gray-300 rounded-md focus:ring-[#7B19D8] focus:border-[#7B19D8]"
          />
        ) : (
          <div className="max-w-xs truncate">{item.aiOutput}</div>
        )}
      </TableCell>
      <TableCell>
        {editingId === item._id ? (
          <>
            <ActionButton 
              onClick={() => saveEditedContent(item._id)}
              icon={<Save className="mr-1.5 h-4 w-4" />}
              color="green"
            >
              Save
            </ActionButton>
            <ActionButton 
              onClick={cancelEditing}
              icon={<X className="mr-1.5 h-4 w-4" />}
              color="gray"
              outline
            >
              Cancel
            </ActionButton>
          </>
        ) : (
          <>
            <ActionButton 
              onClick={() => startEditing(item._id, item.aiOutput)}
              icon={<Edit className="mr-1.5 h-4 w-4" />}
              color="blue"
            >
              Edit
            </ActionButton>
            <ActionButton 
              onClick={() => handleCopy(item.aiOutput, item._id)}
              icon={copiedId === item._id ? 
                <Check className="mr-1.5 h-4 w-4" /> : 
                <Clipboard className="mr-1.5 h-4 w-4" />
              }
              color="purple"
            >
              {copiedId === item._id ? "Copied" : "Copy"}
            </ActionButton>
            <ActionButton 
              onClick={() => handleDelete(item._id)}
              icon={<Trash className="mr-1.5 h-4 w-4" />}
              color="red"
            >
              Delete
            </ActionButton>
          </>
        )}
      </TableCell>
    </tr>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center m-3">
      {children}
    </td>
  );
}

function ActionButton({
  children,
  onClick,
  icon,
  color = "purple",
  outline = false
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
  color?: "purple" | "blue" | "green" | "red" | "gray";
  outline?: boolean;
}) {
  const colorClasses = {
    purple: {
      bg: "bg-[#7B19D8] hover:bg-[#5E0FB5]",
      focus: "focus:ring-[#7B19D8]",
      text: "text-white"
    },
    blue: {
      bg: "bg-blue-600 hover:bg-blue-700",
      focus: "focus:ring-blue-500",
      text: "text-white"
    },
    green: {
      bg: "bg-green-600 hover:bg-green-700",
      focus: "focus:ring-green-500",
      text: "text-white"
    },
    red: {
      bg: "bg-red-600 hover:bg-red-700",
      focus: "focus:ring-red-500",
      text: "text-white"
    },
    gray: {
      bg: "bg-white hover:bg-gray-50",
      focus: "focus:ring-[#7B19D8]",
      text: "text-gray-700",
      border: "border-gray-300"
    }
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1.5 ${outline ? 'border' : 'border-transparent'} text-xs mx-2 font-medium rounded-md shadow-sm ${colorClasses[color].text} ${colorClasses[color].bg} ${outline && colorClasses.gray.border} focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses[color].focus} transition-colors`}
    >
      {icon}
      {children}
    </button>
  );
}