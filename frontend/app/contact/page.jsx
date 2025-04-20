'use client'

import { useState } from 'react'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Thank you for contacting us! We'll get back to you soon.")
    // Optionally send data to backend here
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-sky-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left: Contact Info */}
        <div className="bg-sky-600 text-white p-10 flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6 text-sky-100">
            We're here to help and answer any question you might have.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">📍 Address</h4>
              <p className="text-sky-100">Complaint Managament House, Ranchi, Jharkhand</p>
            </div>
            <div>
              <h4 className="font-semibold">📞 Phone</h4>
              <p className="text-sky-100">+91 98765 43210</p>
            </div>
            <div>
              <h4 className="font-semibold">✉️ Email</h4>
              <p className="text-sky-100">complaint.management.service@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="flex-1 p-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
