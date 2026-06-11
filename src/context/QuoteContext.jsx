import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { shopServices } from '../data/services'
import { DEFAULT_ZONE_ID } from '../data/serviceZones'
import { formatRetailRange, getServiceRetailPrice } from '../data/zonePriceDetail'
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

  const replaceCart = useCallback((serviceIds) => {
    const ids = [...new Set(serviceIds)]
    setCart(ids)
    saveQuoteCart(ids)
  }, [])

  const cartItems = useMemo(
    () =>
      shopServices
        .filter((s) => cart.includes(s.id))
        .map((service) => {
          const zoneId = assessment.zone || DEFAULT_ZONE_ID
          const retail = getServiceRetailPrice(zoneId, service.id)
          const priceRange = retail ? formatRetailRange(retail) : service.priceRange
          const basePrice = retail ? retail.low : service.basePrice
          return { ...service, priceRange, basePrice }
        }),
    [cart, assessment.zone]
  )
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
        replaceCart,
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
