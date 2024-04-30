'use client'
import Image from 'next/image'
import React, { useState } from 'react'
// import { blurURL } from '../KEYS'

const Card = ({ image, displayName, images }) => {
  const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   const img = new window.Image();
  //   img.src = image;
  //   img.onload = () => setIsLoading(false);
  // }, [image]);

  // TODOO
  // Arreglar el animate-pulse
  return (
    <>
      {isLoading
        ? (
          <div className={`${isLoading ? 'md:max-w-[350px] md:max-h-[350px]' : ''} animate-pulse w-full h-full min-w-[190px] min-h-[190px] pb-4 flex flex-col justify-end items-start  bg-gray-300 rounded-lg`}>
            <div className='w-[90%] rounded-md mb-4 h-4 bg-gray-400 ml-2' />
            <div className='w-[30%] rounded-md h-4 bg-gray-400 ml-2' />
          </div>
          )
      /* // images.length > 1 ? <ImageSlider arrayImages={images} key={displayName}/>:  */
        : <Image
            src={image} alt={`image_${displayName}`} width={500}
            height={500}
            onLoadedData={() => setIsLoading(false)}
            className='w-full h-full'
            priority
            placeholder='blur'
            blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgc3R5bGU9ImZpbGw6I2ZmZjsiIC8+Cjwvc3ZnPgo='
            quality={70}
          />}
      {/* } */}

    </>

  // <Image
  //   width={200}
  //   height={200}
  //   sizes='(max-width: 390px) 167px,
  //           (max-width: 1200px) 550px'
  //   className='h-full w-full'
  //   quality={100}
  // placeholder={() => {<p>Holaaa</p>}}
  // //   blurDataURL={blurURL}
  //   src={image}
  //   alt={`image_${displayName}`}
  // />
  )
}
export default Card
