import Link from 'next/link'
import ImageSlider from './ImageSlider'
import BackgroundCard from './BackgroundCard'
import { luckiestGuy } from '../ui/fonts'

const ItemsShop = async ({ shop }) => {
  // console.log(shop)

  return (
    <>
      {shop && shop.map((el, index) => (
        <section key={`${index}_${el.section}`} id={`${el.section}`} className='pb-4 w-full h-full'>
          <h2 className={`${luckiestGuy.className} text-2xl text-center font-bold mt-4 mb-4 md:text-3xl `}>{el.section}</h2>
          <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3  h-full w-full'>
            {el.data.map((child, index) => {
              return (child.displayAssets.length > 0 && (
                <Link
                  key={`${index}_${child.mainId}`}
                  href={`/shop/${child.mainId}`}
                  className={`${child.displayName.includes('Lote') || child.displayName.includes('LOTE') || child.displayName.includes('PAQUETE') || child.displayName.includes('Pack') || el.section.includes('Lotes') ? 'col-span-2 row-span-2 order-[-1] ' : 'text-xs'} rounded-md overflow-hidden self-start cursor-pointer w-full `}
                >

                  {child.displayAssets.length > 1
                    ? (
                      <div className='flex w-full h-full overflow-hidden rounded-md flex-col items-center justify-center '>
                        <div className='relative top-0 bottom-0 h-full w-full overflow-hidden z-0'>

                          <ImageSlider displayName={child.displayName} arrayImages={child.displayAssets} key={`${index}_${child.mainId}${Math.random()}`} price={child.price.regularPrice} isItem={false} bg={child.bg} />
                          {/* <img src={child.bg} alt='' className='absolute top-0 bottom-0 left-0 right-0 -z-0' /> */}
                          {/* <img src={child.displayAssets[0].background} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0' /> */}

                        </div>
                      </div>
                      )

                    : (
                      <div className='relative w-full h-full rounded-md' key={child.displayName}>

                        {/* <Image
                                                src={child.displayAssets[0].background}
                                                alt={`image_${child.displayName}`}
                                                width={300}
                                                height={300}
                                                className='w-full h-full rounded-md'
                                                quality={70} /> */}
                        {child.bg !== ''
                          ? (
                            <>

                              <img src={child.bg} alt='' className='absolute top-0 bottom-0 left-0 right-0 z-0' />

                              <img src={child.displayAssets[0].url} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0' />

                            </>
                            )
                          : <img src={child.displayAssets[0].background} alt={`image_${child.displayName}`} className='w-full h-full rounded-md relative top-0 bottom-0 left-0 right-0' />}

                        <BackgroundCard displayName={child.displayName} price={child.price.regularPrice} />
                      </div>
                      )}
                </Link>
              )
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}

export default ItemsShop
