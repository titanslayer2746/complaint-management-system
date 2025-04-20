"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import UserProtectedRoute from "@/components/protectedRoutes/UserProtectedRoute";
export default function DashboardLayout({ children }) {
  return (
    <UserProtectedRoute>
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
    </UserProtectedRoute>
  );
}
