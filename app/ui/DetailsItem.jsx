import Link from 'next/link'
import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import ImageSlider from './ImageSlider'
import BackgroundCard from './BackgroundCard'
import { MdOutlineImageNotSupported } from 'react-icons/md'
import History from './History'
import vBuck from '../assets/vBuckPNG.png'
import Image from 'next/image'
import { luckiestGuy } from '../ui/fonts'
import { useFormatedDate } from '../lib/useFormatedDate'

const rarityColorMap = {
  Common: 'border-green-500',
  Rare: 'border-blue-500',
  Uncommon: 'border-gray-500',
  Epic: 'border-purple-500',
  Legendary: 'border-orange-500'
}

const DetailsItem = async ({ details }) => {
  const { formatedDate } = useFormatedDate()
  function capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
  const rarityColor = rarityColorMap[details.rarity?.id]

  return (
    <>
      {details.bg && <img src={details.bg} className='fixed bottom-0 w-full left-0 object-cover top-0 h-[100vh] -z-0 opacity-55 blur-sm' alt='' />}

      <Link href='/shop/' className='self-start'><IoArrowBackOutline className='text-5xl relative' /></Link>
      <div className={`${rarityColor} border-b-2 pb-4 relative top-0 left-0 right-0 w-full shadow-md text-4xl font-bold text-center flex flex-col `}>
        <div className='w-28 h-28 rounded-full m-auto overflow-hidden'>
          <img src={details.images?.icon || details.displayAssets[0]?.url} alt='' className='border-spacing-2 border-gray-400' />
        </div>
        <span className={`${luckiestGuy.className}`}>   {details.name}</span>
        <span className='text-lg'>{details.description}</span>
      </div>
      <div className='flex flex-col items-center m-auto mt-4 w-[90%] max-w-[1440px] min-h-[calc(100vh-96px)] mb-16 relative'>
        <div className='grid grid-cols-1 items-center justify-center w-full rounded-md md:grid-cols-2'>
          <div className='flex flex-col items-center justify-center w-full'>
            {details.displayAssets.length > 1
              ? (
                <div className='relative w-full h-full overflow-hidden rounded-md'>
                  <div className='relative w-full h-full overflow-hidden'>
                    <ImageSlider displayName={details.name} arrayImages={details.displayAssets} key={`${details.mainId}`} price={details.price} isItem bg={details.bg} />
                  </div>
                </div>
                )
              : details.displayAssets.length > 0 || details.images.full_background
                ? (
                  <div className='relative w-full h-full rounded-md overflow-hidden'>
                    {details.bg !== ''
                      ? (
                        <>
                          <img src={details.displayAssets.length > 0 ? details.displayAssets[0].url : details.images.icon} alt={`image_${details.name}`} className='w-full h-full rounded-md relative  z-20' />
                          <img src={details.bg} alt='' className='w-full h-full absolute top-0 z-0 ' />
                        </>
                        )
                      : <img src={details.displayAssets.length > 0 ? details.displayAssets[0].background : details.images.background} alt={`image_${details.name}`} className='w-full h-full rounded-md relative  z-20' />}
                  </div>
                  )
                : (
                  <div className='relative w-full h-full '>
                    <MdOutlineImageNotSupported className='w-full h-full rounded-md' />
                  </div>
                  )}
          </div>
          <div className='w-full flex justify-around flex-col items-center gap-4 md:self-start md:pl-32 pt-4 opacity-100'>
            {details.type && <p className=' font-bold md:text-2xl text-left self-start text-gray-500'>Tipo: <span className='text-white'>{capitalize(details.type.name)}</span></p>}
            {details.rarity && <p className=' font-bold md:text-2xl text-left self-start text-gray-500 capitalize'>Rareza: <span className='text-white'>{capitalize(details.rarity.name)}</span></p>}
            {details.price !== 0 && (
              <div className='flex flex-row self-start items-center justify-center gap-1'>
                <p className=' font-bold md:text-2xl text-left text-gray-500'>Precio: <span className='text-white'>{details.price}</span>
                </p>
                <Image src={vBuck} alt='vBuck_coin' width={50} height={50} className='w-9 h-9' />
              </div>)}
            {details.releaseDate && <p className=' font-bold md:text-2xl text-left self-start text-gray-500'>Primera Aparición: <span className='text-white'>{formatedDate(new Date(details.releaseDate)).replaceAll('-', '.')}</span></p>}
            {details.introduction && <p className=' font-bold md:text-2xl text-left self-start text-gray-500'>Aparición: <span className='text-white'>{details.introduction.chapter} {details.introduction.season}</span> </p>}
            {details.series && <p className=' font-bold text-center md:text-2xl text-gray-500 self-start'>Serie:<span className='self-start font-normal capitalize'> <span className='text-white'>{(details.series.name).substring(6)}</span></span></p>}
            <div className='flex flex-col h-full w-full justify-center items-start'>
              <History item={details} />
            </div>
          </div>
        </div>
        {details.grants.length > 0 &&
          <>
            <h2 className='text-2xl mt-8 mb-8 font-bold'>Partes del Set {details.set ? details.set.name : details.name}</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 justify-between '>
              {details?.grants.map((el, index) => {
                return (
                  <Link href={`/shop/${el.id}`} key={index} className='relative w-full rounded-md overflow-hidden'>
                    {el.images.icon_background
                      ? (
                        <>
                          {details.bg !== ''
                            ? (
                              <div className='relative w-full h-full z-30'>
                                <img src={details.bg} alt='' className='w-full h-full absolute top-0 z-0 ' />
                                <img src={el.images.icon} alt={`${el.materialInstance}_${index}`} className='w-full h-full rounded-md relative z-20' />
                              </div>
                              )
                            : <img src={el.images.icon_background} alt={`${el.materialInstance}_${index}`} className='w-full h-full rounded-md' />}
                          <BackgroundCard displayName={el.name} price={el.price} />
                        </>
                        )
                      : (
                        <div className='relative w-full h-full '>
                          <MdOutlineImageNotSupported className='w-full h-full rounded-md' />
                        </div>
                        )}
                  </Link>
                )
              })}
            </div>
          </>}
      </div>
    </>
  )
}
export default DetailsItem
