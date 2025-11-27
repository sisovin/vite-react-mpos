import { useEffect, useState } from 'react'

export default function useProducts() {
  const [products, setProducts] = useState(null) // null = loading, [] = empty
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let abort = false
    async function load() {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) {
          const text = await res.text()
          throw new Error(`HTTP ${res.status}: ${text}`)
        }
        const json = await res.json()
        if (!abort) setProducts(json)
      } catch (err) {
        console.error('Failed to load products', err)
        if (!abort) setError(err.message || 'Failed to load products')
      } finally {
        if (!abort) setLoading(false)
      }
    }
    load()
    return () => { abort = true }
  }, [])

  return { products, loading, error }
}
