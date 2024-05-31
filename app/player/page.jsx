import React, { Suspense } from 'react'

import Search from '../ui/Search'
import PlayerStats from '../ui/PlayerStats'
import SkeletonStats from '../ui/SkeletonStats'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Estadísticas del Jugador',
  description: 'Busca tus estadísticas de esta temporada y de forma global',
  icons: { shortcut: 'https://cdn.marketing.on.epicgames.com/fortnite/webpack/../favicon.ico' },
  facebook: {
    card: '',
    title: 'Mis Estadísticas',
    description: 'Busca tus estadísticas de esta temporada y de forma global'
  }
}

const Player = async ({ searchParams }) => {
  const { name, accountType } = searchParams
  return (
    <>
      <h1 className='text-center text-xl font-bold mb-4 mt-[95px] md:text-4xl'>Buscar mis estadísticas 🎯</h1>
      <div className='flex justify-center items-center flex-wrap m-auto gap-2 text-center'>
        <Search placeholder={name} />
      </div>
      {(name !== undefined && accountType !== undefined && name.trim() !== '') && (
        <Suspense key={`${name}+${Math.random()}`} fallback={<SkeletonStats />}>
          <PlayerStats name={name} accountType={accountType} />
        </Suspense>
      )}

    </>
  )
}

export default Player
