import { History } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-12">
      <History className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">No history yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        When you generate some content, it will appear here.
      </p>
    </div>
  );
}