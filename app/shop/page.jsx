import { Suspense } from 'react'
import ItemsShop from '../ui/ItemsShop'
import CountDown from '../ui/CountDown'
// import BurgerMenu from './ui/BurgerMenu'
import SkeletonCards from '../ui/SkeletonCards'
import Await from '../ui/Await'
import { URL_SHOP } from '@/KEY'

export const metadata = {
  title: 'Tienda Fortnite HOY',
  description: 'Fornite Shop Today',
  icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
  facebook: {
    card: '',
    title: 'Tienda de HOY Fortnite',
    description: 'Tienda Actualizada de la tienda de fortnite'
  }
}
export const dynamicParams = false

export default async function Home () {
  const promise = await getShop()

  console.log(promise)

  return (
    <>

      <CountDown isShop date={false} />
      <Suspense fallback={<SkeletonCards />}>
        <Await promise={promise}>
          {(res) => <ItemsShop shop={res} />}
        </Await>
      </Suspense>

    </>
  )
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

    console.log(shop)
    const dataFiltered = {}
    const categories = [...new Set(shop.map((section) => section.section.name))]

    categories.forEach(el => {
      if (el === null || el === '' || el === false) {
        dataFiltered.Destacados = []
      } else {
        dataFiltered[el] = []
      }
    })

    shop.forEach(item => {
      if (!dataFiltered[item.section.name]) {
        dataFiltered.Destacados.push({ ...item })
      } else {
        const datt = dataFiltered[item.section.name].map(ab => ab.mainId === item.id)

        !datt.includes(true) && dataFiltered[item.section.name].push({ ...item })
      }
    })
    return Object.entries(dataFiltered).map(([key, value]) => ({ section: key, data: value }))
  } catch (error) {
    console.log(error)
    return { error }
  }
}
