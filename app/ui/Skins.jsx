'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import BackgroundCard from './BackgroundCard'
import Menu from './Menu'

const Skins = ({ allCosmetics, rarities }) => {
  const [data, setData] = useState(allCosmetics.slice(0, 50))
  const [displayCount, setDisplayCount] = useState(50)
  const [filters, setFilters] = useState({ rareza: 'Todas', series: 'Todas', tipos: 'Todas', search: '' })
  const [expandedItem, setExpandedItem] = useState(null)

  const loadMoreData = () => {
    setDisplayCount(prevCount => prevCount + 50)
  }

  useEffect(() => {
    let filteredData = allCosmetics

    console.log(filters.rareza === 'Todas' && filters.series === 'Todas' && filters.tipos === 'Todas' && filters.search === '')
    if (filters.rareza === 'Todas' && filters.series === 'Todas' && filters.tipos === 'Todas' && filters.search === '') {
      filteredData = allCosmetics
      console.log('entro')
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

  const handleClick = (index) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  return (
    <>
      <div className='flex gap-4 flex-wrap  justify-between items-center'>

        <input
          name='searchSkin' placeholder='Jinx Arcane' className='bg-yellowForrnite text-bg-body py-2 px-4 rounded-md outline-none w-[50%]' onChange={(e) => {
            setFilters(prevFilrers => ({ ...prevFilrers, search: e.target.value }))
          }}
        />
        {rarities.map((item, index) => {
          return Object.entries(item).map(([key, value]) => {
            return (
              <Menu key={`${index}_${key}`} nameType={key} handleClick={handleClick} index={index} value={value} expandedItem={expandedItem} setFilters={setFilters} filters={filters} setExpandedItem={setExpandedItem} />
            )
          })
        })}
      </div>
      <InfiniteScroll
        dataLength={data.length} hasMore={data.length < allCosmetics.length} next={loadMoreData}
      >
        <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 grid-flow-dense h-full w-full mt-8'>
          {data.map((child, index) =>
            <Link
              key={`${index}_${child.id}`}
              href={`/shop/${child.id}`}
              className=' rounded-lg self-start cursor-pointer '
            >
              <div className='relative w-full h-full overflow-hidden rounded-md'>
                <img src={child.images.icon} alt={`image_${child.name}`} className='w-full h-full rounded-md absolute ' />
                <img src={child.bg === '' ? child.bgDefault : child.bg} alt='' className='w-full h-full ' />
                <BackgroundCard displayName={child.name} price={child.price.regularPrice} />
              </div>
            </Link>
          )}
        </div>
      </InfiniteScroll>
    </>
  )
}

export default Skins
