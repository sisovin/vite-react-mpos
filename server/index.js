import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const DATA_SOURCE = process.env.DATA_SOURCE || 'dummy'
const DUMMY_API_URL = process.env.DUMMY_API_URL || 'https://dummyjson.com/products'
const WOO_BASE_URL = process.env.WOO_BASE_URL
const WOO_CONSUMER_KEY = process.env.WOO_CONSUMER_KEY
const WOO_CONSUMER_SECRET = process.env.WOO_CONSUMER_SECRET

function toClientProduct(p) {
  // Normalize product shape returned from provider(s) to the one used in frontend
  return {
    id: p.id,
    title: p.title || p.name,
    price: p.price || p.regular_price || p.price_html || 0,
    description: p.description || p.short_description || '',
    thumbnail: p.thumbnail || p.images?.[0]?.src || p.image || p.images?.[0]
  }
}

app.get('/api/products', async (req, res) => {
  try {
    let products = []
    if (DATA_SOURCE === 'dummy') {
      const r = await fetch(`${DUMMY_API_URL}`)
      const json = await r.json()
      // dummyjson returns { products: [...] }
      const list = json.products || json
      products = list.map(p => toClientProduct(p))
    } else if (DATA_SOURCE === 'woocommerce') {
      if (!WOO_BASE_URL || !WOO_CONSUMER_KEY || !WOO_CONSUMER_SECRET) {
        return res.status(400).json({ error: 'WooCommerce credentials missing' })
      }
      const url = new URL('/wp-json/wc/v3/products', WOO_BASE_URL)
      url.searchParams.set('consumer_key', WOO_CONSUMER_KEY)
      url.searchParams.set('consumer_secret', WOO_CONSUMER_SECRET)
      const r = await fetch(url.toString())
      const json = await r.json()
      products = json.map(p => toClientProduct(p))
    }
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch products' })
  }
})

app.get('/api/products/:id', async (req, res) => {
  const id = req.params.id
  try {
    if (DATA_SOURCE === 'dummy') {
      // dummyjson supports /products/:id
      const r = await fetch(`${DUMMY_API_URL}/${id}`)
      const p = await r.json()
      return res.json(toClientProduct(p))
    } else if (DATA_SOURCE === 'woocommerce') {
      const url = new URL(`/wp-json/wc/v3/products/${id}`, WOO_BASE_URL)
      url.searchParams.set('consumer_key', WOO_CONSUMER_KEY)
      url.searchParams.set('consumer_secret', WOO_CONSUMER_SECRET)
      const r = await fetch(url.toString())
      const p = await r.json()
      return res.json(toClientProduct(p))
    }
    res.status(404).json({ message: 'Not found' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Failed to fetch product' })
  }
})

app.post('/api/checkout', async (req, res) => {
  // Placeholder: In production this would create a payment session with a provider (Stripe/PayPal)
  // For demo: simply return a success message and total
  try {
    const items = req.body.items || []
    const total = items.reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0)
    res.json({ ok: true, total })
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Failed' })
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server (DATA_SOURCE=${DATA_SOURCE}) listening on ${process.env.PORT || 3000}`)
})
