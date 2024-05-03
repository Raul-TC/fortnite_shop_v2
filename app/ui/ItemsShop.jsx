import Link from 'next/link'
import ImageSlider from './ImageSlider'
import BackgroundCard from './BackgroundCard'
import Image from 'next/image'
const ItemsShop = async ({ shop }) => {
  // console.log(shop)
  return (
    <>
      {shop && shop.map((el, index) => (
        <section key={`${index}_${el.section}`} id={`${el.section}`} className='pb-4 w-full h-full'>
          <h2 className='text-2xl text-center font-bold mt-4 mb-4 md:text-3xl'>{el.section}</h2>
          <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 grid-flow-dense h-full w-full'>
            {el.data.map((child, index) => {
              return (child.displayAssets.length > 0 && (
                <Link
                  key={`${index}_${child.mainId}`}
                  href={`/shop/${child.mainId}`}
                  className={`${child.displayName.includes('Lote') || child.displayName.includes('LOTE') || child.displayName.includes('PAQUETE') || child.displayName.includes('Pack') || el.section.includes('Lotes') ? 'col-span-2 row-span-2 order-[-1] ' : 'text-xs'} rounded-lg shadow-md self-start cursor-pointer h-full w-full`}
                >

                  {child.displayAssets.length > 1
                    ? (
                      <div className='relative w-full h-full shadow-lg overflow-hidden rounded-md'>
                        <div className='relative w-full h-full overflow-hidden'>

                          <ImageSlider displayName={child.displayName} arrayImages={child.displayAssets} key={`${index}_${child.mainId}`} price={child.price.regularPrice} />
                        </div>
                      </div>
                      )

                    : (
                      <div className='relative w-full h-full '>

                        <Image
                          src={child.displayAssets[0].background}
                          alt={`image_${child.displayName}`}
                          width={300}
                          height={300}
                          className='w-full h-full rounded-md'
                          quality={70}
                        />

                        {/* <img src={child.displayAssets[0].background} alt={`image_${child.displayName}`} className='w-full h-full rounded-md' /> */}
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
