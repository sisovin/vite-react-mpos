import React, { useState } from 'react'
import CheckoutForm from '../components/CheckoutForm'
import OrderSummary from '../components/OrderSummary'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white w-full md:w-3/5 rounded-t-lg md:rounded-lg p-4 md:p-6 z-50">
        {children}
      </div>
    </div>
  )
}

export default function PlaceOrder() {
  const { items, clear } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [formOpen, setFormOpen] = useState(false)

  async function placeOrder(payload) {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items, ...payload }) })
      const json = await res.json()
      if (json.ok) {
        setSuccess(json)
        clear()
        setTimeout(() => { navigate('/dashboard') }, 1500)
      } else {
        alert('Checkout failed')
      }
    } catch (err) {
      console.error(err)
      alert('Checkout failed')
    } finally { setLoading(false) }
  }

  const total = items.reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Review Order</h2>
          <OrderSummary />
          {success && <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">Order placed! Total: ${success.total}</div>}
        </div>
        <aside className="md:col-span-1 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Checkout</h3>
          <div className="text-sm text-gray-600 mb-4">Total: <span className="font-bold">${total.toFixed(2)}</span></div>
          <div className="hidden md:block">
            <CheckoutForm onSubmit={placeOrder} submitting={loading} />
          </div>
        </aside>
      </div>

      {/* Mobile sticky footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-3 flex items-center justify-between gap-3">
        <div className="text-sm">Total: <span className="font-semibold">${total.toFixed(2)}</span></div>
        <div>
          <button onClick={() => setFormOpen(true)} className={`px-4 py-3 bg-green-500 text-white rounded`}>{loading ? 'Placing...' : 'Place order'}</button>
        </div>
      </div>

      {formOpen && (
        <Modal onClose={() => setFormOpen(false)}>
          <h3 className="text-lg font-semibold mb-3">Place Order</h3>
          <CheckoutForm onSubmit={(f) => { setFormOpen(false); placeOrder(f) }} submitting={loading} />
        </Modal>
      )}
    </div>
  )
}
