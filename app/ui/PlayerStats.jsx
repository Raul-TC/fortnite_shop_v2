import React from 'react'
import StatCard from './StatCard'
import { luckiestGuy } from '../ui/fonts'
const PlayerStats = ({ stats }) => {
  const handleMinutes = (time) => {
    const minutos = time % 60
    const horas = Math.floor(time / 60) % 24
    const dias = Math.floor(time / 60 / 24)

    return dias === 0 ? `${horas} horas ${minutos} minutos` : `${dias} dias ${horas} horas ${minutos} minutos`
  }
  console.log(stats)

  const handleLocalDate = (fecha) => {
    const date = new Date(fecha)
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }
    return date.toLocaleString('es-MX', options)
  }
  return (
    <div className='mt-4'>
      <h2 className={`${luckiestGuy.className} text-center text-3xl`}>{stats.account.name} </h2>
      <h2 className={`${luckiestGuy.className} text-center text-2xl`}>Temporada Actual: Nivel {stats.battlePass.level}</h2>
      <div className='my-4'>
        <div className='flex w-full flex-col md:flex-row items-start justify-start flex-wrap self-start gap-4'>
          <StatCard wins={stats.stats.season.solo.wins} kills={stats.stats.season.solo.kills} top10={stats.stats.season.solo.top10} top25={stats.stats.season.solo.top25} deaths={stats.stats.season.solo.deaths} kda={stats.stats.season.solo.kd} matches={stats.stats.season.solo.matches} winrate={stats.stats.season.solo.winRate} timePlayed={handleMinutes(stats.stats.season.solo.minutesPlayed)} updated={handleLocalDate(stats.stats.season.solo.lastModified)} modo='Solo' />
          <StatCard wins={stats.stats.season.duo.wins} kills={stats.stats.season.duo.kills} top10={stats.stats.season.duo.top5} top25={stats.stats.season.duo.top12} deaths={stats.stats.season.duo.deaths} kda={stats.stats.season.duo.kd} matches={stats.stats.season.duo.matches} winrate={stats.stats.season.duo.winRate} timePlayed={handleMinutes(stats.stats.season.duo.minutesPlayed)} updated={handleLocalDate(stats.stats.season.duo.lastModified)} modo='Duo' />
          {stats.stats.season.squad && <StatCard wins={stats.stats.season.squad?.wins ?? 0} kills={stats.stats.season.squad?.kills} top10={stats.stats.season.squad?.top3} top25={stats.stats.season.squad?.top6} deaths={stats.stats.season.squad?.deaths} kda={stats.stats.season.squad?.kd} matches={stats.stats.season.squad?.matches} winrate={stats.stats.season.squad?.winRate} timePlayed={handleMinutes(stats.stats.season.squad?.minutesPlayed)} updated={handleLocalDate(stats.stats.season.squad?.lastModified)} modo='Squad' />}
        </div>
      </div>
      <h2 className={`${luckiestGuy.className} text-center text-5xl my-4`}>Todas las Temporadas</h2>
      <div className='flex w-full flex-col md:flex-row items-center justify-center flex-wrap gap-4'>
        <StatCard wins={stats.stats.lifetime.solo.wins} kills={stats.stats.lifetime.solo.kills} top10={stats.stats.lifetime.solo.top10} top25={stats.stats.lifetime.solo.top25} deaths={stats.stats.lifetime.solo.deaths} kda={stats.stats.lifetime.solo.kd} matches={stats.stats.lifetime.solo.matches} winrate={stats.stats.lifetime.solo.winRate} timePlayed={handleMinutes(stats.stats.lifetime.solo.minutesPlayed)} updated={handleLocalDate(stats.stats.lifetime.solo.lastModified)} modo='Solo' />
        <StatCard wins={stats.stats.lifetime.duo.wins} kills={stats.stats.lifetime.duo.kills} top10={stats.stats.lifetime.duo.top5} top25={stats.stats.lifetime.duo.top12} deaths={stats.stats.lifetime.duo.deaths} kda={stats.stats.lifetime.duo.kd} matches={stats.stats.lifetime.duo.matches} winrate={stats.stats.lifetime.duo.winRate} timePlayed={handleMinutes(stats.stats.lifetime.duo.minutesPlayed)} updated={handleLocalDate(stats.stats.lifetime.duo.lastModified)} modo='Duo' />
        <StatCard wins={stats.stats.lifetime.trio?.placetop1 ?? 0} kills={stats.stats.lifetime.trio?.kills ?? 0} top10={stats.stats.lifetime.trio?.placetop3} top25={stats.stats.lifetime.trio?.placetop6} deaths='' kda={stats.stats.lifetime.trio?.kd} matches={stats.stats.lifetime.trio?.matchesplayed} winrate={stats.stats.lifetime.trio?.winrate} timePlayed={handleMinutes(stats.stats.lifetime.trio.minutesplayed)} updated='Desconocido' modo='Trio' />
        {stats.stats.lifetime.squad && <StatCard wins={stats.stats.lifetime.squad?.wins ?? 0} kills={stats.stats.lifetime.squad?.kills} top10={stats.stats.lifetime.squad?.top3} top25={stats.stats.lifetime.squad?.top6} deaths={stats.stats.lifetime.squad?.deaths} kda={stats.stats.lifetime.squad?.kd} matches={stats.stats.lifetime.squad?.matches} winrate={stats.stats.lifetime.squad?.winRate} timePlayed={handleMinutes(stats.stats.lifetime.squad?.minutesPlayed)} updated={handleLocalDate(stats.stats.lifetime.squad?.lastModified)} modo='Squad' />}
      </div>
    </div>
  )
}
// solo: {
//           score: 1851,
//           scorePerMin: 28.922,
//           scorePerMatch: 308.5,
//           wins: 0,
//           top10: 1,
//           top25: 4,
//           kills: 25,
//           killsPerMin: 0.391,
//           killsPerMatch: 4.167,
//           deaths: 6,
//           kd: 4.167,
//           matches: 6,
//           winRate: 0,
//           minutesPlayed: 64,
//           playersOutlived: 462,
//           lastModified: '2024-03-15T23:11:12Z'

export default PlayerStats
