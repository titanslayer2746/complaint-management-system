"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Contact2, Home, ListCheck, Users2 } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Home", icon: Home },
    { href: "/admin/profile", label: "Profile", icon: ListCheck },
    { href: "/admin/all-users", label: "Users List", icon: Users2 },
    { href: "/contact", label: "Contact Us", icon: Contact2 },
  ];

  return (
    <aside className="w-64 bg-white">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-sky-500 flex items-center justify-center text-white font-bold">A</div>
          <span className="text-xl font-semibold">Admin Panel</span>
        </div>
      </div>
      <nav className="mt-6">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-6 py-3 ${
                isActive
                  ? "text-sky-600 bg-sky-50"
                  : "text-gray-600 hover:bg-sky-50 hover:text-sky-600"
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
