import React, { Suspense } from 'react'
import Skins from '../ui/Skins'
import SkeletonCosmetics from '../ui/SkeletonCosmetics'
import { getCosmetics } from '../lib/data'
export const dynamic = 'auto'

export const metadata = {
  title: 'Cosméticos',
  description: 'Todos los cosméticos de Fortnite',
  icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
  facebook: {
    card: '',
    title: 'Cosméticos',
    description: 'Todos los cosméticos de Fortnite'
  }
}

const Cosmetics = async ({ searchParams }) => {
  const data = await getCosmetics(searchParams.page)

  return (
    <Suspense fallback={<SkeletonCosmetics />}>
      <Skins dataSkins={data} />
    </Suspense>
  )
}

export default Cosmetics
