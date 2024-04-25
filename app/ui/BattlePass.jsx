import React, { memo } from 'react'
import { useCountDown } from '../lib/useCountDown'
import { useFormatedDate } from '../lib/useFormatedDate'
import { useGetDay } from '../lib/useGetDay'
import CurrentDay from './CurrentDay'
import CountDown from './CountDown'
import Link from 'next/link'
import Image from 'next/image'
import { rewardsFiltered } from '../lib/utils'
import BackgroundCard from './BackgroundCard'
const BattlePass = ({ bpass, currentPage }) => {
  const { arr, info, seasonDates, videos } = bpass
  const { formatedDate } = useFormatedDate()
  const [date] = new Date(seasonDates.end).toISOString().split('T')
  console.log(arr)
  const rewards = rewardsFiltered(arr, currentPage)
  return (
    <>
      <h1 className='text-center font-bold text-2xl'>{info.chapterSeason}</h1>
      <div className='flex flex-col self-start items-center justify-center w-full rounded-md top-0 left-0 right-0'>

        <CurrentDay date={formatedDate(date)} isShop={false} />
        <CountDown isShop={false} date={seasonDates.end} />

      </div>
      <div className=' flex items-center justify-between w-full'>
        <video
          className='relative left-0 right-0 top-0 bottom-0 h-full z-10 w-full'
          src={videos[0].url}
          alt={videos[0].type}
          controls
          // autoPlay
          muted
        />
      </div>
      <h2 className=' my-4 text-center text-xl font-bold'>Recompensas del pase de batalla</h2>
      {arr && rewards.map((item, index) => (
        <section key={`${item.page}_${index * 2}`} className='pb-4 w-full h-full'>
          <h2 className='text-2xl text-center font-bold mt-4 mb-4 md:text-3xl'> Página {item.page}</h2>
          <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 grid-flow-dense h-full w-full'>
            {item.data.map((pag, index) => (
              // <Link key={`${pag.offerId}_${index}`} href={`/shop/${pag.item.id}`}>
              <div key={`${pag.offerId}_${index}`} className='relative w-full h-full '>

                <img
                  src={pag.item.images.background || pag.item.images.icon}
                  alt={`image_${pag.item.name}`}
                  width={300}
                  height={300}
                  className='w-full h-full rounded-md'
                />
                <BackgroundCard displayName={pag.item.name} />
              </div>

              // </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  )
}

export default BattlePass
