import React from 'react'
import { Link } from 'react-router-dom'

export default function Onboarding() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl w-full mx-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="p-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">Welcome to M-POS</h1>
          <p className="text-lg text-gray-600 mb-6">A modern POS for small and medium retailers. Track sales, manage your stock, and start your day with confidence.</p>
          <div className="flex items-center gap-3">
            <Link to="/signin" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">Get Started</Link>
            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100">Sign Up</Link>
          </div>
          <ul className="mt-6 text-sm text-gray-500 space-y-2">
            <li>• Easy checkout and returns</li>
            <li>• Track cash & stock daily</li>
            <li>• Print invoices and QR payments</li>
          </ul>
        </div>
        <div className="flex items-center justify-center p-6">
          <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center">
            <img src="/assets/onboarding-illustration.svg" alt="Onboarding illustration" className="max-h-full max-w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
