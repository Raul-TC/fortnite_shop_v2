import { useCallback } from 'react'

export function useFormatedDate () {
  const formatedDate = useCallback(

    (date) => {
      if (!date) return 'Cargando..'
      const formatedDate = typeof date === 'string' ? date.replaceAll('-', ',') : date

      const today = new Date(formatedDate)
      const day = today.getDate().toString()
      const month = (today.getMonth() + 1).toString()
      const year = today.getFullYear().toString()
      const finalDate = `${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}-${year}`

      return finalDate
    },
    []
  )
  const getDays = useCallback(
    (date) => {
      if (!date) return 'Cargando..'
      const fechaInicio = new Date()
      const fechaFin = new Date(date)
      const diff = new Date(fechaInicio).getTime() - new Date(fechaFin).getTime()
      const tiempo = Math.floor(Math.trunc((diff / (1000 * 60 * 60 * 24))))

      return tiempo
    }, [])

  return { formatedDate, getDays }
}
