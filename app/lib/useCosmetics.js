'use client'
import { useEffect, useState } from 'react'

export const useCosmetics = (allCosmetics) => {
  const [data, setData] = useState(allCosmetics.slice(0, 50))
  const [displayCount, setDisplayCount] = useState(50)
  const [filters, setFilters] = useState({ rareza: 'Todas', series: 'Todas', tipos: 'Todas', search: '' })

  const loadMoreData = () => {
    setDisplayCount(prevCount => prevCount + 50)
  }

  const handleFilters = (data) => {
    setFilters(data)
  }

  useEffect(() => {
    let filteredData = allCosmetics

    if (filters.rareza === 'Todas' && filters.series === 'Todas' && filters.tipos === 'Todas' && filters.search === '') {
      filteredData = allCosmetics
    }

    if (filters.rareza !== 'Todas') {
      // eslint-disable-next-line eqeqeq
      filteredData = filteredData.filter(el => el.rarity?.name.toUpperCase() == filters.rareza.toUpperCase())
    }

    if (filters.series !== 'Todas') {
      // eslint-disable-next-line eqeqeq
      filteredData = filteredData.filter(el => el.series?.name.toUpperCase() == filters.series.toUpperCase())
    }

    if (filters.tipos !== 'Todas') {
      // eslint-disable-next-line eqeqeq
      filteredData = filteredData.filter(el => el.type?.name.toUpperCase() == filters.tipos.toUpperCase())
    }
    if (filters.search !== '') {
      // eslint-disable-next-line eqeqeq
      filteredData = filteredData.filter(el => el.name.includes(filters.search))
    }
    setData(filteredData.slice(0, displayCount))
  }, [allCosmetics, filters, displayCount])

  return { data, filters, loadMoreData, handleFilters }
}
