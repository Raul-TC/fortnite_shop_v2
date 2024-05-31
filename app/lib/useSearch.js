'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const useSearch = () => {
  const { replace } = useRouter()
  const [stats, setStats] = useState({ user: '', type: '', isEmpty: false })
  const searchParams = useSearchParams()

  const pathname = usePathname()
  useEffect(() => {
    if (searchParams.get('name') && (searchParams.get('accountType'))) {
      setStats({ user: searchParams.get('name'), type: searchParams.get('accountType') })
    }
  }, [searchParams])
  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (stats.user.trim() === '' || stats.type.trim() === '') {
      setStats({ ...stats, isEmpty: true })
    } else {
      params.set('name', stats.user)
      params.set('accountType', stats.type)
      setStats({ ...stats, isEmpty: false })
      replace(`${pathname}?${params.toString()}`)
    }
  }

  return { handleSubmit, stats, setStats }
}
export default useSearch
