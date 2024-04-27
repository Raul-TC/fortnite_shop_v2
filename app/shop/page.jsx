import { Suspense } from 'react'
import ItemsShop from '../ui/ItemsShop'
import CountDown from '../ui/CountDown'
// import BurgerMenu from './ui/BurgerMenu'
import SkeletonCards from '../ui/SkeletonCards'
import Await from '../ui/Await'
import { getData } from '../lib/useFetchData'
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

export default async function Home () {
  const promise = await getData(false, true, URL_SHOP)

  return (
    <>

      <CountDown isShop date={false} />
      {/* <Suspense fallback={<SkeletonCards />}>
        <Await promise={promise}>
        </Await>
      </Suspense> */}
      <ItemsShop shop={promise} />

    </>
  )
}
