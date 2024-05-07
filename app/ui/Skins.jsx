'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import BackgroundCard from './BackgroundCard'
import Menu from './Menu'

const Skins = ({ allCosmetics, rarities }) => {
  const [data, setData] = useState(allCosmetics.slice(0, 50))
  const [displayCount, setDisplayCount] = useState(50)
  const [filters, setFilters] = useState({ rarity: 'Todas', series: 'Todas' })
  // const [types, setTypes] = useState({ rarity: 'Todas', series: 'Todas' })
  const [expandedItem, setExpandedItem] = useState(null)

  const loadMoreData = () => {
    setDisplayCount(prevCount => prevCount + 50)
  }

  const handleFilters = (type, data) => {

  }
  useEffect(() => {
    let filteredData = allCosmetics

    if (filters.rarity === 'Todas' && filters.series === 'Todas') {
      filteredData = allCosmetics
    }

    if (filters.rarity !== 'Todas') {
      // eslint-disable-next-line eqeqeq
      filteredData = filteredData.filter(el => el.rarity?.name.toUpperCase() == filters.rarity.toUpperCase())
      console.log(filteredData)
    }

    if (filters.series !== 'Todas') {
      // eslint-disable-next-line eqeqeq
      filteredData = filteredData.filter(el => el.series?.name.toUpperCase() == filters.series.toUpperCase())
      console.log(filteredData)
    }
    setData(filteredData.slice(0, displayCount))
  }, [allCosmetics, filters, displayCount])

  const handleClick = (index) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  return (
    <>
      <div className='flex gap-4 flex-wrap'>

        {rarities.map((item, index) => {
          return Object.entries(item).map(([key, value]) => {
            console.log(key)
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
            return (

              <Link
                key={`${index}_${child.id}`}
                href={`/shop/${child.id}`}
                className=' rounded-lg shadow-md self-start cursor-pointer'
              >

                <div className='relative w-full h-full '>

                  <img src={child.images.icon_background} alt={`image_${child.name}`} className='w-full h-full rounded-md' />
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
