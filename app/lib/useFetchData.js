const KEY_LOGIN = process.env.API_FORTNITE

export async function getData(isBattlePass = false, formatedShop = false, url) {
  try {
    const fetchShop = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': KEY_LOGIN
      },
      next: { cache: 'no-store' },
    })
    if (!fetchShop.ok) {
      throw new Error('Network response was not ok');
    }
    const shop = await fetchShop.json()
    let res = shop
    if (formatedShop) {
      const dataFiltered = {}
      const categories = [...new Set(res.shop.map((section) => section.section.name))]

      categories.forEach(el => el === null || el === '' || el === false ? dataFiltered.Destacados = [] : dataFiltered[el] = [])

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


    if (isBattlePass) {
      const pagesBattlePass = {}
      const pages = [...new Set(res.rewards.map((item) => item.page))]

      pages.forEach(el => pagesBattlePass[el] = [])
      res.rewards.map(el => {

        const datt = pagesBattlePass[el.page].map(ab => ab.offerId === el.offerId)

        !datt.includes(true) && pagesBattlePass[el.page].push({ ...el })


      })

      let arr = Object.entries(pagesBattlePass).map(([key, value]) => ({ page: key, data: value }))

      arr = { arr, info: res.displayInfo, seasonDates: res.seasonDates, videos: res.videos }
      res = arr
    }
    return { status: fetchShop.ok, res }

  } catch (error) {
    return { error }
  }


}