import { URL_BPASS, URL_RARITIES, URL_SHOP, URL_STATS, URL_STATS_SEASON } from '@/KEY'

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
    console.log(res.rewards)
    pages.forEach(el => { pagesBattlePass[el] = [] })

    const { rarities } = await getRarities()

    const raritiesMap = Object.fromEntries(rarities.map(el => [el.name.toUpperCase(), el.image]))

    console.log(raritiesMap)
    const addBg = res.rewards.map(el => {
      const bgDefault = raritiesMap[el.item.rarity?.name.toUpperCase()] || ''

      return { ...el, bg: bgDefault }
    })
    addBg.forEach(el => {
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

export async function getShop () {
  try {
    const fetchShop = await fetch(URL_SHOP, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_FORTNITE
      },
      next: { cache: 'no-store' }
    })
    if (!fetchShop.ok) {
      throw new Error(`Error: ${fetchShop.status} ${fetchShop.statusText}`)
    }
    const { shop } = await fetchShop.json()

    const dataFiltered = {}
    const categories = [...new Set(shop.map((section) => section.section.name))]

    categories.forEach(el => {
      if (el === null || el === '' || el === false) {
        dataFiltered.Destacados = []
      } else {
        dataFiltered[el] = []
      }
    })
    const { rarities, series } = await getRarities()

    const seriesMap = Object.fromEntries(series.map(el => [el.name.toUpperCase(), el.image]))
    const raritiesMap = Object.fromEntries(rarities.map(el => [el.name.toUpperCase(), el.image]))

    const addBg = shop.map(el => {
      const bgImage = seriesMap[el.series?.name.toUpperCase()] || ''
      const bgDefault = raritiesMap[el.rarity?.name.toUpperCase()] || ''

      return { ...el, bg: bgImage, bgDefault }
    })

    addBg.forEach(item => {
      if (!dataFiltered[item.section.name]) {
        dataFiltered.Destacados.push({ ...item })
      } else {
        const datt = dataFiltered[item.section.name].map(ab => {
          return ab.displayName === item.displayName
        })

        !datt.includes(true) && dataFiltered[item.section.name].push({ ...item })
      }
    })

    return Object.entries(dataFiltered).map(([key, value]) => ({ section: key, data: value }))
  } catch (error) {
    console.log(error)
    return { error }
  }
}
