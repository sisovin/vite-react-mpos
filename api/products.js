// Vercel Serverless: GET /api/products
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const DATA_SOURCE = process.env.DATA_SOURCE || 'dummy'
  const DUMMY_API_URL = process.env.DUMMY_API_URL || 'https://dummyjson.com/products'
  const WOO_BASE_URL = process.env.WOO_BASE_URL
  const WOO_CONSUMER_KEY = process.env.WOO_CONSUMER_KEY
  const WOO_CONSUMER_SECRET = process.env.WOO_CONSUMER_SECRET

  function toClientProduct(p) {
    return {
      id: p.id,
      title: p.title || p.name,
      price: Number(p.price || p.regular_price || 0) || 0,
      description: p.description || p.short_description || '',
      thumbnail: p.thumbnail || p.images?.[0]?.src || p.image || p.images?.[0]
    }
  }

  try {
    let products = []
    if (DATA_SOURCE === 'dummy') {
      const r = await fetch(`${DUMMY_API_URL}`)
      const json = await r.json()
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

    return res.status(200).json(products)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Failed to fetch products' })
  }
}
