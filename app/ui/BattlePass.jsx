import React from 'react'
import { useFormatedDate } from '../lib/useFormatedDate'
import CurrentDay from './CurrentDay'
import CountDown from './CountDown'
import { rewardsFiltered } from '../lib/utils'
import BackgroundCard from './BackgroundCard'
import { getBattlePass } from '../lib/data'
import Link from 'next/link'
const BattlePass = async ({ currentPage }) => {
  const { formatedDate } = useFormatedDate()
  const { arr, info, seasonDates, videos } = await getBattlePass()

  const [date] = new Date(seasonDates.end).toISOString().split('T')
  const rewards = rewardsFiltered(arr, currentPage)
  return (
    <>
      <h1 className='text-center font-bold text-2xl md:text-4xl'>{info.chapterSeason}</h1>
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
          muted
        />
      </div>
      <h2 className=' my-4 text-center text-xl font-bold'>Recompensas del pase de batalla</h2>
      {arr && rewards.map((item, index) => (
        <section key={`${item.page}_${index * 2}`} className='pb-4 w-full h-full'>
          <h2 className='text-2xl text-center font-bold mt-4 mb-4 md:text-3xl'> Página {item.page}</h2>
          <div className='text-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 grid-flow-dense h-full w-full'>
            {item.data.map((pag, index) => {
              console.log(pag.bg)
              return (
                <Link key={`${pag.offerId}_${index}`} className='relative w-full h-full' href={`/cosmetics/${pag.item.id}`} rareza='epica'>
                  <img
                    src={pag.item.images.icon || pag.item.images.background}
                    alt={`image_${pag.item.name}`}
                    width={300}
                    height={300}
                    className='w-full h-full rounded-md relative top-0 left-0 bottom-0 right-0 z-10'
                  />
                  <img src={pag.bg} alt='' className='w-full h-full absolute top-0 bottom-0 left-0 right-0 z-0' />

                  <BackgroundCard displayName={pag.item.name} />
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}

export default BattlePass
