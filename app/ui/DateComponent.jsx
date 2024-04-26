'use client'
import React from 'react'
import { useGetDay } from '../lib/useGetDay'

const DateComponent = ({ fullDate, dayss }) => {
  const dayOrDays = dayss === 1 ? `hace ${dayss} día` : dayss > 0 ? `hace ${dayss} días` : 'Hoy'
  const baseClass = 'block w-full text-left text-lg md:text-xl text-gray-500'
  const { getDay } = useGetDay(fullDate)
  const { day, months, year } = getDay(fullDate)

  return (
    <div className='flex'>
      {
    fullDate === 'Cargando..'
      ? <><h1 className={` ${baseClass}  block w-full`}>Cargando Datos...</h1></>
      : dayss < 1
        ? <span className='block text-center md:text-2xl font-bold text-yellowForrnite'>¡En la Tienda Ahora!</span>
        : <span className={`${baseClass} `}>{`${day} ${months} ${year}`}<span className='text-base text-white'> {dayOrDays}</span></span>
}
    </div>
  )
}

export default DateComponent
