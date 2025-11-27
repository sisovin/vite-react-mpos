import React from 'react'
import useProducts from '../hooks/useProducts'
import ProductCard from './ProductCard'

export default function Products({ search = '' }) {
  const { products, loading, error } = useProducts()
  const filtered = products && search ? products.filter(p => p.title?.toLowerCase().includes(search.toLowerCase())) : products
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : filtered?.length ? (
        filtered.map(p => <ProductCard key={p.id} product={p} />)
      ) : (
        <p>No products</p>
      )}
    </div>
  )
}
