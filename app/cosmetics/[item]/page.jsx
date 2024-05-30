import React, { Suspense } from 'react'
import { URL_ITEM } from '@/KEY'
import DetailsItem from '@/app/ui/DetailsItem'
import SkeletonItem from '@/app/ui/SkeletonItem'
import { getRarities } from '@/app/lib/data'

export const dynamic = 'force-dynamic'

export default async function Item ({ params }) {
  return (
    <>
      <Suspense fallback={<SkeletonItem />}>
        <DetailsItem id={params.item} />
      </Suspense>
    </>
  )
}

export async function getItem (id) {
  if (id === null) return
  try {
    const fetchItem = await fetch(URL_ITEM(id), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_FORTNITE
      },
      next: { cache: 'no-store' }
    })

    if (!fetchItem.ok) {
      console.log(fetchItem)
      throw new Error(`Error in 1rst Fetch: ${fetchItem.status} ${fetchItem.statusText}`)
    }

    const { item } = await fetchItem.json()

    const { series } = await getRarities()

    const seriesMap = Object.fromEntries(series.map(el => [el.name.toUpperCase(), el.image]))

    const addBg = () => {
      const bgImage = seriesMap[item.series?.name.toUpperCase()] || ''

      return { ...item, bg: bgImage }
    }

    const res = addBg()
    return res
  } catch (error) {
    return { error }
  }
}

export async function generateMetadata (params, parent) {
  try {
    const parr = await params
    const skin = await fetch(URL_ITEM(parr.params.item), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_FORTNITE
      }
    })

    if (!skin.ok) {
      throw new Error(`Error al obtener la metadata 😔: ${skin.status} ${skin.statusText}`)
    }

    const resp = await skin.json()

    return {
      title: `Cosméticos / ${resp.item.name}`,
      icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
      description: resp.item.name,
      facebook: {
        card: '',
        title: 'Tienda de HOY Fortnite',
        description: `Skin ${resp.item.name}`
      }
    }
  } catch (error) {
    return { error }
  }
}
