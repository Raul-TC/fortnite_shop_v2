import { getData } from './lib/useFetchData'
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

export default async function Home ({ searchParams }) {
  const promise = await getData(true, false, URL_BPASS)
  const currentPage = Number(searchParams.page || 1)

  const totalPages = promise.res.arr.length
  return (
    <>
      <Suspense fallback={<h2>Cargando DATOS</h2>}>
        <Await promise={promise}>
          {({ res }) => <BattlePass bpass={res} currentPage={currentPage} />}
        </Await>
      </Suspense>
      <Pagination totalPages={totalPages} />

    </>
  )
}
