"use client";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SearchX } from "lucide-react";

export default function ComplaintList({ complaints }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smoother UX (can remove if you're handling server-side)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900); // fake 1 second loading
    return () => clearTimeout(timer);
  }, [complaints]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Loader2 className="animate-spin h-10 w-10 text-gray-600" />
        <span className="ml-3 text-gray-600 text-sm">Loading complaints...</span>
      </div>
    );
  }

  if (!complaints || complaints.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-10">
          <SearchX className="h-20 w-20 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">No complaints found</h3>
          <p className="text-gray-500 mt-1 max-w-md">
            Looks like there are no pending complaints matching your selected filters.
            Try changing the category or location to see more results.
          </p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {complaints.map((complaint) => (
        <Card key={complaint._id} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {complaint.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {complaint.description}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Date:{" "}
                {new Date(complaint.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboard/complaints/${complaint._id}`)
                  }
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full ${
                complaint?.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : complaint?.status === "in-progress"
                  ? "bg-blue-100 text-blue-800"
                  : complaint?.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : complaint?.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : complaint?.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {complaint?.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
