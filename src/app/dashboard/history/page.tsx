"use client"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Clipboard, Check, RotateCw, AlertCircle, History, FileText, Edit, Save, X } from "lucide-react";

interface ContentItem {
  _id: string;
  formData: any;
  aiOutput: string;
  templateSlug: string;
  createdAt: string;
}

export default function HistoryPage() {
  const [contentHistory, setContentHistory] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      fetchHistory();
    }
  }, [isLoaded, user]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/save-content");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setContentHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
      setError("Failed to load history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

      if (!response.ok) {
        throw new Error("Failed to update content");
      }

      setContentHistory(prev => prev.map(item => 
        item._id === id ? { ...item, aiOutput: editedContent } : item
      ));
      setEditingId(null);
    } catch (err) {
      console.error("Error updating content:", err);
      setError("Failed to update content. Please try again.");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RotateCw className="animate-spin h-10 w-10 text-[#7B19D8]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 my-10 bg-white min-h-screen flex flex-col items-center justify-center">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <p className="text-lg text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchHistory}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#7B19D8] hover:bg-[#5E0FB5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B19D8] transition-colors"
        >
          <RotateCw className="mr-2 h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 my-10 bg-white min-h-screen flex justify-center items-center">
        <RotateCw className="animate-spin h-10 w-10 text-[#7B19D8]" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-10 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content History</h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage your previously generated content
        </p>
      </div>

      {contentHistory.length === 0 ? (
        <div className="text-center py-12">
          <History className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No history yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your generated content will appear here once you create some.
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#7B19D8]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center text-xl font-bold text-white uppercase tracking-wider">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xl font-bold text-white uppercase tracking-wider">
                    Template
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xl font-bold text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xl font-bold text-white uppercase tracking-wider">
                    Output
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xl font-bold text-white uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contentHistory.map((item, index) => (
                  <tr key={item._id} className="hover:bg-purple-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {formatTemplateName(item.templateSlug)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {editingId === item._id ? (
                        <textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="w-full h-40 p-2 border border-gray-300 rounded-md focus:ring-[#7B19D8] focus:border-[#7B19D8]"
                        />
                      ) : (
                        <div className="max-w-xs truncate">{item.aiOutput}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      {editingId === item._id ? (
                        <>
                          <button
                            onClick={() => saveEditedContent(item._id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                          >
                            <Save className="mr-1.5 h-4 w-4" />
                            Save
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B19D8] transition-colors"
                          >
                            <X className="mr-1.5 h-4 w-4" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(item._id, item.aiOutput)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          >
                            <Edit className="mr-1.5 h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleCopy(item.aiOutput, item._id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[#7B19D8] hover:bg-[#5E0FB5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B19D8] transition-colors"
                          >
                            {copiedId === item._id ? (
                              <>
                                <Check className="mr-1.5 h-4 w-4" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Clipboard className="mr-1.5 h-4 w-4" />
                                Copy
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}