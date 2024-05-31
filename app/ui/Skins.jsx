'use client'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'
import BackgroundCard from './BackgroundCard'
import Menu from './Menu'
import { useCosmetics } from '../lib/useCosmetics'
import { useExpandItem } from '../lib/useExpandItem'

const Skins = ({ dataSkins }) => {
  const { allitems, rarities } = dataSkins
  const { data, filters, loadMoreData, handleClick, handleFilters } = useCosmetics(allitems)
  const { expandedItem, handleExpandItem } = useExpandItem()
  return (
    <>
      <div className='flex gap-4 flex-wrap  justify-between items-center'>

        <input
          name='searchSkin' placeholder='Jinx Arcane' className='bg-yellowForrnite text-bg-body py-2 px-4 rounded-md outline-none w-[50%]' onChange={(e) => {
            handleFilters(prevFilrers => ({ ...prevFilrers, search: e.target.value }))
          }}
        />
        {rarities.map((item, index) => {
          return Object.entries(item).map(([key, value]) => {
            return (
              <Menu key={`${index}_${key}`} nameType={key} handleClick={handleClick} index={index} value={value} expandedItem={expandedItem} handleFilters={handleFilters} filters={filters} handleExpandItem={handleExpandItem} />
            )
          })
        })}
      </div>
      <InfiniteScroll
        dataLength={data.length} hasMore={data.length < allitems.length} next={loadMoreData}
      >
        <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 grid-flow-dense h-full w-full mt-8'>
          {data.map((child, index) =>
            <Link
              key={`${index}_${child.id}`}
              href={`/cosmetics/${child.id}`}
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
