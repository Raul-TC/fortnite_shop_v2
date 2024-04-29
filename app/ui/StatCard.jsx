import React from 'react'
import { luckiestGuy } from './fonts'

const StatCard = ({ wins, kills, top10, top25, deaths, kda, matches, winrate, timePlayed, updated, modo }) => {
  return (
    <div className={`${luckiestGuy.className} relative m-auto bg-bg-header w-[200px] text-base h-[342px] pt-[37px] rounded-md`}>
      <p className='pl-3'>Ganadas: {wins}</p>
      <p className='pl-3'>Asesinatos: {kills}</p>
      <p className='pl-3'>Top 10: {top10}</p>
      <p className='pl-3'>Top 25: {top25}</p>
      <p className='pl-3'>Muertes: {deaths}</p>
      <p className='pl-3'>K / D: {kda}</p>
      <p className='pl-3'>Partidas: {matches}</p>
      <p className='pl-3'>% Victorias: {winrate}</p>
      <p className='pl-3'>Minutos Jugados: {timePlayed}</p>
      <p className='pl-3'>Actualizado: {updated}</p>
      <div className=' absolute bottom-0 left-0 right-0 w-full bg-yellowForrnite text-bg-header text-center text-[40px] h-11 flex items-center justify-center'><p>{modo}</p></div>
    </div>
  )
}

export default StatCard
