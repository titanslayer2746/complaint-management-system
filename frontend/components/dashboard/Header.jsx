"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export default function Header() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage dropdown visibility

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/user/get-user-by-token`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("Fetched user data:", data.user);

        if (data.success) {
          setUserData(data.user);
          console.log("User data:", data.user);
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

  useEffect(() => {
    if (userData) {
      console.log("Updated userData state is:", userData); // ✅ This will log when state is updated
    }
  }, [userData]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    router.push("/"); // Redirect to homepage after logout
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState); // Toggle dropdown menu visibility
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
      {userData && (
        <div className="flex items-center gap-2 relative">
          <div
            className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold cursor-pointer"
            onClick={toggleMenu} // Toggle dropdown on avatar click
          >
            {userData.name?.[0]}
          </div>
          {menuOpen && (
  <div className="absolute top-9 right-[-12px] bg-white border border-gray-200 rounded-lg shadow-lg w-56 p-2">
    <div className="px-4 py-2 text-sm text-gray-700 border-b">
      <p className="font-medium">{userData.name}</p>
      <p className="text-xs text-gray-500 truncate">{userData.email}</p>
    </div>
    <button
      onClick={handleLogout}
      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
    >
      Logout
    </button>
  </div>
)}

          <div className="hidden md:block">
            <div className="font-medium">{userData.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}
