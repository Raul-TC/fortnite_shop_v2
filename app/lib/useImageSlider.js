"use client"
import { useEffect, useMemo, useState } from 'react'

export function useImageSlider (arrayImages) {
  const [counter, setCounter] = useState(0)
  const imagesMemo = useMemo(() => arrayImages, [arrayImages])

  useEffect(() => {
    const slider = setInterval(() => {
      setCounter((prevCounter) => 
    prevCounter === imagesMemo.length - 1 ? 0 : prevCounter + 1
  )
    }, 2000)

    return () => {
      clearInterval(slider)
    }
  }, [ imagesMemo])

  return { counter, imagesMemo }
}