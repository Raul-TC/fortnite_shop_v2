import React from 'react'
import { useFormatedDate } from '../lib/useFormatedDate';

const DateComponent = ({ fullDate, days, length }) => {
   const {formatedDate} = useFormatedDate()
    
    const dayOrDays = days > 1 ? `hace ${days} días` : 'Hoy'
    const baseClass = 'block w-full text-center text-lg md:text-xl';
    const colorClass = days >= 1 && days <= 365 ? 'text-orange-500' : 'text-red-500';

    const [date] = new Date().toISOString().split('T')

    return (
        fullDate === 'Cargando..'
            ? <><h1 className={` ${baseClass} ${colorClass} block w-full`}>Cargando Datos...</h1></>
            : formatedDate(date) === fullDate
            ? <span className='block text-center md:text-2xl text-yellowForrnite'>¡En la Tienda Ahora!</span> 
            : <span className={`${baseClass} ${colorClass}`}>{fullDate}<span className='text-base'> {dayOrDays}</span></span>

    )
}

export default DateComponent