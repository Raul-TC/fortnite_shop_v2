import { URL_BPASS, URL_COSMETICS, URL_RARITIES, URL_SHOP, URL_STATS, URL_STATS_SEASON } from '@/KEY'

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
    pages.forEach(el => { pagesBattlePass[el] = [] })

    const { rarities } = await getRarities()

    const raritiesMap = Object.fromEntries(rarities.map(el => [el.name.toUpperCase(), el.image]))

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
    return { error }
  }
}

export async function getCosmetics () {
  try {
    const getData = await fetch(URL_COSMETICS, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_FORTNITE
      }
    })

    if (!getData.ok) {
      throw new Error(`Error al obtener los cosmeticos: ${getData.status} ${getData.statusText}`)
    }
    const { items } = await getData.json()
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

    const formatedDate = items.map(el => {
      return { id: el.id, type: el.type, name: el.name, rarity: el.rarity, series: el.series, images: el.images, price: el.price }
    })
    const seriesMap = Object.fromEntries(series.map(el => [el.name.toUpperCase(), el.image]))
    const raritiesMap = Object.fromEntries(rarities.map(el => [el.name.toUpperCase(), el.image]))

    const addBg = formatedDate.map(el => {
      const bgImage = seriesMap[el.series?.name.toUpperCase()] || ''
      const bgDefault = raritiesMap[el.rarity?.name.toUpperCase()] || ''

      if (el.type.name === 'itemaccess') {
        return { ...el, type: { id: 'Pase de Batalla', name: 'Pase de Batalla' }, bg: bgImage, bgDefault }
      }
      return { ...el, bg: bgImage, bgDefault }
    })

    const filter = rarities.filter(el => el.name !== 'Exótico' && el.name !== 'MÍTICA' && el.name !== '')
    const unique = {}
    const tipos = addBg.filter(type => {
      const key = `${type.type.name}`
      if (!unique[key]) {
        unique[key] = true
        return true
      }
      return false
    }).map(type => {
      if (type.type.name === 'Accesorio mochilero') {
        return ({ name: 'Mochila', id: 'Mochila' })
      } else {
        return ({ name: type.type.name, id: type.type.name })
      }
    })
    const arrayFiltrado = tipos.filter(el => ['Traje', 'Pico', 'Gesto', 'Ala delta', 'Mochila', 'Mascota', 'Envoltorio', 'Grafiti', 'Música', 'Pista de improvisación', 'Pantalla de carga', 'Lote de Objetos', 'Kit de LEGO®', 'Decoración'].includes(el.name))

    filter.unshift({ name: 'Todas', id: 'Todas' })
    series.unshift({ name: 'Todas', id: 'Todas' })
    arrayFiltrado.unshift({ name: 'Todas', id: 'Todas' })
    return {
      allitems: addBg,
      rarities: [{ rareza: filter }, { series }, { tipos: arrayFiltrado }]

    }
  } catch (error) {
    return error
  }
}
