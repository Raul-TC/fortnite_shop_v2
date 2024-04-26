'use client'
import React from 'react'
import epic from '../assets/epicLogo.svg'
import xbox from '../assets/xboxLogo.svg'
import ps5 from '../assets/ps5Logo.svg'
import useSearch from '../lib/useSearch'
const Search = () => {
  const logos = [
    { name: 'xbl', src: xbox.src },
    { name: 'epic', src: epic.src },
    { name: 'psn', src: ps5.src }
  ]
  const { handleSubmit, stats, setStats } = useSearch()
  return (
    <form className='mt-2 w-full'>
      <input type='search' name='' id='' className='w-[90%] rounded-md pl-2 py-2 outline-none text-gray-500' placeholder='lilRaul#5505' onChange={(e) => setStats({ ...stats, user: e.target.value })} />
      <button onClick={handleSubmit} type='submit'>Buscar</button>
      <div className='flex justify-between items-center gap-4 mt-2'>
        {logos.map(logo => (
          <img className={`${stats.type === logo.name ? 'shadow-lg shadow-red-600' : ''} rounded-full`} src={logo.src} key={logo.name} alt={`${logo.name}_icon`} onClick={() => setStats({ ...stats, type: logo.name })} />
        ))}
      </div>
    </form>
  )
}

export default Search
