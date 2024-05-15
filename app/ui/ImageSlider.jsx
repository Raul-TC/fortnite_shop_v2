'use client'
// import Image from 'next/image'
import React from 'react'
import { useImageSlider } from '../lib/useImageSlider'
import BackgroundCard from './BackgroundCard'
const ImageSlider = ({ displayName, arrayImages, isItem = false, price, bg }) => {
  const { counter, imagesMemo } = useImageSlider(arrayImages)

  return (
    <>
      {imagesMemo.map((el, index) => (
        // <Image
        //   key={`_${index}${displayName}`}
        //   width={300}
        //   height={300}
        //   quality={70}
        //   src={el.background}
        //   alt={`${el.materialInstance}_${index}`}
        //   className={`transition-all duration-500 ${counter === index ? 'w-full h-full ' : 'hidden'} rounded-md `}        />
        bg !== ''
          ? (
            <div key={`${index}$_{displayName}`} className=' overflow-hidden'>

              <img src={bg} alt='' className='absolute top-0 bottom-0 left-0 right-0 -z-0 h-full w-full' />
              <img src={el.url} alt={`${el.materialInstance}_${index}`} className={`${counter === index ? '  relative z-10' : ' hidden'}`} />

            </div>
            )
          : <img key={`_${index}${displayName}`} src={el.background} alt={`${el.materialInstance}_${index}`} className={`${counter === index ? 'w-full' : 'hidden'} rounded-md `} />

      ))}
      {!isItem &&
        <>
          <BackgroundCard displayName={displayName} price={price} />
        </>}

    </>
  )
}

export default ImageSlider
