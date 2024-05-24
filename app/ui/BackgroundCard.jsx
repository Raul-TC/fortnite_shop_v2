import Image from 'next/image'
import React from 'react'
import vBuck from '../assets/vBuckPNG.png'

const BackgroundCard = React.memo(({ displayName, price }) => {
  return (
    <div
      className='bg-black bg-opacity-60 w-full h-14 absolute z-10 bottom-0 left-0 flex flex-col items-center justify-center '
    >
      <span className=' left-0 text-white font-bold opacity-100 self-center capitalize md:text-base'>{displayName.toLowerCase()}</span>
      <div className='flex items-center pr-1 self-end right-0 gap-1 '>
        {price && <span className=' text-white font-bold '>{price}</span>}
        {price && <Image src={vBuck} alt='vBuck_coin' width={50} height={50} className='w-3 h-3 md:w-3 md:h-3 ' />}
      </div>
    </div>
  )
})

BackgroundCard.displayName = 'BackgroundCard'

export default BackgroundCard
