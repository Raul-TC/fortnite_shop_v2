import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import {URL_ITEM } from '@/KEY'
import ImageSlider from '../../ui/ImageSlider'
// import Modal from '../../ui/Modal'
import History from '../../ui/History'
import { getData } from '@/app/lib/useFetchData'
import { useFormatedDate } from '@/app/lib/useFormatedDate'

const Item = async ({params}) => {

const [date] = new Date().toISOString().split('T')
const {formatedDate} = useFormatedDate()
const {res: {item}} = await getData(false,false,URL_ITEM(params.item))
const skin = item

  return (
    <>
      {/* <HeadPage title={`Tienda Fortnite HOY | ${item.name}`} /> */}
          <Suspense fallback={<h1>Cargando PAGINA...</h1>}>
              {skin ? <>
                   <div className={`flex flex-col items-center m-auto mt-4 w-[90%] max-w-[1440px] min-h-[calc(100vh-96px)] mb-16`}>
              
         <Link href='/' className='self-start'><IoArrowBackOutline className='text-5xl mb-4' /></Link>
         <div className='grid grid-cols-1 items-center justify-center w-full rounded-md md:grid-cols-2'>
              <div className='flex flex-col items-center justify-center w-full'>
                      {formatedDate(date) === formatedDate(skin.releaseDate) &&  <span className='w-auto h-auto mt-4 bg-yellowForrnite text-bg-body font-bold px-4 py-2 rounded-md left-0 ml-4 absolute z-40'>Nuevo!</span>}

                              {skin.displayAssets.length > 1
                  ? <ImageSlider arrayImages={skin.displayAssets} isItem={true} />
                                  : <Image
                                      src={skin.displayAssets.length > 0 ? skin.displayAssets[0].full_background : skin.images.full_background}
                                      width={350}
                                      height={350}
                                      quality={85}
                                      //   placeholder='blur'
                                      //   blurDataURL={blurURL}
                                      alt={skin.id}
                                      priority
                                      className='w-full h-full rounded-md'
                                  />}
             <p className={`${skin.rarity.id === 'Common' ? 'bg-green-500 ' : ''} ${skin.rarity.id === 'Rare' ? 'bg-blue-500' : ''} ${skin.rarity.id === 'Uncommon' ? 'bg-gray-500' : ''} ${skin.rarity.id === 'Epic' ? ' bg-purple-500' : ''} ${skin.rarity.id === 'Legendary' ? ' bg-orange-500' : ''} my-2 text-white font-bold py-1 px-4 self-start md:mr-auto lg:py-3 lg:px-8 rounded-sm md:m-auto`}>
              {skin.rarity.name}
              </p>
            {skin.description && <q className='py-4 block text-sm md:text-lg font-semibold'>{skin.description}</q>} 
          </div>
          <div className='w-full flex justify-around flex-col items-center gap-8 self-start'>
             <div>
              {skin.set && <p className=' text-center font-bold  md:text-3xl'> <span>{skin.set.partOf}</span></p>}
              {skin.introduction && <p className=' text-center font-bold  md:text-3xl'> {skin.introduction.text}</p>}
              {skin.series && <p className=' font-bold text-center md:text-2xl'>Serie:<span className='self-start font-normal capitalize'> {(skin.series.name).substring(6)}</span></p>}
            </div> 
            <div className='flex flex-col h-full justify-center items-start'>
               <History item={skin} /> 
            </div>
          </div>
        </div> 

         {skin.grants.length > 0 &&
          <>
          <h2 className='text-2xl mt-8 mb-8 font-bold'>Partes del Set {skin.set ? skin.set.name : skin.name}</h2>
              <div className='grid grid-cols-2 mt-2 mb-8 gap-4 md:grid-cols-4'>
                
                {/* {skin?.grants.map((el, index) => {
                  return el.images.icon_background && <Modal key={`${el.id}_${index}`} link={el.images.icon_background} alt={el.id} /> 
                })}   */}
            </div>
          </>} 
      </div>
              </>: <h1>Cargando...</h1>}

</Suspense>
    </>
  )
}

export default Item