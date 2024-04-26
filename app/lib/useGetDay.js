import { useCallback } from 'react'
import { useDates } from './useDates'

export function useGetDay () {
  const { currentShop } = useDates()
  const currentDate = new Date(currentShop).toLocaleDateString()

  const getDay = useCallback((dia) => {
    console.log(dia)
    const currentDayNow = new Date(dia)
    const day = currentDayNow.getDay()
    const month = currentDayNow.getMonth()

    const days = {
      0: 'Domingo',
      1: 'Lunes',
      2: 'Martes',
      3: 'Miércoles',
      4: 'Jueves',
      5: 'Viernes',
      6: 'Sábado'
    }
    const months = {
      0: 'Enero',
      1: 'Febrero',
      2: 'Marzo',
      3: 'Abril',
      4: 'Mayo',
      5: 'Junio',
      6: 'Julio',
      7: 'Agosto',
      8: 'Septiembre',
      9: 'Octubre',
      10: 'Noviembre',
      11: 'Diciembre'
    }

    //   }
    return { days: days[day], day: currentDayNow.getDate(), months: months[month], year: currentDayNow.getFullYear() }
  }, [])

  return { getDay, currentDate }
}
