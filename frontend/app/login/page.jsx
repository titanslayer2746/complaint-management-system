'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/v1/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('token', data.token);

        const role = data.data.role;
        if (role === 'admin') {
          router.push('/admin');
          toast.success('Welcome Admin');
        } else if (role === 'citizen') {
          router.push('/dashboard');
          toast.success('Welcome User');
        } else {
          // console.warn('Unknown role:', role);
          toast.warn('Unknown role: ' + role);
        }
      } else {
        // alert('Login failed: ' + data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-10 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-sky-700">Complaint Portal Login</h2>

          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 cursor-pointer"
          >
            Login
          </button>

          <div className="mt-6 text-center">
            <span className="text-gray-600">Don't have an account?</span>
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="ml-2 text-sky-600 hover:underline font-medium cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      {/* Right: Image and Message */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-sky-500 to-blue-700 text-white items-center justify-center p-10 relative">
        <div className="text-center z-10">
          <h2 className="text-4xl font-bold mb-4">Welcome to Complaint Management</h2>
          <p className="text-lg max-w-md mx-auto mb-6">
            Report issues quickly and easily. We're here to ensure your voice is heard.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2847/2847697.png"
            alt="Complaint illustration"
            className="w-72 h-auto mx-auto drop-shadow-xl"
          />
        </div>

        {/* Decorative Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-0" />
      </div>
    </div>
  );
}
