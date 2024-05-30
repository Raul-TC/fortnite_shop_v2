import { Suspense } from 'react'
import BattlePass from './ui/BattlePass'
import Pagination from './ui/Pagination'
import { getBattlePass } from './lib/data'
import SkeletonHome from './ui/SkeletonHome'

export const metadata = {
  title: 'Inicio',
  description: 'Pase de Batalla Actual de Fortnite',
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
      <Suspense fallback={<SkeletonHome />}>
        <BattlePass currentPage={currentPage} />
        <Pagination totalPages={totalPages} />
      </Suspense>

    </>
  )
}
