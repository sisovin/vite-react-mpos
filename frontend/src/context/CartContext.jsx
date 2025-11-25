import React, { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i)
      }
    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map(i => i.id === action.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i)
          .filter(i => i.qty > 0)
      }
    case 'ADD': {
      const found = state.items.find(i => i.id === action.item.id)
      if (found) {
        return {
          ...state,
          items: state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        }
      }
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const value = {
    items: state.items,
    add: item => dispatch({ type: 'ADD', item }),
    remove: id => dispatch({ type: 'REMOVE', id }),
    clear: () => dispatch({ type: 'CLEAR' }),
    increment: id => dispatch({ type: 'INCREMENT', id }),
    decrement: id => dispatch({ type: 'DECREMENT', id })
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
