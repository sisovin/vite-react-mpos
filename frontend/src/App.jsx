import React from 'react'
import { CartProvider } from './context/CartContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Checkout from './pages/Checkout'
import ProductsDashboard from './pages/ProductsDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pos" element={<ProductsDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
      </CartProvider>
    </BrowserRouter>
  )
}
