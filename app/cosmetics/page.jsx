import { URL_COSMETICS, URL_RARITIES } from '@/KEY'
import React from 'react'
// import ImageSlider from '../ui/ImageSlider'
import Skins from '../ui/Skins'
// import InfiniteScroll from 'react-infinite-scroll-component'
export const dynamic = 'force-dynamic'

const Cosmetics = async ({ searchParams }) => {
  const { allitems, rarities } = await getCosmetics(searchParams.page)
  // console.log(allCosmetics, 'coss')

  // console.log(rarities.length)

  return (
    <Skins allCosmetics={allitems} rarities={rarities} />
  )
}

export default Cosmetics

export async function getCosmetics () {
  try {
    const getData = await fetch(URL_COSMETICS, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_FORTNITE
      }
    })

    // console.log(getData)
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

    const addBg = items.map(el => {
      let bgImage = ''
      let bgDefault = ''
      // console.log(el.rarity.name)
      series.forEach(element => {
        // console.log(element)

        if (element.name.toUpperCase() === el.series?.name.toUpperCase()) bgImage = element.image
      })
      rarities.forEach(element => {
        // console.log(element)

        if (element.name.toUpperCase() === el.rarity?.name.toUpperCase()) bgDefault = element.image
      })
      return { ...el, bg: bgImage, bgDefault }
    })

    // console.log(addBg)
    const filter = rarities.filter(el => el.name !== 'Exótico' && el.name !== 'MÍTICA' && el.name !== '')
    const unique = {}
    const tipos = addBg.filter(type => {
      const key = `${type.type.name}`
      if (!unique[key]) {
        unique[key] = true
        return true
      }
      return false
    }).map(type => ({ name: type.type.name, id: type.type.name }))
    // console.log(types)
    filter.unshift({ name: 'Todas', id: 'Todas' })
    series.unshift({ name: 'Todas', id: 'Todas' })
    tipos.unshift({ name: 'Todas', id: 'Todas' })
    return {
      allitems: addBg,
      rarities: [{ rareza: filter }, { series }, { tipos }]

    }
  } catch (error) {
    console.log(error)
    return error
  }
}
