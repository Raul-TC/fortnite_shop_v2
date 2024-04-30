import React from 'react'
import { luckiestGuy, balsamiqSans } from './fonts'

const StatCard = ({ wins, kills, top10, top25, deaths, kda, matches, winrate, timePlayed, updated, modo }) => {
  const commonClass = 'pl-3 text-gray-500'
  return (
    <div className={`${balsamiqSans.className} font-bold relative m-auto bg-bg-header md:max-w-[400px] text-base h-[342px] pt-[37px] rounded-md w-full`}>
      <p className={commonClass}>Ganadas: <span className='text-white'>{wins}</span></p>
      <p className={commonClass}>Asesinatos: <span className='text-white'>{kills}</span></p>
      {modo === 'Solo' && <p className={commonClass}>Top 10:<span className='text-white'> {top10}</span></p>}
      {modo === 'Solo' && <p className={commonClass}>Top 25: <span className='text-white'>{top25}</span></p>}
      {modo === 'Duo' && <p className={commonClass}>Top 5: <span className='text-white'>{top10}</span></p>}
      {modo === 'Duo' && <p className={commonClass}>Top 12: <span className='text-white'>{top25}</span></p>}
      {modo === 'Trio' && <p className={commonClass}>Top 3: <span className='text-white'>{top10}</span></p>}
      {modo === 'Trio' && <p className={commonClass}>Top 6: <span className='text-white'>{top25}</span></p>}
      {modo === 'Squad' && <p className={commonClass}>Top 3: <span className='text-white'>{top10}</span></p>}
      {modo === 'Squad' && <p className={commonClass}>Top 6: <span className='text-white'>{top25}</span></p>}
      {/* <p className='pl-3'>Top 25: {top25}</p> */}
      {modo !== 'Trio' && <p className={commonClass}>Muertes: <span className='text-white'>{deaths}</span></p>}
      <p className={commonClass}>K / D: <span className='text-white'>{kda}</span></p>
      <p className={commonClass}>Partidas: <span className='text-white'>{matches}</span></p>
      <p className={commonClass}>% Victorias: <span className='text-white'>{Math.floor((wins / matches) * 100)}%</span></p>
      <p className={commonClass}>Tiempo Jugado: <span className='text-white'>{timePlayed}</span></p>
      <p className={commonClass}>Actualizado: <span className='text-white'> {updated}</span></p>
      <div className={`${luckiestGuy.className} absolute bottom-0 left-0 right-0 w-full bg-yellowForrnite text-bg-header text-center text-[40px] h-11 flex items-center justify-center`}><p>{modo}</p></div>
    </div>
  )
}

export default StatCard
