import React, { useState, useEffect } from 'react'
import { CartProvider } from '../context/CartContext'
import Products from '../components/Products'
import CartSummary from '../components/CartSummary'

function OpenDayCard({ onStart, onCloseDay }) {
  const [cash, setCash] = useState('')
  const [stock, setStock] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const s = localStorage.getItem('mpos_day_started')
    setStarted(s === 'true')
  }, [])

  function startDay() {
    localStorage.setItem('mpos_day_started', 'true')
    localStorage.setItem('mpos_cash_open', cash || '0')
    localStorage.setItem('mpos_stock_open', stock || '0')
    setStarted(true)
    if (onStart) onStart()
  }

  function closeDay() {
    localStorage.removeItem('mpos_day_started')
    localStorage.removeItem('mpos_cash_open')
    localStorage.removeItem('mpos_stock_open')
    setStarted(false)
    setCash('')
    setStock('')
  }

  if (started) {
    const cashOpen = localStorage.getItem('mpos_cash_open') || '0'
    const stockOpen = localStorage.getItem('mpos_stock_open') || '0'
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Day started</h3>
        <div className="text-sm text-gray-500 mb-2">Opening cash: <span className="font-medium ml-1">${Number(cashOpen).toFixed(2)}</span></div>
        <div className="text-sm text-gray-500 mb-3">Opening stock value: <span className="font-medium ml-1">{stockOpen}</span></div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-red-500 text-white rounded" onClick={() => { closeDay(); if (onCloseDay) onCloseDay() }}>Close Day</button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold mb-2">Open day</h3>
      <div className="text-sm text-gray-500 mb-2">Enter opening balances to start your shop for the day.</div>
      <div className="space-y-2">
        <label className="block text-sm">
          Cash on hand
          <input value={cash} onChange={e => setCash(e.target.value)} type="number" min="0" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2" placeholder="0.00" />
        </label>
        <label className="block text-sm">
          Stock opening value (optional)
          <input value={stock} onChange={e => setStock(e.target.value)} type="text" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2" placeholder="Number of items or total value" />
        </label>
      </div>
      <div className="mt-4 flex gap-2">
        <button disabled={!cash} onClick={startDay} className={`px-4 py-2 rounded ${cash ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>Start Day</button>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [posActive, setPosActive] = useState(() => {
    try { return localStorage.getItem('mpos_pos_active') === 'true' } catch { return false }
  })

  useEffect(() => {
    try { localStorage.setItem('mpos_pos_active', posActive ? 'true' : 'false') } catch { }
  }, [posActive])

  const [dayStarted, setDayStarted] = useState(() => {
    try { return localStorage.getItem('mpos_day_started') === 'true' } catch { return false }
  })

  useEffect(() => {
    // keep local state synced if other tabs change storage
    function onStorage(e) {
      if (e.key === 'mpos_day_started') setDayStarted(e.newValue === 'true')
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="py-6 bg-white shadow-sm">
          <div className="w-full px-4">
            <h1 className="text-3xl font-bold">M-POS</h1>
          </div>
        </header>

        <main className="w-full px-4 py-8 flex flex-col md:flex-row md:items-start gap-6 pb-24">
          <div className="w-full mb-4 flex items-center justify-between">
            {!posActive ? (
              <div className="flex items-center gap-3">
                <button onClick={() => setPosActive(true)} disabled={!dayStarted} className={`px-4 py-2 rounded ${dayStarted ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 cursor-not-allowed'}`}>
                  Start Cashier Duty
                </button>
                {!dayStarted && <div className="text-sm text-gray-500">Open the day to enable POS</div>}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-700 font-medium">POS Active</div>
                <button onClick={() => setPosActive(false)} className="px-3 py-2 rounded bg-red-500 text-white">End Duty</button>
              </div>
            )}
          </div>
          {posActive ? (
            <section className="w-full md:w-3/4">
              <div className="bg-white p-4 rounded-lg shadow mb-4 flex items-center justify-between">
                <div className="font-semibold">Point of Sale</div>
                <div className="text-sm text-gray-500">Serving cashier session</div>
              </div>
              <div>
                <Products />
              </div>
            </section>
          ) : (
            <section className="w-full md:w-3/4 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <OpenDayCard onStart={() => setDayStarted(true)} onCloseDay={() => setDayStarted(false)} />
              </div>
              <div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold mb-2">Quick actions</h3>
                  <div className="text-sm text-gray-600">Open a new invoice, runs reports, or quick search products.</div>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-2">
                <Products />
              </div>
            </section>
          )}
          <section className="w-full md:w-1/4">
            {/* CartSummary should be visible in both Dashboard and POS mode - keep it present */}
            <CartSummary />
          </section>
        </main>
      </div>
    </CartProvider>
  )
}
