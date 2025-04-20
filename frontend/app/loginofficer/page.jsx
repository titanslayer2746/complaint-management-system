'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export default function LoginOfficer() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${BASE_URL}/api/v1/officer/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      console.log('Login response:', data)

      if (data.success) {
        localStorage.setItem('token', data.token)
        // alert('Login successful!')
        toast.success('Login successful!')
        router.push('/officer')
      } else {
        // alert(data.message || 'Login failed')
        toast.error(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Error logging in:', error)
      // alert('Something went wrong')
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-sky-100 to-sky-300">
      {/* Left: Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-sky-700">
            Officer Login
          </h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 cursor-pointer"
          >
            Login
          </button>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Don&apos;t have an account?</span>
            <button
              type="button"
              onClick={() => router.push('/registerofficer')}
              className="ml-2 text-sky-600 hover:underline font-medium cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Right: Image and Text */}
      <div className="hidden md:flex flex-1 bg-sky-200 items-center justify-center p-10 relative">
        <div className="max-w-lg text-center">
          <img
            src="https://rocketflow.in/resources/blog/images/complaint-management-banner.jpeg"
            alt="Officer and Complaint Management"
            className="rounded-xl shadow-lg mb-6 w-full"
          />
          <h3 className="text-2xl font-bold text-sky-800 mb-2">Welcome Officer</h3>
          <p className="text-sky-900">
            Track, resolve and manage citizen complaints with ease. Your role is
            crucial in maintaining trust and order. Log in to continue your duties.
          </p>
        </div>
      </div>
    </div>
  )
}
