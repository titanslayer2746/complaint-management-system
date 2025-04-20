'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Clock, FileSearch, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      {/* Header */}
<header className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <FileSearch className="h-6 w-6 text-sky-600" />
      <span className="text-xl font-semibold text-gray-900">ComplaintCare</span>
    </div>
    <div className="flex items-center space-x-4">
      <Link href="/contact" className="cursor-pointer">
        <Button variant="ghost" className="cursor-pointer">Contact</Button>
      </Link>
      <Link href="/login" className="cursor-pointer">
        <Button variant="ghost" className="cursor-pointer">Login</Button>
      </Link>
      <Link href="/registerofficer" className="cursor-pointer">
        <Button className="text-gray-400 cursor-pointer" variant="ghost">Register as officer</Button>
      </Link>
      <Link href="/dashboard" className="cursor-pointer">
        <Button className="bg-sky-600 hover:bg-sky-700 text-white cursor-pointer">Get Started</Button>
      </Link>
    </div>
  </div>
</header>


      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Efficient Complaint Management Made Simple
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Our platform streamlines the complaint resolution process, ensuring your concerns are heard, tracked, and resolved efficiently. Experience transparent communication and real-time updates throughout the resolution journey.
              </p>
              <div className="mt-8">
                <Link href="/register">
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white cursor-pointer">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
                alt="Customer Service"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSearch className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">File Complaint</h3>
              <p className="text-gray-600">Submit your complaint with relevant details and supporting documents</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Processing</h3>
              <p className="text-gray-600">Admin verifies and assigns your complaint to the relevant officer</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resolution</h3>
              <p className="text-gray-600">Track progress and receive updates until your complaint is resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FileSearch className="h-6 w-6" />
                <span className="text-xl font-semibold">ComplaintCare</span>
              </div>
              <p className="text-gray-400">Making complaint resolution efficient and transparent.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 mr-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="mr-4">complaint.management.service@gmail.com</li>
                <li>+91 987456321</li>
                <li>Khelgaon Housing Complex, Ranchi</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}