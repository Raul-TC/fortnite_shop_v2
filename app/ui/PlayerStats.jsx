import React from 'react'
import { useFormatedDate } from '../lib/useFormatedDate'
import StatCard from './StatCard'

const PlayerStats = ({ stats }) => {
  const { formatedDate } = useFormatedDate()
  return (
    <div className='mt-4'>
      <h2 className='text-center text-3xl'>{stats.account.name}</h2>
      <p>Nivel de Pase de Batalla: {stats.battlePass.level}</p>
      <div>
        <h3>Esta Temporada</h3>
        <div className='flex w-full'>
          <StatCard wins={stats.stats.season.solo.wins} kills={stats.stats.season.solo.kills} top10={stats.stats.season.solo.top10} top25={stats.stats.season.solo.top25} deaths='' kda={stats.stats.season.solo.kd} matches={stats.stats.season.solo.matches} winrate={stats.stats.season.solo.winRate} timePlayed='' updated={formatedDate(new Date(stats.stats.season.solo.lastModified))} modo='Solo' />
          <StatCard wins={stats.stats.season.duo.wins} kills={stats.stats.season.duo.kills} top10={stats.stats.season.duo.top10} top25={stats.stats.season.duo.top25} deaths='' kda={stats.stats.season.duo.kd} matches={stats.stats.season.duo.matches} winrate={stats.stats.season.duo.winRate} timePlayed='' updated={formatedDate(new Date(stats.stats.season.solo.lastModified))} modo='Duo' />
          <StatCard wins={stats.stats.season.squad?.wins ?? 0} kills={stats.stats.season.squad?.kills} top10={stats.stats.season.squad?.top10} top25={stats.stats.season.squad?.top25} deaths='' kda={stats.stats.season.squad?.kd} matches={stats.stats.season.squad?.matches} winrate={stats.stats.season.squad?.winRate} timePlayed='' updated={formatedDate(new Date(stats.stats.season.solo.lastModified))} modo='Squad' />
        </div>
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
