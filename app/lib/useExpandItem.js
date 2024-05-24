'use client'
import { useState } from 'react'

export const useExpandItem = () => {
  const [expandedItem, setExpandedItem] = useState(null)

  const handleExpandItem = (index) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  return { expandedItem, handleExpandItem }
}
