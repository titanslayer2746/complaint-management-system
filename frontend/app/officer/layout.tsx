import type React from "react"
import { OfficerSidebar } from "@/components/officer-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import OfficerProtectedRoute from "@/components/protectedRoutes/OfficerProtectedRoute"
export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OfficerProtectedRoute>
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <OfficerSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
    </OfficerProtectedRoute>
  )
}
