import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('Uncaught error in component tree', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center text-center p-4">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <div className="text-sm text-gray-600 mb-4">An unexpected error occurred. Try refreshing the page or contact support.</div>
            <button onClick={() => window.location.reload()} className="px-3 py-2 bg-blue-600 text-white rounded">Reload</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
