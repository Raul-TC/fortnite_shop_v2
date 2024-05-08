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

    console.log(addBg)
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
    console.log(tipos)
    const arrayFiltrado = tipos.filter(el => ['Traje', 'Pico', 'Gesto', 'Ala delta', 'Mochila', 'Mascota', 'Envoltorio', 'Grafiti', 'Música', 'Pista de improvisación', 'Pantalla de carga', 'Lote de Objetos', 'Kit de LEGO®', 'Decoración'].includes(el.name))

    filter.unshift({ name: 'Todas', id: 'Todas' })
    series.unshift({ name: 'Todas', id: 'Todas' })
    arrayFiltrado.unshift({ name: 'Todas', id: 'Todas' })
    return {
      allitems: addBg,
      rarities: [{ rareza: filter }, { series }, { tipos: arrayFiltrado }]

    }
  } catch (error) {
    console.log(error)
    return error
  }
}
