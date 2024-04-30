import React, { Suspense } from 'react'

import Search from '../ui/Search'
import { URL_STATS, URL_STATS_SEASON } from '@/KEY'
import PlayerStats from '../ui/PlayerStats'
import Await from '../ui/Await'
const Player = async ({ searchParams }) => {
  const { name, accountType } = searchParams

  // const userData = await getData(false, false, URL_STATS(name, accountType), KEY_LOGIN, true)
  // const promise = await getData(false, false, URL_STATS(name, accountType), true, name, accountType)
  // console.log(promise)
  const promise = await getStats(name, accountType)

  console.log(promise.stack)
  return (
    <>
      <h1 className='text-center text-xl font-bold mb-4 mt-[95px] md:text-4xl'>Buscar mis estadísticas 🎯</h1>
      <div className='flex justify-center items-center flex-wrap m-auto gap-2 text-center'>
        <Search placeholder={name} />
      </div>
      {name !== undefined && accountType !== undefined &&
        <>
          {promise.stack
            ? <p>Usuario '{name}' no encontrado 😔, verifica el nombre y el tipo de cuenta</p>
            : (
              <Suspense fallback={<h2>Espere un momento... ⌛</h2>}>
                <Await promise={promise}>
                  {(data) => <PlayerStats stats={data} />}
                </Await>
              </Suspense>
              )}
        </>}
      {/* {(name === 'PadmeBv' || name === ' Padme_Bv') && <p>Esta cuenta es un bot xd</p>} */}
    </>
  )
}

export default Player

export async function getStats (name, accountType) {
  console.log(name, accountType)
  try {
    const fetchStats = await fetch(URL_STATS(name, accountType), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_FORTNITEV2
      },
      next: { cache: 'no-store' }
    })

    if (!fetchStats.ok) {
      console.log(fetchStats)
      throw new Error(`Error in 1rst Fetch: ${fetchStats.status} ${fetchStats.statusText}`)
    }

    const stats = await fetchStats.json()
    console.log(stats)

    const fetchSeasonStats = await fetch(URL_STATS_SEASON(name, accountType), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_FORTNITEV2
      },
      next: { cache: 'no-store' }
    })
    if (!fetchStats.ok) {
      throw new Error(`Error in 2nd Fetch: ${fetchStats.status} ${fetchStats.statusText}`)
    }

    const season = await fetchSeasonStats.json()

    console.log(season)

    const getStatsOtherAPI = await fetch(`https://fortniteapi.io/v1/stats?account=${stats.data.account.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_FORTNITE
      },
      next: { cache: 'no-store' }
    })

    if (!getStatsOtherAPI.ok) {
      throw new Error(`Error in Other API: ${getStatsOtherAPI.status} ${getStatsOtherAPI.statusText}`)
    }
    const statsOtherAPI = await getStatsOtherAPI.json()

    console.log(statsOtherAPI)

    const { accountLevelHistory } = statsOtherAPI
    const { data } = { ...stats, data: { accountLevelHistory, ...stats.data, stats: { lifetime: { ...stats.data.stats.all, trio: statsOtherAPI.global_stats.trio }, season: season.data.stats.all } } }

    return data
  } catch (error) {
    console.error('Error fetching stats:', error)
    return error
  }
}
