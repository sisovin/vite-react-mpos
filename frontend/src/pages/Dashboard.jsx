import React, { useState, useEffect } from 'react'
// CartProvider removed from here; App.jsx provides global provider
import { useNavigate } from 'react-router-dom'

function OpenDayCard({ onStart, onCloseDay }) {
  const [cash, setCash] = useState('')
  const [stock, setStock] = useState('')
  const [cashier, setCashier] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const s = localStorage.getItem('mpos_day_started')
    setStarted(s === 'true')
    const c = localStorage.getItem('mpos_cashier_name') || ''
    setCashier(c)
  }, [])

  function startDay() {
    localStorage.setItem('mpos_day_started', 'true')
    localStorage.setItem('mpos_cash_open', cash || '0')
    localStorage.setItem('mpos_stock_open', stock || '0')
    if (cashier) localStorage.setItem('mpos_cashier_name', cashier)
    setStarted(true)
    if (onStart) onStart()
  }

  function closeDay() {
    localStorage.removeItem('mpos_day_started')
    localStorage.removeItem('mpos_cash_open')
    localStorage.removeItem('mpos_stock_open')
    localStorage.removeItem('mpos_cashier_name')
    setStarted(false)
    setCash('')
    setStock('')
    setCashier('')
  }

  if (started) {
    const cashOpen = localStorage.getItem('mpos_cash_open') || '0'
    const stockOpen = localStorage.getItem('mpos_stock_open') || '0'
    const cashierName = localStorage.getItem('mpos_cashier_name') || ''
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Day started</h3>
        <div className="text-sm text-gray-500 mb-2">Opening cash: <span className="font-medium ml-1">${Number(cashOpen).toFixed(2)}</span></div>
        <div className="text-sm text-gray-500 mb-3">Opening stock value: <span className="font-medium ml-1">{stockOpen}</span></div>
        {cashierName && <div className="text-sm text-gray-500 mb-3">Cashier: <span className="font-medium ml-1">{cashierName}</span></div>}
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
        <label className="block text-sm">
          Cashier name
          <input value={cashier} onChange={e => setCashier(e.target.value)} type="text" className="mt-1 block w-full rounded-md border-gray-200 shadow-sm px-3 py-2" placeholder="Cashier name" />
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
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // keep local state synced if other tabs change storage
    function onStorage(e) {
      if (e.key === 'mpos_day_started') setDayStarted(e.newValue === 'true')
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  const navigate = useNavigate()
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="py-6 bg-white shadow-sm">
          <div className="w-full px-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">M-POS</h1>
            <div className="text-sm text-gray-500">
              {dayStarted ? (
                <span>Day opened • Cashier: <span className="font-medium text-gray-700">{localStorage.getItem('mpos_cashier_name') || '—'}</span></span>
              ) : 'Day closed'}
            </div>
          </div>
        </header>

        <main className="w-full px-4 py-8 flex flex-col md:flex-row md:items-start gap-6 pb-24">
          <div className="w-full mb-4 flex items-center justify-between">
            {!posActive ? (
              <div className="flex items-center gap-3">
                <button onClick={() => { setPosActive(true); navigate('/pos') }} disabled={!dayStarted} className={`px-4 py-2 rounded ${dayStarted ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 cursor-not-allowed'}`}>
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
            <div className="flex items-center gap-3">
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search products" className="px-3 py-1 border rounded" />
            </div>
          </div>
          {posActive ? (
            <section className="w-full md:w-3/4">
              <div className="bg-white p-4 rounded-lg shadow mb-4 flex items-center justify-between">
                <div className="font-semibold">Point of Sale</div>
                <div className="text-sm text-gray-500">Serving cashier session</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/pos')} className={`px-4 py-2 rounded bg-blue-600 text-white`}>Open POS</button>
                <button onClick={() => setPosActive(false)} className="px-3 py-2 rounded bg-red-500 text-white">End Duty</button>
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
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => { window.dispatchEvent(new Event('mpos:newInvoice')); setPosActive(true); navigate('/pos') }}>New Invoice</button>
                    <button className="px-3 py-2 bg-gray-200 rounded" onClick={() => alert('Reports not implemented')}>Reports</button>
                  </div>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-2">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="font-semibold">Products</div>
                  <div className="text-sm text-gray-500">Open the POS to browse and add products to the cart.</div>
                  <div className="mt-3">
                    <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => navigate('/pos')}>Open POS / Products Dashboard</button>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* Do not show CartSummary inside Dashboard as requested */}
        </main>
      </div>
    </CartProvider>
  )
}
