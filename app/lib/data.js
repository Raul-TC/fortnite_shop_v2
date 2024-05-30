import { URL_BPASS, URL_RARITIES, URL_STATS, URL_STATS_SEASON } from '@/KEY'

export async function getStats (name, accountType) {
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

    const { accountLevelHistory } = statsOtherAPI
    const { data } = { ...stats, data: { accountLevelHistory, ...stats.data, stats: { lifetime: { ...stats.data.stats.all, trio: statsOtherAPI.global_stats.trio }, season: season.data.stats.all } } }

    return data
  } catch (error) {
    console.error('Error fetching stats:', error)
    return error
  }
}

export async function getRarities () {
  try {
    const getRarities = await fetch(URL_RARITIES, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_FORTNITE
      }
    })
    if (!getRarities.ok) {
      throw new Error(`Error al obtener las rarezas: ${getRarities.status} ${getRarities.statusText}`)
    }

    const { rarities, series } = await getRarities.json()

    console.log({ rarities, series })
    return { rarities, series }
  } catch (error) {

  }
}

export async function getBattlePass () {
  try {
    const fetchBp = await fetch(URL_BPASS, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_FORTNITE
      }
    })
    if (!fetchBp.ok) {
      throw new Error(`Error al obtener el pase de batalla 😔: ${fetchBp.status} ${fetchBp.statusText}`)
    }

    const res = await fetchBp.json()

    const pagesBattlePass = {}
    const pages = [...new Set(res.rewards.map((item) => item.page))]
    console.log(res)
    pages.forEach(el => { pagesBattlePass[el] = [] })
    res.rewards.forEach(el => {
      const datt = pagesBattlePass[el.page].map(ab => ab.offerId === el.offerId)

      !datt.includes(true) && pagesBattlePass[el.page].push({ ...el })
    })

    const arr = Object.entries(pagesBattlePass).map(([key, value]) => ({ page: key, data: value }))

    return { arr, info: res.displayInfo, seasonDates: res.seasonDates, videos: res.videos }
  } catch (error) {
    console.log(error)
    return { error }
  }
}
