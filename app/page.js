import { URL_BPASS } from '@/KEY'
import { Suspense } from 'react'
import Await from './ui/Await'
import BattlePass from './ui/BattlePass'
import Pagination from './ui/Pagination'

export const metadata = {
  title: 'Fortnite - Home',
  description: 'Fornite Shop Today',
  icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
  facebook: {
    card: '',
    title: 'Tienda de HOY Fortnite',
    description: 'Tienda Actualizada de la tienda de fortnite'
  }
}
export const dynamic = 'force-dynamic'

export default async function Home ({ searchParams }) {
  const promise = await getBattlePass()
  const currentPage = Number(searchParams.page || 1)
  const totalPages = promise.arr.length

  return (
    <>
      <Suspense fallback={<h2>Cargando DATOS</h2>}>
        <Await promise={promise}>
          {(res) => <BattlePass bpass={res} currentPage={currentPage} />}
        </Await>
      </Suspense>
      <Pagination totalPages={totalPages} />

    </>
  )
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
