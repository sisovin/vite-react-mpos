import React from 'react'
import { useCart } from '../context/CartContext'

export default function OrderSummary({ items: propItems }) {
  const { items: ctxItems } = useCart()
  const items = propItems || ctxItems
  const subtotal = items.reduce((s, i) => s + (Number(i.price) || 0) * i.qty, 0)
  const shipping = items.length ? 5 : 0
  const total = subtotal + shipping

  return (
    <div className="space-y-4 text-gray-800">
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-sm text-gray-400">Your cart is empty</div>
        ) : (
          items.map(it => (
            <div key={it.id} className="flex items-center justify-between">
              <div className="text-sm">{it.title} <span className="text-xs text-gray-400">x{it.qty}</span></div>
              <div className="font-medium">${(it.price * it.qty).toFixed(2)}</div>
            </div>
          ))
        )}
      </div>
      <div className="border-t border-gray-800 pt-2 text-sm">
        <div className="flex items-center justify-between"><span className="text-gray-800">Subtotal</span><span className="text-gray-800">${subtotal.toFixed(2)}</span></div>
        <div className="flex items-center justify-between"><span className="text-gray-800">Shipping</span><span className="text-gray-800">${shipping.toFixed(2)}</span></div>
        <div className="flex items-center justify-between font-bold text-lg mt-2"><span>Total</span><span className="text-gray-800">${total.toFixed(2)}</span></div>
      </div>
    </div>
  )
}
