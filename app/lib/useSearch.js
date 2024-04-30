'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const useSearch = () => {
  const { replace } = useRouter()
  const [stats, setStats] = useState({ user: '', type: '', isEmpty: false })
  // const router = useRouter()
  const searchParams = useSearchParams()

  const pathname = usePathname()
  useEffect(() => {
    console.log(searchParams.get('name'))
    console.log(searchParams.get('accountType'))
    if (searchParams.get('name') && (searchParams.get('accountType'))) {
      setStats({ user: searchParams.get('name'), type: searchParams.get('accountType') })
    }
  }, [searchParams])
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    // Construye la cadena de consulta con URLSearchParams
    const params = new URLSearchParams()
    // if (stats.user && stats.type) {
    //   params.set('query', term)
    // } else {
    //   params.delete('query')
    // }
    if (stats.user === '' && stats.type === '') {
      setStats({ ...stats, isEmpty: true })
    } else {
      params.set('name', stats.user)
      params.set('accountType', stats.type)
      console.log(params.toString())
      setStats({ ...stats, isEmpty: false })
      // Actualiza la URL con los valores del formulario
      // router.push(`/destino?${params.toString()}`)
      // params.set('name', stats.name)
      replace(`${pathname}?${params.toString()}`)
    }
  }

  return { handleSubmit, stats, setStats }
}
export default useSearch
