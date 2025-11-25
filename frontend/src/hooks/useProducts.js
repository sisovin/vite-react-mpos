import { useEffect, useState } from 'react'

export default function useProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let abort = false
    async function load() {
      try {
        const res = await fetch('/api/products')
        const json = await res.json()
        if (!abort) setProducts(json)
      } catch (err) {
        console.error('Failed to load products', err)
      }
    }
    load()
    return () => { abort = true }
  }, [])

  return products
}
