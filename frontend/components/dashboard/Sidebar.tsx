import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Home, MessageSquare, Phone, User } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname(); // gets current route

  const links = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/mycomplaints", label: "My Complaints", icon: MessageSquare },
    { href: "/contact", label: "Contact Us", icon: Phone },
  ];

  return (
    <aside className="w-64 bg-white">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-sky-600" />
          <span className="text-xl font-semibold">ComplaintCare</span>
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
