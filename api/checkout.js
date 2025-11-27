// Vercel Serverless: POST /api/checkout
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const items = req.body.items || []
    const total = items.reduce((s, i) => s + (Number(i.price) || 0) * (i.qty || 1), 0)
    return res.status(200).json({ ok: true, total })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ ok: false, message: 'Failed' })
  }
}
