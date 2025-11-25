import React, { useState } from 'react'
import QrPaymentModal from './QrPaymentModal'

export default function CheckoutForm({ onSubmit, submitting }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cash'
  })
  const [qrOpen, setQrOpen] = useState(false)
  const [qrScanResult, setQrScanResult] = useState(null)

  function update(k, v) { setForm(s => ({ ...s, [k]: v })) }

  function submit(e) {
    e.preventDefault()
    if (!form.fullName || !form.address) return alert('Please fill name and address')
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border px-3 py-2 rounded" placeholder="Full name" value={form.fullName} onChange={e => update('fullName', e.target.value)} />
        <input className="border px-3 py-2 rounded" placeholder="Email" value={form.email} onChange={e => update('email', e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border px-3 py-2 rounded" placeholder="Phone" value={form.phone} onChange={e => update('phone', e.target.value)} />
        <input className="border px-3 py-2 rounded" placeholder="Address" value={form.address} onChange={e => update('address', e.target.value)} />
      </div>
      <div>
        <label className="text-sm font-medium">Payment Method</label>
        <div className="mt-2 flex items-center space-x-3">
          <label className="flex items-center space-x-2">
            <input type="radio" name="pm" checked={form.paymentMethod === 'cash'} onChange={() => update('paymentMethod', 'cash')} />
            <span>Cash</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="pm" checked={form.paymentMethod === 'card'} onChange={() => update('paymentMethod', 'card')} />
            <span>Card</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="pm" checked={form.paymentMethod === 'qr'} onChange={() => update('paymentMethod', 'qr')} />
            <span>QR Code</span>
          </label>
        </div>
      </div>
      {form.paymentMethod === 'qr' && (
        <div className="mt-2">
          <div className="text-sm mb-2">Use QR Code payment — show QR for the customer to scan, or scan their QR to accept the payment.</div>
          <div className="flex items-center gap-2">
            <button type="button" className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => setQrOpen(true)}>Open QR</button>
            <div>{qrScanResult ? <span className="text-green-600">Scanned: {qrScanResult}</span> : null}</div>
          </div>
        </div>
      )}
      {form.paymentMethod === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="border px-3 py-2 rounded" placeholder="Card number" />
          <input className="border px-3 py-2 rounded" placeholder="Expiry (MM/YY)" />
        </div>
      )}

      <div className="flex items-center justify-between">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit" disabled={submitting}>{submitting ? 'Placing order...' : 'Place order'}</button>
      </div>
      <QrPaymentModal open={qrOpen} onClose={() => setQrOpen(false)} payload={JSON.stringify(form)} onScanned={(d) => { setQrOpen(false); setQrScanResult(d) }} />
    </form>
  )
}
