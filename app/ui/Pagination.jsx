'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { generatePagination } from '../lib/utils'
const Pagination = ({ totalPages }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') || 1)
  const allPages = generatePagination(currentPage, totalPages)

  const createPageURL = useCallback((page) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }, [pathname, searchParams])
  return (
    <>
      <div className='w-full m-auto flex items-center justify-center'>

        <div className='inline-flex'>
          <PaginationArrow
            direction='left'
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />

          <div className='flex -space-x-px'>
            {allPages.map((page, index) => {
              let position

              if (index === 0) position = 'first'
              if (index === allPages.length - 1) position = 'last'
              if (allPages.length === 1) position = 'single'
              if (page === '...') position = 'middle'

              return (
                <PaginationNumber
                  key={`${page}_${index}`}
                  href={createPageURL(page)}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              )
            })}
          </div>

          <PaginationArrow
            direction='right'
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= totalPages}
          />
        </div>
      </div>
    </>
  )
}

function PaginationNumber ({ page, href, isActive, position }) {
  const className = `flex h-10 w-10 items-center justify-center text-sm border 
    ${position === 'first' || position === 'single' ? 'rounded-l-md' : ''} 
    ${position === 'last' || position === 'single' ? 'rounded-r-md' : ''} 
    ${isActive ? 'z-10 bg-blue-600 border-blue-600 text-white' : ''} 
    ${!isActive && position !== 'middle' ? 'hover:bg-gray-100' : ''} 
    ${position === 'middle' ? 'text-gray-300' : ''}`

  return isActive || position === 'middle'
    ? (
      <div className={className}>{page}</div>
      )
    : (
      <Link href={href} className={className}>
        {page}
      </Link>
      )
}

function PaginationArrow ({ href, direction, isDisabled }) {
  const className = `flex h-10 w-10 items-center justify-center rounded-md border 
    ${isDisabled ? 'pointer-events-none text-gray-300' : 'hover:bg-gray-100'} 
    ${direction === 'left' ? 'mr-2 md:mr-4' : 'ml-2 md:ml-4'}`

  const icon =
    direction === 'left'
      ? (
        <FaArrowLeft className='w-4' />
        )
      : (
        <FaArrowRight className='w-4' />
        )

  return isDisabled
    ? (
      <div className={className}>{icon}</div>
      )
    : (
      <Link className={className} href={href}>
        {icon}
      </Link>
      )
}

export default Pagination
