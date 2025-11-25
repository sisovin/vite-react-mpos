import React from 'react'
import useProducts from '../hooks/useProducts'
import ProductCard from './ProductCard'

export default function Products({ search = '' }) {
  const products = useProducts()
  const filtered = search ? products.filter(p => p.title?.toLowerCase().includes(search.toLowerCase())) : products
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtered?.length ? (
        filtered.map(p => <ProductCard key={p.id} product={p} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
