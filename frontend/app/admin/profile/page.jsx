'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Home, User, MessageSquare, Phone, Camera, Mail, UserCircle } from "lucide-react";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/api/v1/user/get-user-by-token`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setUserData(data.user);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err) {
        setError('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }
  
    try {
      const res = await fetch(`${BASE_URL}/api/v1/user/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        }),
      });
  
      const data = await res.json();
  
      if (data.success) {
        setUserData(data.data);
        setIsEditing(false);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred while updating profile');
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

          <Card className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-sky-600 text-white p-2 rounded-full hover:bg-sky-700">
                  <Camera className="h-5 w-5" />
                </button>
              </div>
              <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
              <span className="text-gray-500">{userData.role}</span>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline-block mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{userData.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline-block mr-2" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{userData.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline-block mr-2" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{userData.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <UserCircle className="h-4 w-4 inline-block mr-2" />
                    Role
                  </label>
                  <p className="text-gray-900 p-2 bg-gray-50 rounded-md">{userData.role}</p>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Member since</p>
                    <p className="text-gray-900">{new Date(userData.createdAt).toLocaleDateString()}</p>
                  </div>
                  {isEditing ? (
                    <div className="space-x-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-sky-600 hover:bg-sky-700" onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <Button className="bg-sky-600 hover:bg-sky-700 cursor-pointer" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
