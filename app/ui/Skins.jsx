'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import BackgroundCard from './BackgroundCard'
import Menu from './Menu'

const Skins = ({ allCosmetics, rarities }) => {
  const [data, setData] = useState(allCosmetics.slice(0, 50))
  const [displayCount, setDisplayCount] = useState(50)
  const [filters, setFilters] = useState({ rareza: 'Todas', series: 'Todas', tipos: 'Todas' })
  // const [types, setTypes] = useState({ rarity: 'Todas', series: 'Todas' })
  const [expandedItem, setExpandedItem] = useState(null)

  const loadMoreData = () => {
    setDisplayCount(prevCount => prevCount + 50)
  }

  const handleFilters = (type, data) => {

  }
  useEffect(() => {
    let filteredData = allCosmetics

    if (filters.rareza === 'Todas' && filters.series === 'Todas' && filters.tipos !== 'Todas') {
      filteredData = allCosmetics
    }

    if (filters.rareza !== 'Todas') {
      // eslint-disable-next-line eqeqeq
      filteredData = filteredData.filter(el => el.rarity?.name.toUpperCase() == filters.rareza.toUpperCase())
      console.log(filteredData)
    }

    if (filters.series !== 'Todas') {
      // eslint-disable-next-line eqeqeq
      filteredData = filteredData.filter(el => el.series?.name.toUpperCase() == filters.series.toUpperCase())
      console.log(filteredData)
    }

    if (filters.tipos !== 'Todas') {
      // eslint-disable-next-line eqeqeq
      filteredData = filteredData.filter(el => {
        // console.log(el.type?.name)
        // eslint-disable-next-line eqeqeq
        return el.type?.name.toUpperCase() == filters.tipos.toUpperCase()
      })
      // console.log(filteredData)
    }
    setData(filteredData.slice(0, displayCount))
  }, [allCosmetics, filters, displayCount])

  const handleClick = (index) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  // console.log(rarities)
  return (
    <>
      <div className='flex gap-4 flex-wrap'>

        {rarities.map((item, index) => {
          return Object.entries(item).map(([key, value]) => {
            // console.log(key)
            return (
              <Menu key={`${index}_${key}`} nameType={key} handleClick={handleClick} index={index} value={value} handleFilters={handleFilters} expandedItem={expandedItem} setFilters={setFilters} filters={filters} setExpandedItem={setExpandedItem} />
            )
          })
        })}
      </div>
      <InfiniteScroll
        dataLength={data.length} hasMore={data.length < allCosmetics.length} next={loadMoreData}
      >
        <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 grid-flow-dense h-full w-full mt-8'>
          {data.map((child, index) => {
            // console.log(child.bg)
            return (

              <Link
                key={`${index}_${child.id}`}
                href={`/shop/${child.id}`}
                className=' rounded-lg shadow-md self-start cursor-pointer'
              >

                <div className='relative w-full h-full '>
                  <img src={child.images.icon} alt={`image_${child.name}`} className='w-full h-full rounded-md absolute ' />
                  <img src={child.bg === '' ? child.bgDefault : child.bg} alt='' className='w-full h-full ' />
                  <BackgroundCard displayName={child.name} price={child.price.regularPrice} />
                </div>

              </Link>

            )
          })}
        </div>
      </InfiniteScroll>
    </>
  )
}

export default Skins
