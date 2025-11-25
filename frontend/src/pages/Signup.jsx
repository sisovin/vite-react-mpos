import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // Placeholder create account
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your details to set up your M-POS account.</p>

        <button className="w-full mb-4 inline-flex items-center justify-center gap-3 border border-gray-200 py-2 rounded-md hover:bg-gray-50">
          <img src="/assets/google-icon.svg" alt="Google" className="h-5 w-5" />
          <span className="text-sm">Continue with Google</span>
        </button>

        <div className="relative my-3 text-center text-sm text-gray-400">or use your email</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-600">Full name</span>
            <input value={name} onChange={e => setName(e.target.value)} required type="text" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-1 focus:ring-blue-500" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">Email</span>
            <input value={email} onChange={e => setEmail(e.target.value)} required type="email" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-1 focus:ring-blue-500" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-600">Password</span>
            <input value={password} onChange={e => setPassword(e.target.value)} required type="password" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-1 focus:ring-blue-500" />
          </label>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md">Create account</button>
        </form>

        <div className="text-sm text-center text-gray-500 mt-4">
          Already have an account? <Link to="/signin" className="text-blue-600">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
