import { useState } from 'react'

const useFilter = () => {
  const [types, setTypes] = useState({ rarity: 'Todas', series: 'Todas' })

  return { types, setTypes }
}

export default useFilter
