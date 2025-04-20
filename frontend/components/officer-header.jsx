"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export function OfficerHeader() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/api/v1/get-officer-by-token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setUserData(data.user);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="h-16 border-b bg-white flex items-center px-4 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">Officer Dashboard</h1>
      </div>
      <div className="ml-auto flex items-center gap-4 relative">
        <Button variant="outline" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        {userData && (
          <div className="flex flex-col items-center relative">
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold cursor-pointer"
              onClick={toggleMenu}
            >
              {userData.name?.[0]}
            </div>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute top-9 right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-56 p-2">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">{userData.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {userData.email}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{userData.category}</p>

                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Name and category */}
            {/* <div className="hidden md:block text-center mt-1">
              <div className="font-medium">{userData.name}</div>
              <div className="text-xs text-muted-foreground">{userData.category}</div>
            </div> */}
          </div>
        )}
      </div>
    </header>
  );
}
