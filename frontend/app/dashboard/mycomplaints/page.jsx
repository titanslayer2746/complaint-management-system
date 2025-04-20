"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import MyComplaintList from "@/components/dashboard/MyComplaintList.jsx";



const page = () => {
    
  return (
    <div className="min-h-screen bg-gray-50 flex">
          {/* <Sidebar /> */}
          <main className="flex-1 p-4">
            <div className="max-w-6xl mx-auto">
              <Header />
              <MyComplaintList />
            </div>
          </main>
        </div>
  )
}

export default page
