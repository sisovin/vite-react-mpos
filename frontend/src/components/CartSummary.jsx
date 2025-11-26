import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import Cart from './Cart'
import { useNavigate } from 'react-router-dom'

export default function CartSummary() {
  const { items, remove, clear, increment, decrement } = useCart()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const total = items.reduce((s, i) => s + (Number(i.price) || 0) * i.qty, 0)
  function checkout() {
    try {
      // Create a print-friendly invoice and open it in a new window
      const itemsHtml = items.map(i => `<tr><td>${i.title}</td><td>${i.qty}</td><td>$${(i.price * i.qty).toFixed(2)}</td></tr>`).join('')
      const html = `<!doctype html><html><head><meta charset="utf-8"/><title>Invoice</title><style>body{font-family:sans-serif;padding:20px}table{width:100%;border-collapse:collapse}td,th{border-bottom:1px solid #ddd;padding:8px;text-align:left}thead th{font-weight:bold}</style></head><body><h1>Invoice</h1><table><thead><tr><th>Product</th><th>Qty</th><th>Line Total</th></tr></thead><tbody>${itemsHtml}</tbody></table><div style="margin-top:18px;font-weight:bold">Total: $${total.toFixed(2)}</div><script>setTimeout(()=>{window.print();},200);</script></body></html>`
      const w = window.open('', '_blank', 'noopener,noreferrer')
      if (!w) return alert('Unable to open print window — please allow popups for this site')
      w.document.write(html)
      w.document.close()
    } catch (err) { console.error(err); alert('Checkout failed') }
  }

  return (
    <>
      {/* Mobile: small button to open the cart modal */}
      {/* Mobile: bottom bar - quick access to cart and checkout */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => setIsOpen(true)}>Cart ({items.length})</button>
          <div className="text-sm">Total: <span className="font-semibold">${total.toFixed(2)}</span></div>
        </div>
          <div>
          <button className={`px-4 py-2 rounded ${items.length ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`} onClick={() => { if (items.length) { setIsOpen(false); navigate('/place-order') } }} disabled={!items.length}>Checkout</button>
        </div>
      </div>

      {/* Desktop: 25% Sidebar */}
      <aside className="hidden md:block bg-gray-950 text-gray-100 border-l border-gray-800 p-4 h-full overflow-auto sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-white">Cart</div>
          <div className="text-sm text-gray-300">{items.length} items</div>
        </div>

        <div className="text-sm text-gray-200 overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-800">
                <th className="py-2">No.</th>
                <th className="py-2">Product</th>
                <th className="py-2">Qty</th>
                <th className="py-2 text-right">Price</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} className="border-b border-gray-800">
                  <td className="py-2 align-top">{idx + 1}</td>
                  <td className="py-2 align-top max-w-[140px]"><div className="truncate">{item.title}</div></td>
                  <td className="py-2 align-top">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => decrement(item.id)} className="px-2 py-1 bg-gray-800 text-white rounded">-</button>
                      <div className="w-8 text-center">{item.qty}</div>
                      <button onClick={() => increment(item.id)} className="px-2 py-1 bg-gray-800 text-white rounded">+</button>
                    </div>
                  </td>
                  <td className="py-2 align-top text-right text-gray-100">${(item.price * item.qty).toFixed(2)}</td>
                  <td className="py-2 align-top text-right">
                    <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-300 p-1 rounded" aria-label={`Remove ${item.title}`} title="Remove item">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H3a1 1 0 000 2h1v9a2 2 0 002 2h6a2 2 0 002-2V6h1a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm2 4a1 1 0 012 0v7a1 1 0 11-2 0V6z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 border-t border-gray-800 pt-3">
          <div className="flex items-center justify-between font-bold text-lg text-white">Total<span className="text-gray-100">${total.toFixed(2)}</span></div>
            <div className="mt-3 space-x-2">
            <button className="px-3 py-2 bg-green-500 text-white rounded" onClick={() => navigate('/place-order')}>Checkout</button>
            <button className="px-3 py-2 bg-red-500 text-white rounded" onClick={clear}>Clear</button>
          </div>
        </div>
      </aside>

      {isOpen && <Cart onClose={() => setIsOpen(false)} />}
    </>
  )
}
