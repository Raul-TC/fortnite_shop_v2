const KEY_LOGIN = process.env.API_FORTNITE
const KEY_2 = process.env.API_FORTNITEV2
export async function getData (isBattlePass = false, formatedShop = false, url) {
  // console.log(url)
  try {
    const fetchShop = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: status ? KEY_2 : KEY_LOGIN
      },
      next: { cache: 'no-store' }
    })
    if (!fetchShop.ok) {
      throw new Error(`Error: ${fetchShop.status} ${fetchShop.statusText}`)
    }
    const shop = await fetchShop.json()
    let res = shop
    if (formatedShop) {
      const dataFiltered = {}
      const categories = [...new Set(res.shop.map((section) => section.section.name))]

      categories.forEach(el => {
        if (el === null || el === '' || el === false) {
          dataFiltered.Destacados = []
        } else {
          dataFiltered[el] = []
        }
      })

      res.shop.forEach(item => {
        if (!dataFiltered[item.section.name]) {
          dataFiltered.Destacados.push({ ...item })
        } else {
          const datt = dataFiltered[item.section.name].map(ab => ab.mainId === item.id)

          !datt.includes(true) && dataFiltered[item.section.name].push({ ...item })
        }
      })
      const arr = Object.entries(dataFiltered).map(([key, value]) => ({ section: key, data: value }))

      res = arr
    }

    // if (status) {
    //   console.log(res.data.account.id)

    //   const getStats = await fetch(`https://fortniteapi.io/v1/stats?account=${res.data.account.id}`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: KEY_LOGIN
    //     },
    //     next: { cache: 'no-store' }
    //   })

    //   if (!fetchShop.ok) {
    //     throw new Error(`Error: ${fetchShop.status} ${fetchShop.statusText}`)
    //   }
    //   const stats = await getStats.json()

    //   const getStatsS = await fetch(`https://fortnite-api.com/v2/stats/br/v2/?name=${nombre}&accountType=${accountType}&image=all&timeWindow=season`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: KEY_2
    //     },
    //     next: { cache: 'no-store' }
    //   })

    //   if (!fetchShop.ok) {
    //     throw new Error(`Error: ${fetchShop.status} ${fetchShop.statusText}`)
    //   }
    //   const statsSeason = await getStatsS.json()

    //   console.log(statsSeason)
    //   const { accountLevelHistory } = stats
    //   console.log(stats)
    //   console.log(shop)
    //   res = { ...shop, data: { accountLevelHistory, ...shop.data, stats: { lifetime: { ...shop.data.stats.all, trio: stats.global_stats.trio }, season: statsSeason.data.stats.all } } }
    //   console.log(res)

    //   return res
    // }
    if (isBattlePass) {
      const pagesBattlePass = {}
      const pages = [...new Set(res.rewards.map((item) => item.page))]

      pages.forEach(el => { pagesBattlePass[el] = [] })
      res.rewards.forEach(el => {
        const datt = pagesBattlePass[el.page].map(ab => ab.offerId === el.offerId)

        !datt.includes(true) && pagesBattlePass[el.page].push({ ...el })
      })

      let arr = Object.entries(pagesBattlePass).map(([key, value]) => ({ page: key, data: value }))

      arr = { arr, info: res.displayInfo, seasonDates: res.seasonDates, videos: res.videos }
      res = arr
    }

    // console.log(res)
    return { status: fetchShop.ok, res }
  } catch (error) {
    // console.log(error)
    return { error }
  }
}
