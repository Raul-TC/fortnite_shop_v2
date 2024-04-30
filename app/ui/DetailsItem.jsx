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

const DetailsItem = ({ details }) => {
  console.log(details)
  console.log(details.images.icon)
  const { formatedDate } = useFormatedDate()

  return (
    <>

      <Link href='/shop/' className='self-start'><IoArrowBackOutline className='text-5xl' /></Link>
      <div className={`${details.rarity.id === 'Common' ? 'border-green-500' : ''} ${details.rarity.id === 'Rare' ? 'border-blue-500 ' : ''} ${details.rarity.id === 'Uncommon' ? 'border-gray-500 ' : ''} ${details.rarity.id === 'Epic' ? ' border-purple-500 ' : ''} ${details.rarity.id === 'Legendary' ? ' border-orange-500' : ''} border-b-2 pb-4 relative top-0 left-0 right-0 w-full shadow-md text-4xl font-bold text-center flex flex-col `}>
        <div className='w-28 h-28 rounded-full m-auto overflow-hidden'>
          {/* <img src={details.images.icon} alt='' srcset='' /> */}
          <img src={details.images.icon ? details.images.icon : details.displayAssets[0].url} alt='' />

        </div>
        <span className={`${luckiestGuy.className}`}>   {details.name}</span>
        <span className='text-lg'>{details.description}</span>
      </div>
      <div className='flex flex-col items-center m-auto mt-4 w-[90%] max-w-[1440px] min-h-[calc(100vh-96px)] mb-16'>
        <div className='grid grid-cols-1 items-center justify-center w-full rounded-md md:grid-cols-2'>
          <div className='flex flex-col items-center justify-center w-full'>

            {details.displayAssets.length > 1
              ? (
                <div className='relative w-full h-full shadow-lg overflow-hidden rounded-md'>
                  <div className='relative w-full h-full overflow-hidden'>

                    <ImageSlider displayName={details.name} arrayImages={details.displayAssets} key={`${details.mainId}`} price={details.price} isItem />
                  </div>
                </div>
                )
              : details.displayAssets.length > 0 || details.images.full_background
                ? (
                  <div className='relative w-full h-full '>
                    <img
                      src={details.displayAssets.length > 0 ? details.displayAssets[0].background : details.images.background}
                      width={350}
                      height={350}
                            // quality={85}
                      alt={details.id}
                            // priority
                      className='w-full h-full rounded-md'
                    />
                    {/* <BackgroundCard displayName={details.name} price={details.price} /> */}

                  </div>
                  )
                : (
                  <div className='relative w-full h-full '>

                    <MdOutlineImageNotSupported className='w-full h-full rounded-md' />
                    {/* <BackgroundCard displayName={details.name} price={details.price} /> */}
                  </div>
                  )}

            {/* <p className={`${details.rarity.id === 'Common' ? 'bg-green-500 ' : ''} ${details.rarity.id === 'Rare' ? 'bg-blue-500' : ''} ${details.rarity.id === 'Uncommon' ? 'bg-gray-500' : ''} ${details.rarity.id === 'Epic' ? ' bg-purple-500' : ''} ${details.rarity.id === 'Legendary' ? ' bg-orange-500' : ''} my-2 text-white font-bold py-1 px-4 self-start md:mr-auto lg:py-3 lg:px-8 rounded-sm md:m-auto`}>
              {details.rarity.name}
            </p>
            {details.description && <q className='py-4 block text-sm md:text-lg font-semibold text-center'>{details.description}</q>} */}
          </div>
          <div className='w-full flex justify-around flex-col items-center gap-4 md:self-start md:pl-32 pt-4'>
            {/* <div> */}
            {details.type && <p className=' font-bold md:text-2xl text-left self-start'>Tipo: {details.type.id}</p>}
            {details.rarity && <p className=' font-bold md:text-2xl text-left self-start'>Rareza: {details.rarity.name}</p>}
            {details.price && (
              <div className='flex flex-row self-start items-center justify-center gap-1'>
                <p className=' font-bold md:text-2xl text-left'>Precio: {details.price}
                </p>
                <Image src={vBuck} alt='vBuck_coin' width={50} height={50} className='w-9 h-9' />
              </div>)}
            {details.rarity && <p className=' font-bold md:text-2xl text-left self-start'>Rareza: {details.rarity.name}</p>}
            {details.releaseDate && <p className=' font-bold md:text-2xl text-left self-start'>Primera Aparición: {formatedDate(new Date(details.releaseDate)).replaceAll('-', '.')}</p>}
            {details.introduction && <p className=' font-bold md:text-2xl text-left self-start'>Aparición: {details.introduction.chapter} {details.introduction.season} </p>}

            {/* {details.set && <p className=' text-center font-bold  md:text-3xl'> <span>{details.set.partOf}</span></p>} */}
            {/* {details.introduction && <p className=' text-center font-bold  md:text-3xl'> {details.introduction.text}</p>} */}
            {details.series && <p className=' font-bold text-center md:text-2xl'>Serie:<span className='self-start font-normal capitalize'> {(details.series.name).substring(6)}</span></p>}
            {/* </div> */}
            <div className='flex flex-col h-full w-full justify-center items-start'>
              <History item={details} />
            </div>
          </div>
        </div>

        {details.grants.length > 0 &&
          <>
            <h2 className='text-2xl mt-8 mb-8 font-bold'>Partes del Set {details.set ? details.set.name : details.name}</h2>
            <div className='grid grid-cols-2 mt-2 mb-8 gap-4 md:grid-cols-4'>

              {details?.grants.map((el, index) => {
                return (
                  <div key={index} className='relative w-full h-full '>
                    <img
                      src={el.images.icon_background}
                      width={350}
                      height={350}
                            // quality={85}
                      alt={details.id}
                            // priority
                      className='w-full h-full rounded-md'
                    />
                    <BackgroundCard displayName={details.name} price={details.price} />

                  </div>
                )
                // <img key={index} src={el.images.icon_background} alt='' className='rounded-md' />
              })}
            </div>
          </>}
      </div>
    </>
  )
}

export default DetailsItem
