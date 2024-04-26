'use client'
import Link from 'next/link'
import React from 'react'
import HamburguerMenu from './HamburguerMenu'

const links = [
  {
    name: 'Inicio', path: '/'
  },
  {
    name: 'Tienda', path: '/shop/'
  },
  {
    name: 'Cosmeticos', path: '/cosmetics'
  },
  {
    name: 'Jugador', path: '/player'
  },
  {
    name: 'Armas', path: '/weapons'
  }
]
const NavMenu = ({ state, handleToggle }) => {
  return (
    <>
      <HamburguerMenu state={state} handleToggle={handleToggle} />
      {state &&
        <ul className='fixed w-full bg-bg-header p-4 left-0 right-0 bottom-0 top-0 z-[80] flex flex-col items-center justify-between py-16'>
          {links.map((item, index) => (
            <Link onClick={handleToggle} key={`${index}_${item.name}`} href={item.path} className='px-2'>
              <li>{item.name}</li>
            </Link>
          )
          )}
        </ul>}

      <ul className='md:flex gap-6 font-semibold items-center hidden'>
        {links.map((item, index) => (
          <Link key={`${index}_${item.name}`} href={item.path} className='px-2'>

            <li>{item.name}</li>
          </Link>
        ))}
      </ul>
    </>
  )
}

export default NavMenu
