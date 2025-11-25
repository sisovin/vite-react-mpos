import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Cart({ onClose }) {
  const { items, remove, clear, increment, decrement } = useCart()
  const total = items.reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0)
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <aside className="ml-auto w-full sm:w-96 bg-white h-full p-6 overflow-y-auto md:w-1/4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
        </div>

        <div>
          {items.length === 0 ? (
            <div className="text-gray-600">No items in cart</div>
          ) : (
            <div className="space-y-4 pb-24">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between border rounded p-3">
                  <div className="flex items-center space-x-3">
                    <img src={item.thumbnail || item.image} alt={item.title} className="w-14 h-14 object-cover rounded" />
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-gray-500">Qty: {item.qty}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${(item.price * item.qty).toFixed(2)}</div>
                    <div className="mt-2 flex items-center justify-end space-x-2">
                      <button onClick={() => decrement(item.id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                      <div className="w-6 text-center">{item.qty}</div>
                      <button onClick={() => increment(item.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                      <button onClick={() => remove(item.id)} className="text-red-500 hover:text-red-700 p-1 rounded ml-2" aria-label={`Remove ${item.title}`} title="Remove item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H3a1 1 0 000 2h1v9a2 2 0 002 2h6a2 2 0 002-2V6h1a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm2 4a1 1 0 012 0v7a1 1 0 11-2 0V6z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3">
                <div className="flex items-center justify-between font-bold">Total <span>${total.toFixed(2)}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky footer inside the cart modal */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t pt-3 pb-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Total: <span className="font-bold ml-2">${total.toFixed(2)}</span></div>
            <div className="flex items-center gap-2">
              <button onClick={() => { clear(); onClose(); }} className="px-3 py-2 bg-red-500 text-white rounded">Clear</button>
              <button onClick={() => { onClose(); navigate('/checkout') }} disabled={!items.length} aria-disabled={!items.length} className={`px-3 py-2 ${items.length ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'} rounded`}>Checkout</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
