import Image from 'next/image'
import React from 'react'
import vBuck from '../assets/vBuckPNG.png'

const BackgroundCard = React.memo(({ displayName, price }) => {
  return (
    <div
      className='bg-black bg-opacity-40 w-full h-14 absolute z-10 bottom-0 left-0 flex clamp-md-xl items-center justify-center '
    >
      <span className=' left-0 text-white font-bold px-4 opacity-100 self-center text-xs lg:text-base capitalize'>{displayName}</span>
      <div className='flex items-center pr-1 self-end absolute right-0 gap-1 mb-1'>
        {price && <span className=' text-white font-bold text-xs md:text-base'>{price}</span>}
        {price && <Image src={vBuck} alt='vBuck_coin' width={50} height={50} className='w-4 h-4 md:w-5 md:h-5 ' />}
      </div>
    </div>
  )
})

BackgroundCard.displayName = 'BackgroundCard'

export default BackgroundCard
