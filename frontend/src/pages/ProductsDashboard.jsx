import React, { useState, useEffect } from 'react'
// CartProvider removed; App.jsx wraps the whole app instead
import Products from '../components/Products'
import CartSummary from '../components/CartSummary'
import { useNavigate } from 'react-router-dom'

export default function ProductsDashboard() {
  const navigate = useNavigate()
  const [dayStarted, setDayStarted] = useState(() => {
    try { return localStorage.getItem('mpos_day_started') === 'true' } catch { return false }
  })
  const [posActive, setPosActive] = useState(() => {
    try { return localStorage.getItem('mpos_pos_active') === 'true' } catch { return false }
  })
  useEffect(() => { try { localStorage.setItem('mpos_pos_active', posActive ? 'true' : 'false') } catch { } }, [posActive])
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    function onStorage(e) {
      if (e.key === 'mpos_day_started') setDayStarted(e.newValue === 'true')
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    // Enter POS if not yet active
    if (!posActive) setPosActive(true)
  }, [])

  return (
      <div className="min-h-screen bg-gray-50">
        <header className="py-6 bg-white shadow-sm">
          <div className="w-full px-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">M-POS — Products</h1>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">{dayStarted ? `Day opened • Cashier: ${localStorage.getItem('mpos_cashier_name') || '—'}` : 'Day closed'}</div>
              <button onClick={() => { setPosActive(false); navigate('/dashboard') }} className="px-3 py-2 rounded bg-red-500 text-white">End Duty</button>
            </div>
          </div>
        </header>

        <main className="w-full px-4 py-8 flex flex-col md:flex-row md:items-start gap-6 pb-24">
          <section className="w-full md:w-3/4">
            <div className="bg-white p-4 rounded-lg shadow mb-4 flex items-center justify-between">
              <div className="font-semibold">Point of Sale</div>
              <div className="text-sm text-gray-500">Serving cashier session</div>
            </div>

            <div className="mb-4">
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products" className="px-3 py-2 border rounded w-full md:w-1/2" />
            </div>

            <div>
              <Products search={searchQuery} />
            </div>
          </section>
          <section className="w-full md:w-1/4">
            <CartSummary />
          </section>
        </main>
      </div>
  )
}
