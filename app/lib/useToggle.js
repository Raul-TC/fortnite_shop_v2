'use client'
import { useState } from 'react'

export default function useToggle (initialState = false) {
  const [state, setState] = useState(initialState)

  const handleToggle = () => setState((prevState) => !prevState)

  return [state, handleToggle]
}
