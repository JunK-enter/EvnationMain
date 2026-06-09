import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { shopServices } from '../data/services'
import { getQuoteCart, saveQuoteCart } from '../services/storage'

const QuoteContext = createContext(null)

export function QuoteProvider({ children }) {
  const [cart, setCart] = useState([])
  const [assessment, setAssessment] = useState({})

  useEffect(() => {
    setCart(getQuoteCart())
  }, [])

  const addToQuote = useCallback((serviceId) => {
    setCart((prev) => {
      if (prev.includes(serviceId)) return prev
      const next = [...prev, serviceId]
      saveQuoteCart(next)
      return next
    })
  }, [])

  const removeFromQuote = useCallback((serviceId) => {
    setCart((prev) => {
      const next = prev.filter((id) => id !== serviceId)
      saveQuoteCart(next)
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    saveQuoteCart([])
  }, [])

  const cartItems = shopServices.filter((s) => cart.includes(s.id))
  const cartTotal = cartItems.reduce((sum, item) => sum + item.basePrice, 0)

  return (
    <QuoteContext.Provider
      value={{
        cart,
        cartItems,
        cartTotal,
        addToQuote,
        removeFromQuote,
        clearCart,
        assessment,
        setAssessment,
        isInCart: (id) => cart.includes(id),
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote must be used within QuoteProvider')
  return ctx
}
