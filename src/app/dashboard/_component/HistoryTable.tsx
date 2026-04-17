"use client";
import { useState, useRef } from "react";
import { Clipboard, Check, Edit, Save, X, Trash } from "lucide-react";
import { ContentItem } from "../../../../type";
import { toast } from "sonner";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

export default function HistoryTable({
  contentHistory,
  setContentHistory,
  setError
}: {
  contentHistory: ContentItem[];
  setContentHistory: React.Dispatch<React.SetStateAction<ContentItem[]>>; 
  setError: (error: string | null) => void;
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<any>(null);

  const formatTemplateName = (slug: string) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // ✅ COPY
  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Copied to clipboard ✅");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setError("Failed to copy text");
      toast.error("Failed to copy ❌");
    }
  };

  // ✅ START EDIT - Open Modal with Editor
  const startEditing = (item: ContentItem) => {
    setEditingItem(item);
  };

  const cancelEditing = () => {
    setEditingItem(null);
  };

  // ✅ SAVE (UPDATE)
  const saveEditedContent = async () => {
    if (!editingItem) return;
    
    // Get content from editor instance
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown() || "";
    
    if (!content.trim()) {
      setError("Content cannot be empty");
      toast.warning("Content cannot be empty ⚠️");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/update-content/${editingItem._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          aiOutput: content
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update");
      }

      setContentHistory((prev) =>
        prev.map((item) =>
          item._id === editingItem._id ? { ...item, aiOutput: content } : item
        )
      );

      cancelEditing();
      toast.success("Content updated successfully ✅");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update content";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/delete-content/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      setContentHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );
      toast.success("Deleted successfully 🗑️");
    } catch {
      setError("Failed to delete content");
      toast.error("Failed to delete ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg border">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#7B19D8] text-white">
              <tr>
                <th className="p-3">No.</th>
                <th className="p-3">Template</th>
                <th className="p-3">Date</th>
                <th className="p-3">Output</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contentHistory.map((item, index) => (
                <tr key={item._id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-center">{index + 1}</td>
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-sm font-medium">
                      {formatTemplateName(item.templateSlug)}
                    </span>
                  </td>
                  <td className="p-3 text-center text-sm text-gray-600">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <div className="truncate max-w-xs text-gray-700">
                      {item.aiOutput}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        disabled={loading}
                        onClick={() => startEditing(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors disabled:opacity-50"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleCopy(item.aiOutput, item._id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded transition-colors"
                        title="Copy"
                      >
                        {copiedId === item._id ? (
                          <Check size={16} />
                        ) : (
                          <Clipboard size={16} />
                        )}
                      </button>

                      <button
                        disabled={loading}
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal with Toast UI Editor */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-50 to-white shrink-0">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Edit Content</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Template: {formatTemplateName(editingItem.templateSlug)}
                </p>
              </div>
              <button
                onClick={cancelEditing}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Editor Container */}
            <div className="flex-1 overflow-y-auto p-4">
              <Editor
                ref={editorRef}
                initialValue={editingItem.aiOutput}
                height="500px"
                initialEditType="markdown"
                useCommandShortcut={true}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-4 border-t bg-gray-50 shrink-0">
              <button
                onClick={cancelEditing}
                disabled={loading}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedContent}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-[#7B19D8] to-[#AD5CFF] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}