"use client"
import React, { memo } from 'react'
import { useDates } from '../lib/useDates'
import { useGetDay } from '../lib/useGetDay'

const CurrentDay = ({date,isShop}) => {

    const {currentShop} = useDates()
    const { getDay, currentDate } = useGetDay(date ? date : currentShop)    
    const { days, day, months, year } = getDay(date ? date : currentShop)
    
  return (
          <div className='font-bold m-auto text-center flex-col  flex items-center justify-center'>
          <h1 className={`${isShop ? 'text-xl md:text-4xl' : 'text-2xl'} text-lg font-bold self-start`}>{currentDate === 'Invalid Date' ? 'Cargando Fecha' : isShop ? <>Tienda del {days} {day} {months} {year}</> : <>Fin de Temporada: {days} {day} {months} {year}</>}</h1>
        </div>
  )
}               

export default CurrentDay