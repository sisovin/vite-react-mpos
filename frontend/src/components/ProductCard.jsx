import React from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { add } = useCart()
  const { id, title, price, thumbnail, description } = product

  return (
    <div className="p-4 border rounded-md bg-white">
      <img src={thumbnail || product.image || ''} alt={title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-sm text-gray-600 my-2">{description}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="text-lg font-bold">${price}</div>
        <button
          onClick={() => add({ id, title, price, thumbnail })}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}
