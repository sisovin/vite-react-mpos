import React, { useState } from 'react'
import CheckoutForm from '../components/CheckoutForm'
import OrderSummary from '../components/OrderSummary'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const { items, clear } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  async function placeOrder(payload) {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items, ...payload }) })
      const json = await res.json()
      if (json.ok) {
        setSuccess(json)
        clear()
        setTimeout(() => { navigate('/') }, 2000)
      } else {
        alert('Checkout failed')
      }
    } catch (err) {
      console.error(err)
      alert('Checkout failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
          <CheckoutForm onSubmit={placeOrder} submitting={loading} />
          {success && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">Order placed! Total: ${success.total}</div>
          )}
        </div>
        <div className="md:col-span-1 bg-gray-950 text-gray-100 p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  )
}
