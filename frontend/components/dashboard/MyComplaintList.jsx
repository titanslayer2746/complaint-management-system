'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const MyComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const res = await fetch(`${BASE_URL}/api/v1/my-complaints`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch my complaints");
        }

        const data = await res.json();
        console.log("My Complaints:", data.data);
        setComplaints(data.data);
        toast.success("Fetched my complaints successfully");
      } catch (error) {
        console.error("Error fetching my complaints:", error);
      }
    };

    fetchMyComplaints();
  }, []);

  return (
    <div>
      {complaints.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg font-medium">
          😇 No complaints submitted by you yet.
          <p className="text-sm text-gray-400 mt-2">Start by raising a concern to make a difference!</p>
        </div>
      ) : (
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
                        router.push(`/dashboard/mycomplaints/${complaint._id}`)
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
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {complaint?.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default MyComplaintList;
