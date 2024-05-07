'use client'
import React from 'react'
import { useGetDay } from '../lib/useGetDay'

const DateComponent = ({ fullDate, dayss }) => {
  const dayOrDays = dayss === 1 ? 'hace 1 día' : dayss > 0 ? `hace ${dayss} días` : 'Hoy'
  const baseClass = 'w-full text-left text-lg md:text-xl text-gray-500'
  const { getDay } = useGetDay(fullDate)
  const { day, months, year } = getDay(fullDate)

  return (
    <div className='flex w-full flex-row'>
      {
    fullDate === 'Cargando..'
      ? <><h1 className={` ${baseClass}  block w-full`}>Cargando Datos...</h1></>
      : dayss < 1
        ? <span className='block m-auto text-center md:text-2xl font-bold text-yellowForrnite'>¡En la Tienda Ahora!</span>
        : (
          <div className='w-full flex flex-col h-auto'>
            <span className={`${baseClass} self-start`}>{`${day} ${months} ${year}`}</span>
            <span className='text-base text-white text-end w-full block'> {dayOrDays}</span>

          </div>
          )
      }
    </div>
  )
}

export default DateComponent
