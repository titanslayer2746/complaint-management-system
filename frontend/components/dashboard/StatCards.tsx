"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle } from "lucide-react"; // Added XCircle for Rejected

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export default function StatsCards() {
  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/complaint/status-counts`);
        const data = await res.json();
        console.log("Fetched stats:", data);
        setStats({
          pending: data.data.pending || 0,
          inProgress: data.data["in-progress"] || 0,
          completed: data.data.completed || 0,
          rejected: data.data.rejected || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.inProgress}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.completed}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.rejected}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
