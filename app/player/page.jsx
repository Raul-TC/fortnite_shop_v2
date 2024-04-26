import React from 'react'

import Search from '../ui/Search'
import { getData } from '../lib/useFetchData'
import { URL_STATS } from '@/KEY'
import PlayerStats from '../ui/PlayerStats'
const KEY_LOGIN = process.env.API_FORTNITEV2

const Player = async ({ searchParams }) => {
  const { name, accountType } = searchParams
  console.log(searchParams)

  const userData = await getData(false, false, URL_STATS(name, accountType), KEY_LOGIN, true)

  console.log(userData)
  return (
    <div>
      <h1>Buscar mis estadisticas</h1>
      <div className='flex justify-center items-center flex-wrap m-auto gap-2 text-center'>
        <Search />
      </div>
      {userData.error ? <p>Not found User</p> : <PlayerStats stats={userData} />}
    </div>
  )
}

export default Player
