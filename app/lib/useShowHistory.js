import { useEffect, useState } from 'react'

export function useShowHistory (item) {
  const [showHistory, setShowHistory] = useState(false)
  const [reversedHistory, setReversedHistory] = useState([])

  useEffect(() => {
    if (item.shopHistory.length > 0) {
      const clone = item.shopHistory ? item.shopHistory.slice(0).reverse() : null

      const fechasLocales = clone.map(fecha => new Date(fecha))

      setReversedHistory(fechasLocales)
    }
  }, [item.shopHistory])

  const handleShowHistory = () => {
    setShowHistory(!showHistory)
  }

  return { showHistory, reversedHistory, handleShowHistory }
}
