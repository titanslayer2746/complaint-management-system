'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'citizen',
    adminSecret: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (payload.role !== 'admin') delete payload.adminSecret;

      const res = await fetch(`${BASE_URL}/api/v1/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('Register response:', data);

      if (data.success) {
        localStorage.setItem('token', data.token);
        const role = data.data?.role;
        router.push(role === 'admin' ? '/admin' : '/dashboard');
        toast.success('Registration successful! Welcome ' + role);
      } else {
        // alert(data.message || 'Registration failed');
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // alert('Something went wrong during registration.');
      toast.error('Something went wrong during registration.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-8 py-16">
      <form
  onSubmit={handleSubmit}
  className="bg-white w-full max-w-2xl p-10 rounded-2xl shadow-xl"
>
  <h2 className="text-3xl font-bold mb-6 text-center text-sky-700">
    Complaint Portal Register
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block mb-1 font-semibold text-gray-700">Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        required
      />
    </div>

    <div>
      <label className="block mb-1 font-semibold text-gray-700">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        required
      />
    </div>

    <div>
      <label className="block mb-1 font-semibold text-gray-700">Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        required
      />
    </div>

    <div>
      <label className="block mb-1 font-semibold text-gray-700">Phone</label>
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        required
      />
    </div>

    <div>
      <label className="block mb-1 font-semibold text-gray-700">Role</label>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
      >
        <option value="citizen">Citizen</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    {formData.role === 'admin' && (
      <div>
        <label className="block mb-1 font-semibold text-gray-700">Admin Secret</label>
        <input
          name="adminSecret"
          value={formData.adminSecret}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        />
      </div>
    )}
  </div>

  <button
    type="submit"
    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 mt-6 cursor-pointer"
  >
    Register
  </button>

  <div className="mt-6 text-center">
    <span className="text-gray-600">Already have an account?</span>
    <button
      type="button"
      onClick={() => router.push('/login')}
      className="ml-2 text-sky-600 hover:underline font-medium cursor-pointer"
    >
      Login
    </button>
  </div>
</form>

      </div>

      {/* Right: Image and Message */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-sky-500 to-blue-700 text-white items-center justify-center p-10 relative">
        <div className="text-center z-10">
          <h2 className="text-4xl font-bold mb-4">Join the Complaint Management Portal</h2>
          <p className="text-lg max-w-md mx-auto mb-6">
            Be a responsible citizen. Raise your voice and report issues effortlessly.
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
