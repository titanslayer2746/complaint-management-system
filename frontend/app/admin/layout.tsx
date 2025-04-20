import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import AdminProtectedRoute from "@/components/protectedRoutes/AdminProtectedRoute"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProtectedRoute>
    
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
    </AdminProtectedRoute>
  )
}
