"use client"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ContentItem } from "../../../../type";
import LoadingSpinner from "../_component/LoadingSpinner";
import ErrorDisplay from "../_component/ErrorDisplay";
import EmptyState from "../_component/EmptyState";
import HistoryTable from "../_component/HistoryTable";


export default function HistoryPage() {
  const [contentHistory, setContentHistory] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
      console.error("Error loading history:", err);
      setError("Failed to load history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return <LoadingSpinner fullScreen />;
  if (error) return <ErrorDisplay error={error} onRetry={fetchHistory} />;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-10 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content History</h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage content you've previously generated
        </p>
      </div>

      {contentHistory.length === 0 ? (
        <EmptyState />
      ) : (
        <HistoryTable 
          contentHistory={contentHistory} 
          setContentHistory={setContentHistory}
          setError={setError}
        />
      )}
    </div>
  );
}