import { URL_COSMETICS, URL_RARITIES } from '@/KEY'
import React from 'react'
// import ImageSlider from '../ui/ImageSlider'
import Skins from '../ui/Skins'
// import InfiniteScroll from 'react-infinite-scroll-component'
export const dynamic = 'force-dynamic'

const Cosmetics = async ({ searchParams }) => {
  const { allitems, rarities } = await getCosmetics(searchParams.page)
  // console.log(allCosmetics, 'coss')

  console.log(rarities.length)

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
    const filter = rarities.filter(el => el.name !== 'Exótico' && el.name !== 'MÍTICA' && el.name !== '')
    filter.unshift({ name: 'Todas', id: 'Todas' })
    series.unshift({ name: 'Todas', id: 'Todas' })
    return {
      allitems: items,
      rarities: [{ rarity: filter }, { series }]
    }
  } catch (error) {
    console.log(error)
    return error
  }
}
