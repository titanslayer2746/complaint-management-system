"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import React, { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const Page = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/v1/users`, {
          method: "GET", // HTTP Method
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        console.log(data.data);
        setUsers(data.data); // Assuming the response is in the form { data: [...] }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
    <DashboardHeader/>
    <div className="min-h-screen bg-blue-50">
      {/* User List Section */}
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-sky-800 mb-6">All Users</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-transform transform hover:scale-105"
            >
              <div className="text-left">
                <h2 className="text-xl font-semibold text-sky-800 mb-2">{user.name}</h2>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Phone:</strong> {user.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Page;
