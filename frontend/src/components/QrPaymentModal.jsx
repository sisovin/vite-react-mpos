import React, { useRef, useState, useEffect } from 'react'
import jsQR from 'jsqr'

export default function QrPaymentModal({ open, onClose, payload = 'payment://example/123456', onScanned }) {
  const [tab, setTab] = useState('show')
  const [scanResult, setScanResult] = useState(null)
  const [cameraOn, setCameraOn] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  let animationId = useRef(null)

  useEffect(() => {
    if (!open) return
    setTab('show')
    setScanResult(null)
    return () => { stopCamera() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function stopCamera() {
    setCameraOn(false)
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(t => t.stop())
      videoRef.current.srcObject = null
    }
    if (animationId.current) cancelAnimationFrame(animationId.current)
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) videoRef.current.srcObject = stream
      setCameraOn(true)
      videoRef.current.play()
      animationId.current = requestAnimationFrame(tick)
    } catch (err) { console.error('Camera failed', err); alert('Camera not available') }
  }

  function tick() {
    if (!videoRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      animationId.current = requestAnimationFrame(tick)
      return
    }
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const code = jsQR(imageData.data, imageData.width, imageData.height)
    if (code) {
      setScanResult(code.data)
      onScanned?.(code.data)
      stopCamera()
      return
    }
    animationId.current = requestAnimationFrame(tick)
  }

  function handleFile(e) {
    const f = e.target.files?.[0]
    if (!f) return
    const img = new Image()
    const url = URL.createObjectURL(f)
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      if (code) {
        setScanResult(code.data)
        onScanned?.(code.data)
      } else {
        alert('No QR code found in this image')
      }
      URL.revokeObjectURL(url)
    }
    img.src = url
  }

  if (!open) return null
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(payload)}`
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">QR Code Payment</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => { stopCamera(); onClose() }}>Close</button>
        </div>
        <div className="mb-4">
          <div className="flex space-x-2">
            <button className={`px-3 py-1 rounded ${tab === 'show' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setTab('show')}>Show QR</button>
            <button className={`px-3 py-1 rounded ${tab === 'scan' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setTab('scan')}>Scan QR</button>
          </div>
        </div>
        {tab === 'show' ? (
          <div className="flex flex-col items-center gap-3">
            <img src={qrUrl} alt="Payment QR" className="border p-2 bg-white" />
            <div className="text-sm text-gray-500">Scan this QR code with your device to complete payment.</div>
            <div className="pt-2 w-full flex justify-end space-x-2">
              <button className="px-3 py-2 bg-gray-200 rounded" onClick={() => { navigator.clipboard?.writeText(payload); alert('Copied') }}>Copy payload</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex gap-3 mb-3">
              <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={() => { if (!cameraOn) startCamera(); else stopCamera() }}>{cameraOn ? 'Stop Camera' : 'Use Camera'}</button>
              <label className="px-3 py-2 bg-gray-200 rounded cursor-pointer">
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />Upload Image
              </label>
            </div>
            <div className="w-full h-64 bg-black flex items-center justify-center rounded">
              {cameraOn ? (
                <video ref={videoRef} className="w-full h-full object-cover" muted />
              ) : (
                <div className="text-gray-400 text-sm">Camera off. Upload or enable camera.</div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            {scanResult && <div className="mt-3 text-green-600">Scanned: {scanResult}</div>}
          </div>
        )}
      </div>
    </div>
  )
}
