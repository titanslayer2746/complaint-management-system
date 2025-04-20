'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const categories = [
  { label: "Municipal Officer", color: "blue" },
  { label: "Sanitation Officer", color: "green" },
  { label: "Water Department Officer", color: "teal" },
  { label: "Electricity Department Officer", color: "yellow" },
  { label: "Traffic Police", color: "red" },
  { label: "Police Officer", color: "purple" },
  { label: "HR Officer", color: "orange" },
  { label: "Legal Officer", color: "indigo" },
  { label: "Anti-Corruption Officer", color: "pink" },
  { label: "Consumer Rights Officer", color: "cyan" },
  { label: "Telecom Officer", color: "amber" },
]

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function RegisterOfficer() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    badgeId: '',
    category: '',
    phone: '',
  })
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${BASE_URL}/api/v1/officer/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      console.log('Register response:', data)

      if (data.success) {
        localStorage.setItem('token', data.token)
        // alert('Officer registered successfully!')
        toast.success('Officer registered successfully!')
        router.push('/officer')
      } else {
        // alert(data.message || 'Registration failed')
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Error:', error)
      // alert('Something went wrong!')
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-sky-100 to-sky-300">
      {/* Left: Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-sky-700">
            Register Officer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[ 
              { label: 'Name', name: 'name', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Password', name: 'password', type: 'password' },
              { label: 'Badge ID', name: 'badgeId', type: 'text' },
              { label: 'Phone', name: 'phone', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="block mb-1 font-medium text-gray-700">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
                  required
                />
              </div>
            ))}

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option
                    key={cat.label}
                    value={cat.label}
                    className={`text-${cat.color}-600`}
                    style={{ backgroundColor: `${cat.color}-50` }}
                  >
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 mt-8 cursor-pointer"
          >
            Register
          </button>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account?</span>
            <button
              type="button"
              onClick={() => router.push('/loginofficer')}
              className="ml-2 text-sky-600 hover:underline font-medium cursor-pointer"
            >
              Login
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
            Track, resolve, and manage citizen complaints with ease. Your role is
            crucial in maintaining trust and order. Register to continue your duties.
          </p>
        </div>
      </div>
    </div>
  )
}
