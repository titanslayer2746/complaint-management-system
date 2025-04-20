"use client";
import Header from "@/components/dashboard/Header";
import StatsCards from "@/components/dashboard/StatCards";
import ComplaintFilters from "@/components/dashboard/ComplaintFilters";
import ComplaintFormDialog from "@/components/dashboard/ComplaintFormDialog";
import ComplaintList from "@/components/dashboard/ComplaintList.jsx";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 
export default function DashboardPage() {
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const queryParams = new URLSearchParams();

        if (status) queryParams.append("status", status);
        if (category) queryParams.append("category", category);
        if (location) queryParams.append("location", location);

        const queryString = queryParams.toString();
        const url = `${BASE_URL}/api/v1/filtered-complaints${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setComplaints(data.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [status, category, location]);

  return (
    <>
      <Header />
      <StatsCards />
      <ComplaintFilters setCategory={setCategory} setStatus={setStatus} setLocation={setLocation} />
      <ComplaintFormDialog />
      <ComplaintList complaints={complaints} />
      {/* <Toaster richColors position="top-right" /> */}
    </>
  );
}
