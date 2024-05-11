'use client'
import React from 'react'
import epic from '../assets/epicLogo.svg'
import xbox from '../assets/xboxLogo.svg'
import ps5 from '../assets/ps5Logo.svg'
import useSearch from '../lib/useSearch'
const Search = ({ placeholder }) => {
  const logos = [
    { name: 'xbl', src: xbox.src },
    { name: 'epic', src: epic.src },
    { name: 'psn', src: ps5.src }
  ]
  const { handleSubmit, stats, setStats } = useSearch()
  return (
    <form className='mt-2 w-full'>
      <div className='flex justify-between gap-4'>
        <input type='search' className=' rounded-md pl-2 py-2 outline-none text-gray-500 md:w-full' placeholder={placeholder || 'lilRauw5505'} onChange={(e) => setStats({ ...stats, user: e.target.value })} />
        <button onClick={handleSubmit} type='submit' className='bg-yellowForrnite text-bg-header w-full md:w-28 rounded-md font-bold'>Buscar</button>
      </div>
      <div className='flex justify-between items-center gap-4 mt-2 w-[50%] m-auto'>
        {logos.map(logo => (
          <img className={`${stats.type === logo.name ? 'shadow-lg bg-yellow-600' : ''} rounded-full cursor-pointer`} src={logo.src} key={logo.name} alt={`${logo.name}_icon`} onClick={() => setStats({ ...stats, type: logo.name })} />
        ))}
      </div>
      {(stats.isEmpty && stats.user === '' && stats.isEmpty === '') && <div>No Seleccionado nada Noob 😒, has de ser Bronce</div>}
      {(stats.user === '' && stats.isEmpty) && <div className='text-red-400'>Debes escribir tu usuario</div>}
      {(stats.type === '' && stats.isEmpty) && <div className='text-red-400'>Debes seleccionar tu plataforma</div>}
      {/* {loader && <div>Buscando Cuenta... ⏳</div>} */}
    </form>
  )
}

export default Search
