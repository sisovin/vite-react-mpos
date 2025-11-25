import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // Placeholder auth, in a real app call the backend
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-2">Sign in to M-POS</h2>
        <p className="text-sm text-gray-500 mb-6">Welcome back — enter your credentials to continue.</p>

        <button className="w-full mb-4 inline-flex items-center justify-center gap-3 border border-gray-200 py-2 rounded-md hover:bg-gray-50">
          <img src="/assets/google-icon.svg" alt="Google" className="h-5 w-5" />
          <span className="text-sm">Continue with Google</span>
        </button>

        <div className="relative my-3 text-center text-sm text-gray-400">or continue with email</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-600">Email</span>
            <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-1 focus:ring-blue-500" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">Password</span>
            <input value={password} onChange={e => setPassword(e.target.value)} required type="password" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-1 focus:ring-blue-500" />
          </label>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="rounded" /> Remember me</label>
            <Link to="#" className="text-sm text-blue-600">Forgot?</Link>
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md">Sign in</button>
        </form>

        <div className="text-sm text-center text-gray-500 mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-600">Create one</Link>
        </div>
      </div>
    </div>
  )
}
